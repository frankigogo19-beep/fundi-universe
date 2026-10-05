"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

const services = [
  "Construction",
  "Electrical",
  "Plumbing",
  "Carpentry",
  "Welding",
  "Mechanic",
  "Painting",
  "Cleaning",
  "Toilet Unblocking",
  "Toilet Cleaning",
  "Women's Salon & Hair Braiding",
  "Barbering",
  "IT & Technology",
  "Design & Creative",
  "Transport & Logistics",
  "Beauty & Personal Care",
  "Agriculture",
  "Other Services",
];

const popularServices = [
  {
    name: "Construction",
    description: "Builders, masons and construction professionals",
    icon: "🏗️",
  },
  {
    name: "Electrical",
    description: "Electricians and electrical services",
    icon: "⚡",
  },
  {
    name: "Plumbing",
    description: "Plumbers and water system professionals",
    icon: "🔧",
  },
  {
    name: "Carpentry",
    description: "Furniture, woodwork and carpentry",
    icon: "🪚",
  },
  {
    name: "Mechanic",
    description: "Vehicle repair and mechanical services",
    icon: "🚗",
  },
  {
    name: "Cleaning",
    description: "Home, office and commercial cleaning",
    icon: "🧹",
  },
  {
    name: "Women's Salon & Hair Braiding",
    description: "Salon, beauty and hair braiding services",
    icon: "💇‍♀️",
  },
  {
    name: "Toilet Unblocking",
    description: "Professional toilet and drainage unblocking",
    icon: "🚽",
  },
];

const countriesDisplay = [
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

export default function Home() {
  const router = useRouter();

  const [country, setCountry] = useState("Tanzania");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  const searchProfessionals = () => {
    const params = new URLSearchParams();

    params.set("country", country);

    if (service) {
      params.set("service", service);
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    router.push("/professionals?" + params.toString());
  };

  const selectService = (item) => {
    setService(item);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "16px 5%",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {/* LOGO */}
          <button
            onClick={() => router.push("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, #0f172a, #334155)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: "900",
                boxShadow:
                  "0 6px 18px rgba(15, 23, 42, 0.18)",
              }}
            >
              FU
            </div>

            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: "21px",
                  fontWeight: "900",
                  lineHeight: 1,
                }}
              >
                Fundi Universe
              </div>

              <div
                style={{
                  marginTop: "5px",
                  fontSize: "12px",
                  color: "#64748b",
                }}
              >
                Professionals worldwide
              </div>
            </div>
          </button>

          {/* HEADER BUTTONS */}
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
          padding: "75px 5% 65px",
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
              fontSize: "12px",
              fontWeight: "800",
              letterSpacing: "0.5px",
              marginBottom: "18px",
            }}
          >
            GLOBAL PROFESSIONAL SERVICES PLATFORM
          </div>

          <h1
            style={{
              margin: "0 auto",
              maxWidth: "850px",
              fontSize: "clamp(40px, 7vw, 68px)",
              lineHeight: "1.04",
              fontWeight: "900",
              letterSpacing: "-2px",
            }}
          >
            Find a Professional
          </h1>

          <p
            style={{
              maxWidth: "720px",
              margin: "20px auto 38px",
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
              maxWidth: "1050px",
              margin: "0 auto",
              padding: "22px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              boxShadow:
                "0 15px 40px rgba(15, 23, 42, 0.09)",
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "15px",
              }}
            >
              {/* COUNTRY */}
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "13px",
                    fontWeight: "800",
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
                    outline: "none",
                  }}
                >
                  {countries.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* SERVICE */}
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "13px",
                    fontWeight: "800",
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
                    outline: "none",
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

              {/* LOCATION */}
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "13px",
                    fontWeight: "800",
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

              {/* SEARCH */}
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

          {/* SMALL NOTE */}
          <p
            style={{
              marginTop: "16px",
              color: "#94a3b8",
              fontSize: "13px",
            }}
          >
            Search first to discover professionals matching your needs.
          </p>
        </div>
      </section>

      {/* EXPLORE SERVICES */}
      <section
        style={{
          padding: "70px 5%",
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
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: "800",
                color: "#64748b",
                marginBottom: "10px",
              }}
            >
              CHOOSE WHAT YOU NEED
            </div>

            <h2
              style={{
                margin: 0,
                fontSize: "36px",
                fontWeight: "900",
              }}
            >
              Explore Services
            </h2>

            <p
              style={{
                maxWidth: "650px",
                margin: "12px auto 0",
                color: "#64748b",
                lineHeight: "1.7",
              }}
            >
              Select a service to search for professionals who can help you.
              Professionals are shown only after you perform a search.
            </p>
          </div>

          {/* SERVICE SELECTABLE BOXES */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "18px",
            }}
          >
            {services.map((item) => {
              const selected = service === item;

              return (
                <button
                  key={item}
                  onClick={() => selectService(item)}
                  style={{
                    minHeight: "115px",
                    padding: "21px",
                    borderRadius: "17px",
                    border: selected
                      ? "2px solid #0f172a"
                      : "1px solid #e2e8f0",
                    background: selected
                      ? "#e2e8f0"
                      : "#ffffff",
                    color: "#0f172a",
                    textAlign: "left",
                    cursor: "pointer",
                    boxShadow:
                      "0 5px 16px rgba(15, 23, 42, 0.05)",
                    transition: "0.2s",
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
                      marginTop: "10px",
                      fontSize: "13px",
                      color: "#64748b",
                      fontWeight: selected ? "700" : "500",
                    }}
                  >
                    {selected
                      ? "✓ Selected"
                      : "Select this service →"}
                  </div>
                </button>
              );
            })}
          </div>

          {/* SEARCH FROM SELECTED SERVICE */}
          {service && (
            <div
              style={{
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              <button
                onClick={searchProfessionals}
                style={{
                  padding: "14px 26px",
                  borderRadius: "11px",
                  border: "none",
                  background: "#0f172a",
                  color: "#ffffff",
                  fontWeight: "800",
                  cursor: "pointer",
                }}
              >
                Search {service} Professionals
              </button>
            </div>
          )}
        </div>
      </section>

      {/* POPULAR SERVICES */}
      <section
        style={{
          padding: "70px 5%",
          background: "#ffffff",
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
              marginBottom: "40px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "34px",
                fontWeight: "900",
              }}
            >
              Popular Services
            </h2>

            <p
              style={{
                marginTop: "12px",
                color: "#64748b",
              }}
            >
              Start your search by selecting the service you need.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "18px",
            }}
          >
            {popularServices.map((item) => (
              <button
                key={item.name}
                onClick={() => selectService(item.name)}
                style={{
                  padding: "25px",
                  borderRadius: "17px",
                  border: "1px solid #e2e8f0",
                  background: "#ffffff",
                  textAlign: "left",
                  cursor: "pointer",
                  boxShadow:
                    "0 5px 18px rgba(15, 23, 42, 0.05)",
                }}
              >
                <div
                  style={{
                    fontSize: "30px",
                    marginBottom: "15px",
                  }}
                >
                  {item.icon}
                </div>

                <div
                  style={{
                    fontSize: "17px",
                    fontWeight: "800",
                  }}
                >
                  {item.name}
                </div>

                <div
                  style={{
                    marginTop: "9px",
                    color: "#64748b",
                    fontSize: "13px",
                    lineHeight: "1.6",
                  }}
                >
                  {item.description}
                </div>

                <div
                  style={{
                    marginTop: "16px",
                    fontSize: "13px",
                    fontWeight: "800",
                  }}
                >
                  Select service →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST FEATURES */}
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
                fontWeight: "900",
              }}
            >
              Why Fundi Universe?
            </h2>

            <p
              style={{
                marginTop: "12px",
                color: "#64748b",
              }}
            >
              Built to make finding professional services easier.
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
                padding: "28px",
                borderRadius: "17px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ fontSize: "30px" }}>✓</div>

              <h3 style={{ margin: "15px 0 10px" }}>
                Verified Professionals
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.6",
                }}
              >
                Discover professionals through the Fundi Universe
                search platform.
              </p>
            </div>

            <div
              style={{
                padding: "28px",
                borderRadius: "17px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ fontSize: "30px" }}>★</div>

              <h3 style={{ margin: "15px 0 10px" }}>
                Reviews & Ratings
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.6",
                }}
              >
                A platform designed to help customers make better
                service decisions.
              </p>
            </div>

            <div
              style={{
                padding: "28px",
                borderRadius: "17px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ fontSize: "30px" }}>🌍</div>

              <h3 style={{ margin: "15px 0 10px" }}>
                Worldwide Access
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.6",
                }}
              >
                Search for professional services across multiple
                countries.
              </p>
            </div>

            <div
              style={{
                padding: "28px",
                borderRadius: "17px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ fontSize: "30px" }}>🔒</div>

              <h3 style={{ margin: "15px 0 10px" }}>
                Simple & Secure
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.6",
                }}
              >
                Search for the service you need without exposing
                professionals on the public homepage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          padding: "75px 5%",
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
              marginBottom: "45px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "35px",
                fontWeight: "900",
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
                borderRadius: "17px",
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
                borderRadius: "17px",
                padding: "28px",
              }}
            >
              <strong>02</strong>

              <h3 style={{ margin: "15px 0 10px" }}>
                Search
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.6",
                }}
              >
                Choose your country and location, then search for
                professionals.
              </p>
            </div>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "17px",
                padding: "28px",
              }}
            >
              <strong>03</strong>

              <h3 style={{ margin: "15px 0 10px" }}>
                Connect
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.6",
                }}
              >
                Connect with the professional that matches your
                requirements.
              </p>
            </div>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "17px",
                padding: "28px",
              }}
            >
              <strong>04</strong>

              <h3 style={{ margin: "15px 0 10px" }}>
                Work & Review
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.6",
                }}
              >
                Agree on the work, complete the job and share your
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL OPPORTUNITIES */}
      <section
        style={{
          padding: "75px 5%",
          background: "#f8fafc",
        }}
      >
        <div
          style={{
            maxWidth: "1050px",
            margin: "0 auto",
            padding: "45px 30px",
            borderRadius: "22px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: "800",
              color: "#64748b",
              marginBottom: "12px",
            }}
          >
            BEYOND PROFESSIONAL SERVICES
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: "36px",
              fontWeight: "900",
            }}
          >
            Global Opportunities
          </h2>

          <p
            style={{
              maxWidth: "700px",
              margin: "18px auto 28px",
              color: "#64748b",
              lineHeight: "1.7",
            }}
          >
            Explore opportunities, skills, services and connections
            across Africa and the world through Fundi Universe.
          </p>

          <button
            onClick={() => router.push("/signup")}
            style={{
              padding: "13px 24px",
              borderRadius: "11px",
              border: "none",
              background: "#0f172a",
              color: "#ffffff",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            Explore Opportunities
          </button>
        </div>
      </section>

      {/* PROFESSIONAL CTA */}
      <section
        style={{
          padding: "75px 5%",
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
              fontSize: "clamp(32px, 5vw, 45px)",
              fontWeight: "900",
            }}
          >
            Are You a Professional?
          </h2>

          <p
            style={{
              margin: "18px auto 30px",
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
              padding: "14px 26px",
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

      {/* WORLDWIDE COUNTRIES */}
      <section
        style={{
          padding: "65px 5%",
          background: "#ffffff",
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
              fontWeight: "900",
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
            Fundi Universe connects customers with professional
            services across Tanzania, Africa and the rest of the world.
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
            {countriesDisplay.map((item) => (
              <span
                key={item}
                style={{
                  padding: "9px 14px",
                  borderRadius: "999px",
                  background: "#f8fafc",
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

      {/* FOOTER */}
      <footer
        style={{
          padding: "45px 5% 25px",
          background: "#020617",
          color: "#94a3b8",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "35px",
          }}
        >
          <div>
            <div
              style={{
                color: "#ffffff",
                fontSize: "20px",
                fontWeight: "900",
                marginBottom: "12px",
              }}
            >
              Fundi Universe
            </div>

            <p
              style={{
                margin: 0,
                lineHeight: "1.7",
                fontSize: "13px",
              }}
            >
              One platform. Professionals worldwide.
            </p>
          </div>

          <div>
            <div
              style={{
                color: "#ffffff",
                fontWeight: "800",
                marginBottom: "12px",
              }}
            >
              For Customers
            </div>

            <button
              onClick={() => router.push("/professionals")}
              style={{
                display: "block",
                background: "transparent",
                border: "none",
                color: "#94a3b8",
                padding: 0,
                marginBottom: "9px",
                cursor: "pointer",
              }}
            >
              Find Professionals
            </button>

            <button
              onClick={() => router.push("/signup")}
              style={{
                display: "block",
                background: "transparent",
                border: "none",
                color: "#94a3b8",
                padding: 0,
                cursor: "pointer",
              }}
            >
              Create Account
            </button>
          </div>

          <div>
            <div
              style={{
                color: "#ffffff",
                fontWeight: "800",
                marginBottom: "12px",
              }}
            >
              For Professionals
            </div>

            <button
              onClick={() => router.push("/signup")}
              style={{
                display: "block",
                background: "transparent",
                border: "none",
                color: "#94a3b8",
                padding: 0,
                marginBottom: "9px",
                cursor: "pointer",
              }}
            >
              Join Fundi Universe
            </button>

            <button
              onClick={() => router.push("/login")}
              style={{
                display: "block",
                background: "transparent",
                border: "none",
                color: "#94a3b8",
                padding: 0,
                cursor: "pointer",
              }}
            >
              Professional Login
            </button>
          </div>

          <div>
            <div
              style={{
                color: "#ffffff",
                fontWeight: "800",
                marginBottom: "12px",
              }}
            >
              Platform
            </div>

            <div
              style={{
                fontSize: "13px",
                lineHeight: "1.8",
              }}
            >
              Global Professional Services
              <br />
              Global Opportunities
              <br />
              Worldwide Access
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "35px auto 0",
            paddingTop: "20px",
            borderTop: "1px solid #1e293b",
            textAlign: "center",
            fontSize: "13px",
          }}
        >
          © {new Date().getFullYear()} Fundi Universe. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
