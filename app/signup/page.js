"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

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
  const router = useRouter();

  const [accountType, setAccountType] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.country ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    const {
      data: authData,
      error: authError,
    } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
    });

    if (authError) {
      console.error(authError);
      setError(authError.message || "Unable to create account.");
      setLoading(false);
      return;
    }

    const user = authData?.user;

    if (!user) {
      setError("Account creation failed. Please try again.");
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          user_id: user.id,
          full_name: form.fullName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          role: accountType,
          country: form.country,
        },
      ]);

    if (profileError) {
      console.error(profileError);

      setError(
        "Account was created, but your profile could not be saved."
      );

      setLoading(false);
      return;
    }

    if (accountType === "professional") {
      const { error: professionalError } = await supabase
        .from("professional_profiles")
        .insert([
          {
            user_id: user.id,
            full_name: form.fullName.trim(),
            professional_name: form.fullName.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            country: form.country,
            is_active: true,
            is_available: true,
            is_verified: false,
            verification_status: "Pending",
          },
        ]);

      if (professionalError) {
        console.error(professionalError);

        setError(
          "Your account was created, but the professional profile could not be created."
        );

        setLoading(false);
        return;
      }
    }

    if (authData.session) {
      setSuccess("Account created successfully. Redirecting...");

      setTimeout(() => {
        if (accountType === "professional") {
          router.push("/professional-dashboard");
        } else {
          router.push("/dashboard");
        }

        router.refresh();
      }, 800);
    } else {
      setSuccess(
        "Account created successfully. Please check your email to confirm your account."
      );
      setLoading(false);
    }
  }

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
                  accountType === "customer"
                    ? "#eef6ff"
                    : "#fff",
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

          {error && (
            <div
              style={{
                background: "#fee2e2",
                color: "#991b1b",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "18px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                background: "#dcfce7",
                color: "#166534",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "18px",
                fontSize: "14px",
              }}
            >
              {success}
            </div>
          )}

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
              placeholder="
