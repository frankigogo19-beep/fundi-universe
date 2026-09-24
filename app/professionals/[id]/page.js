
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
        const { data: customerData } = await supabase
          .from("customers")
          .select("latitude, longitude")
          .eq("user_id", user.id)
          .maybeSingle();

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
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw new Error(
          authError.message || "Unable to verify your account."
        );
      }

      if (!user) {
        throw new Error(
          "Please log in as a customer before sending a service request."
        );
      }

      if (!professional?.id) {
        throw new Error("Professional information is missing.");
      }

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
        throw new Error("Please describe the job you need.");
      }

      if (!country) {
        throw new Error("Please enter your country.");
      }

      if (!city) {
        throw new Error("Please enter your city.");
      }

      const requestPayload = {
        customer_id: user.id,
        professional_id: professional.id,
        title,
        description,
        category:
          form.category ||
          professional.professional_category ||
          "Other",
        country,
        city,
        location: location || null,
        budget: form.budget !== "" ? Number(form.budget) : null,
        currency: form.currency || "USD",
        requested_date: form.requested_date || null,
        status: "Pending",
        customer_notes: customerNotes || null,
      };

      const { data: requestData, error: insertError } =
        await supabase
          .from("job_requests")
          .insert(requestPayload)
          .select("*")
          .single();

      if (insertError) {
        throw new Error(
          insertError.message ||
            insertError.details ||
            "Unable to create service request."
        );
      }

      if (professional.user_id) {
        const { error: notificationError } = await supabase
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

      setSuccess("Service request sent successfully!");

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
      console.error("SERVICE REQUEST ERROR:", err);

      setError(
        err?.message ||
          "Unable to send the service request. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm text-slate-500">
              Loading professional profile...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!professional) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">
              Professional Not Found
            </h1>

            {error && (
              <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                {error}
              </p>
            )}

            <Link
              href="/professionals"
              className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Back to Professionals
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        <Link
          href="/professionals"
          className="mb-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          ← Back to Professionals
        </Link>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Profile Header */}
          <div className="border-b border-slate-200 px-5 py-7 sm:px-8 sm:py-9">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="break-words text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    {professional.full_name}
                  </h1>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Available
                  </span>
                </div>

                <p className="mt-3 text-base font-semibold text-blue-600 sm:text-lg">
                  {professional.professional_category ||
                    "Professional"}
                </p>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Professional service provider available through
                  FUNDI UNIVERSE.
                </p>
              </div>

              <div className="w-full lg:w-auto lg:flex-shrink-0">
                <button
                  type="button"
                  onClick={
                    showRequestForm
                      ? closeRequestForm
                      : openRequestForm
                  }
                  className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 lg:w-auto"
                >
                  {showRequestForm
                    ? "Close Request Form"
                    : "Request This Professional"}
                </button>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="px-5 py-7 sm:px-8 sm:py-9">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-slate-900">
                Professional Information
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Basic information about this professional.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Category
                </p>

                <p className="mt-2 break-words text-base font-semibold leading-6 text-slate-900">
                  {professional.professional_category ||
                    "Not specified"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Country
                </p>

                <p className="mt-2 break-words text-base font-semibold leading-6 text-slate-900">
                  {professional.country || "Not specified"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  City
                </p>

                <p className="mt-2 break-words text-base font-semibold leading-6 text-slate-900">
                  {professional.city || "Not specified"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Location
                </p>

                <p className="mt-2 break-words text-base font-semibold leading-6 text-slate-900">
                  {professional.location || "Not specified"}
                </p>
              </div>

              {distance !== null && (
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    Distance from you
                  </p>

                  <p className="mt-2 text-lg font-bold text-blue-900">
                    {distance.toFixed(1)} km
                  </p>
                </div>
              )}
            </div>

            {!customerLocation && (
              <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
                <p className="text-sm leading-6 text-yellow-800">
                  Enable your location in your profile to see
                  the distance between you and this professional.
                </p>
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                <p className="text-sm font-bold text-red-800">
                  Service Request Error
                </p>

                <p className="mt-2 break-words text-sm leading-6 text-red-700">
                  {error}
                </p>
              </div>
            )}

            {success && (
              <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">
                <p className="text-sm font-semibold leading-6 text-green-700">
                  {success}
                </p>
              </div>
            )}

            {/* Request Form */}
            {showRequestForm && (
              <form
                onSubmit={submitRequest}
                className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7"
              >
                <div className="mb-7 border-b border-slate-200 pb-5">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Send Service Request
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Tell this professional what service you need.
                  </p>
                </div>

                <div className="space-y-7">

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Job Title *
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Example: Install electrical wiring"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Job Description *
                    </label>

                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Describe the work you need..."
                      rows={6}
                      className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Category
                    </label>

                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select category</option>

                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Country *
                      </label>

                      <input
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        placeholder="Example: Tanzania"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        City *
                      </label>

                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Example: Dar es Salaam"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Location / Address
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="Example: Mikocheni, Dar es Salaam"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
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
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Currency
                      </label>

                      <select
                        name="currency"
                        value={form.currency}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        {currencies.map((currency) => (
                          <option key={currency} value={currency}>
                            {currency}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Requested Date
                    </label>

                    <input
                      type="date"
                      name="requested_date"
                      value={form.requested_date}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Additional Notes
                    </label>

                    <textarea
                      name="customer_notes"
                      value={form.customer_notes}
                      onChange={handleChange}
                      placeholder="Any additional information..."
                      rows={5}
                      className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {sending
                        ? "Sending Request..."
                        : "Send Service Request"}
                    </button>
                  </div>

                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
