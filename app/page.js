"use client";

import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  const categories = [
    "Plumbing",
    "Electrical",
    "Construction",
    "Carpentry",
    "Painting",
    "Mechanic",
    "Cleaning",
    "IT & Technology",
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        background: "#f7f9fc",
        color: "#172033",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          background: "#ffffff",
          padding: "18px 7%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e8ebf0",
        }}
      >
        <h2 style={{ margin: 0 }}>🌍 FUNDI UNIVERSE</h2>

        <div>
          <button
            style={{
              background: "transparent",
              border: "none",
              padding: "10px 15px",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <button
            style={{
              padding: "11px 18px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          padding: "80px 7%",
          textAlign: "center",
          background: "#ffffff",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            letterSpacing: "1px",
            marginBottom: "15px",
          }}
        >
          YOUR GLOBAL SERVICE MARKETPLACE
        </p>

        <h1
          style={{
            fontSize: "48px",
            maxWidth: "850px",
            margin: "0 auto 20px",
            lineHeight: "1.1",
          }}
        >
          Find the right professional for any job, anywhere.
        </h1>

        <p
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            fontSize: "18px",
            lineHeight: "1.6",
          }}
        >
          Fundi Universe connects customers with trusted skilled
          professionals for services, repairs, construction, technology,
          maintenance and more.
        </p>

        {/* SEARCH */}
        <div
          style={{
            maxWidth: "750px",
            margin: "35px auto 0",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="What service do you need?"
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid #ccd2dc",
              fontSize: "16px",
            }}
          />

          <input
            placeholder="City or location"
            style={{
              flex: 1,
              minWidth: "200px",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid #ccd2dc",
              fontSize: "16px",
            }}
          />

          <button
            style={{
              padding: "16px 25px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Search
          </button>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ marginTop: "25px" }}>
          <button
            style={{
              margin: "5px",
              padding: "14px 24px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Find a Fundi
          </button>

          <button
            style={{
              margin: "5px",
              padding: "14px 24px",
              borderRadius: "8px",
              border: "1px solid #ccd2dc",
              background: "#ffffff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Become a Professional
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: "60px 7%" }}>
        <h2 style={{ textAlign: "center", fontSize: "30px" }}>
          Popular Services
        </h2>

        <p style={{ textAlign: "center", marginBottom: "35px" }}>
          Find skilled professionals across many service categories.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "15px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {categories.map((category) => (
            <div
              key={category}
              style={{
                background: "#ffffff",
                padding: "25px",
                borderRadius: "12px",
                textAlign: "center",
                border: "1px solid #e8ebf0",
                fontWeight: "bold",
              }}
            >
              {category}
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          background: "#ffffff",
          padding: "70px 7%",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "30px" }}>How Fundi Universe Works</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "25px",
            maxWidth: "1000px",
            margin: "40px auto 0",
          }}
        >
          <div>
            <h3>1. Search</h3>
            <p>
              Tell us what service you need and where you need it.
            </p>
          </div>

          <div>
            <h3>2. Choose</h3>
            <p>
              Compare professionals based on skills, location and reviews.
            </p>
          </div>

          <div>
            <h3>3. Hire</h3>
            <p>
              Contact the professional and arrange your service.
            </p>
          </div>

          <div>
            <h3>4. Review</h3>
            <p>
              Complete the job and share your experience with the community.
            </p>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL CTA */}
      <section
        style={{
          padding: "70px 7%",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "32px" }}>
          Are you a skilled professional?
        </h2>

        <p
          style={{
            maxWidth: "650px",
            margin: "15px auto 25px",
            lineHeight: "1.6",
          }}
        >
          Create your professional profile, showcase your skills and connect
          with customers looking for your services.
        </p>

        <button
          style={{
            padding: "15px 28px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Join Fundi Universe
        </button>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#ffffff",
          padding: "30px 7%",
          textAlign: "center",
          borderTop: "1px solid #e8ebf0",
        }}
      >
        <p style={{ margin: 0 }}>
          © 2026 Fundi Universe. Connecting people with skilled professionals
          worldwide.
        </p>
      </footer>
    </main>
  );
}

