
"use client";

import Link from "next/link";

const stats = [
  {
    title: "Total Professionals",
    value: "0",
    description: "Registered professionals",
    icon: "👨‍🔧",
  },
  {
    title: "Total Customers",
    value: "0",
    description: "Registered customers",
    icon: "👤",
  },
  {
    title: "Active Jobs",
    value: "0",
    description: "Jobs currently active",
    icon: "💼",
  },
  {
    title: "Pending Review",
    value: "0",
    description: "Items requiring attention",
    icon: "⚠️",
  },
];

const adminModules = [
  {
    title: "Professionals",
    description: "Manage professionals, profiles and service providers.",
    icon: "👨‍🔧",
    href: "/admin/professionals",
  },
  {
    title: "Customers",
    description: "Manage customers and their platform activity.",
    icon: "👤",
    href: "/admin/customers",
  },
  {
    title: "Jobs & Bookings",
    description: "Monitor jobs, requests, bookings and assignments.",
    icon: "💼",
    href: "/admin/jobs",
  },
  {
    title: "Verification Center",
    description: "Review professional verification and documents.",
    icon: "✅",
    href: "/admin/verification",
  },
  {
    title: "Payments",
    description: "Monitor payments, transactions and platform revenue.",
    icon: "💳",
    href: "/admin/payments",
  },
  {
    title: "Disputes & Safety",
    description: "Handle disputes, reports and safety cases.",
    icon: "⚠️",
    href: "/admin/disputes",
  },
  {
    title: "Reviews & Ratings",
    description: "Monitor reviews, ratings and reported feedback.",
    icon: "⭐",
    href: "/admin/reviews",
  },
  {
    title: "Notifications",
    description: "Manage important platform notifications.",
    icon: "🔔",
    href: "/admin/notifications",
  },
  {
    title: "Global Opportunities",
    description: "Manage international opportunities and connections.",
    icon: "🌍",
    href: "/admin/global-opportunities",
  },
  {
    title: "Services & Categories",
    description: "Manage professional categories and services.",
    icon: "🛠️",
    href: "/admin/services",
  },
  {
    title: "Countries & Locations",
    description: "Manage countries, regions and service locations.",
    icon: "📍",
    href: "/admin/locations",
  },
  {
    title: "Reports & Analytics",
    description: "View platform performance and business analytics.",
    icon: "📈",
    href: "/admin/reports",
  },
];

export default function AdminDashboard() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        color: "#172033",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          padding: "18px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "1px",
              color: "#6b7280",
              marginBottom: "5px",
            }}
          >
            FUNDI UNIVERSE
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "800",
            }}
          >
            Admin Command Center
          </h1>

          <p
            style={{
              margin: "7px 0 0",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Manage and monitor the entire FUNDI UNIVERSE platform.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            style={{
              border: "1px solid #e5e7eb",
              background: "#ffffff",
              borderRadius: "10px",
              padding: "10px 13px",
              fontSize: "18px",
              cursor: "pointer",
            }}
            title="Notifications"
          >
            🔔
          </button>

          <div
            style={{
              background: "#111827",
              color: "#ffffff",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "800",
            }}
          >
            A
          </div>
        </div>
      </header>

      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "25px 20px 50px",
        }}
      >
        {/* Quick navigation */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "25px",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              background: "#ffffff",
              color: "#374151",
              border: "1px solid #e5e7eb",
              padding: "10px 15px",
              borderRadius: "9px",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            ← Main Site
          </Link>

          <Link
            href="/dashboard"
            style={{
              textDecoration: "none",
              background: "#ffffff",
              color: "#374151",
              border: "1px solid #e5e7eb",
              padding: "10px 15px",
              borderRadius: "9px",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            User Dashboard
          </Link>
        </div>

        {/* Statistics */}
        <section>
          <h2
            style={{
              margin: "0 0 15px",
              fontSize: "20px",
            }}
          >
            Platform Overview
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.title}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  padding: "20px",
                  boxShadow: "0 3px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "27px",
                    }}
                  >
                    {stat.icon}
                  </span>

                  <span
                    style={{
                      fontSize: "12px",
                      color: "#9ca3af",
                      fontWeight: "700",
                    }}
                  >
                    LIVE
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: "800",
                    marginBottom: "6px",
                  }}
                >
                  {stat.value}
                </div>

                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "14px",
                    marginBottom: "5px",
                  }}
                >
                  {stat.title}
                </div>

                <div
                  style={{
                    color: "#6b7280",
                    fontSize: "12px",
                  }}
                >
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Admin Attention */}
        <section style={{ marginTop: "30px" }}>
          <h2
            style={{
              margin: "0 0 15px",
              fontSize: "20px",
            }}
          >
            Admin Attention
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                padding: "18px",
              }}
            >
              <div style={{ fontSize: "25px", marginBottom: "10px" }}>
                🪪
              </div>

              <h3 style={{ margin: "0 0 7px", fontSize: "16px" }}>
                Verification Queue
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#6b7280",
                  fontSize: "13px",
                  lineHeight: 1.5,
                }}
              >
                Professional profiles waiting for verification will appear
                here.
              </p>
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                padding: "18px",
              }}
            >
              <div style={{ fontSize: "25px", marginBottom: "10px" }}>
                ⚖️
              </div>

              <h3 style={{ margin: "0 0 7px", fontSize: "16px" }}>
                Open Disputes
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#6b7280",
                  fontSize: "13px",
                  lineHeight: 1.5,
                }}
              >
                Customer and professional disputes requiring admin attention
                will appear here.
              </p>
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                padding: "18px",
              }}
            >
              <div style={{ fontSize: "25px", marginBottom: "10px" }}>
                🚨
              </div>

              <h3 style={{ margin: "0 0 7px", fontSize: "16px" }}>
                Reported Activity
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#6b7280",
                  fontSize: "13px",
                  lineHeight: 1.5,
                }}
              >
                Reported users, jobs, reviews and other platform activity will
                be monitored here.
              </p>
            </div>
          </div>
        </section>

        {/* Platform Activity */}
        <section style={{ marginTop: "30px" }}>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "22px",
            }}
          >
            <h2
              style={{
                margin: "0 0 5px",
                fontSize: "20px",
              }}
            >
              Platform Activity
            </h2>

            <p
              style={{
                margin: "0 0 20px",
                color: "#6b7280",
                fontSize: "13px",
              }}
            >
              Activity analytics will be connected to Supabase in the next
              stage.
            </p>

            <div
              style={{
                minHeight: "180px",
                border: "1px dashed #d1d5db",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px",
                color: "#9ca3af",
                fontSize: "14px",
              }}
            >
              📊 Activity chart will appear here
            </div>
          </div>
        </section>

        {/* Admin Modules */}
        <section style={{ marginTop: "30px" }}>
          <h2
            style={{
              margin: "0 0 15px",
              fontSize: "20px",
            }}
          >
            Administration
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
            }}
          >
            {adminModules.map((module) => (
              <Link
                key={module.title}
                href={module.href}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "15px",
                  padding: "20px",
                  display: "block",
                  transition: "0.2s",
                }}
              >
                <div
                  style={{
                    fontSize: "30px",
                    marginBottom: "12px",
                  }}
                >
                  {module.icon}
                </div>

                <h3
                  style={{
                    margin: "0 0 7px",
                    fontSize: "16px",
                    fontWeight: "800",
                  }}
                >
                  {module.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#6b7280",
                    fontSize: "13px",
                    lineHeight: 1.5,
                  }}
                >
                  {module.description}
                </p>

                <div
                  style={{
                    marginTop: "14px",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Open →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Global Reach */}
        <section style={{ marginTop: "30px" }}>
          <div
            style={{
              background: "#111827",
              color: "#ffffff",
              borderRadius: "18px",
              padding: "25px",
            }}
          >
            <div style={{ fontSize: "30px", marginBottom: "10px" }}>🌍</div>

            <h2
              style={{
                margin: "0 0 8px",
                fontSize: "21px",
              }}
            >
              Global Reach
            </h2>

            <p
              style={{
                margin: 0,
                color: "#d1d5db",
                fontSize: "14px",
                lineHeight: 1.6,
                maxWidth: "750px",
              }}
            >
              FUNDI UNIVERSE is designed to connect customers and
              professionals across Tanzania, Africa and international markets
              including the USA, UK, UAE, India and Europe.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            color: "#9ca3af",
            fontSize: "12px",
            marginTop: "35px",
          }}
        >
          FUNDI UNIVERSE Admin • Platform Management Center
        </footer>
      </section>
    </main>
  );
}
