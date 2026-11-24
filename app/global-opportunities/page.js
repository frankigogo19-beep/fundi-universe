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
    details:
      "Connect with importers, exporters, regional distributors, and corporate partners across East Africa and global markets to expand trade and commercial operations.",
    regions: ["Tanzania", "East Africa", "UAE", "Europe", "Asia"],
    tags: ["Global Trade", "Investment", "Partnerships"],
    actionText: "Explore Opportunities",
  },
  {
    id: 2,
    icon: "💼",
    category: "Career & Employment",
    title: "Global Career Opportunities",
    description:
      "Explore international career opportunities and connect with organizations seeking talented professionals.",
    details:
      "Find remote roles, international contracts, and specialized assignments matching your skills across technical, operational, and advisory fields.",
    regions: ["Remote", "Global", "Middle East", "Africa"],
    tags: ["Remote Jobs", "Careers", "Employment"],
    actionText: "Explore Opportunities",
  },
  {
    id: 3,
    icon: "🤝",
    category: "Professional Networking",
    title: "Global Professional Connections",
    description:
      "Build meaningful relationships with consultants, experts, professionals and business leaders worldwide.",
    details:
      "Collaborate with verified fundis, engineers, consultants, and industry leaders on shared projects and cross-border referrals.",
    regions: ["Tanzania", "Kenya", "Uganda", "Rwanda", "Global"],
    tags: ["Networking", "Collaboration", "Connections"],
    actionText: "Explore Opportunities",
  },
  {
    id: 4,
    icon: "📈",
    category: "Investment",
    title: "Investment Opportunities",
    description:
      "Discover promising business ventures, investment possibilities and partnerships designed for sustainable growth.",
    details:
      "Explore scalable ventures, joint-venture proposals, and growth-stage initiatives seeking strategic partners or capital.",
    regions: ["East Africa", "International"],
    tags: ["Investors", "Startups", "Growth"],
    actionText: "Explore Opportunities",
  },
  {
    id: 5,
    icon: "🎓",
    category: "Skills & Development",
    title: "International Skills Development",
    description:
      "Discover professional training, international development programs and opportunities to advance your expertise.",
    details:
      "Access workshops, technical certifications, mentorship tracks, and practical skill-building programs for career advancement.",
    regions: ["Online / Remote", "Regional Hubs"],
    tags: ["Training", "Education", "Skills"],
    actionText: "Explore Opportunities",
  },
  {
    id: 6,
    icon: "🏢",
    category: "Corporate Partnerships",
    title: "Corporate Partnerships",
    description:
      "Connect with companies seeking qualified service providers, suppliers and strategic business partners.",
    details:
      "Register interest to supply goods, technical maintenance, logistics, or specialized services to partner organizations.",
    regions: ["Dar es Salaam", "Arusha", "Mwanza", "Dodoma", "Global"],
    tags: ["Companies", "Suppliers", "Partnerships"],
    actionText: "Explore Opportunities",
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [interestName, setInterestName] = useState("");
  const [interestContact, setInterestContact] = useState("");
  const [interestNote, setInterestNote] = useState("");
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();

    return opportunities.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.details.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query));

      return (
        matchesSearch &&
        (category === "All Opportunities" || item.category === category)
      );
    });
  }, [search, category]);

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const openOpportunityModal = (item) => {
    setSelectedItem(item);
    setSubmittedSuccess(false);
    setInterestNote("");
  };

  const closeModal = () => {
    setSelectedItem(null);
    setSubmittedSuccess(false);
  };

  const handleInterestSubmit = (e) => {
    e.preventDefault();
    if (!interestName.trim() || !interestContact.trim()) return;
    setSubmittedSuccess(true);
    setInterestName("");
    setInterestContact("");
    setInterestNote("");
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
        <div style={{ marginBottom: "20px", position: "relative" }}>
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
              padding: "14px 44px 14px 16px",
              fontSize: "15px",
              color: "#172033",
              outline: "none",
            }}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "#eef3f8",
                border: "none",
                borderRadius: "6px",
                padding: "4px 8px",
                fontSize: "12px",
                fontWeight: "700",
                color: "#172033",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          )}
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
                    onClick={() => toggleAccordion(item.id)}
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
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setSearch(tag)}
                            style={{
                              fontSize: "12px",
                              fontWeight: "600",
                              color: "#172033",
                              background: "#eef3f8",
                              border: "1px solid #d5dce7",
                              padding: "5px 10px",
                              borderRadius: "6px",
                              cursor: "pointer",
                            }}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        <button
                          type="button"
                          onClick={() => openOpportunityModal(item)}
                          style={{
                            padding: "10px 16px",
                            borderRadius: "8px",
                            border: "none",
                            background: "#1769aa",
                            color: "#ffffff",
                            fontWeight: "700",
                            fontSize: "13px",
                            cursor: "pointer",
                          }}
                        >
                          {item.actionText} →
                        </button>

                        <Link
                          href={`/professionals?category=${encodeURIComponent(item.category)}`}
                          style={{
                            display: "inline-block",
                            padding: "10px 16px",
                            borderRadius: "8px",
                            border: "1px solid #d5dce7",
                            background: "#ffffff",
                            color: "#172033",
                            textDecoration: "none",
                            fontWeight: "600",
                            fontSize: "13px",
                          }}
                        >
                          View Professionals
                        </Link>
                      </div>
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

      {/* Interactive Opportunity Detail & Interest Modal */}
      {selectedItem && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 50,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "540px",
              background: "#ffffff",
              borderRadius: "14px",
              padding: "26px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
              color: "#172033",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "12px",
                marginBottom: "14px",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    color: "#1769aa",
                  }}
                >
                  {selectedItem.icon} {selectedItem.category}
                </span>
                <h3 style={{ margin: "6px 0 0", fontSize: "20px", fontWeight: "800" }}>
                  {selectedItem.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "8px",
                  padding: "6px 10px",
                  fontSize: "14px",
                  fontWeight: "700",
                  cursor: "pointer",
                  color: "#172033",
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#667085", lineHeight: "1.6" }}>
              {selectedItem.details}
            </p>

            <div style={{ marginBottom: "18px" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", color: "#172033" }}>
                Key Markets / Focus:{" "}
              </span>
              <span style={{ fontSize: "13px", color: "#667085" }}>
                {selectedItem.regions.join(" • ")}
              </span>
            </div>

            {submittedSuccess ? (
              <div
                style={{
                  background: "#eef7f0",
                  border: "1px solid #b7e1c1",
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "14px",
                }}
              >
                <div style={{ fontWeight: "700", color: "#166534", marginBottom: "4px" }}>
                  Interest Recorded!
                </div>
                <div style={{ fontSize: "13px", color: "#14532d" }}>
                  Your interest in <strong>{selectedItem.title}</strong> has been noted. You can also browse matching professionals directly.
                </div>
              </div>
            ) : (
              <form onSubmit={handleInterestSubmit} style={{ display: "grid", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", marginBottom: "4px" }}>
                    Your Name / Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={interestName}
                    onChange={(e) => setInterestName(e.target.value)}
                    placeholder="e.g. Amina Hassan / Kilimanjaro Supply"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #d5dce7",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", marginBottom: "4px" }}>
                    Email or Phone / WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    value={interestContact}
                    onChange={(e) => setInterestContact(e.target.value)}
                    placeholder="e.g. +255 7XX XXX XXX or email"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #d5dce7",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", marginBottom: "4px" }}>
                    How would you like to collaborate?
                  </label>
                  <textarea
                    rows={3}
                    value={interestNote}
                    onChange={(e) => setInterestNote(e.target.value)}
                    placeholder="Briefly describe your goal, service, or partnership idea..."
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #d5dce7",
                      fontSize: "14px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "4px" }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      minWidth: "160px",
                      padding: "11px 16px",
                      borderRadius: "8px",
                      border: "none",
                      background: "#1769aa",
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    Express Interest
                  </button>

                  <Link
                    href={`/professionals?category=${encodeURIComponent(selectedItem.category)}`}
                    style={{
                      padding: "11px 16px",
                      borderRadius: "8px",
                      border: "1px solid #d5dce7",
                      background: "#ffffff",
                      color: "#172033",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    Browse Professionals →
                  </Link>
                </div>
              </form>
            )}

            <div style={{ marginTop: "14px", textAlign: "right" }}>
              <button
                type="button"
                onClick={closeModal}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#667085",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
    }
