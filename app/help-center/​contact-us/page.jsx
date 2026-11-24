"use client";

import { useState } from "react";

export default function HelpCenterContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f9fc",
        color: "#172033",
        fontFamily: "Arial, sans-serif",
        padding: "50px 6%",
      }}
    >
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "35px",
          borderRadius: "14px",
          border: "1px solid #e5eaf1",
          boxShadow: "0 8px 25px rgba(20, 40, 80, 0.05)",
        }}
      >
        <div style={{ display: "flex", gap: "16px", marginBottom: "18px" }}>
          <a
            href="/help-center"
            style={{
              color: "#1769aa",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "14px",
            }}
          >
            ← Rudi Help Center
          </a>
          <a
            href="/"
            style={{
              color: "#667085",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Home
          </a>
        </div>

        <h1 style={{ margin: "0 0 10px", fontSize: "30px" }}>Contact Us</h1>
        <p style={{ margin: "0 0 25px", color: "#667085", lineHeight: "1.6" }}>
          Una swali, maoni, au unahitaji msaada kwenye Fundi Universe? Tujazie fomu hii hapa chini.
        </p>

        {submitted && (
          <div
            style={{
              padding: "14px 16px",
              marginBottom: "20px",
              borderRadius: "8px",
              background: "#ecfdf3",
              border: "1px solid #abefc6",
              color: "#067647",
              fontWeight: "600",
            }}
          >
            Asante! Ujumbe wako umepokelewa.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
              Jina lako
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mfano: Juma Mwangi"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid #d5dce7",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
              Barua pepe (Email)
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mfano@email.com"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid #d5dce7",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
              Mada (Subject)
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Mfano: Msaada wa akaunti au malipo"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid #d5dce7",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
              Ujumbe
            </label>
            <textarea
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Andika ujumbe wako hapa..."
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid #d5dce7",
                fontSize: "14px",
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "14px 20px",
              borderRadius: "9px",
              border: "none",
              background: "#1769aa",
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Tuma Ujumbe
          </button>
        </form>
      </div>
    </main>
  );
}
