
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

export default function ProfessionalsPage() {
  const [professionals, setProfessionals] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [country, setCountry] = useState("All Countries");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [customerLocation, setCustomerLocation] = useState(null);
  const [locationMessage, setLocationMessage] = useState("");

  useEffect(() => {
    loadProfessionals();
  }, []);

  async function loadProfessionals() {
    setLoading(true);
    setError("");
    setLocationMessage("");

    try {
      // Get logged-in customer
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(userError);
      }

      // Get customer location
      if (user) {
        const { data: customerData, error: customerError } = await supabase
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

          setLocationMessage(
            "Professionals are sorted by distance from your location."
          );
        } else {
          setLocationMessage(
            "Enable your location from the Customer Dashboard to find professionals near you."
          );
        }
      }

      // Load professionals
      const { data, error: professionalsError } = await supabase
        .from("professional_profiles")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (professionalsError) {
        console.error(professionalsError);
        setError("Unable to load professionals.");
        setProfessionals([]);
      } else {
        setProfessionals(data || []);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading professionals.");
      setProfessionals([]);
    }

    setLoading(false);
  }

  // Calculate distance between two GPS coordinates
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

  const filteredProfessionals = professionals
    .map((professional) => {
      let distance = null;

      if (
        customerLocation &&
        professional.latitude !== null &&
        professional.longitude !== null &&
        professional.latitude !== undefined &&
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
        country === "All Countries" || professional.country === country;

      return matchesSearch && matchesCategory && matchesCountry;
    })
    .sort((a, b) => {
      // Professionals with distance come first
      if (a.distance !== null && b.distance === null) {
        return -1;
      }

      if (a.distance === null && b.distance !== null) {
        return 1;
      }

      // Sort nearby professionals by closest distance
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

        {/* Location information */}
        <section style={styles.locationCard}>
          <div>
            <h2 style={styles.locationTitle}>NEARBY PROFESSIONALS</h2>

            {customerLocation ? (
              <p style={styles.locationSuccess}>
                ✓ Your location is active. Professionals are sorted by
                distance from you.
              </p>
            ) : (
              <p style={styles.locationText}>
                {locationMessage ||
                  "Enable your location from your Customer Dashboard to find professionals near you."}
              </p>
            )}
          </div>

          {!customerLocation && (
            <Link
              href="/dashboard"
              style={styles.locationButton}
            >
              Enable Location
            </Link>
          )}
        </section>

        {/* Filters */}
        <section style={styles.filters}>
          <input
            type="text"
            placeholder="Search by name, skill, service or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
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
            style={styles.select}
          >
            {countries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </section>

        {/* Loading */}
        {loading && (
          <div style={styles.message}>
            <p>Loading professionals...</p>
          </div>
        )}

        {/* Error */}
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

        {/* No professionals */}
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

        {/* Professionals */}
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
                    {/* Nearby badge */}
                    {professional.distance !== null && (
                      <div style={styles.nearbyBadge}>
                        📍{" "}
                        {professional.distance < 1
                          ? `${Math.round(
                              professional.distance * 1000
                            )} m away`
                          : `${professional.distance.toFixed(
                              1
                            )} km
