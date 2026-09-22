"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function CustomerDashboard() {
  const [activeSection, setActiveSection] = useState("home");
  const [requestCount, setRequestCount] = useState(0);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const menuItems = [
    { id: "home", label: "Dashboard" },
    { id: "find", label: "Find a Professional" },
    { id: "requests", label: "My Requests" },
    { id: "jobs", label: "My Jobs" },
    { id: "messages", label: "Messages" },
    { id: "notifications", label: "Notifications" },
    { id: "favorites", label: "Favorites" },
    { id: "payments", label: "Payments" },
    { id: "reviews", label: "Reviews" },
    { id: "profile", label: "My Profile" },
    { id: "settings", label: "Settings" },
  ];

  useEffect(() => {
    loadRequestCount();
  }, []);

  async function loadRequestCount() {
    setLoadingRequests(true);

    const { count, error } = await supabase
      .from("job_requests")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error(error);
      setRequestCount(0);
    } else {
      setRequestCount(count || 0);
    }

    setLoadingRequests(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          background: "#ffffff",
          padding: "18px 25px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "800",
            }}
          >
            FUNDI UNIVERSE
          </h1>

          <p
            style={{
              margin: "5px 0 0",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Customer Dashboard
          </p>
        </div>

        <button
          onClick={() => setActiveSection("notifications")}
          style={{
            border: "none",
            background: "#f3f4f6",
            borderRadius: "50%",
            width: "45px",
            height: "45px",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          🔔
        </button>
      </header>

      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 90px)",
        }}
      >
        <aside
          style={{
            width: "240px",
            background: "#111827",
            padding: "20px 12px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              padding: "10px 12px 20px",
              fontWeight: "700",
            }}
          >
            Customer Menu
          </div>

          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "requests") {
                  window.location.href = "/my-job-requests";
                  return;
                }

                setActiveSection(item.id);
              }}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "13px 14px",
                marginBottom: "5px",
                border: "none",
                borderRadius: "8px",
                background:
                  activeSection === item.id
                    ? "#2563eb"
                    : "transparent",
                color: "#ffffff",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {item.label}

              {item.id === "requests" && requestCount > 0 && (
                <span
                  style={{
                    float: "right",
                    background: "#ffffff",
                    color: "#2563eb",
                    borderRadius: "20px",
                    padding: "2px 7px",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                >
                  {requestCount}
                </span>
              )}
            </button>
          ))}
        </aside>

        <section
          style={{
            flex: 1,
            padding: "25px",
            boxSizing: "border-box",
          }}
        >
          {activeSection === "home" && (
            <>
              <h2 style={{ marginTop: 0 }}>
                Welcome to FUNDI UNIVERSE
              </h2>

              <p style={{ color: "#6b7280" }}>
                Find trusted professionals for your jobs and
                services.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "15px",
                  marginTop: "25px",
                }}
              >
                <DashboardCard
                  title="Active Requests"
                  value={
                    loadingRequests ? "..." : requestCount
                  }
                />

                <DashboardCard
                  title="Active Jobs"
                  value="0"
                />

                <DashboardCard
                  title="Messages"
                  value="0"
                />

                <DashboardCard
                  title="Notifications"
                  value="0"
                />
              </div>

              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "12px",
                  padding: "20px",
                  marginTop: "25px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <h3 style={{ marginTop: 0 }}>
                  Quick Actions
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "12px",
                  }}
                >
                  <ActionButton
                    text="Find a Professional"
                    onClick={() =>
                      setActiveSection("find")
                    }
                  />

                  <ActionButton
                    text="View My Requests"
                    onClick={() => {
                      window.location.href =
                        "/my-job-requests";
                    }}
                  />

                  <ActionButton
                    text="View Messages"
                    onClick={() =>
                      setActiveSection("messages")
                    }
                  />

                  <ActionButton
                    text="Notifications"
                    onClick={() =>
                      setActiveSection("notifications")
                    }
                  />
                </div>
              </div>
            </>
          )}

          {activeSection === "find" && (
            <Section
              title="Find a Professional"
              description="Search for professionals based on the service you need, country and location."
            >
              <button
                style={primaryButton}
                onClick={() => {
                  window.location.href =
                    "/professionals";
                }}
              >
                Search Professionals
              </button>
            </Section>
          )}

          {activeSection === "requests" && (
            <Section
              title="My Requests"
              description="View and track all service requests you have submitted."
            >
              <button
                style={primaryButton}
                onClick={() => {
                  window.location.href =
                    "/my-job-requests";
                }}
              >
                View My Job Requests
              </button>
            </Section>
          )}

          {activeSection === "jobs" && (
            <Section
              title="My Jobs"
              description="Track your active and completed jobs."
            >
              <EmptyState text="No active jobs yet." />
            </Section>
          )}

          {activeSection === "messages" && (
            <Section
              title="Messages"
              description="Communicate with professionals about your requests and jobs."
            >
              <EmptyState text="No messages yet." />
            </Section>
          )}

          {activeSection === "notifications" && (
            <Section
              title="Notifications"
              description="You will receive notifications when professionals respond to your requests."
            >
              <EmptyState text="No new notifications." />
            </Section>
          )}

          {activeSection === "favorites" && (
            <Section
              title="Favorites"
              description="Professionals you save will appear here."
            >
              <EmptyState text="No favorite professionals yet." />
            </Section>
          )}

          {activeSection === "payments" && (
            <Section
              title="Payments"
              description="Manage payments related to your jobs and services."
            >
              <EmptyState text="No payment records yet." />
            </Section>
          )}

          {activeSection === "reviews" && (
            <Section
              title="Reviews"
              description="View and manage reviews for completed jobs."
            >
              <EmptyState text="No reviews yet." />
            </Section>
          )}

          {activeSection === "profile" && (
            <Section
              title="My Profile"
              description="Manage your customer information."
            >
              <button
                style={primaryButton}
                onClick={() =>
                  alert(
                    "Profile settings will be connected next."
                  )
                }
              >
                Edit Profile
              </button>
            </Section>
          )}

          {activeSection === "settings" && (
            <Section
              title="Settings"
              description="Manage your account preferences and application settings."
            >
              <EmptyState text="Settings will be connected next." />
            </Section>
          )}
        </section>
      </div>
    </main>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          color: "#6b7280",
          fontSize: "14px",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "28px",
          fontWeight: "800",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ActionButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "15px",
        border: "1px solid #d1d5db",
        background: "#ffffff",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      {text}
    </button>
  );
}

function Section({ title, description, children }) {
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>{title}</h2>

      <p style={{ color: "#6b7280" }}>
        {description}
      </p>

      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          marginTop: "20px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "35px 15px",
        color: "#6b7280",
      }}
    >
      {text}
    </div>
  );
}

const primaryButton = {
  padding: "12px 18px",
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};
