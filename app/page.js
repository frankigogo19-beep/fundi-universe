"use client";

import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("Tanzania");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");

  const countries = [
    "Tanzania",
    "Kenya",
    "Uganda",
    "Rwanda",
    "South Africa",
    "United States",
    "United Kingdom",
    "United Arab Emirates",
    "India",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Other Country",
  ];

  const categories = [
    "Plumbing",
    "Electrical",
    "Construction",
    "Carpentry",
    "Painting",
    "Mechanic",
    "Cleaning",
    "IT & Technology",
    "Engineering",
    "Accounting",
    "Procurement",
    "Logistics",
    "Consulting",
    "AC & Refrigeration",
    "Welding",
    "Other Services",
  ];

  const opportunities = [
    {
      icon: "🌍",
      title: "Global Opportunities",
      text: "Connect with people and businesses across countries for professional and business opportunities.",
    },
    {
      icon: "🤝",
      title: "Business Connections",
      text: "Discover opportunities to connect businesses, professionals and customers internationally.",
    },
    {
      icon: "💼",
      title: "Professional Opportunities",
      text: "Find international projects, service opportunities and professional connections.",
    },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (service) params.set("service", service);
    if (country) params.set("country", country);
    if (location) params.set("location", location);

    window.location.href = `/professionals?${params.toString()}`;
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        background: "#f5f8fc",
        color: "#172033",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          background: "#ffffff",
          padding: "18px 6%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          borderBottom: "1px solid #e5eaf1",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: "800",
            }}
          >
            🌍 FUNDI <span style={{ color: "#f28c28" }}>UNIVERSE</span>
          </h2>

          <p
            style={{
              margin: "4px 0 0",
              fontSize: "11px",
              color: "#687386",
            }}
          >
            Trusted professionals anywhere in the world
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <a
            href="/login"
            style={{
              background: "transparent",
              border: "none",
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: "600",
              color: "#172033",
              textDecoration: "none",
            }}
          >
            Login
          </a>

          <a
            href="/signup"
            style={{
              display: "inline-block",
              padding: "11px 18px",
              border: "none",
              borderRadius: "8px",
              background: "#172033",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Sign Up
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          padding: "75px 6% 65px",
          textAlign: "center",
          background:
            "linear-gradient(135deg, #ffffff 0%, #eef6ff 100%)",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 14px",
            borderRadius: "30px",
            background: "#e8f2ff",
            color: "#1769aa",
            fontSize: "13px",
            fontWeight: "700",
            marginBottom: "18px",
          }}
        >
          🌍 GLOBAL PROFESSIONAL SERVICES PLATFORM
        </div>

        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 60px)",
            maxWidth: "950px",
            margin: "0 auto 20px",
            lineHeight: "1.08",
            fontWeight: "800",
          }}
        >
          Find the right professional for any job, anywhere.
        </h1>

        <p
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            fontSize: "18px",
            lineHeight: "1.7",
            color: "#596579",
          }}
        >
          Fundi Universe connects customers, professionals and businesses
          across countries for trusted services, projects and professional
          opportunities.
        </p>

        {/* SEARCH AREA */}
        <div
          style={{
            maxWidth: "1050px",
            margin: "38px auto 0",
            background: "#ffffff",
            padding: "15px",
            borderRadius: "16px",
            boxShadow: "0 12px 35px rgba(20,40,80,0.10)",
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1fr auto",
            gap: "10px",
          }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="What service do you need?"
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "10px",
              border: "1px solid #d5dce7",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />

          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "10px",
              border: "1px solid #d5dce7",
              fontSize: "15px",
              background: "#ffffff",
            }}
          >
            <option value="">Select service</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "10px",
              border: "1px solid #d5dce7",
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

          <button
            onClick={handleSearch}
            style={{
              padding: "16px 25px",
              border: "none",
              borderRadius: "10px",
              background: "#1769aa",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Search
          </button>
        </div>

        {/* LOCATION */}
        <div
          style={{
            maxWidth: "1050px",
            margin: "12px auto 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city, region or area"
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "14px 16px",
              borderRadius: "10px",
              border: "1px solid #d5dce7",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* MAIN ACTIONS */}
        <div style={{ marginTop: "25px" }}>
          <a
            href="/professionals"
            style={{
              display: "inline-block",
              margin: "5px",
              padding: "14px 25px",
              borderRadius: "9px",
              border: "none",
              background: "#f28c28",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Find a Professional
          </a>

          <a
            href="/signup"
            style={{
              display: "inline-block",
              margin: "5px",
              padding: "14px 25px",
              borderRadius: "9px",
              border: "1px solid #ccd5e2",
              background: "#ffffff",
              color: "#172033",
              cursor: "pointer",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Become a Professional
          </a>
        </div>

        {/* DASHBOARD LINKS */}
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
      </section>

      {/* TRUST FEATURES */}
      <section
        style={{
          padding: "35px 6%",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px" }}>✅</div>
            <h3>Verified Professionals</h3>
            <p style={{ color: "#667085" }}>
              Professionals can provide certificates, qualifications and
              evidence of their skills where verification is required.
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px" }}>⭐</div>
            <h3>Reviews & Ratings</h3>
            <p style={{ color: "#667085" }}>
              Customers can review their service experience and view
              professional ratings.
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px" }}>🌎</div>
            <h3>Worldwide Access</h3>
            <p style={{ color: "#667085" }}>
              Search for professionals and opportunities across countries.
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px" }}>💳</div>
            <h3>Global Payments</h3>
            <p style={{ color: "#667085" }}>
              The platform is designed to support payments in different
              currencies and countries.
            </p>
          </div>
        </div>
      </section>

      {/* POPULAR SERVICES */}
      <section
        style={{
          padding: "65px 6%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "32px",
            marginBottom: "10px",
          }}
        >
          Popular Services
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#667085",
            marginBottom: "35px",
          }}
        >
          Find skilled professionals across many service categories.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "15px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {categories.map((category) => (
            <a
              key={category}
              href={`/professionals?service=${encodeURIComponent(category)}`}
              style={{
                display: "block",
                background: "#ffffff",
                padding: "25px 15px",
                borderRadius: "14px",
                textAlign: "center",
                border: "1px solid #e5eaf1",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 5px 18px rgba(20,40,80,0.04)",
                color: "#172033",
                textDecoration: "none",
              }}
            >
              {category}
            </a>
          ))}
        </div>
      </section>

      {/* GLOBAL OPPORTUNITIES */}
      <section
        style={{
          padding: "70px 6%",
          background: "#172033",
          color: "#ffffff",
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
              borderRadius: "30px",
              background: "#26334d",
              fontSize: "13px",
              fontWeight: "700",
              marginBottom: "15px",
            }}
          >
            🌍 GLOBAL OPPORTUNITIES
          </div>

          <h2
            style={{
              fontSize: "36px",
              margin: "0 0 15px",
            }}
          >
            Connect Beyond Borders
          </h2>

          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto 40px",
              color: "#c8d1df",
              lineHeight: "1.7",
            }}
          >
            Fundi Universe creates opportunities for people and businesses in
            Tanzania and East Africa to connect with professionals and
            businesses in the USA, UK, UAE, India, Europe, Africa and other
            countries.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {opportunities.map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#202b40",
                  padding: "28px",
                  borderRadius: "14px",
                  textAlign: "left",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p
                  style={{
                    color: "#c8d1df",
                    lineHeight: "1.6",
                  }}
                >
                  {item.text}
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
              border: "none",
              borderRadius: "9px",
              background: "#f28c28",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Explore Global Opportunities
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          background: "#ffffff",
          padding: "70px 6%",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "32px" }}>How Fundi Universe Works</h2>

        <p
          style={{
            color: "#667085",
            marginBottom: "40px",
          }}
        >
          A simple way to find, connect and work with professionals.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "25px",
            maxWidth: "1050px",
            margin: "0 auto",
          }}
        >
          <div>
            <div style={{ fontSize: "35px" }}>🔎</div>
            <h3>1. Search</h3>
            <p>
              Select your country, service and location to find suitable
              professionals.
            </p>
          </div>

          <div>
            <div style={{ fontSize: "35px" }}>👷</div>
            <h3>2. Choose</h3>
            <p>
              Compare professional skills, experience, verification and
              customer reviews.
            </p>
          </div>

          <div>
            <div style={{ fontSize: "35px" }}>🤝</div>
            <h3>3. Connect</h3>
            <p>
              Send a request, communicate with the professional and arrange
              the service.
            </p>
          </div>

          <div>
            <div style={{ fontSize: "35px" }}>⭐</div>
            <h3>4. Review</h3>
            <p>
              Complete the service and share your experience through a review.
            </p>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL CTA */}
      <section
        style={{
          padding: "75px 6%",
          textAlign: "center",
          background: "#eef6ff",
        }}
      >
        <h2 style={{ fontSize: "34px" }}>
          Are you a skilled professional?
        </h2>

        <p
          style={{
            maxWidth: "700px",
            margin: "15px auto 25px",
            lineHeight: "1.7",
            color: "#596579",
          }}
        >
          Create your professional profile, list your skills and services,
          provide qualifications or certificates when verification is
          required, receive customer requests and build your professional
          reputation.
        </p>

        <a
          href="/signup"
          style={{
            display: "inline-block",
            padding: "15px 30px",
            border: "none",
            borderRadius: "9px",
            background: "#1769aa",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: "700",
            textDecoration: "none",
          }}
        >
          Become a Professional
        </a>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#ffffff",
          padding: "35px 6%",
          borderTop: "1px solid #e5eaf1",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "30px",
          }}
        >
          <div>
            <h3>🌍 FUNDI UNIVERSE</h3>
            <p style={{ color: "#667085", lineHeight: "1.6" }}>
              Connecting people, professionals and businesses around the
              world.
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
            <p style={{ color: "#667085" }}>Popular Services</p>
            <p style={{ color: "#667085" }}>Verified Professionals</p>
            <p style={{ color: "#667085" }}>Reviews & Ratings</p>
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
            marginTop: "30px",
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
