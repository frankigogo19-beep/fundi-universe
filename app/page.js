
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState("Tanzania");
  const [selectedService, setSelectedService] = useState("");
  const [location, setLocation] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // ADMIN CHECK
  useEffect(() => {
    let mounted = true;

    async function checkAdmin(user) {
      try {
        if (!user) {
          if (mounted) {
            setIsAdmin(false);
          }
          return;
        }

        console.log("Logged in email:", user.email);
        console.log("Logged in user ID:", user.id);

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Profile error:", profileError);

          if (mounted) {
            setIsAdmin(false);
          }

          return;
        }

        console.log("Profile role:", profile?.role);

        if (mounted) {
          setIsAdmin(profile?.role === "admin");
        }
      } catch (error) {
        console.error("Admin check failed:", error);

        if (mounted) {
          setIsAdmin(false);
        }
      }
    }

    async function loadCurrentUser() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session error:", error);

        if (mounted) {
          setIsAdmin(false);
        }

        return;
      }

      await checkAdmin(session?.user || null);
    }

    loadCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAdmin(session?.user || null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const countries = [
    "Tanzania",
    "Kenya",
    "Uganda",
    "Rwanda",
    "United States",
    "United Kingdom",
    "UAE",
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
        "Discover business opportunities and connect with professionals across countries.",
    },
    {
      title: "Professional Services",
      description:
        "Find trusted professionals for personal, business and technical services.",
    },
    {
      title: "Global Collaboration",
      description:
        "Build connections and collaborate with professionals worldwide.",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        color: "#172033",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          padding: "18px 6%",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontSize: "22px",
            fontWeight: "800",
          }}
        >
          🌍 FUNDI UNIVERSE
        </div>

        <nav
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/professionals"
            style={{
              textDecoration: "none",
              color: "#172033",
              fontWeight: "600",
            }}
          >
            Find a Professional
          </a>

          <a
            href="/login"
            style={{
              textDecoration: "none",
              color: "#172033",
              fontWeight: "600",
            }}
          >
            Login
          </a>

          <a
            href="/signup"
            style={{
              textDecoration: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              background: "#172033",
              color: "#ffffff",
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
          padding: "80px 6% 60px",
          textAlign: "center",
          background:
            "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(38px, 7vw, 72px)",
              lineHeight: "1.05",
              margin: "0 0 20px",
              fontWeight: "900",
            }}
          >
            One platform.
            <br />
            Professionals worldwide.
          </h1>

          <p
            style={{
              fontSize: "20px",
              lineHeight: "1.6",
              color: "#5b6472",
              marginBottom: "35px",
            }}
          >
            Find the right professional for any job, anywhere.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/professionals"
              style={{
                padding: "14px 24px",
                borderRadius: "8px",
                background: "#172033",
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
                padding: "14px 24px",
                borderRadius: "8px",
                background: "#ffffff",
                color: "#172033",
                border: "1px solid #d1d5db",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              Become a Professional
            </a>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section
        style={{
          padding: "30px 6%",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "25px",
            border: "1px solid #e5e7eb",
            borderRadius: "14px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              fontSize: "24px",
            }}
          >
            Find a Professional
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "14px",
            }}
          >
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              style={{
                padding: "13px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
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
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              style={{
                padding: "13px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                background: "#ffffff",
              }}
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City / Location"
              style={{
                padding: "13px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
              }}
            />

            <a
              href={`/professionals?service=${encodeURIComponent(
                selectedService
              )}&country=${encodeURIComponent(
                selectedCountry
              )}&location=${encodeURIComponent(location)}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "13px",
                borderRadius: "8px",
                background: "#172033",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              Search
            </a>
          </div>
        </div>
      </section>

      {/* DASHBOARD ACTIONS */}
      <section
        style={{
          padding: "40px 6%",
          background: "#f8fafc",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              marginBottom: "20px",
            }}
          >
            Your Dashboard
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <a
              href="/dashboard"
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                background: "#ffffff",
                border: "1px solid #d1d5db",
                color: "#172033",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Customer Dashboard
            </a>

            <a
              href="/professional-dashboard"
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                background: "#ffffff",
                border: "1px solid #d1d5db",
                color: "#172033",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Professional Dashboard
            </a>

            <a
              href="/notifications"
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                background: "#ffffff",
                border: "1px solid #d1d5db",
                color: "#172033",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Notifications
            </a>

            {isAdmin && (
              <a
                href="/admin/dashboard"
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                  background: "#172033",
                  border: "1px solid #172033",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                🔐 Admin Dashboard
              </a>
            )}
          </div>
        </div>
      </section>

      {/* TRUST FEATURES */}
      <section
        style={{
          padding: "70px 6%",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            Why FUNDI UNIVERSE?
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
                title: "Verified Professionals",
                text: "Connect with professionals and discover their skills, experience and qualifications.",
              },
              {
                title: "Global Reach",
                text: "Find professionals across Tanzania, Africa and the world.",
              },
              {
                title: "Easy Connections",
                text: "Send requests and connect directly with the right professional.",
              },
              {
                title: "Multiple Services",
                text: "From construction and repairs to technology and creative services.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: "25px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  background: "#ffffff",
                }}
              >
                <h3>{item.title}</h3>

                <p
                  style={{
                    color: "#5b6472",
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

      {/* POPULAR SERVICES */}
      <section
        style={{
          padding: "70px 6%",
          background: "#f8fafc",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              marginBottom: "30px",
            }}
          >
            Popular Services
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "14px",
            }}
          >
            {categories.map((category) => (
              <a
                key={category}
                href={`/professionals?service=${encodeURIComponent(
                  category
                )}`}
                style={{
                  padding: "18px",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  textDecoration: "none",
                  color: "#172033",
                  fontWeight: "700",
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
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              marginBottom: "30px",
            }}
          >
            Global Opportunities
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {opportunities.map((item) => (
              <div
                key={item.title}
                style={{
                  padding: "25px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                }}
              >
                <h3>{item.title}</h3>

                <p
                  style={{
                    color: "#5b6472",
                    lineHeight: "1.6",
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          padding: "70px 6%",
          background: "#f8fafc",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            How It Works
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
                title: "Search",
                text: "Choose the service, country and location you need.",
              },
              {
                number: "2",
                title: "Compare",
                text: "Explore professional profiles, skills and qualifications.",
              },
              {
                number: "3",
                title: "Connect",
                text: "Send a job request and communicate with the professional.",
              },
              {
                number: "4",
                title: "Complete",
                text: "Work with your chosen professional and complete the job.",
              },
            ].map((item) => (
              <div
                key={item.number}
                style={{
                  textAlign: "center",
                  padding: "25px",
                  background: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    margin: "0 auto 15px",
                    borderRadius: "50%",
                    background: "#172033",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                    fontSize: "20px",
                  }}
                >
                  {item.number}
                </div>

                <h3>{item.title}</h3>

                <p
                  style={{
                    color: "#5b6472",
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
          padding: "80px 6%",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "38px",
            marginBottom: "15px",
          }}
        >
          Are you a professional?
        </h2>

        <p
          style={{
            color: "#5b6472",
            fontSize: "18px",
            marginBottom: "30px",
          }}
        >
          Join FUNDI UNIVERSE and connect with customers locally and
          internationally.
        </p>

        <a
          href="/signup"
          style={{
            display: "inline-block",
            padding: "14px 25px",
            borderRadius: "8px",
            background: "#172033",
            color: "#ffffff",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          Become a Professional
        </a>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "50px 6%",
          background: "#f8fafc",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "30px",
          }}
        >
          <div>
            <h3>🌍 FUNDI UNIVERSE</h3>

            <p
              style={{
                color: "#5b6472",
                lineHeight: "1.6",
              }}
            >
              One platform connecting professionals and customers
              worldwide.
            </p>
          </div>

          <div>
            <h3>Explore</h3>

            <a
              href="/professionals"
              style={{
                display: "block",
                color: "#172033",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Find Professionals
            </a>

            <a
              href="/signup"
              style={{
                display: "block",
                color: "#172033",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Become a Professional
            </a>
          </div>

          <div>
            <h3>Account</h3>

            <a
              href="/login"
              style={{
                display: "block",
                color: "#172033",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Login
            </a>

            <a
              href="/dashboard"
              style={{
                display: "block",
                color: "#172033",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Customer Dashboard
            </a>

            <a
              href="/professional-dashboard"
              style={{
                display: "block",
                color: "#172033",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Professional Dashboard
            </a>

            <a
              href="/notifications"
              style={{
                display: "block",
                color: "#172033",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              Notifications
            </a>

            {isAdmin && (
              <a
                href="/admin/dashboard"
                style={{
                  display: "block",
                  color: "#172033",
                  textDecoration: "none",
                  marginBottom: "8px",
                  fontWeight: "700",
                }}
              >
                🔐 Admin Dashboard
              </a>
            )}
          </div>
        </div>

        <div
          style={{
            maxWidth: "1100px",
            margin: "40px auto 0",
            paddingTop: "20px",
            borderTop: "1px solid #e5e7eb",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          © {new Date().getFullYear()} FUNDI UNIVERSE. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
