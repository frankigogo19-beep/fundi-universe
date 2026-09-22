"use client";

import { useState } from "react";
import Link from "next/link";

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

export default function SignupPage() {
  const [accountType, setAccountType] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "Tanzania",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.country ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please complete all required fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert(
      "Account registration will be connected to Supabase Authentication."
    );
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f8fc",
        padding: "30px 16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              fontSize: "42px",
              marginBottom: "8px",
            }}
          >
            🌍🔧
          </div>

          <h1
            style={{
              margin: 0,
              color: "#0b4f8a",
              fontSize: "30px",
            }}
          >
            FUNDI UNIVERSE
          </h1>

          <p
            style={{
              color: "#666",
              marginTop: "8px",
            }}
          >
            Create your account and join our global community
          </p>
        </div>

        <section
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "28px 22px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#222",
              marginTop: 0,
            }}
          >
            Create Account
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#777",
              marginBottom: "24px",
            }}
          >
            Choose how you want to use FUNDI UNIVERSE
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              marginBottom: "24px",
            }}
          >
            <button
              type="button"
              onClick={() => setAccountType("customer")}
              style={{
                padding: "14px 8px",
                borderRadius: "10px",
                border:
                  accountType === "customer"
                    ? "2px solid #0b4f8a"
                    : "1px solid #d5dce5",
                background:
                  accountType === "customer" ? "#eef6ff" : "#fff",
                color: "#0b4f8a",
                fontWeight: "bold",
              }}
            >
              👤 Customer
            </button>

            <button
              type="button"
              onClick={() => setAccountType("professional")}
              style={{
                padding: "14px 8px",
                borderRadius: "10px",
                border:
                  accountType === "professional"
                    ? "2px solid #0b4f8a"
                    : "1px solid #d5dce5",
                background:
                  accountType === "professional"
                    ? "#eef6ff"
                    : "#fff",
                color: "#0b4f8a",
                fontWeight: "bold",
              }}
            >
              🔧 Professional
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              style={inputStyle}
            />

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
            />

            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              style={inputStyle}
            />

            <label>Country</label>

            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              style={inputStyle}
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <label>Password</label>

            <div style={{ position: "relative", marginBottom: "18px" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  marginBottom: 0,
                  paddingRight: "70px",
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={showButtonStyle}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <label>Confirm Password</label>

            <div style={{ position: "relative", marginBottom: "20px" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  marginBottom: 0,
                  paddingRight: "70px",
                }}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                style={showButtonStyle}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            {accountType === "professional" && (
              <div
                style={{
                  background: "#fff8e8",
                  border: "1px solid #f0d48a",
                  borderRadius: "12px",
                  padding: "15px",
                  marginBottom: "20px",
                  color: "#6b5200",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
              >
                <strong>Professional Account</strong>

                <p>
                  After registration, you will be able to add your skills,
                  services, experience, location, prices and availability.
                </p>

                <p>
                  Where verification is required, you can submit certificates,
                  qualifications or other evidence of your professional skills.
                </p>
              </div>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "10px",
                background: "#0b4f8a",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Create Account
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              color: "#666",
              marginTop: "22px",
            }}
          >
            Already have an account?
          </p>

          <Link
            href="/login"
            style={{
              display: "block",
              textAlign: "center",
              padding: "13px",
              border: "2px solid #0b4f8a",
              borderRadius: "10px",
              color: "#0b4f8a",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>

          <Link
            href="/"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "18px",
              color: "#777",
              textDecoration: "none",
            }}
          >
            ← Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "13px",
  border: "1px solid #d5dce5",
  borderRadius: "10px",
  marginBottom: "18px",
  fontSize: "15px",
  boxSizing: "border-box",
};

const showButtonStyle = {
  position: "absolute",
  right: "8px",
  top: "7px",
  border: "none",
  background: "transparent",
  color: "#0b4f8a",
  fontWeight: "bold",
  padding: "7px",
};
