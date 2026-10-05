
"use client";
import { useState } from "react"; import { useRouter } from "next/navigation";
const countries = [ "Tanzania", "Kenya", "Uganda", "Rwanda", "United States", "United Kingdom", "United Arab Emirates", "India", "South Africa", "Germany", "France", "Canada", "Australia", ];
const services = [ "Construction", "Electrical", "Plumbing", "Carpentry", "Welding", "Mechanic", "Painting", "Cleaning", "Toilet Unblocking", "Toilet Cleaning", "Women's Salon & Hair Braiding", "Barbering", "IT & Technology", "Design & Creative", "Transport & Logistics", "Beauty & Personal Care", "Agriculture", "Other Services", ];
export default function Home() { const router = useRouter();
const [country, setCountry] = useState("Tanzania"); const [service, setService] = useState(""); const [location, setLocation] = useState("");
const searchProfessionals = () => { const params = new URLSearchParams();
params.set("country", country);

if (service) {
  params.set("service", service);
}

if (location.trim()) {
  params.set("location", location.trim());
}

router.push("/professionals?" + params.toString());
};
return ( <main style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "Arial, sans-serif", }} > <header style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "18px 5%", }} > <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", flexWrap: "wrap", }} >  <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "800", }} > Fundi Universe 
        <p
          style={{
            margin: "6px 0 0",
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

  <section
    style={{
      padding: "70px 5% 55px",
      background: "#ffffff",
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

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "20px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "18px",
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
              }}
            >
              Country
            </label>

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px",
                borderRadius: "11px",
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                fontSize: "15px",
              }}
            >
              {countries.map((item) => (
                <option key={item} value={item}>
                  {item}
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
              }}
            >
              Service
            </label>

            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px",
                borderRadius: "11px",
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                fontSize: "15px",
              }}
            >
              <option value="">Select a service</option>

              {services.map((item) => (
                <option key={item} value={item}>
                  {item}
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
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <button
              onClick={searchProfessionals}
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

  <section
    style={{
      padding: "65px 5%",
      background: "#f8fafc",
    }}
  >
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
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
        {services.map((item) => {
          const selected = service === item;

          return (
            <button
              key={item}
              onClick={() => setService(item)}
              style={{
                minHeight: "105px",
                padding: "20px",
                borderRadius: "16px",
                border: selected
                  ? "2px solid #0f172a"
                  : "1px solid #e2e8f0",
                background: selected ? "#e2e8f0" : "#ffffff",
                color: "#0f172a",
                textAlign: "left",
                cursor: "pointer",
                boxShadow:
                  "0 4px 14px rgba(15, 23, 42, 0.05)",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "800",
                }}
              >
                {item}
              </div>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "13px",
                  color: "#64748b",
                }}
              >
                {selected
                  ? "Selected ✓"
                  : "Select this service →"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </section>

  <section
    style={{
      padding: "70px 5%",
      background: "#ffffff",
    }}
  >
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
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
            marginTop: "12px",
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
        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "28px",
          }}
        >
          <strong>01</strong>

          <h3 style={{ margin: "15px 0 10px" }}>
            Choose a Service
          </h3>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              lineHeight: "1.6",
            }}
          >
            Select the service you need from our professional
            categories.
          </p>
        </div>

        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "28px",
          }}
        >
          <strong>02</strong>

          <h3 style={{ margin: "15px 0 10px" }}>
            Find a Professional
          </h3>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              lineHeight: "1.6",
            }}
          >
            Search professionals by country, service and location.
          </p>
        </div>

        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "28px",
          }}
        >
          <strong>03</strong>

          <h3 style={{ margin: "15px 0 10px" }}>
            Connect & Work
          </h3>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              lineHeight: "1.6",
            }}
          >
            Contact the professional, agree on the job and get it
            done.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section
    style={{
      padding: "70px 5%",
      background: "#f8fafc",
      textAlign: "center",
    }}
  >
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
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
          maxWidth: "700px",
          margin: "18px auto",
          color: "#64748b",
          lineHeight: "1.7",
        }}
      >
        Fundi Universe connects customers with professionals across
        Tanzania, Africa and the rest of the world.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "25px",
        }}
      >
        {countries.map((item) => (
          <span
            key={item}
            style={{
              padding: "9px 14px",
              borderRadius: "999px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              color: "#475569",
              fontSize: "13px",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  </section>

  <section
    style={{
      padding: "70px 5%",
      background: "#0f172a",
      color: "#ffffff",
      textAlign: "center",
    }}
  >
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "38px",
          fontWeight: "900",
        }}
      >
        Are You a Professional?
      </h2>

      <p
        style={{
          margin: "18px auto 28px",
          maxWidth: "650px",
          color: "#cbd5e1",
          lineHeight: "1.7",
        }}
      >
        Join Fundi Universe and connect with customers looking for
        your skills and services.
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
