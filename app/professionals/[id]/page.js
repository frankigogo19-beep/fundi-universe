"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

const categories = [
  "Construction",
  "Electrical",
  "Plumbing",
  "Carpentry",
  "Welding",
  "Painting",
  "Mechanic",
  "Cleaning",
  "ICT & Technology",
  "Graphic Design",
  "Photography",
  "Transport",
  "Beauty",
  "Tailoring",
  "Agriculture",
  "Consulting",
  "Other",
];

const currencies = [
  "TZS",
  "USD",
  "GBP",
  "EUR",
  "AED",
  "INR",
  "KES",
  "UGX",
  "RWF",
  "ZAR",
  "NGN",
  "CAD",
  "AUD",
  "JPY",
  "CNY",
];

export default function ProfessionalProfile() {
  const params = useParams();

  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showRequestForm, setShowRequestForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    location: "",
    budget: "",
    currency: "TZS",
    requested_date: "",
    customer_notes: "",
  });

  useEffect(() => {
    async function loadProfessional() {
      if (!params?.id) return;

      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("professional_profiles")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.error(error);
        setError("Professional profile could not be found.");
        setProfessional(null);
      } else {
        setProfessional(data);

        setForm((previous) => ({
          ...previous,
          category: data.professional_category || "",
          country: data.country || "",
          city: data.city || "",
          location: data.location || "",
        }));
      }

      setLoading(false);
    }

    loadProfessional();
  }, [params?.id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

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

    const { error } = await supabase
      .from("job_requests")
      .insert([
        {
          customer_id: null,
          professional_id: professional.id,
          title: form.title,
          description: form.description,
          category: form.category,
          country: form.country,
          city: form.city,
          location: form.location,
          budget: form.budget
            ? Number(form.budget)
            : null,
          currency: form.currency,
          requested_date: form.requested_date || null,
          status: "Pending",
          customer_notes: form.customer_notes,
        },
      ]);

    if (error) {
      console.error(error);
      setError(
        "Unable to send the service request. Please try again."
      );
      setSending(false);
      return;
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

    setSending(false);
  }

  if (loading) {
    return (
      <main style={styles.container}>
        <p style={styles.loading}>
          Loading professional profile...
        </p>
      </main>
    );
  }

  if (error && !professional) {
    return (
      <main style={styles.container}>
        <div style={styles.errorBox}>
          <h2>Profile Not Found</h2>
          <p>{error}</p>

          <button
            onClick={() => {
              window.location.href = "/professionals";
            }}
            style={styles.backButton}
          >
            Back to Professionals
          </button>
        </div>
      </main>
    );
  }

  const initials = professional.full_name
    ? professional.full_name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "FU";

  return (
    <main style={styles.container}>
      <div style={styles.mainCard}>
        <button
          onClick={() => {
            window.location.href = "/professionals";
          }}
          style={styles.backButton}
        >
          ← Back to Professionals
        </button>

        <section style={styles.profileHeader}>
          {professional.profile_photo ? (
            <img
              src={professional.profile_photo}
              alt={professional.full_name || "Professional"}
              style={styles.photo}
            />
          ) : (
            <div style={styles.initials}>{initials}</div>
          )}

          <div style={styles.headerInfo}>
            <div style={styles.nameRow}>
              <h1 style={styles.name}>
                {professional.full_name || "Professional"}
              </h1>

              {professional.is_verified && (
                <span style={styles.verified}>
                  ✓ Verified
                </span>
              )}
            </div>

            <p style={styles.title}>
              {professional.professional_title ||
                professional.professional_category ||
                "Professional Service Provider"}
            </p>

            <p style={styles.location}>
              📍{" "}
              {professional.location ||
                professional.city ||
                professional.country ||
                "Location not provided"}
            </p>

            {professional.availability && (
              <span style={styles.availability}>
                {professional.availability}
              </span>
            )}
          </div>
        </section>

        <div style={styles.divider}></div>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>About</h2>

          <p style={styles.text}>
            {professional.bio ||
              "This professional has not added a biography yet."}
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Professional Information
          </h2>

          <div style={styles.infoGrid}>
            <div style={styles.infoBox}>
              <strong>Category</strong>
              <span>
                {professional.professional_category ||
                  "Not provided"}
              </span>
            </div>

            <div style={styles.infoBox}>
              <strong>Experience</strong>
              <span>
                {professional.years_of_experience
                  ? `${professional.years_of_experience} years`
                  : "Not provided"}
              </span>
            </div>

            <div style={styles.infoBox}>
              <strong>Country</strong>
              <span>
                {professional.country || "Not provided"}
              </span>
            </div>

            <div style={styles.infoBox}>
              <strong>City</strong>
              <span>
                {professional.city || "Not provided"}
              </span>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Skills</h2>

          <div style={styles.skills}>
            {professional.skills ? (
              professional.skills
                .split(",")
                .map((skill, index) => (
                  <span key={index} style={styles.skill}>
                    {skill.trim()}
                  </span>
                ))
            ) : (
              <p style={styles.text}>
                No skills listed yet.
              </p>
            )}
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Qualifications</h2>

          <p style={styles.text}>
            {professional.qualifications ||
              "No qualifications provided yet."}
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Certificates</h2>

          <p style={styles.text}>
            {professional.certificates ||
              "No certificates provided yet."}
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Verification</h2>

          <div style={styles.verificationBox}>
            <strong>Status:</strong>{" "}
            {professional.verification_status ||
              "Pending"}

            {professional.verification_notes && (
              <p style={styles.text}>
                {professional.verification_notes}
              </p>
            )}
          </div>
        </section>

        {professional.hourly_rate && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Service Rate
            </h2>

            <p style={styles.rate}>
              {professional.hourly_rate}{" "}
              {professional.currency || ""}
              <span style={styles.perHour}> / hour</span>
            </p>
          </section>
        )}

        <div style={styles.actionArea}>
          {!showRequestForm && (
            <button
              onClick={() => {
                setShowRequestForm(true);
                setError("");
                setSuccess("");
              }}
              style={styles.requestButton}
            >
              Request Service
            </button>
          )}
        </div>

        {showRequestForm && (
          <section style={styles.requestSection}>
            <h2 style={styles.requestTitle}>
              Request Service
            </h2>

            <p style={styles.requestSubtitle}>
              Send a job request directly to this professional.
            </p>

            {error && (
              <div style={styles.errorMessage}>
                {error}
              </div>
            )}

            {success && (
              <div style={styles.successMessage}>
                {success}
              </div>
            )}

            <form onSubmit={submitRequest}>
              <label style={styles.label}>
                Job Title
              </label>

              <input
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
                rows="5"
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

                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <label style={styles.label}>
                Country
              </label>

              <input
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
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter city"
                style={styles.input}
              />

              <label style={styles.label}>
                Exact Location
              </label>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Street, area or other location details"
                style={styles.input}
              />

              <div style={styles.twoColumns}>
                <div>
                  <label style={styles.label}>
                    Budget
                  </label>

                  <input
                    type="number"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="Enter budget"
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
                rows="4"
                style={styles.textarea}
              />

              <div style={styles.formButtons}>
                <button
                  type="button"
                  onClick={() => {
                    setShowRequestForm(false);
                    setError("");
                    setSuccess("");
                  }}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={sending}
                  style={styles.sendButton}
                >
                  {sending
                    ? "Sending..."
                    : "Send Service Request"}
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px 20px",
    background: "#f5f7fb",
    fontFamily: "Arial, sans-serif",
  },

  mainCard: {
    maxWidth: "900px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "30px",
    boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
  },

  loading: {
    textAlign: "center",
    paddingTop: "50px",
    fontSize: "18px",
  },

  errorBox: {
    maxWidth: "700px",
    margin: "50px auto",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "14px",
    textAlign: "center",
  },

  backButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "20px",
    padding: "8px 0",
  },

  profileHeader: {
    display: "flex",
    gap: "22px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  photo: {
    width: "130px",
    height: "130px",
    objectFit: "cover",
    borderRadius: "50%",
  },

  initials: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    background: "#e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    fontWeight: "bold",
  },

  headerInfo: {
    flex: 1,
  },

  nameRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  name: {
    margin: "0",
    fontSize: "30px",
  },

  verified: {
    background: "#e8f7ee",
    color: "#16803c",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold",
  },

  title: {
    fontSize: "18px",
    margin: "8px 0",
  },

  location: {
    color: "#555",
    margin: "8px 0",
  },

  availability: {
    display: "inline-block",
    marginTop: "8px",
    padding: "6px 10px",
    background: "#eef4ff",
    borderRadius: "20px",
    fontSize: "13px",
  },

  divider: {
    height: "1px",
    background: "#e5e7eb",
    margin: "28px 0",
  },

  section: {
    marginBottom: "28px",
  },

  sectionTitle: {
    fontSize: "21px",
    marginBottom: "12px",
  },

  text: {
    color: "#555",
    lineHeight: "1.7",
    whiteSpace: "pre-line",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
  },

  infoBox: {
    padding: "15px",
    background: "#f7f8fa",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  skill: {
    background: "#eef4ff",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "14px",
  },

  verificationBox: {
    padding: "16px",
    background: "#f7f8fa",
    borderRadius: "10px",
  },

  rate: {
    fontSize: "24px",
    fontWeight: "bold",
  },

  perHour: {
    fontSize: "15px",
    fontWeight: "normal",
  },

  actionArea: {
    marginTop: "35px",
    textAlign: "center",
  },

  requestButton: {
    width: "100%",
    maxWidth: "450px",
    padding: "15px 20px",
    border: "none",
    borderRadius: "10px",
    background: "#111827",
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  requestSection: {
    marginTop: "30px",
    padding: "25px",
    background: "#f8fafc",
    borderRadius: "15px",
  },

  requestTitle: {
    marginTop: "0",
    fontSize: "24px",
  },

  requestSubtitle: {
    color: "#666",
    marginBottom: "22px",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    marginTop: "16px",
    fontWeight: "bold",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    border: "1px solid #d1d5db",
    borderRadius: "9px",
    background: "#ffffff",
    fontSize: "15px",
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    border: "1px solid #d1d5db",
    borderRadius: "9px",
    background: "#ffffff",
    fontSize: "15px",
    resize: "vertical",
  },

  twoColumns: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
  },

  formButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "25px",
    flexWrap: "wrap",
  },

  cancelButton: {
    flex: 1,
    minWidth: "130px",
    padding: "13px",
    border: "1px solid #d1d5db",
    borderRadius: "9px",
    background: "#ffffff",
    cursor: "pointer",
    fontSize: "15px",
  },

  sendButton: {
    flex: 2,
    minWidth: "180px",
    padding: "13px",
    border: "none",
    borderRadius: "9px",
    background: "#111827",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
  },

  errorMessage: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    background: "#fee2e2",
    color: "#991b1b",
  },

  successMessage: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    background: "#dcfce7",
    color: "#166534",
  },
};
