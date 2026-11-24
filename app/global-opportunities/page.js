"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

const opportunities = [
  {
    id: 1,
    icon: "🌐",
    category: "International Business",
    title: "International Business Opportunities",
    description:
      "Discover cross-border trade, international markets, investment opportunities and strategic business partnerships.",
    tags: ["Global Trade", "Investment", "Partnerships"],
    actionText: "Discover Professionals",
    actionHref: "/professionals",
  },
  {
    id: 2,
    icon: "💼",
    category: "Career & Employment",
    title: "Global Career Opportunities",
    description:
      "Explore international career opportunities and connect with organizations seeking talented professionals.",
    tags: ["Remote Jobs", "Careers", "Employment"],
    actionText: "Discover Professionals",
    actionHref: "/professionals",
  },
  {
    id: 3,
    icon: "🤝",
    category: "Professional Networking",
    title: "Global Professional Connections",
    description:
      "Build meaningful relationships with consultants, experts, professionals and business leaders worldwide.",
    tags: ["Networking", "Collaboration", "Connections"],
    actionText: "Discover Professionals",
    actionHref: "/professionals",
  },
  {
    id: 4,
    icon: "📈",
    category: "Investment",
    title: "Investment Opportunities",
    description:
      "Discover promising business ventures, investment possibilities and partnerships designed for sustainable growth.",
    tags: ["Investors", "Startups", "Growth"],
    actionText: "Discover Professionals",
    actionHref: "/professionals",
  },
  {
    id: 5,
    icon: "🎓",
    category: "Skills & Development",
    title: "International Skills Development",
    description:
      "Discover professional training, international development programs and opportunities to advance your expertise.",
    tags: ["Training", "Education", "Skills"],
    actionText: "Discover Professionals",
    actionHref: "/professionals",
  },
  {
    id: 6,
    icon: "🏢",
    category: "Corporate Partnerships",
    title: "Corporate Partnerships",
    description:
      "Connect with companies seeking qualified service providers, suppliers and strategic business partners.",
    tags: ["Companies", "Suppliers", "Partnerships"],
    actionText: "Discover Professionals",
    actionHref: "/professionals",
  },
];

const categories = [
  "All Opportunities",
  "International Business",
  "Career & Employment",
  "Professional Networking",
  "Investment",
  "Skills & Development",
  "Corporate Partnerships",
];

export default function GlobalOpportunities() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Opportunities");
  const [openId, setOpenId] = useState(1);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();

    return opportunities.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query));

      return (
        matchesSearch &&
        (category === "All Opportunities" || item.category === category)
      );
    });
  }, [search, category]);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f9fc",
        color: "#172033",
        fontFamily: "Arial, sans-serif",
        padding: "40px 6%",
      }}
    >
      <div style={{ maxWidth: "850px", margin: "0 auto" }}>
        {/* Top Navigation */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <Link
              href="/dashboard"
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#1769aa",
                textDecoration: "none",
              }}
            >
              ← Dashboard
            </Link>
            <Link
              href="/professionals"
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#1769aa",
                textDecoration: "none",
              }}
            >
              Discover Professionals →
            </Link>
          </div>

          <Link
            href="/help-center"
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#667085",
              textDecoration: "none",
            }}
          >
            Help Center
          </Link>
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "34px", fontWeight: "800", margin: "0 0 10px" }}>
            Global Opportunities
          </h1>
          <p style={{ margin: 0, fontSize: "16px", color: "#667085", lineHeight: "1.6" }}>
            Explore international business opportunities, connect with professionals, discover investments and go beyond borders.
          </p>
        </div>

        {/* Search Input */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search business, investment, careers..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              borderRadius: "10px",
              border: "1px solid #d5dce7",
              background: "#ffffff",
              padding: "14px 16px",
              fontSize: "15px",
              color: "#172033",
              outline: "none",
            }}
          />
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "28px",
          }}
        >
          {categories.map((item) => {
            const active = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                style={{
                  borderRadius: "8px",
                  padding: "10px 16px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  border: active ? "none" : "1px solid #d5dce7",
                  background: active ? "#1769aa" : "#ffffff",
                  color: active ? "#ffffff" : "#172033",
                }}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Results Count */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "14px",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "700", color: "#172033" }}>
            Explore Categories
          </span>
          <span style={{ fontSize: "13px", fontWeight: "700", color: "#1769aa" }}>
            {filtered.length} Results
          </span>
        </div>

        {/* Accordion List */}
        <div style={{ display: "grid", gap: "12px" }}>
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.title}
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #e5eaf1",
                    background: "#ffffff",
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "16px",
                      padding: "18px 20px",
                      textAlign: "left",
                      background: "#ffffff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          display: "block",
                          fontSize: "12px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          color: "#1769aa",
                          marginBottom: "4px",
                        }}
                      >
                        {item.icon} {item.category}
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "700",
                          color: "#172033",
                        }}
                      >
                        {item.title}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "#1769aa",
                        flexShrink: 0,
                      }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        borderTop: "1px solid #e5eaf1",
                        padding: "16px 20px",
                        fontSize: "15px",
                        color: "#667085",
                        lineHeight: "1.6",
                        background: "#f9fbfd",
                      }}
                    >
                      <p style={{ margin: "0 0 12px" }}>{item.description}</p>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                          marginBottom: "16px",
                        }}
                      >
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: "12px",
                              fontWeight: "600",
                              color: "#172033",
                              background: "#eef3f8",
                              padding: "4px 10px",
                              borderRadius: "6px",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={item.actionHref}
                        style={{
                          display: "inline-block",
                          padding: "9px 16px",
                          borderRadius: "8px",
                          background: "#1769aa",
                          color: "#ffffff",
                          textDecoration: "none",
                          fontWeight: "700",
                          fontSize: "13px",
                        }}
                      >
                        {item.actionText} →
                      </Link>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div
              style={{
                borderRadius: "12px",
                border: "1px solid #e5eaf1",
                background: "#ffffff",
                padding: "30px",
                textAlign: "center",
                fontSize: "15px",
                color: "#667085",
              }}
            >
              <p style={{ margin: "0 0 14px" }}>
                We could not find matching opportunities. Try a different search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All Opportunities");
                }}
                style={{
                  borderRadius: "8px",
                  border: "none",
                  background: "#1769aa",
                  color: "#ffffff",
                  padding: "10px 18px",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA Box */}
        <div
          style={{
            marginTop: "40px",
            borderRadius: "16px",
            background: "#172033",
            padding: "35px 25px",
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          <h2 style={{ fontSize: "22px", fontWeight: "700", margin: "0 0 10px" }}>
            Your Next Opportunity Starts Here.
          </h2>
          <p style={{ margin: "0 0 18px", color: "#d8deea", fontSize: "15px" }}>
            Connect with the world. Discover possibilities. Build your future with Fundi Universe.
          </p>
          <Link
            href="/professionals"
            style={{
              display: "inline-block",
              borderRadius: "8px",
              background: "#ffffff",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: "700",
              color: "#172033",
              textDecoration: "none",
            }}
          >
            Discover Professionals
          </Link>
        </div>

        {/* Footer */}
        <footer
          style={{
            marginTop: "32px",
            textAlign: "center",
            fontSize: "13px",
            color: "#667085",
          }}
        >
          <div>© {new Date().getFullYear()} Fundi Universe.</div>
          <div style={{ marginTop: "4px" }}>
            One platform. Professionals worldwide.
          </div>
        </footer>
      </div>
    </div>
  );
              }
