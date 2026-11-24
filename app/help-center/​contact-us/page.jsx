"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import { SUPPORTED_LANGUAGES, getSupportText } from "../../../utils/supportTranslations";

export default function HelpCenterContactUsPage() {
  const [activeLang, setActiveLang] = useState("sw");
  const t = getSupportText(activeLang);
  const isRtl = activeLang === "ar";

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "client",
    category: "payment",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [ticketRef, setTicketRef] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const { data, error: insertError } = await supabase
      .from("support_tickets")
      .insert([
        {
          user_id: null,
          full_name: form.full_name,
          email: form.email,
          phone: form.phone || null,
          role: form.role,
          category: form.category,
          subject: form.subject,
          message: form.message,
          language_code: activeLang,
        },
      ])
      .select("id")
      .single();

    setSubmitting(false);

    if (insertError) {
      setError(t.errorMsg);
      return;
    }

    setTicketRef(data.id.slice(0, 8).toUpperCase());
    setForm({
      full_name: "",
      email: "",
      phone: "",
      role: "client",
      category: "payment",
      subject: "",
      message: "",
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #d5dce7",
    fontSize: "14px",
    color: "#172033",
    background: "#ffffff",
    boxSizing: "border-box",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    fontSize: "14px",
    color: "#172033",
  };

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        background: "#f7f9fc",
        color: "#172033",
        fontFamily: "Arial, sans-serif",
        padding: "40px 6%",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        {/* Top Navigation & Language */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Link
              href="/help-center"
              style={{
                color: "#1769aa",
                textDecoration: "none",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              ← Help Center
            </Link>
            <Link
              href="/"
              style={{
                color: "#667085",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Home
            </Link>
          </div>

          <select
            aria-label="Select language"
            value={activeLang}
            onChange={(e) => setActiveLang(e.target.value)}
            style={{
              borderRadius: "8px",
              border: "1px solid #d5dce7",
              background: "#ffffff",
              padding: "8px 12px",
              fontSize: "14px",
              color: "#172033",
            }}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {ticketRef ? (
          <div
            style={{
              padding: "36px 24px",
              background: "#ecfdf3",
              border: "1px solid #abefc6",
              borderRadius: "14px",
              textAlign: "center",
            }}
          >
            <h2 style={{ margin: "0 0 10px", fontSize: "24px", color: "#067647" }}>
              {t.successTitle}
            </h2>
            <p style={{ margin: "0 0 18px", color: "#172033", lineHeight: "1.6" }}>
              {t.successMsg}
            </p>
            <div
              style={{
                display: "inline-block",
                padding: "10px 18px",
                background: "#ffffff",
                border: "1px solid #abefc6",
                borderRadius: "8px",
                fontFamily: "monospace",
                fontWeight: "700",
                fontSize: "18px",
                color: "#067647",
                marginBottom: "22px",
              }}
            >
              #{ticketRef}
            </div>
            <div>
              <button
                type="button"
                onClick={() => setTicketRef(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#1769aa",
                  fontWeight: "700",
                  fontSize: "15px",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {t.sendAnother}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <h1 style={{ margin: "0 0 10px", fontSize: "32px", fontWeight: "800" }}>
                {t.contactTitle}
              </h1>
              <p style={{ margin: 0, color: "#667085", fontSize: "16px", lineHeight: "1.6" }}>
                {t.contactSubtitle}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
                marginBottom: "24px",
              }}
            >
              <a
                href="https://wa.me/255700000000?text=Habari%20Fundi%20Universe%2C%20nahitaji%20msaada."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 16px",
                  background: "#16a34a",
                  color: "#ffffff",
                  fontWeight: "700",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                {t.whatsappText}
              </a>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 16px",
                  background: "#ffffff",
                  border: "1px solid #e5eaf1",
                  color: "#667085",
                  fontSize: "14px",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                {t.hours}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "grid",
                gap: "16px",
                background: "#ffffff",
                padding: "30px",
                border: "1px solid #e5eaf1",
                borderRadius: "14px",
                boxShadow: "0 8px 25px rgba(20, 40, 80, 0.05)",
              }}
            >
              {error && (
                <div
                  style={{
                    padding: "12px 14px",
                    background: "#fef3f2",
                    border: "1px solid #fecdca",
                    color: "#b42318",
                    fontSize: "14px",
                    borderRadius: "8px",
                    fontWeight: "600",
                  }}
                >
                  {error}
                </div>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "14px",
                }}
              >
                <div>
                  <label style={labelStyle}>{t.fullName}</label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    value={form.full_name}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>{t.email}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "14px",
                }}
              >
                <div>
                  <label style={labelStyle}>{t.phone}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>{t.role}</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="client">{t.roleClient}</option>
                    <option value="fundi">{t.roleFundi}</option>
                    <option value="guest">{t.roleGuest}</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>{t.category}</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="payment">{t.catPayment}</option>
                    <option value="account">{t.catAccount}</option>
                    <option value="booking">{t.catBooking}</option>
                    <option value="dispute">{t.catDispute}</option>
                    <option value="other">{t.catOther}</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>{t.subject}</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{t.message}</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  background: "#1769aa",
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: "15px",
                  borderRadius: "9px",
                  border: "none",
                  cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.6 : 1,
                }}
              >
                {submitting ? t.sending : t.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
        }
