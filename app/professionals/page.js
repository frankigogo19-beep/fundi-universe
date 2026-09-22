
"use client";
import { useEffect, useState } from "react"; import { supabase } from "../../lib/supabaseClient";
const categories = [ "All Categories", "Construction", "Electrical", "Plumbing", "Carpentry", "Welding", "Mechanic", "Painting", "Cleaning", "IT & Technology", "Design & Creative", "Transport & Logistics", "Beauty & Personal Care", "Agriculture", "Other Services", ];
const countries = [ "All Countries", "Tanzania", "Kenya", "Uganda", "Rwanda", "United States", "United Kingdom", "United Arab Emirates", "India", "South Africa", "Nigeria", "Other", ];
export default function ProfessionalsPage() { const [professionals, setProfessionals] = useState([]); const [search, setSearch] = useState(""); const [category, setCategory] = useState("All Categories"); const [country, setCountry] = useState("All Countries"); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
useEffect(() => { fetchProfessionals(); }, []);
async function fetchProfessionals() { setLoading(true); setError("");
const { data, error } = await supabase
  .from("professional_profiles")
  .select("*")
  .eq("is_active", true)
  .order("created_at", { ascending: false });

if (error) {
  console.error("Error loading professionals:", error);
  setError("Unable to load professionals.");
  setProfessionals([]);
} else {
  setProfessionals(data || []);
}

setLoading(false);
}
const filteredProfessionals = professionals.filter((professional) => { const searchText = search.toLowerCase().trim();
const searchableText = [
  professional.full_name,
  professional.professional_title,
  professional.professional_category,
  professional.skills,
  professional.location,
  professional.city,
  professional.country,
]
  .filter(Boolean)
  .join(" ")
  .toLowerCase();

const searchMatch =
  searchText === "" || searchableText.includes(searchText);

const categoryMatch =
  category === "All Categories" ||
  professional.professional_category === category;

const countryMatch =
  country === "All Countries" ||
  professional.country === country;

return searchMatch && categoryMatch && countryMatch;
});
return ( <main style={{ minHeight: "100vh", padding: "30px 20px", background: "#f5f7fb", fontFamily: "Arial, sans-serif", }} > <div style={{ maxWidth: "1200px", margin: "0 auto", }} > <div style={{ marginBottom: "28px" }}> <h1 style={{ margin: 0, fontSize: "32px", color: "#111827", }} > Find a Professional 
<p
        style={{
          marginTop: "8px",
          color: "#6b7280",
          fontSize: "16px",
        }}
      >
        Find trusted professionals and skilled fundis for your jobs
        and services.
      </p>
    </div>

    <section
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "20px",
        marginBottom: "28px",
        boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(220px, 2fr) minmax(160px, 1fr) minmax(160px, 1fr)",
          gap: "14px",
        }}
      >
        <input
          type="text"
          placeholder="Search skill, service or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            border: "1px solid #d1d5db",
            borderRadius: "10px",
            fontSize: "15px",
            boxSizing: "border-box",
            outline: "none",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            border: "1px solid #d1d5db",
            borderRadius: "10px",
            fontSize: "15px",
            background: "#ffffff",
          }}
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
          style={{
            width: "100%",
            padding: "14px",
            border: "1px solid #d1d5db",
            borderRadius: "10px",
            fontSize: "15px",
            background: "#ffffff",
          }}
        >
          {countries.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </section>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "18px",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "22px",
          color: "#111827",
        }}
      >
        Professionals
      </h2>

      {!loading && (
        <span
          style={{
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          {filteredProfessionals.length} results
        </span>
      )}
    </div>

    {loading && (
      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          padding: "40px 20px",
          textAlign: "center",
          color: "#6b7280",
        }}
      >
        Loading professionals...
      </div>
    )}

    {!loading && error && (
      <div
        style={{
          background: "#fff1f2",
          color: "#be123c",
          borderRadius: "14px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        {error}
        <br />
        <button
          onClick={fetchProfessionals}
          style={{
            marginTop: "12px",
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            background: "#111827",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
    )}

    {!loading &&
      !error &&
      filteredProfessionals.length === 0 && (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "45px 20px",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          <h3
            style={{
              color: "#111827",
              marginBottom: "8px",
            }}
          >
            No professionals found
          </h3>

          <p style={{ margin: 0 }}>
            Try another search, category or country.
          </p>
        </div>
      )}

    {!loading &&
      !error &&
      filteredProfessionals.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredProfessionals.map((professional) => (
            <div
              key={professional.id}
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "22px",
                boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "18px",
                }}
              >
                {professional.profile_photo ? (
                  <img
                    src={professional.profile_photo}
                    alt={professional.full_name || "Professional"}
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "50%",
                      background: "#e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#4b5563",
                    }}
                  >
                    {(professional.full_name || "P")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}

                <div>
                  <h3
                    style={{
                      margin: 0,
                      color: "#111827",
                      fontSize: "18px",
                    }}
                  >
                    {professional.full_name ||
                      "Professional"}
                  </h3>

                  <div
                    style={{
                      marginTop: "5px",
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    {professional.professional_title ||
                      professional.professional_category ||
                      "Professional"}
                  </div>
                </div>
              </div>

              {professional.is_verified && (
                <div
                  style={{
                    display: "inline-block",
                    padding: "6px 10px",
                    marginBottom: "14px",
                    borderRadius: "20px",
                    background: "#ecfdf5",
                    color: "#047857",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  ✓ Verified Professional
                </div>
              )}

              <div
                style={{
                  marginBottom: "9px",
                  color: "#374151",
                  fontSize: "14px",
                }}
              >
                <strong>Category:</strong>{" "}
                {professional.professional_category ||
                  "Not specified"}
              </div>

              <div
                style={{
                  marginBottom: "9px",
                  color: "#374151",
                  fontSize: "14px",
                }}
              >
                <strong>Country:</strong>{" "}
                {professional.country || "Not specified"}
              </div>

              <div
                style={{
                  marginBottom: "9px",
                  color: "#374151",
                  fontSize: "14px",
                }}
              >
                <strong>Location:</strong>{" "}
                {professional.location ||
                  professional.city ||
                  "Not specified"}
              </div>

              <div
                style={{
                  marginBottom: "15px",
                  color: "#374151",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Skills:</strong>{" "}
                {professional.skills || "Not specified"}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "18px",
                }}
              >
                <span
                  style={{
                    padding: "6px 10px",
                    borderRadius: "20px",
                    background:
                      professional.availability ===
                      "Available"
                        ? "#eff6ff"
                        : "#f3f4f6",
                    color:
                      professional.availability ===
                      "Available"
                        ? "#2563eb"
                        : "#6b7280",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {professional.availability ||
                    "Availability not set"}
                </span>

                {professional.years_of_experience !==
                  null &&
                  professional.years_of_experience !==
                    undefined && (
                    <span
                      style={{
                        color: "#6b7280",
                        fontSize: "12px",
                      }}
                    >
                      {professional.years_of_experience}{" "}
                      years experience
                    </span>
                  )}
              </div>

              <button
                onClick={() =>
                  alert(
                    "Professional profile page will be connected next."
                  )
                }
                style={{
                  width: "100%",
                  padding: "13px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#111827",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}

    <div
      style={{
        marginTop: "35px",
        padding: "20px",
        background: "#ffffff",
        borderRadius: "14px",
        color: "#6b7280",
        fontSize: "14px",
        lineHeight: "1.6",
      }}
    >
      <strong style={{ color: "#111827" }}>
        Professional Verification
      </strong>
      <br />
      Professionals may be required to provide
      qualifications, certificates, skills and other
      supporting documents before approval on FUNDI UNIVERSE.
    </div>
  </div>
</main>
); }
