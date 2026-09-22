"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

    const { data: authData, error: authError } =
      await supabase.auth.signUp({
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
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.logo}>🌍🔧</div>

          <h1 style={styles.title}>FUNDI UNIVERSE</h1>

          <p style={styles.subtitle}>
            Create your account and join our global community
          </p>
        </div>

        <section style={styles.card}>
          <h2 style={styles.heading}>Create Account</h2>

          <p style={styles.description}>
            Choose how you want to use FUNDI UNIVERSE
          </p>

          <div style={styles.accountTypeGrid}>
            <button
              type="button"
              onClick={() => setAccountType("customer")}
              style={{
                ...styles.accountButton,
                ...(accountType === "customer"
                  ? styles.accountButtonActive
                  : {}),
              }}
            >
              👤 Customer
            </button>

            <button
              type="button"
              onClick={() => setAccountType("professional")}
              style={{
                ...styles.accountButton,
                ...(accountType === "professional"
                  ? styles.accountButtonActive
                  : {}),
              }}
            >
              🔧 Professional
            </button>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          {success && <div style={styles.success}>{success}</div>}

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Full Name</label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Country</label>

            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              style={styles.input}
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <label style={styles.label}>Password</label>

            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                style={styles.passwordInput}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.showButton}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <label style={styles.label}>Confirm Password</label>

            <div style={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                style={styles.passwordInput}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                style={styles.showButton}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitButton,
                ...(loading ? styles.submitButtonDisabled : {}),
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div style={styles.loginArea}>
            <p style={styles.loginText}>
              Already have an account?
            </p>

            <Link href="/login" style={styles.loginLink}>
              Login
            </Link>
          </div>

          <div style={styles.backArea}>
            <Link href="/" style={styles.backLink}>
              ← Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f8fc",
    padding: "30px 16px",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "500px",
    margin: "0 auto",
  },

  header: {
    textAlign: "center",
    marginBottom: "25px",
  },

  logo: {
    fontSize: "42px",
    marginBottom: "8px",
  },

  title: {
    margin: 0,
    color: "#0b4f8a",
    fontSize: "30px",
  },

  subtitle: {
    color: "#666",
    marginTop: "8px",
    lineHeight: 1.5,
  },

  card: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "28px 22px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  },

  heading: {
    textAlign: "center",
    color: "#222",
    marginTop: 0,
    marginBottom: "8px",
  },

  description: {
    textAlign: "center",
    color: "#777",
    marginBottom: "24px",
    lineHeight: 1.5,
  },

  accountTypeGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "24px",
  },

  accountButton: {
    padding: "14px 8px",
    borderRadius: "10px",
    border: "1px solid #d5dce5",
    background: "#fff",
    color: "#0b4f8a",
    fontWeight: "bold",
    cursor: "pointer",
  },

  accountButtonActive: {
    border: "2px solid #0b4f8a",
    background: "#eef6ff",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    marginTop: "15px",
    color: "#333",
    fontWeight: "600",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    borderRadius: "9px",
    border: "1px solid #cfd7e2",
    fontSize: "15px",
    outline: "none",
    background: "#fff",
  },

  passwordWrapper: {
    display: "flex",
    gap: "8px",
    alignItems: "stretch",
  },

  passwordInput: {
    flex: 1,
    minWidth: 0,
    boxSizing: "border-box",
    padding: "13px 14px",
    borderRadius: "9px",
    border: "1px solid #cfd7e2",
    fontSize: "15px",
    outline: "none",
  },

  showButton: {
    border: "1px solid #cfd7e2",
    background: "#f8fafc",
    borderRadius: "9px",
    padding: "0 12px",
    cursor: "pointer",
    color: "#0b4f8a",
    fontWeight: "600",
  },

  submitButton: {
    width: "100%",
    marginTop: "24px",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#0b4f8a",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  submitButtonDisabled: {
    opacity: 0.65,
    cursor: "not-allowed",
  },

  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "18px",
    fontSize: "14px",
    lineHeight: 1.5,
  },

  success: {
    background: "#dcfce7",
    color: "#166534",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "18px",
    fontSize: "14px",
    lineHeight: 1.5,
  },

  loginArea: {
    textAlign: "center",
    marginTop: "24px",
    paddingTop: "20px",
    borderTop: "1px solid #e5e7eb",
  },

  loginText: {
    margin: 0,
    color: "#666",
    fontSize: "14px",
  },

  loginLink: {
    display: "inline-block",
    marginTop: "7px",
    color: "#0b4f8a",
    fontWeight: "bold",
    textDecoration: "none",
  },

  backArea: {
    textAlign: "center",
    marginTop: "18px",
  },

  backLink: {
    color: "#666",
    textDecoration: "none",
    fontSize: "14px",
  },
};
