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

  useEffect(() => {
    loadProfessionals();
  }, []);

  async function loadProfessionals() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("professional_profiles")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setError("Unable to load professionals.");
      setProfessionals([]);
    } else {
      setProfessionals(data || []);
    }

    setLoading(false);
  }

  const filteredProfessionals = professionals.filter((professional) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      !search ||
      professional.full_name?.toLowerCase().includes(searchText) ||
      professional.professional_title?.toLowerCase().includes(searchText) ||
      professional.professional_category?.toLowerCase().includes(searchText) ||
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

        {loading && (
          <div style={styles.message}>
            <p>Loading professionals...</p>
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

        {!loading && !error && filteredProfessionals.length === 0 && (
          <div style={styles.message}>
            <h2>No professionals found</h2>
            <p>
              Try changing your search, category or country.
            </p>
          </div>
        )}

        {!loading && !error && filteredProfessionals.length > 0 && (
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
                  <div style={styles.topSection}>
                    {professional.profile_photo ? (
                      <img
                        src={professional.profile_photo}
                        alt={professional.full_name || "Professional"}
                        style={styles.photo}
                      />
