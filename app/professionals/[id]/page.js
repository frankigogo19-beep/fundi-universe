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

      const { data, error: fetchError } = await supabase
        .from("professional_profiles")
        .select("*")
        .eq("id", params.id)
        .single();

      if (fetchError) {
        console.error(fetchError);
        setError("Unable to load this professional profile.");
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

    if (!professional?.id) {
      setError("Professional information is unavailable.");
      setSending(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("job_requests")
      .insert([
        {
          customer_id: null,
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
      ]);

    if (insertError) {
      console.error(insertError);

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

    setShowRequestForm(false);
    setSending(false);
  }

  if (loading) {
    return (
      <main style={styles.container}>
        <div style={styles.mainCard}>
          <p style={styles.loading}>
            Loading professional profile...
          </p>
        </div>
      </main>
    );
  }

  if (error && !professional) {
    return (
      <main style={styles.container}>
        <div style={styles.errorBox}>
          <h2>Profile Not Found</h2>

          <p>
            {error || "This professional profile does not exist."}
          </p>

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

        <div style={styles.profileHeader}>

          <div style={styles.photoContainer}>
            {professional.profile_photo ||
            professional.profile_photo_url ? (
              <img
                src={
                  professional.profile_photo ||
                  professional.profile_photo_url
                }
                alt={professional.full_name || "Professional"}
                style={styles.profilePhoto}
              />
            ) : (
              <div style={styles.initials}>
                {(professional.full_name ||
                  professional.professional_name ||
                  "P"
                )
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}
          </div>

          <div style={styles.profileMainInfo}>
            <div style={styles.nameRow}>
              <h1 style={styles.name}>
                {professional.full_name ||
                  professional.professional_name ||
                  professional.business_name ||
                  "Professional"}
              </h1>

              {professional.is_verified ||
              professional.verification_status === "Verified" ? (
                <span style={styles.verified}>
                  ✓ Verified
                </span>
              ) : null}
            </div>

            <p style={styles.title}>
              {professional.professional_title ||
                professional.professional_category ||
                "Professional Service Provider"}
            </p>

            <p style={styles.location}>
              {professional.city || professional.location
                ? `${professional.city || ""}${
                    professional.city && professional.country
                      ? ", "
                      : ""
                  }${professional.country || ""}`
                : "Location not specified"}
            </p>

            <p style={styles.availability}>
              Availability:{" "}
              {professional.availability ||
                (professional.is_available
                  ? "Available"
                  : "Not specified")}
            </p>
          </div>
        </div>

        {success && (
          <div style={styles.successBox}>
            {success}
          </div>
        )}

        {error && professional && (
          <div style={styles.errorBoxSmall}>
            {error}
          </div>
        )}

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            About This Professional
          </h2>

          <p style={styles.bio}>
            {professional.bio ||
              "No professional biography has been provided yet."}
          </p>
        </section>

        <section style={styles.infoGrid}>

          <div style={styles.infoCard}>
            <span style={styles.infoLabel}>
              Professional Category
            </span>

            <strong style={styles.infoValue}>
              {professional.professional_category ||
                "Not specified"}
            </strong>
          </div>

          <div style={styles.infoCard}>
            <span style={styles.infoLabel}>
              Experience
            </span>

            <strong style={styles.infoValue}>
              {professional.years_of_experience ??
                professional.years_experience ??
                0}{" "}
              years
            </strong>
          </div>

          <div style={styles.infoCard}>
            <span style={styles.infoLabel}>
              Starting Price
            </span>

            <strong style={styles.infoValue}>
              {professional.starting_price
                ? `${professional.starting_price} ${
                    professional.currency || ""
                  }`
                : professional.hourly_rate
                ? `${professional.hourly_rate} ${
                    professional.currency || ""
                  } / hour`
                : "Contact professional"}
            </strong>
          </div>

          <div style={styles.infoCard}>
            <span style={styles.infoLabel}>
              Rating
            </span>

            <strong style={styles.infoValue}>
              {professional.rating
                ? `${professional.rating} / 5`
                : "No rating yet"}
            </strong>
          </div>

        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Skills
          </h2>

          <div style={styles.tagContainer}>
            {professional.skills ? (
              professional.skills
                .split(",")
                .map((skill, index) => (
                  <span
                    key={index}
                    style={styles.tag}
                  >
                    {skill.trim()}
                  </span>
                ))
            ) : (
              <p style={styles.muted}>
                No skills listed yet.
              </p>
            )}
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Qualifications
          </h2>

          <p style={styles.text}>
            {professional.qualifications ||
              "No qualifications listed yet."}
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Certificates
          </h2>

          <p style={styles.text}>
            {professional.certificates ||
              "No certificates listed yet."}
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Verification
          </h2>

          <p style={styles.text}>
            Status:{" "}
            <strong>
              {professional.verification_status ||
                (professional.is_verified
                  ? "Verified"
                  : "Pending")}
            </strong>
          </p>

          {professional.verification_notes && (
            <p style={styles.text}>
              {professional.verification_notes}
            </p>
          )}
        </section>

        <section style={styles.contactSection}>

          <div>
            <h2 style={styles.sectionTitle}>
              Request This Professional
            </h2>

            <p style={styles.muted}>
              Send your job requirements and request
              this professional for your project.
            </p>
          </div>

          <button
            onClick={() =>
              setShowRequestForm(!showRequestForm)
            }
            style={styles.requestButton}
          >
            {showRequestForm
              ? "Close Request Form"
              : "Request Service"}
          </button>

        </section>

        {showRequestForm && (
          <section style={styles.formSection}>

            <h2 style={styles.formTitle}>
              Service Request
            </h2>

            <form onSubmit={submitRequest}>

              <div style={styles.formGrid}>

                <div style={styles.field}>
                  <label style={styles.label}>
                    Job Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Example: House Electrical Installation"
                    style={styles.input}
                  />
                </div>

                <div style={styles.field}>
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
                </div>

              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Job Description *
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the work you need..."
                  rows={5}
                  style={styles.textarea}
                />
              </div>

              <div style={styles.formGrid}>

                <div style={styles.field}>
                  <label style={styles.label}>
                    Country *
                  </label>

                  <input
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Country"
                    style={styles.input}
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>
                    City *
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    style={styles.input}
                  />
                </div>

              </div>

              <div style={styles.field}>
                <label style={styles
