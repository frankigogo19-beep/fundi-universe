"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

const categories = [
  "Construction",
  "Electrical",
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

  async function loadProfessional() {
    setLoading(true);
    setError("");

    try {
      const { data, error: fetchError } = await supabase
        .from("professional_profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error(fetchError);
        setError("Unable to load this professional profile.");
        setLoading(false);
        return;
      }

      setProfessional(data);

      setForm((previous) => ({
        ...previous,
        category: data?.professional_category || "",
        country: data?.country || "",
        city: data?.city || "",
      }));

      // Get logged-in customer
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
          console.error(customerError);
        }

        if (
          customerData &&
          customerData.latitude !== null &&
          customerData.longitude !== null
        ) {
          setCustomerLocation({
            latitude: Number(customerData.latitude),
            longitude: Number(customerData.longitude),
          });

          if (
            data?.latitude !== null &&
            data?.longitude !== null &&
            data?.latitude !== undefined &&
            data?.longitude !== undefined
          ) {
            const calculatedDistance = calculateDistance(
              Number(customerData.latitude),
              Number(customerData.longitude),
              Number(data.latitude),
              Number(data.longitude)
            );

            setDistance(calculatedDistance);
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading this profile.");
    }

    setLoading(false);
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  async function submitRequest(event) {
    event.preventDefault();

    setSending(true);
    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError("Please enter the job title.");
      setSending(false);
      return;
    }

    if (!form.description.trim()) {
      setError("Please describe the job you need.");
      setSending(false);
      return;
    }

    if (!form.country.trim()) {
      setError("Please enter the country.");
      setSending(false);
      return;
    }

    if (!form.city.trim()) {
      setError("Please enter the city.");
      setSending(false);
      return;
    }

    if (!professional?.id) {
      setError("Professional information is unavailable.");
      setSending(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please login before sending a service request.");
      setSending(false);
      return;
    }

    if (!professional.user_id) {
      setError("This professional account is not connected correctly.");
      setSending(false);
      return;
    }

    const { data: requestData, error: insertError } = await supabase
      .from("job_requests")
      .insert([
        {
          customer_id: user.id,
          professional_id: professional.id,
          title: form.title.trim(),
          description: form.description.trim(),
          category: form.category,
          country: form.country.trim(),
          city: form.city.trim(),
          location: form.location.trim(),
          budget: form.budget ? Number(form.budget) : null,
          currency: form.currency,
          requested_date: form.requested_date || null,
          status: "Pending",
          customer_notes: form.customer_notes.trim(),
        },
      ])
      .select("id")
      .single();

    if (insertError) {
      console.error(insertError);

      setError(
        "Unable to send the service request. Please try again."
      );

      setSending(false);
      return;
    }

    const { error: notificationError } = await supabase
      .from("notifications")
      .insert([
        {
          user_id: professional.user_id,
          title: "New Service Request",
          message: `You received a new service request: ${form.title.trim()}`,
          type: "job_request",
          related_request_id: requestData.id,
          is_read: false,
        },
      ]);

    if (notificationError) {
      console.error(notificationError);
    }

    setSuccess(
      "Your service request has been sent successfully."
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
    setSending(false);
  }

  if (loading) {
    return (
      <main style={styles.page}>
        <div style={styles.container}>
          <div style={styles.loadingCard}>
            <div style={styles.loadingIcon}>🔧</div>
            <h2>Loading Professional...</h2>
            <p>Please wait while we load the profile.</p>
          </div>
        </div>
      </main>
    );
  }

  if (error && !professional) {
    return (
      <main style={styles.page}>
        <div style={styles.container}>
          <div style={styles.errorCard}>
            <h2>Professional Not Found</h2>
            <p>{error}</p>

            <Link
              href="/professionals"
              style={styles.backButton}
            >
              ← Back to Professionals
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const initials = (professional?.full_name || "Professional")
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.topNavigation}>
          <Link
            href="/professionals"
            style={styles.backLink}
          >
            ← Back to Professionals
          </Link>
        </div>

        <section style={styles.profileCard}>
          <div style={styles.profileHeader}>
            {professional?.profile_photo ? (
              <img
                src={professional.profile_photo}
                alt={
                  professional.full_name || "Professional"
                }
                style={styles.profilePhoto}
              />
            ) : (
              <div style={styles.profileInitials}>
                {initials}
              </div>
            )}

            <div style={styles.profileMain}>
              <h1 style={styles.name}>
                {professional?.full_name || "Professional"}
              </h1>

              <p style={styles.professionalTitle}>
                {professional?.professional_title ||
                  professional?.professional_category ||
                  "Professional Service Provider"}
              </p>

              <div style={styles.badges}>
                {professional?.is_verified && (
                  <span style={styles.verifiedBadge}>
                    ✓ Verified
                  </span>
                )}

                {professional?.is_available && (
                  <span style={styles.availableBadge}>
                    ● Available
                  </span>
                )}

                {distance !== null && (
                  <span style={styles.distanceBadge}>
                    📍{" "}
                    {distance < 1
                      ? `${Math.round(distance * 1000)} m away`
                      : `${distance.toFixed(1)} km away`}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div style={styles.infoGrid}>
            <div style={styles.infoBox}>
              <span style={styles.infoLabel}>
                Category
              </span>
              <strong>
                {professional?.professional_category ||
                  "Not specified"}
              </strong>
            </div>

            <div style={styles.infoBox}>
              <span style={styles.infoLabel}>
                Country
              </span>
              <strong>
                {professional?.country ||
                  "Not specified"}
              </strong>
            </div>

            <div style={styles.infoBox}>
              <span style={styles.infoLabel}>City</span>
              <strong>
                {professional?.city ||
                  "Not specified"}
              </strong>
            </div>

            <div style={styles.infoBox}>
              <span style={styles.infoLabel}>
                Location
              </span>
              <strong>
                {professional?.location ||
                  "Not specified"}
              </strong>
            </div>
          </div>

          {customerLocation &&
            distance === null && (
              <div style={styles.locationNotice}>
                📍 This professional has not enabled a GPS
                location yet.
              </div>
            )}

          {!customerLocation && (
            <div style={styles.locationNotice}>
              📍 Enable your location from the Customer
              Dashboard to see how far this professional
              is from you.
              <br />

              <Link
                href="/dashboard"
                style={styles.locationLink}
              >
                Enable My Location
              </Link>
            </div>
          )}

          {professional?.bio && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                About This Professional
              </h2>

              <p style={styles.text}>
                {professional.bio}
              </p>
            </div>
          )}

          {professional?.skills && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                Skills
              </h2>

              <p style={styles.text}>
                {professional.skills}
              </p>
            </div>
          )}

          {professional?.experience && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                Experience
              </h2>

              <p style={styles.text}>
                {professional.experience}
              </p>
            </div>
          )}

          {professional?.qualification && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                Qualifications
              </h2>

              <p style={styles.text}>
                {professional.qualification}
              </p>
            </div>
          )}

          <div style={styles.actionArea}>
            <button
              type="button"
              onClick={() => {
                setError("");
                setSuccess("");
                setShowRequestForm(true);
              }}
              style={styles.requestButton}
            >
              Request This Professional
            </button>
          </div>
        </section>

        {success && (
          <div style={styles.success}>
            {success}
          </div>
        )}

        {showRequestForm && (
          <section style={styles.requestCard}>
            <div style={styles.requestHeader}>
              <div>
                <h2 style={styles.requestTitle}>
                  Send Service Request
                </h2>

                <p style={styles.requestSubtitle}>
                  Tell the professional what you need.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowRequestForm(false)
                }
                style={styles.closeButton}
              >
                ✕
              </button>
            </div>

            {error && (
              <div style={styles.formError}>
                {error}
              </div>
            )}

            <form onSubmit={submitRequest}>
              <label style={styles.label}>
                Job Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Example: House electrical installation"
                style={styles.input}
              />

              <label style={styles.label}>
                Job Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the work you need..."
                rows={5}
                style={styles.textarea}
              />

              <label style={styles.label}>
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                style={styles.input}
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

              <label style={styles.label}>
                Country
              </label>

              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Enter country"
                style={styles.input}
              />

              <label style={styles.label}>
                City
              </label>

              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter city"
                style={styles.input}
              />

              <label style={styles.label}>
                Location / Address
              </label>

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter work location"
                style={styles.input}
              />

              <div style={styles.twoColumn}>
                <div>
                  <label style={styles.label}>
                    Budget
                  </label>

                  <input
                    type="number"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="Optional"
                    min="0"
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.label}>
                    Currency
                  </label>

                  <select
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                    style={styles.input}
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

              <label style={styles.label}>
                Requested Date
              </label>

              <input
                type="date"
                name="requested_date"
                value={form.requested_date}
                onChange={handleChange}
                style={styles.input}
              />

              <label style={styles.label}>
                Additional Notes
              </label>

              <textarea
                name="customer_notes"
                value={form.customer_notes}
                onChange={handleChange}
                placeholder="Any additional information..."
                rows={4}
                style={styles.textarea}
              />

              <button
                type="submit"
                disabled={sending}
                style={{
                  ...styles.submitButton,
                  ...(sending
                    ? styles.submitButtonDisabled
                    : {}),
                }}
              >
                {sending
                  ? "Sending Request..."
                  : "Send Service Request"}
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f8fc",
    padding: "24px 16px 50px",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  topNavigation: {
    marginBottom: "18px",
  },

  backLink: {
    color: "#0b4f8a",
    textDecoration: "none",
    fontWeight: "600",
  },

  profileCard: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  },

  profileHeader: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  profilePhoto: {
    width: "120px",
    height: "120px",
    borderRadius: "60px",
    objectFit: "cover",
    border: "4px solid #eef6ff",
  },

  profileInitials: {
    width: "120px",
    height: "120px",
    borderRadius: "60px",
    background: "#0b4f8a",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "38px",
    fontWeight: "bold",
  },

  profileMain: {
    flex: 1,
    minWidth: "220px",
  },

  name: {
    margin: 0,
    color: "#172033",
    fontSize: "30px",
  },

  professionalTitle: {
    color: "#666",
    fontSize: "17px",
    margin: "8px 0 12px",
  },

  badges: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  verifiedBadge: {
    background: "#dcfce7",
    color: "#166534",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold",
  },

  availableBadge: {
    background: "#eef6ff",
    color: "#0b4f8a",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold",
  },

  distanceBadge: {
    background: "#ecfdf3",
    color: "#067647",
    border: "1px solid #abefc6",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
    marginTop: "28px",
  },

  infoBox: {
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "14px",
  },

  infoLabel: {
    display: "block",
    color: "#777",
    fontSize: "12px",
    marginBottom: "6px",
    textTransform: "uppercase",
  },

  locationNotice: {
    marginTop: "20px",
    background: "#f0f7ff",
    border: "1px solid #cfe3ff",
    borderRadius: "10px",
    padding: "14px",
    color: "#24527a",
    fontSize: "14px",
    lineHeight: 1.6,
  },

  locationLink: {
    display: "inline-block",
    marginTop: "8px",
    color: "#0b4f8a",
    fontWeight: "bold",
    textDecoration: "none",
  },

  section: {
    marginTop: "28px",
    paddingTop: "22px",
    borderTop: "1px solid #e5e7eb",
  },

  sectionTitle: {
    color: "#172033",
    fontSize: "20px",
    marginTop: 0,
  },

  text: {
    color: "#555",
    lineHeight: 1.7,
    whiteSpace: "pre-wrap",
  },

  actionArea: {
    marginTop: "30px",
  },

  requestButton: {
    width: "100%",
    border: "none",
    borderRadius: "10px",
    padding: "15px",
    background: "#0b4f8a",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  requestCard: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "28px",
    marginTop: "20px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  },

  requestHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "20px",
  },

  requestTitle: {
    margin: 0,
    color: "#172033",
  },

  requestSubtitle: {
    color: "#777",
    marginBottom: 0,
  },

  closeButton: {
    border: "none",
    background: "#f1f5f9",
    borderRadius: "8px",
    padding: "9px 12px",
    cursor: "pointer",
  },

  label: {
    display: "block",
    marginTop: "15px",
    marginBottom: "7px",
    color: "#333",
    fontWeight: "600",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    borderRadius: "9px",
    border: "1px solid #cfd7e2",
    fontSize: "15px",
    background: "#ffffff",
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    borderRadius: "9px",
    border: "1px solid #cfd7e2",
    fontSize: "15px",
    resize: "vertical",
    fontFamily: "Arial, sans-serif",
  },

  twoColumn: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  submitButton: {
    width: "100%",
    marginTop: "24px",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background: "#0b4f8a",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  submitButtonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  formError: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "15px",
    lineHeight: 1.5,
  },

  success: {
    background: "#dcfce7",
    color: "#166534",
    padding: "14px",
    borderRadius: "10px",
    marginTop: "20px",
    lineHeight: 1.5,
  },

  loadingCard: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "50px 25px",
    textAlign: "center",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  },

  loadingIcon: {
    fontSize: "45px",
    marginBottom: "10px",
  },

  errorCard: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "40px 25px",
    textAlign: "center",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  },

  backButton: {
    display: "inline-block",
    marginTop: "20px",
    background: "#0b4f8a",
    color: "#ffffff",
    padding: "12px 18px",
    borderRadius: "9px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
