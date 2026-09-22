"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [accountType, setAccountType] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);

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
          maxWidth: "520px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "30px 24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
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
              color: "#123b70",
              fontSize: "30px",
            }}
          >
            FUNDI UNIVERSE
          </h1>

          <p
            style={{
              color: "#666",
              marginTop: "8px",
              fontSize: "15px",
            }}
          >
            Create your account and connect with professionals worldwide.
          </p>
        </div>

        <h2
          style={{
            color: "#222",
            fontSize: "22px",
            marginBottom: "15px",
          }}
        >
          Create Account
        </h2>

        {/* Account Type */}
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
          }}
        >
          Account Type
        </label>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <button
            type="button"
            onClick={() => setAccountType("customer")}
            style={{
              padding: "13px",
              borderRadius: "10px",
              border:
                accountType === "customer"
                  ? "2px solid #1769aa"
                  : "1px solid #ddd",
              background:
                accountType === "customer" ? "#eaf4ff" : "#fff",
              color: "#123b70",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            👤 Customer
          </button>

          <button
            type="button"
            onClick={() => setAccountType("professional")}
            style={{
              padding: "13px",
              borderRadius: "10px",
              border:
                accountType === "professional"
                  ? "2px solid #1769aa"
                  : "1px solid #ddd",
              background:
                accountType === "professional" ? "#eaf4ff" : "#fff",
              color: "#123b70",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🛠️ Professional
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "bold",
            }}
          >
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginBottom: "15px",
              boxSizing: "border-box",
            }}
          />

          {/* Email */}
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "bold",
            }}
          >
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginBottom: "15px",
              boxSizing: "border-box",
            }}
          />

          {/* Phone */}
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "bold",
            }}
          >
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            placeholder="+255 7XX XXX XXX"
            value={form.phone}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginBottom: "15px",
              boxSizing: "border-box",
            }}
          />

          {/* Country */}
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "bold",
            }}
          >
            Country
          </label>

          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginBottom: "15px",
              boxSizing: "border-box",
              background: "#fff",
            }}
          >
            <option>Tanzania</option>
            <option>Kenya</option>
            <option>Uganda</option>
            <option>Rwanda</option>
            <option>South Africa</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>United Arab Emirates</option>
            <option>India</option>
            <option>Canada</option>
            <option>Australia</option>
            <option>Germany</option>
            <option>France</option>
            <option>Other Country</option>
          </select>

          {/* Password */}
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "bold",
            }}
          >
            Password
          </label>

          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "15px",
            }}
          >
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              style={{
                flex: 1,
                padding: "13px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                padding: "0 12px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Confirm Password */}
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "bold",
            }}
          >
            Confirm Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginBottom: "20px",
              boxSizing: "border-box",
            }}
          />

          {/* Professional Notice */}
          {accountType === "professional" && (
            <div
              style={{
                background: "#fff8e6",
                border: "1px solid #f0d58a",
                borderRadius: "12px",
                padding: "14px",
                marginBottom: "20px",
                color: "#6b5200",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              <strong>Professional Account</strong>
              <br />
              After registration, you can create your professional profile,
              add your skills and services, experience, location, prices and
              availability.
              <br />
              <br />
              For services that require verification, you may be asked to
              provide certificates, qualifications or other evidence of your
              skills.
            </div>
          )}

          {/* Terms */}
          <p
            style={{
              fontSize: "13px",
              color: "#666",
              lineHeight: "1.5",
              marginBottom: "18px",
            }}
          >
            By creating an account, you agree to use Fundi Universe
            responsibly and provide accurate information.
          </p>

          {/* Sign Up */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "12px",
              border: "none",
              background: "#1769aa",
              color: "#fff",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
        </form>

        {/* Login */}
        <div
          style={{
            textAlign: "center",
            marginTop: "22px",
            color: "#666",
          }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: "#1769aa",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </div>

        {/* Home */}
        <div
          style={{
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#555",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
