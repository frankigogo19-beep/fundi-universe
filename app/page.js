"use client";

import { useState } from "react";

const countries = [
  "Tanzania",
  "Kenya",
  "Uganda",
  "Rwanda",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "India",
  "South Africa",
  "Germany",
  "France",
  "Canada",
  "Australia",
];

const categories = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Mechanic",
  "Welder",
  "Mason",
  "Painter",
  "Cleaner",
  "Gardener",
  "IT Specialist",
  "Graphic Designer",
  "Web Developer",
  "Photographer",
  "Tailor",
  "AC Technician",
  "Phone Repair",
];

const opportunities = [
  {
    title: "International Business Opportunities",
    description:
      "Connect businesses and professionals across Tanzania, Africa, USA, UK, UAE, India and other markets.",
  },
  {
    title: "Professional Services",
    description:
      "Find skilled professionals for construction, technology, transport, maintenance and many other services.",
  },
  {
    title: "Global Collaboration",
    description:
      "Build connections between customers, professionals and businesses around the world.",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [service, setService] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (service) {
      params.set("service", service);
    }

    if (country) {
      params.set("country", country);
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    const query = params.toString();

    window.location.href = query
      ? `/professionals?${query}`
      : "/professionals";
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f9fc",
        color: "#172033",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e5eaf1",
          padding: "18px 6%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <a
          href="/"
          style={{
            fontSize: "23px",
            fontWeight: "800",
            color: "#1769aa",
            textDecoration: "none",
          }}
        >
          🌍 FUNDI UNIVERSE
        </a>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/professionals"
            style={{
              padding: "10px 14px",
              color: "#172033",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Find a Professional
          </a>

          <a
            href="/login"
            style={{
              padding: "10px 14px",
              color: "#172033",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Login
          </a>

          <a
            href="/signup"
            style={{
              padding: "11px 18px",
              borderRadius: "8px",
              background: "#172033",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Sign Up
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section
        style={{
          padding: "75px 6% 60px",
          textAlign: "center",
          background:
            "linear-gradient(180deg, #eef6ff 0%, #f7f9fc 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 15px",
              borderRadius: "30px",
              background: "#ffffff",
              border: "1px solid #d9e4f2",
              color: "#1769aa",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            🌍 One platform. Professionals worldwide.
          </div>

          <h1
            style={{
              fontSize: "clamp(38px, 7vw, 70px)",
              lineHeight: "1.08",
              margin: "0 0 22px",
              fontWeight: "800",
            }}
          >
            Find the right professional for any job, anywhere.
          </h1>

          <p
            style={{
              maxWidth: "720px",
              margin: "0 auto",
              fontSize: "19px",
              lineHeight: "1.7",
              color: "#667085",
            }}
          >
            FUNDI UNIVERSE connects customers with trusted professionals
            and skilled service providers across Tanzania, Africa and the
            world.
          </p>

          {/* SEARCH */}
          <div
            style={{
              maxWidth: "1000px",
              margin: "35px auto 0",
              padding: "18px",
              background: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0 10px 35px rgba(20,40,80,0.08)",
              display: "grid",
              gridTemplateColumns: "2fr 1.2fr 1.2fr 1.5fr auto",
              gap: "10px",
            }}
          >
            <input
              type="text"
              placeholder="What service do you need?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "15px",
                border: "1px solid #d5dce7",
                borderRadius: "9px",
                outline: "none",
                fontSize: "14px",
              }}
            />

            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              style={{
                padding: "15px",
                border: "1px solid #d5dce7",
                borderRadius: "9px",
                background: "#ffffff",
                fontSize: "14px",
              }}
            >
              <option value="">Service</option>
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
                padding: "15px",
                border: "1px solid #d5dce7",
                borderRadius: "9px",
                background: "#ffffff",
                fontSize: "14px",
              }}
            >
              <option value="">Country</option>
              {countries.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="City / Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                padding: "15px",
                border: "1px solid #d5dce7",
                borderRadius: "9px",
                outline: "none",
                fontSize: "14px",
              }}
            />

            <button
              type="button"
              onClick={handleSearch}
              style={{
                padding: "15px 22px",
                border: "none",
                borderRadius: "9px",
                background: "#1769aa",
                color: "#ffffff",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>

          {/* MAIN ACTIONS */}
          <div
            style={{
              marginTop: "28px",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <a
              href="/professionals"
              style={{
                padding: "14px 25px",
                borderRadius: "9px",
                background: "#1769aa",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              Find a Professional
            </a>

            <a
              href="/signup"
              style={{
                padding: "14px 25px",
                borderRadius: "9px",
                border: "1px solid #ccd5e2",
                background: "#ffffff",
                color: "#172033",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              Become a Professional
            </a>
          </div>

          {/* DASHBOARDS */}
          <div
            style={{
              marginTop: "25px",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <a
              href="/customers"
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                background: "#ffffff",
                border: "1px solid #d5dce7",
                color: "#172033",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Customer Dashboard
            </a>

            <a
              href="/dashboard"
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                background: "#ffffff",
                border: "1px solid #d5dce7",
                color: "#172033",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Professional Dashboard
            </a>

            <a
              href="/notifications"
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                background: "#ffffff",
                border: "1px solid #d5dce7",
                color: "#172033",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              🔔 Notifications
            </a>
          </div>
        </div>
      </section>

      {/* TRUST FEATURES */}
      <section
        style={{
          padding: "55px 6%",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            {
              icon: "✓",
              title: "Verified Professionals",
              text: "Professionals can provide certificates and evidence of their skills.",
            },
            {
              icon: "★",
              title: "Reviews & Ratings",
              text: "Customers can review their service experience.",
            },
            {
              icon: "🌍",
              title: "Worldwide Access",
              text: "Connect with professionals across countries and cities.",
            },
            {
              icon: "💳",
              title: "Global Payments",
              text: "Designed for international customers and professionals.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: "25px",
                border: "1px solid #e5eaf1",
                borderRadius: "14px",
                background: "#ffffff",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  marginBottom: "12px",
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: "18px",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#667085",
                  lineHeight: "1.6",
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR SERVICES */}
      <section
        style={{
          padding: "65px 6%",
          background: "#f7f9fc",
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "35px" }}>
            <h2
              style={{
                fontSize: "34px",
                margin: "0 0 12px",
              }}
            >
              Popular Services
            </h2>

            <p
              style={{
                color: "#667085",
                margin: 0,
              }}
            >
              Find professionals for many different types of work.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "15px",
            }}
          >
            {categories.map((category) => (
              <a
                key={category}
                href={`/professionals?service=${encodeURIComponent(
                  category
                )}`}
                style={{
                  display: "block",
                  background: "#ffffff",
                  padding: "24px 15px",
                  borderRadius: "14px",
                  border: "1px solid #e5eaf1",
                  textAlign: "center",
                  fontWeight: "700",
                  color: "#172033",
                  textDecoration: "none",
                  boxShadow: "0 5px 18px rgba(20,40,80,0.04)",
                }}
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL OPPORTUNITIES */}
      <section
        style={{
          padding: "70px 6%",
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
          <h2
            style={{
              fontSize: "34px",
              margin: "0 0 15px",
            }}
          >
            Global Opportunities
          </h2>

          <p
            style={{
              maxWidth: "750px",
              margin: "0 auto 40px",
              color: "#667085",
              lineHeight: "1.7",
            }}
          >
            Discover opportunities to connect people and businesses in
            Tanzania and East Africa with international markets and
            partners.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              textAlign: "left",
            }}
          >
            {opportunities.map((item) => (
              <div
                key={item.title}
                style={{
                  padding: "25px",
                  borderRadius: "14px",
                  border: "1px solid #e5eaf1",
                  background: "#f9fbfd",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 12px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#667085",
                    lineHeight: "1.6",
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <a
            href="/global-opportunities"
            style={{
              display: "inline-block",
              marginTop: "35px",
              padding: "15px 28px",
              borderRadius: "9px",
              background: "#1769aa",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Explore Global Opportunities
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          padding: "70px 6%",
          background: "#f7f9fc",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "34px",
              margin: "0 0 40px",
            }}
          >
            How FUNDI UNIVERSE Works
          </h2>

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
                number: "1",
                title: "Find",
                text: "Search for a professional by service, country or location.",
              },
              {
                number: "2",
                title: "Request",
                text: "Send a service request to the professional you choose.",
              },
              {
                number: "3",
                title: "Connect",
                text: "Communicate and agree on the job requirements.",
              },
              {
                number: "4",
                title: "Complete",
                text: "The professional completes the work and the customer can leave a review.",
              },
            ].map((item) => (
              <div
                key={item.number}
                style={{
                  padding: "28px",
                  background: "#ffffff",
                  borderRadius: "14px",
                  border: "1px solid #e5eaf1",
                }}
              >
                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    margin: "0 auto 15px",
                    borderRadius: "50%",
                    background: "#1769aa",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                  }}
                >
                  {item.number}
                </div>

                <h3 style={{ margin: "0 0 10px" }}>
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#667085",
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

      {/* PROFESSIONAL CTA */}
      <section
        style={{
          padding: "70px 6%",
          background: "#172033",
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
              fontSize: "38px",
              margin: "0 0 18px",
            }}
          >
            Are you a skilled professional?
          </h2>

          <p
            style={{
              color: "#d8deea",
              lineHeight: "1.7",
              fontSize: "17px",
            }}
          >
            Create your professional profile, showcase your skills and
            certificates, connect with customers and grow your reputation
            worldwide.
          </p>

          <a
            href="/signup"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "15px 30px",
              borderRadius: "9px",
              background: "#ffffff",
              color: "#172033",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Become a Professional
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#ffffff",
          padding: "50px 6% 25px",
          borderTop: "1px solid #e5eaf1",
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "35px",
          }}
        >
          <div>
            <h3
              style={{
                marginTop: 0,
                color: "#1769aa",
              }}
            >
              🌍 FUNDI UNIVERSE
            </h3>

            <p
              style={{
                color: "#667085",
                lineHeight: "1.7",
              }}
            >
              Connecting people with skilled professionals worldwide.
            </p>
          </div>

          <div>
            <h4>Platform</h4>

            <a
              href="/professionals"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Find a Professional
            </a>

            <a
              href="/signup"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Become a Professional
            </a>

            <a
              href="/global-opportunities"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Global Opportunities
            </a>
          </div>

          <div>
            <h4>Services</h4>

            <a
              href="/professionals"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Popular Services
            </a>

            <a
              href="/professionals"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Verified Professionals
            </a>

            <a
              href="/professionals"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Reviews & Ratings
            </a>
          </div>

          <div>
            <h4>Account</h4>

            <a
              href="/login"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Login
            </a>

            <a
              href="/signup"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Sign Up
            </a>

            <a
              href="/notifications"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Notifications
            </a>

            <a
              href="/customers"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Customer Dashboard
            </a>

            <a
              href="/dashboard"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Professional Dashboard
            </a>
          </div>
        </div>

        <div
          style={{
            marginTop: "40px",
            paddingTop: "20px",
            borderTop: "1px solid #e5eaf1",
            textAlign: "center",
            color: "#667085",
            fontSize: "14px",
          }}
        >
          © 2026 Fundi Universe. Connecting people with skilled
          professionals worldwide.
        </div>
      </footer>
    </main>
  );
}
