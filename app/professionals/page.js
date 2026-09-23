"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const categories = [
  "All Categories",
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

const countries = [
  "All Countries",
  "Tanzania",
  "Kenya",
  "Uganda",
  "Rwanda",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "India",
  "South Africa",
  "Nigeria",
  "Other",
];

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default function ProfessionalsPage() {
  const [professionals, setProfessionals] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [country, setCountry] = useState("All Countries");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [customerLocation, setCustomerLocation] = useState(null);

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
          customerData?.latitude !== null &&
          customerData?.latitude !== undefined &&
          customerData?.longitude !== null &&
          customerData?.longitude !== undefined
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

  const filteredProfessionals = professionals
    .map((professional) => {
      let distance = null;

      if (
        customerLocation &&
        professional.latitude !== null &&
        professional.latitude !== undefined &&
        professional.longitude !== null &&
        professional.longitude !== undefined
      ) {
        distance = calculateDistance(
          customerLocation.latitude,
          customerLocation.longitude,
          Number(professional.latitude),
          Number(professional.longitude)
        );
      }

      return {
        ...professional,
        distance,
      };
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

  profileButton: {
    display: "block",
    textAlign: "center",
    textDecoration: "none",
    marginTop: "18px",
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
};
