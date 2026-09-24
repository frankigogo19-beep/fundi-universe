"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

const categories = [
  "Construction",
  "Electrical",
  "Electronics Technician",
  "Plumbing",
  "Carpentry",
  "Painting",
  "Welding",
  "Cleaning",
  "Gardening",
  "Mechanic",
  "IT & Technology",
  "Graphic Design",
  "Photography",
  "Transport",
  "Beauty & Personal Care",
  "Education & Training",
  "Business Services",
  "Other",
];

const currencies = [
  "USD",
  "TZS",
  "KES",
  "UGX",
  "RWF",
  "ZAR",
  "AED",
  "INR",
  "GBP",
  "EUR",
  "CAD",
  "AUD",
];

export default function ProfessionalProfilePage() {
  const params = useParams();
  const id = params?.id;

  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showRequestForm, setShowRequestForm] = useState(false);

  const [customerLocation, setCustomerLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    location: "",
    budget: "",
    currency: "USD",
    requested_date: "",
    customer_notes: "",
  });

  useEffect(() => {
    if (id) {
      loadProfessional();
    }
  }, [id]);

  const loadProfessional = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error: professionalError } = await supabase
        .from("professional_profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (professionalError) {
        console.error("PROFESSIONAL LOAD ERROR:", professionalError);
        throw new Error(
          professionalError.message || "Unable to load professional."
        );
      }

      setProfessional(data);

      setForm((previous) => ({
        ...previous,
        category: data.professional_category || "",
        country: data.country || "",
        city: data.city || "",
      }));

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: customerData, error: customerError } =
          await supabase
            .from("customers")
            .select("latitude, longitude")
            .eq("user_id", user.id)
            .maybeSingle();

        if (customerError) {
          console.error("CUSTOMER LOCATION ERROR:", customerError);
        }

        if (
          customerData?.latitude != null &&
          customerData?.longitude != null &&
          data?.latitude != null &&
          data?.longitude != null
        ) {
          const customerLat = Number(customerData.latitude);
          const customerLon = Number(customerData.longitude);
          const professionalLat = Number(data.latitude);
          const professionalLon = Number(data.longitude);

          if (
            !Number.isNaN(customerLat) &&
            !Number.isNaN(customerLon) &&
            !Number.isNaN(professionalLat) &&
            !Number.isNaN(professionalLon)
          ) {
            const calculatedDistance = calculateDistance(
              customerLat,
              customerLon,
              professionalLat,
              professionalLon
            );

            setCustomerLocation({
              latitude: customerLat,
              longitude: customerLon,
            });

            setDistance(calculatedDistance);
          }
        }
      }
    } catch (err) {
      console.error("LOAD PROFESSIONAL ERROR:", err);

      setError(
        err?.message || "Unable to load professional profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openRequestForm = () => {
    setError("");
    setSuccess("");

    setForm((previous) => ({
      ...previous,
      category: professional?.professional_category || "",
      country: professional?.country || "",
      city: professional?.city || "",
    }));

    setShowRequestForm(true);
  };

  const closeRequestForm = () => {
    if (sending) return;

    setShowRequestForm(false);
    setError("");
  };

  const submitRequest = async (event) => {
    event.preventDefault();

    if (sending) return;

    setSending(true);
    setError("");
    setSuccess("");

    try {
      /*
       * 1. Check logged-in customer
       */
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("AUTH ERROR:", authError);
        throw new Error(
          authError.message || "Unable to verify your account."
        );
      }

      if (!user) {
        throw new Error(
          "Please log in as a customer before sending a service request."
        );
      }

      /*
       * 2. Check professional
       */
      if (!professional?.id) {
        throw new Error(
          "Professional information is missing."
        );
      }

      /*
       * 3. Validate form
       */
      const title = form.title.trim();
      const description = form.description.trim();
      const country = form.country.trim();
      const city = form.city.trim();
      const location = form.location.trim();
      const customerNotes = form.customer_notes.trim();

      if (!title) {
        throw new Error("Please enter a job title.");
      }

      if (!description) {
        throw new Error(
          "Please describe the job you need."
        );
      }

      if (!country) {
        throw new Error("Please enter your country.");
      }

      if (!city) {
        throw new Error("Please enter your city.");
      }

      /*
       * 4. Prepare request
       *
       * IMPORTANT:
       * customer_id is the authenticated user's ID.
       * professional_id is the professional profile ID.
       */
      const requestPayload = {
        customer_id: user.id,
        professional_id: professional.id,
        title: title,
        description: description,
        category:
          form.category ||
          professional.professional_category ||
          "Other",
        country: country,
        city: city,
        location: location || null,
        budget:
          form.budget !== ""
            ? Number(form.budget)
            : null,
        currency: form.currency || "USD",
        requested_date:
          form.requested_date || null,
        status: "Pending",
        customer_notes:
          customerNotes || null,
      };

      console.log(
        "JOB REQUEST PAYLOAD:",
        requestPayload
      );

      /*
       * 5. Insert job request
       */
      const { data: requestData, error: insertError } =
        await supabase
          .from("job_requests")
          .insert(requestPayload)
          .select("*")
          .single();

      if (insertError) {
        console.error(
          "JOB REQUEST INSERT ERROR:",
          insertError
        );

        throw new Error(
          insertError.message ||
            insertError.details ||
            "Unable to create service request."
        );
      }

      console.log(
        "JOB REQUEST CREATED:",
        requestData
      );

      /*
       * 6. Notification
       *
       * Notification failure must NOT cancel
       * an already-created job request.
       */
      if (professional.user_id) {
        const { error: notificationError } =
          await supabase
            .from("notifications")
            .insert({
              user_id: professional.user_id,
              title: "New Service Request",
              message: `You received a new service request: ${title}`,
              type: "job_request",
              related_request_id: requestData.id,
              is_read: false,
            });

        if (notificationError) {
          console.error(
            "NOTIFICATION ERROR:",
            notificationError
          );
        }
      }

      /*
       * 7. Success
       */
      setSuccess(
        "Service request sent successfully!"
      );

      setForm((previous) => ({
        ...previous,
        title: "",
        description: "",
        budget: "",
        requested_date: "",
        customer_notes: "",
      }));

      setShowRequestForm(false);
    } catch (err) {
      console.error(
        "SERVICE REQUEST ERROR:",
        err
      );

      setError(
        err?.message ||
          "Unable to send the service request. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  /*
   * LOADING
   */
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-white p-8 shadow">
            <p className="text-gray-600">
              Loading professional profile...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /*
   * NOT FOUND
   */
  if (!professional) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-white p-8 shadow">
            <h1 className="text-2xl font-bold text-gray-900">
              Professional Not Found
            </h1>

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">
                {error}
              </p>
            )}

            <Link
              href="/professionals"
              className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-3 text-white"
            >
              Back to Professionals
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /*
   * MAIN PAGE
   */
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <Link
          href="/professionals"
          className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Professionals
        </Link>

        {/* Profile Card */}
        <section className="rounded-2xl bg-white p-6 shadow-md sm:p-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {professional.full_name}
              </h1>

              <p className="mt-2 text-lg font-medium text-blue-600">
                {professional.professional_category ||
                  "Professional"}
              </p>

              <div className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Available
              </div>
            </div>

            <button
              type="button"
              onClick={
                showRequestForm
                  ? closeRequestForm
                  : openRequestForm
              }
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              {showRequestForm
                ? "Close Request Form"
                : "Request This Professional"}
            </button>
          </div>

          {/* Profile Information */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Category
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {professional.professional_category ||
                  "Not specified"}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Country
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {professional.country ||
                  "Not specified"}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                City
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {professional.city ||
                  "Not specified"}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Location
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {professional.location ||
                  "Not specified"}
              </p>
            </div>

            {distance !== null && (
              <div className="rounded-xl bg-blue-50 p-4 sm:col-span-2">
                <p className="text-sm text-blue-600">
                  Distance from you
                </p>

                <p className="mt-1 font-semibold text-blue-900">
                  {distance.toFixed(1)} km
                </p>
              </div>
            )}
          </div>

          {/* Location message */}
          {!customerLocation && (
            <div className="mt-6 rounded-xl bg-yellow-50 p-4 text-sm text-yellow-800">
              Enable your location in your profile to see
              the distance between you and this professional.
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <p className="font-semibold">
                Service Request Error
              </p>

              <p className="mt-1 break-words">
                {error}
              </p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Request Form */}
          {showRequestForm && (
            <form
              onSubmit={submitRequest}
              className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Send Service Request
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  Tell this professional what service you need.
                </p>
              </div>

              <div className="space-y-5">

                {/* Job Title */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Job Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Example: Install electrical wiring"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Job Description *
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the work you need..."
                    rows={5}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Category
                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="">
                      Select category
                    </option>

                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Country + City */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Country *
                    </label>

                    <input
                      type="text"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      placeholder="Example: Tanzania"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      City *
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Example: Dar es Salaam"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                </div>

                {/* Location */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Location / Address
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Example: Mikocheni, Dar es Salaam"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Budget + Currency */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Budget
                    </label>

                    <input
                      type="number"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="Example: 500"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Currency
                    </label>

                    <select
                      name="currency"
                      value={form.currency}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                    >
                      {currencies.map((currency) => (
                        <option
                          key={currency}
                          value={currency}
                        >
                          {currency}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Requested Date */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Requested Date
                  </label>

                  <input
                    type="date"
                    name="requested_date"
                    value={form.requested_date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Additional Notes
                  </label>

                  <textarea
                    name="customer_notes"
                    value={form.customer_notes}
                    onChange={handleChange}
                    placeholder="Any additional information..."
                    rows={4}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending
                    ? "Sending Request..."
                    : "Send Service Request"}
                </button>

              </div>
            </form>
          )}

        </section>
      </div>
    </main>
  );
}
