
"use client";
import { useState } from "react"; import { useRouter } from "next/navigation";
const countries = [ "Tanzania", "Kenya", "Uganda", "Rwanda", "United States", "United Kingdom", "United Arab Emirates", "India", "South Africa", "Germany", "France", "Canada", "Australia", ];
const services = [ "Construction", "Electrical", "Plumbing", "Carpentry", "Welding", "Mechanic", "Painting", "Cleaning", "Toilet Unblocking", "Toilet Cleaning", "Women's Salon & Hair Braiding", "Barbering", "IT & Technology", "Design & Creative", "Transport & Logistics", "Beauty & Personal Care", "Agriculture", "Other Services", ];
export default function Home() { const router = useRouter();
const [selectedCountry, setSelectedCountry] = useState("Tanzania"); const [selectedService, setSelectedService] = useState(""); const [location, setLocation] = useState("");
function handleSearch() { const params = new URLSearchParams();
if (selectedCountry) {
  params.set("country", selectedCountry);
}

if (selectedService) {
  params.set("service", selectedService);
}

if (location.trim()) {
  params.set("location", location.trim());
}

router.push(`/professionals?${params.toString()}`);
}
function selectService(service) { setSelectedService(service);
const params = new URLSearchParams();
params.set("country", selectedCountry);
params.set("service", service);

if (location.trim()) {
  params.set("location", location.trim());
}

router.push(`/professionals?${params.toString()}`);
}
return ( <main style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "Arial, sans-serif", }} > {/* HEADER */} <header style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "18px 5%", }} > <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", }} >  <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px", }} > Fundi Universe 
        <p
          style={{
            margin: "5px 0 0",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Find trusted professionals worldwide
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => router.push("/login")}
          style={{
            padding: "11px 20px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            background: "#ffffff",
            color: "#0f172a",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <button
          onClick={() => router.push("/signup")}
          style={{
            padding: "11px 20px",
            borderRadius: "10px",
            border: "none",
            background: "#0f172a",
            color: "#ffffff",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  </header>

  {/* HERO */}
  <section
    style={{
      padding: "70px 5% 55px",
      background:
        "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
    }}
  >
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "8px 15px",
          borderRadius: "999px",
          background: "#e2e8f0",
          color: "#334155",
          fontSize: "13px",
          fontWeight: "700",
          marginBottom: "18px",
        }}
      >
        GLOBAL PROFESSIONAL SERVICES PLATFORM
      </div>

      <h2
        style={{
          margin: "0 auto",
          maxWidth: "850px",
          fontSize: "clamp(38px, 7vw, 68px)",
          lineHeight: "1.05",
          letterSpacing: "-2px",
          fontWeight: "900",
        }}
      >
        Find a Professional
      </h2>

      <p
        style={{
          maxWidth: "700px",
          margin: "20px auto 35px",
          fontSize: "18px",
          lineHeight: "1.7",
          color: "#64748b",
        }}
      >
        One platform. Professionals worldwide. Find skilled and trusted
        professionals for your next job.
      </p>

      {/* SEARCH BOX */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "18px",
          padding: "20px",
          boxShadow: "0 12px 35px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "14px",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "13px",
                fontWeight: "700",
                color: "#475569",
              }}
            >
              Country
            </label>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "11px",
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                fontSize: "15px",
                outline: "none",
              }}
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div style={{ textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "13px",
                fontWeight: "700",
                color: "#475569",
              }}
            >
              Service
            </label>

            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "11px",
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                fontSize: "15px",
                outline: "none",
              }}
            >
              <option value="">Select a service</option>

              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div style={{ textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "13px",
                fontWeight: "700",
                color: "#475569",
              }}
            >
              Location
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or area"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px",
                borderRadius: "11px",
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                fontSize: "15px",
                outline: "none",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "end",
            }}
          >
            <button
              onClick={handleSearch}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "11px",
                border: "none",
                background: "#0f172a",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: "800",
                cursor: "pointer",
              }}
            >
              Search Professionals
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* SERVICES */}
  <section
    style={{
      padding: "65px 5%",
      background: "#ffffff",
    }}
  >
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "35px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "34px",
            fontWeight: "850",
          }}
        >
          Explore Services
        </h2>

        <p
          style={{
            margin: "12px auto 0",
            maxWidth: "650px",
            color: "#64748b",
            lineHeight: "1.6",
          }}
        >
          Select a service to find professionals who can help you.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "18px",
        }}
      >
        {services.map((service) => {
          const selected = selectedService === service;

          return (
            <button
              key={service}
              onClick={() => selectService(service)}
              style={{
                minHeight: "105px",
                padding: "20px",
                borderRadius: "16px",
                border: selected
                  ? "2px solid #0f172a"
                  : "1px solid #e2e8f0",
                background: selected ? "#f1f5f9" : "#ffffff",
                color: "#0f172a",
                textAlign: "left",
                cursor: "pointer",
                boxShadow: selected
                  ? "0 8px 20px rgba(15, 23, 42, 0.08)"
                  : "0 4px 14px rgba(15, 23, 42, 0.04)",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "800",
                  lineHeight: "1.4",
                }}
              >
                {service}
              </div>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "13px",
                  color: "#64748b",
                }}
              >
                Find professionals →
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </section>

  {/* HOW IT WORKS */}
  <section
    style={{
      padding: "70px 5%",
      background: "#f8fafc",
    }}
  >
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "34px",
            fontWeight: "850",
          }}
        >
          How It Works
        </h2>

        <p
          style={{
            margin: "12px auto 0",
            color: "#64748b",
          }}
        >
          Finding the right professional is simple.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {[
          {
            number: "01",
            title: "Choose a Service",
            text: "Select the service you need from our professional categories.",
          },
          {
            number: "02",
            title: "Find a Professional",
            text: "Search professionals by country, service and location.",
          },
          {
            number: "03",
            title: "Connect & Work",
            text: "Contact the professional, agree on the job and get it done.",
          },
        ].map((item) => (
          <div
            key={item.number}
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "28px",
              minHeight: "180px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "900",
                color: "#64748b",
                marginBottom: "15px",
              }}
            >
              {item.number}
            </div>

            <h3
              style={{
                margin: "0 0 10px",
                fontSize: "20px",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                lineHeight: "1.6",
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* GLOBAL PLATFORM */}
  <section
    style={{
      padding: "70px 5%",
      background: "#ffffff",
    }}
  >
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "34px",
          fontWeight: "850",
        }}
      >
        Professionals Worldwide
      </h2>

      <p
        style={{
          maxWidth: "720px",
          margin: "18px auto 0",
          color: "#64748b",
          lineHeight: "1.8",
          fontSize: "16px",
        }}
      >
        Fundi Universe connects customers with professionals across
        Tanzania, Africa and the rest of the world.
      </p>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {countries.map((country) => (
          <span
            key={country}
            style={{
              padding: "9px 14px",
              borderRadius: "999px",
              background: "#f1f5f9",
              border: "1px solid #e2e8f0",
              color: "#475569",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            {country}
          </span>
        ))}
      </div>
    </div>
  </section>

  {/* CTA */}
  <section
    style={{
      padding: "70px 5%",
      background: "#0f172a",
      color: "#ffffff",
    }}
  >
    <div
      style={{
        maxWidth: "850px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "38px",
          lineHeight: "1.2",
          fontWeight: "900",
        }}
      >
        Are You a Professional?
      </h2>

      <p
        style={{
          maxWidth: "650px",
          margin: "18px auto 28px",
          color: "#cbd5e1",
          lineHeight: "1.7",
        }}
      >
        Join Fundi Universe and connect with customers looking for your
        skills and services.
      </p>

      <button
        onClick={() => router.push("/signup")}
        style={{
          padding: "14px 25px",
          borderRadius: "11px",
          border: "none",
          background: "#ffffff",
          color: "#0f172a",
          fontWeight: "800",
          cursor: "pointer",
        }}
      >
        Join Fundi Universe
      </button>
    </div>
  </section>

  {/* FOOTER */}
  <footer
    style={{
      padding: "30px 5%",
      background: "#020617",
      color: "#94a3b8",
      textAlign: "center",
      fontSize: "13px",
    }}
  >
    <p style={{ margin: 0 }}>
      © {new Date().getFullYear()} Fundi Universe. All rights reserved.
    </p>
  </footer>
</main>
); }
