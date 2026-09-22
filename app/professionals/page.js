9
"use client";
import { useState } from "react";
const categories = [ "All Categories", "Construction", "Electrical", "Plumbing", "Carpentry", "Welding", "Mechanic", "Painting", "Cleaning", "IT & Technology", "Design & Creative", "Transport & Logistics", "Beauty & Personal Care", "Agriculture", "Other Services", ];
const countries = [ "All Countries", "Tanzania", "Kenya", "Uganda", "Rwanda", "United States", "United Kingdom", "United Arab Emirates", "India", "South Africa", "Nigeria", "Other", ];
const sampleProfessionals = [ { name: "Professional Account", category: "Construction", country: "Tanzania", location: "Dar es Salaam", skills: "Building, Masonry, Renovation", verified: true, available: true, }, { name: "Professional Account", category: "Electrical", country: "Tanzania", location: "Arusha", skills: "Electrical Installation, Wiring, Maintenance", verified: true, available: true, }, { name: "Professional Account", category: "IT & Technology", country: "United Kingdom", location: "London", skills: "Web Development, Software, IT Support", verified: true, available: false, }, ];
export default function ProfessionalsPage() { const [search, setSearch] = useState(""); const [category, setCategory] = useState("All Categories"); const [country, setCountry] = useState("All Countries");
const filteredProfessionals = sampleProfessionals.filter((professional) => { const searchMatch = professional.name.toLowerCase().includes(search.toLowerCase()) || professional.skills.toLowerCase().includes(search.toLowerCase()) || professional.location.toLowerCase().includes(search.toLowerCase());
const categoryMatch =
  category === "All Categories" ||
  professional.category === category;

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
        Find trusted professionals and skilled fundis for your job or
        service.
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
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "14px",
        }}
      >
        <input
          type="text"
          placeholder="Search by skill, service or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            border: "1px solid #d1d5db",
            borderRadius: "10px",
            fontSize: "15px",
            boxSizing: "border-box",
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
            background: "#fff",
          }}
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
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
            background: "#fff",
          }}
        >
          {countries.map((item) => (
            <option key={item}>{item}</option>
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
        Available Professionals
      </h2>

      <span
        style={{
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        {filteredProfessionals.length} results
      </span>
    </div>

    {filteredProfessionals.length === 0 ? (
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "40px 20px",
          textAlign: "center",
          color: "#6b7280",
        }}
      >
        No professionals found. Try another search or filter.
      </div>
    ) : (
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProfessionals.map((professional, index) => (
          <div
            key={index}
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
                P
              </div>

              <div>
                <h3
                  style={{
                    margin: 0,
                    color: "#111827",
                    fontSize: "18px",
                  }}
                >
                  {professional.name}
                </h3>

                <div
                  style={{
                    marginTop: "5px",
                    color: "#6b7280",
                    fontSize: "14px",
                  }}
                >
                  {professional.category}
                </div>
              </div>
            </div>

            <div
              style={{
                marginBottom: "10px",
                color: "#374151",
                fontSize: "14px",
              }}
            >
              <strong>Country:</strong> {professional.country}
            </div>

            <div
              style={{
                marginBottom: "10px",
                color: "#374151",
                fontSize: "14px",
              }}
            >
              <strong>Location:</strong> {professional.location}
            </div>

            <div
              style={{
                marginBottom: "16px",
                color: "#374151",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              <strong>Skills:</strong> {professional.skills}
            </div>

            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "18px",
              }}
            >
              {professional.verified && (
                <span
                  style={{
                    padding: "6px 10px",
                    borderRadius: "20px",
                    background: "#ecfdf5",
                    color: "#047857",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  ✓ Verified
                </span>
              )}

              <span
                style={{
                  padding: "6px 10px",
                  borderRadius: "20px",
                  background: professional.available
                    ? "#eff6ff"
                    : "#f3f4f6",
                  color: professional.available
                    ? "#2563eb"
                    : "#6b7280",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {professional.available
                  ? "Available"
                  : "Currently Busy"}
              </span>
            </div>

            <button
              onClick={() =>
                alert(
                  "Professional profile and job request will be connected to the FUNDI UNIVERSE system."
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
        FUNDI UNIVERSE Professional Verification
      </strong>
      <br />
      Professionals can be required to provide qualifications,
      certificates, skills and other supporting documents before being
      approved on the platform.
    </div>
  </div>
</main>
); }
