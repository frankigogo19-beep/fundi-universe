
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const categories = [
  "All Categories", "Construction", "Electrical", "Plumbing",
  "Carpentry", "Welding", "Painting", "Mechanic", "Cleaning",
  "ICT & Technology", "Graphic Design", "Photography", "Transport",
  "Beauty", "Tailoring", "Agriculture", "Consulting", "Other",
];

const countries = [
  "All Countries", "Tanzania", "Kenya", "Uganda", "Rwanda",
  "United States", "United Kingdom", "United Arab Emirates",
  "India", "South Africa", "Nigeria", "Other",
];

const categoryAliases = {
  electrical: ["electrician", "electronics technician"],
  electrician: ["electrical"],
  plumbing: ["plumber"],
  plumber: ["plumbing"],
  construction: ["builder"],
  builder: ["construction"],
  carpentry: ["carpenter"],
  carpenter: ["carpentry"],
  welding: ["welder"],
  welder: ["welding"],
  painting: ["painter"],
  painter: ["painting"],
  cleaning: ["cleaning professional"],
  "cleaning professional": ["cleaning"],
  "ict & technology": ["computer technician"],
  "computer technician": ["ict & technology"],
};

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function ProfessionalsPage() {
  const [professionals, setProfessionals] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [country, setCountry] = useState("All Countries");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [customerLocation, setCustomerLocation] = useState(null);

  // Request a professional
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [requestTitle, setRequestTitle] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [requestCity, setRequestCity] = useState("");
  const [requestCountry, setRequestCountry] = useState("Tanzania");
  const [requestAddress, setRequestAddress] = useState("");
  const [requestBudget, setRequestBudget] = useState("");
  const [requestCurrency, setRequestCurrency] = useState("TZS");
  const [requestUrgency, setRequestUrgency] = useState("Normal");
  const [sendingRequest, setSendingRequest] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [requestError, setRequestError] = useState("");

  useEffect(() => {
    loadProfessionals();
  }, []);

  async function loadProfessionals() {
    setLoading(true);
    setError("");

    try {
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
          customerData?.longitude != null
        ) {
          setCustomerLocation({
            latitude: Number(customerData.latitude),
            longitude: Number(customerData.longitude),
          });
        }
      }

      const { data, error: professionalsError } = await supabase
        .from("professional_profiles")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (professionalsError) {
        console.error(professionalsError);
        setError("Unable to load professionals.");
        setProfessionals([]);
        return;
      }

      setProfessionals(data || []);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading professionals.");
      setProfessionals([]);
    } finally {
      setLoading(false);
    }
  }

  function openRequest(professional) {
    setSelectedProfessional(professional);
    setRequestTitle(
      `Request for ${
        professional.professional_title ||
        professional.professional_category ||
        "professional"
      } service`
    );
    setRequestDescription("");
    setRequestCity(professional.city || "");
    setRequestCountry(
      countries.includes(professional.country)
        ? professional.country
        : "Tanzania"
    );
    setRequestAddress(professional.location || "");
    setRequestBudget("");
    setRequestCurrency("TZS");
    setRequestUrgency("Normal");
    setRequestMessage("");
    setRequestError("");
  }

  function closeRequest() {
    if (sendingRequest) return;
    setSelectedProfessional(null);
    setRequestMessage("");
    setRequestError("");
  }

  async function submitRequest(event) {
    event.preventDefault();

    if (!selectedProfessional) {
      setRequestError("Please select a professional first.");
      return;
    }

    if (
      !requestTitle.trim() ||
      !requestDescription.trim() ||
      !requestCity.trim() ||
      !requestCountry.trim()
    ) {
      setRequestError(
        "Please fill in the service title, description, country and city."
      );
      return;
    }

    if (
      requestBudget !== "" &&
      (!Number.isFinite(Number(requestBudget)) ||
        Number(requestBudget) < 0)
    ) {
      setRequestError("Please enter a valid budget.");
      return;
    }

    setSendingRequest(true);
    setRequestError("");
    setRequestMessage("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        setRequestError(
          "Please log in to your customer account before requesting a service."
        );
        return;
      }

      const { data: customer, error: customerError } = await supabase
        .from("customers")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (customerError) throw customerError;

      if (!customer?.id) {
        setRequestError(
          "Your customer profile was not found. Please complete your customer registration first."
        );
        return;
      }

      const { data: categoryRows, error: categoryError } =
        await supabase
          .from("service_categories")
          .select("id, name")
          .eq("is_active", true);

      if (categoryError) throw categoryError;

      const professionalCategory = normalize(
        selectedProfessional.professional_category
      );

      const acceptedNames = [
        professionalCategory,
        ...(categoryAliases[professionalCategory] || []),
      ];

      const categoryRow = (categoryRows || []).find((item) =>
        acceptedNames.includes(normalize(item.name))
      );

      if (!categoryRow) {
        setRequestError(
          "We could not match this professional's service category. Please contact support so the category can be configured."
        );
        return;
      }

      const newRequest = {
        customer_id: customer.id,
        professional_id: selectedProfessional.id,
        category_id: categoryRow.id,
        title: requestTitle.trim(),
        description: requestDescription.trim(),
        country: requestCountry.trim(),
        city: requestCity.trim(),
        address: requestAddress.trim() || null,
        budget:
          requestBudget.trim() === ""
            ? null
            : Number(requestBudget),
        currency: requestCurrency,
        urgency: requestUrgency,
        status: "Pending",
      };

      const { error: insertError } = await supabase
        .from("job_requests")
        .insert([newRequest]);

      if (insertError) throw insertError;

      setRequestMessage(
        "Your service request has been submitted successfully. You can check its status from your Customer Dashboard."
      );

      setRequestTitle("");
      setRequestDescription("");
      setRequestBudget("");
    } catch (err) {
      console.error("Service request error:", err);
      setRequestError(
        err?.message ||
          "Unable to submit your request. Please try again."
      );
    } finally {
      setSendingRequest(false);
    }
  }

  const filteredProfessionals = professionals
    .map((professional) => {
      let distance = null;

      if (
        customerLocation &&
        professional.latitude != null &&
        professional.longitude != null
      ) {
        distance = calculateDistance(
          customerLocation.latitude,
          customerLocation.longitude,
          Number(professional.latitude),
          Number(professional.longitude)
        );
      }

      return { ...professional, distance };
    })
    .filter((professional) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        !search ||
        professional.full_name?.toLowerCase().includes(searchText) ||
        professional.professional_title
          ?.toLowerCase()
          .includes(searchText) ||
        professional.professional_category
          ?.toLowerCase()
          .includes(searchText) ||
        professional.skills?.toLowerCase().includes(searchText) ||
        professional.location?.toLowerCase().includes(searchText) ||
        professional.city?.toLowerCase().includes(searchText) ||
        professional.country?.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All Categories" ||
        professional.professional_category === category;

      const matchesCountry =
        country === "All Countries" ||
        professional.country === country;

      return matchesSearch && matchesCategory && matchesCountry;
    })
    .sort((a, b) => {
      if (a.distance !== null && b.distance === null) return -1;
      if (a.distance === null && b.distance !== null) return 1;
      if (a.distance !== null && b.distance !== null) {
        return a.distance - b.distance;
      }
      return 0;
    });

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.heading}>Find a Professional</h1>
            <p style={styles.subtitle}>
              Find trusted professionals and skilled service providers
              around the world.
            </p>
          </div>

          <Link href="/dashboard" style={styles.dashboardButton}>
            Dashboard
          </Link>
        </header>

        <section style={styles.locationCard}>
          <div>
            <h2 style={styles.locationTitle}>
              NEARBY PROFESSIONALS
            </h2>

            {customerLocation ? (
              <p style={styles.successText}>
                ✓ Your location is active. Professionals are sorted by
                distance from you.
              </p>
            ) : (
              <p style={styles.locationText}>
                Enable your location from the Customer Dashboard to find
                professionals near you.
              </p>
            )}
          </div>

          {!customerLocation && (
            <Link href="/dashboard" style={styles.locationButton}>
              Enable Location
            </Link>
          )}
        </section>

        <section style={styles.filters}>
          <input
            type="text"
            placeholder="Search by name, skill, service or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={styles.input}
          >
            {countries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </section>

        {loading && (
          <div style={styles.message}>
            Loading professionals...
          </div>
        )}

        {!loading && error && (
          <div style={styles.error}>
            <p>{error}</p>
            <button
              onClick={loadProfessionals}
              style={styles.retryButton}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          filteredProfessionals.length === 0 && (
            <div style={styles.message}>
              <h2>No professionals found</h2>
              <p>
                Try changing your search, category or country.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          filteredProfessionals.length > 0 && (
            <section style={styles.grid}>
              {filteredProfessionals.map((professional) => {
                const initials = professional.full_name
                  ? professional.full_name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  : "FU";

                return (
                  <article
                    key={professional.id}
                    style={styles.card}
                  >
                    {professional.distance !== null && (
                      <div style={styles.nearbyBadge}>
                        📍{" "}
                        {professional.distance < 1
                          ? `${Math.round(
                              professional.distance * 1000
                            )} m away`
                          : `${professional.distance.toFixed(
                              1
                            )} km away`}
                      </div>
                    )}

                    <div style={styles.avatar}>
                      {professional.profile_photo ? (
                        <img
                          src={professional.profile_photo}
                          alt={
                            professional.full_name ||
                            "Professional"
                          }
                          style={styles.avatarImage}
                        />
                      ) : (
                        initials
                      )}
                    </div>

                    <h2 style={styles.name}>
                      {professional.full_name || "Professional"}
                    </h2>

                    <p style={styles.title}>
                      {professional.professional_title ||
                        "Professional Service Provider"}
                    </p>

                    {professional.professional_category && (
                      <p style={styles.category}>
                        {professional.professional_category}
                      </p>
                    )}

                    {professional.skills && (
                      <p style={styles.skills}>
                        <strong>Skills:</strong>{" "}
                        {professional.skills}
                      </p>
                    )}

                    {(professional.city ||
                      professional.country) && (
                      <p style={styles.location}>
                        📍 {professional.city || ""}
                        {professional.city &&
                        professional.country
                          ? ", "
                          : ""}
                        {professional.country || ""}
                      </p>
                    )}

                    {professional.location && (
                      <p style={styles.area}>
                        {professional.location}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => openRequest(professional)}
                      style={styles.requestButton}
                    >
                      Omba Huduma
                    </button>

                    <Link
                      href={`/professionals/${professional.id}`}
                      style={styles.profileButton}
                    >
                      View Profile
                    </Link>
                  </article>
                );
              })}
            </section>
          )}
      </div>

      {selectedProfessional && (
        <div
          style={styles.overlay}
          onClick={closeRequest}
          role="presentation"
        >
          <section
            style={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-heading"
            onClick={(event) => event.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <div>
                <h2
                  id="request-heading"
                  style={styles.modalTitle}
                >
                  Omba Huduma
                </h2>
                <p style={styles.modalSubtitle}>
                  Professional:{" "}
                  <strong>
                    {selectedProfessional.full_name ||
                      "Professional"}
                  </strong>
                </p>
              </div>

              <button
                type="button"
                onClick={closeRequest}
                disabled={sendingRequest}
                style={styles.closeButton}
                aria-label="Close request form"
              >
                ×
              </button>
            </div>

            {requestMessage ? (
              <div>
                <p style={styles.formSuccess}>
                  {requestMessage}
                </p>
                <button
                  type="button"
                  onClick={closeRequest}
                  style={styles.submitButton}
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={submitRequest}
                style={styles.form}
              >
                <label style={styles.label}>
                  Service title *
                </label>
                <input
                  required
                  value={requestTitle}
                  onChange={(e) =>
                    setRequestTitle(e.target.value)
                  }
                  placeholder="What service do you need?"
                  style={styles.formInput}
                />

                <label style={styles.label}>
                  Describe the work *
                </label>
                <textarea
                  required
                  value={requestDescription}
                  onChange={(e) =>
                    setRequestDescription(e.target.value)
                  }
                  placeholder="Explain what you need the professional to do..."
                  rows={4}
                  style={styles.textarea}
                />

                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <label style={styles.label}>
                      Country *
                    </label>
                    <select
                      required
                      value={requestCountry}
                      onChange={(e) =>
                        setRequestCountry(e.target.value)
                      }
                      style={styles.formInput}
                    >
                      {countries
                        .filter(
                          (item) => item !== "All Countries"
                        )
                        .map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div style={styles.formColumn}>
                    <label style={styles.label}>City *</label>
                    <input
                      required
                      value={requestCity}
                      onChange={(e) =>
                        setRequestCity(e.target.value)
                      }
                      placeholder="e.g. Dar es Salaam"
                      style={styles.formInput}
                    />
                  </div>
                </div>

                <label style={styles.label}>
                  Area / street / address
                </label>
                <input
                  value={requestAddress}
                  onChange={(e) =>
                    setRequestAddress(e.target.value)
                  }
                  placeholder="Enter the service location"
                  style={styles.formInput}
                />

                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <label style={styles.label}>
                      Estimated budget
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={requestBudget}
                      onChange={(e) =>
                        setRequestBudget(e.target.value)
                      }
                      placeholder="Optional"
                      style={styles.formInput}
                    />
                  </div>

                  <div style={styles.formColumn}>
                    <label style={styles.label}>
                      Currency
                    </label>
                    <select
                      value={requestCurrency}
                      onChange={(e) =>
                        setRequestCurrency(e.target.value)
                      }
                      style={styles.formInput}
                    >
                      {[
                        "TZS", "KES", "UGX", "RWF", "USD",
                        "GBP", "EUR", "AED", "INR", "ZAR",
                        "NGN", "CAD", "AUD",
                      ].map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <label style={styles.label}>Urgency</label>
                <select
                  value={requestUrgency}
                  onChange={(e) =>
                    setRequestUrgency(e.target.value)
                  }
                  style={styles.formInput}
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>

                {requestError && (
                  <p style={styles.formError}>
                    {requestError}
                  </p>
                )}

                <div style={styles.modalActions}>
                  <button
                    type="button"
                    onClick={closeRequest}
                    disabled={sendingRequest}
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={sendingRequest}
                    style={{
                      ...styles.submitButton,
                      opacity: sendingRequest ? 0.7 : 1,
                    }}
                  >
                    {sendingRequest
                      ? "Sending..."
                      : "Submit Request"}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "30px 16px 60px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "25px",
  },
  heading: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "800",
    color: "#111827",
  },
  subtitle: {
    marginTop: "8px",
    color: "#6b7280",
    fontSize: "15px",
  },
  dashboardButton: {
    textDecoration: "none",
    background: "#111827",
    color: "#ffffff",
    padding: "11px 18px",
    borderRadius: "10px",
    fontWeight: "700",
  },
  locationCard: {
    background: "#ffffff",
    border: "1px solid #dbeafe",
    borderRadius: "16px",
    padding: "18px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  locationTitle: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "800",
    color: "#2563eb",
  },
  successText: {
    margin: "7px 0 0",
    color: "#166534",
    fontSize: "14px",
  },
  locationText: {
    margin: "7px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },
  locationButton: {
    textDecoration: "none",
    background: "#2563eb",
    color: "#ffffff",
    padding: "10px 16px",
    borderRadius: "9px",
    fontWeight: "700",
    fontSize: "14px",
  },
  filters: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gap: "12px",
    marginBottom: "25px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "14px",
    background: "#ffffff",
  },
  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },
  card: {
    position: "relative",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "22px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)",
  },
  nearbyBadge: {
    position: "absolute",
    top: "14px",
    right: "14px",
    background: "#eff6ff",
    color: "#2563eb",
    borderRadius: "999px",
    padding: "6px 9px",
    fontSize: "12px",
    fontWeight: "800",
  },
  avatar: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: "800",
    marginBottom: "15px",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  name: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "800",
    color: "#111827",
  },
  title: {
    margin: "6px 0",
    color: "#374151",
    fontSize: "14px",
  },
  category: {
    display: "inline-block",
    margin: "6px 0",
    padding: "5px 9px",
    borderRadius: "999px",
    background: "#f3f4f6",
    color: "#374151",
    fontSize: "12px",
    fontWeight: "700",
  },
  skills: {
    margin: "12px 0",
    color: "#4b5563",
    fontSize: "13px",
    lineHeight: "1.5",
  },
  location: {
    color: "#374151",
    fontSize: "13px",
    marginTop: "10px",
  },
  area: {
    color: "#6b7280",
    fontSize: "13px",
    marginTop: "6px",
  },
  requestButton: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    textAlign: "center",
    border: "none",
    cursor: "pointer",
    marginTop: "18px",
    background: "#2563eb",
    color: "#ffffff",
    padding: "11px 14px",
    borderRadius: "9px",
    fontWeight: "700",
    fontSize: "14px",
  },
  profileButton: {
    display: "block",
    textAlign: "center",
    textDecoration: "none",
    marginTop: "10px",
    background: "#111827",
    color: "#ffffff",
    padding: "11px 14px",
    borderRadius: "9px",
    fontWeight: "700",
    fontSize: "14px",
  },
  message: {
    background: "#ffffff",
    borderRadius: "14px",
    padding: "35px 20px",
    textAlign: "center",
    color: "#6b7280",
    border: "1px solid #e5e7eb",
  },
  error: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "14px",
    padding: "20px",
    textAlign: "center",
    color: "#b91c1c",
  },
  retryButton: {
    border: "none",
    background: "#b91c1c",
    color: "#ffffff",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    background: "rgba(17, 24, 39, 0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    overflowY: "auto",
  },
  modal: {
    width: "100%",
    maxWidth: "600px",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "22px",
    boxSizing: "border-box",
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "20px",
  },
  modalTitle: {
    margin: 0,
    fontSize: "24px",
    color: "#111827",
  },
  modalSubtitle: {
    margin: "7px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },
  closeButton: {
    border: "none",
    background: "#f3f4f6",
    color: "#111827",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    fontSize: "25px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "9px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#374151",
    marginTop: "5px",
  },
  formInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "9px",
    fontSize: "14px",
    background: "#ffffff",
    color: "#111827",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "9px",
    fontSize: "14px",
    resize: "vertical",
    fontFamily: "inherit",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  formColumn: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  formError: {
    color: "#b91c1c",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    padding: "11px",
    borderRadius: "8px",
    fontSize: "14px",
  },
  formSuccess: {
    color: "#166534",
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    padding: "14px",
    borderRadius: "9px",
    lineHeight: 1.5,
  },
  modalActions: {
    display: "flex",
    gap: "10px",
    marginTop: "12px",
    flexWrap: "wrap",
  },
  cancelButton: {
    flex: 1,
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#374151",
    padding: "12px",
    borderRadius: "9px",
    fontWeight: "700",
    cursor: "pointer",
  },
  submitButton: {
    flex: 2,
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    padding: "12px",
    borderRadius: "9px",
    fontWeight: "700",
    cursor: "pointer",
  },
};
