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

const professionalCategories = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Mason",
  "Painter",
  "Mechanic",
  "Welder",
  "Tailor",
  "Cleaner",
  "Gardener",
  "IT Technician",
  "Graphic Designer",
  "Photographer",
  "Driver",
  "Construction Worker",
  "AC & Refrigeration Technician",
  "Solar Technician",
  "Security Professional",
  "Hair & Beauty Professional",
  "Other",
];

export default function SignupPage() {
  const router = useRouter();

  const [accountType, setAccountType] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [profilePicture, setProfilePicture] = useState(null);
  const [nationalIdDocument, setNationalIdDocument] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "Tanzania",
    password: "",
    confirmPassword: "",

    nationalId: "",
    professionalCategory: "",
    yearsOfExperience: "",
    bio: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleProfilePictureChange(e) {
    const file = e.target.files?.[0] || null;
    setProfilePicture(file);
  }

  function handleNationalIdDocumentChange(e) {
    const file = e.target.files?.[0] || null;
    setNationalIdDocument(file);
  }

  async function uploadFile(bucket, file, userId) {
    if (!file) return null;

    const cleanName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "-")
      .toLowerCase();

    const filePath = `${userId}/${Date.now()}-${cleanName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    return filePath;
  }

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

    if (accountType === "professional") {
      if (!form.nationalId.trim()) {
        setError("National ID Number is required for professionals.");
        return;
      }

      if (!form.professionalCategory) {
        setError("Please select your professional category.");
        return;
      }

      if (!profilePicture) {
        setError("Profile picture is required for professionals.");
        return;
      }

      if (profilePicture.size > 5 * 1024 * 1024) {
        setError("Profile picture must be 5MB or smaller.");
        return;
      }

      if (nationalIdDocument && nationalIdDocument.size > 10 * 1024 * 1024) {
        setError("National ID document must be 10MB or smaller.");
        return;
      }
    }

    setLoading(true);

    try {
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

      /*
       * Save basic profile
       */
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          full_name: form.fullName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
        });

      if (profileError) {
        console.error(profileError);

        setError(
          "Account was created, but your profile could not be saved."
        );

        setLoading(false);
        return;
      }

      /*
       * PROFESSIONAL ACCOUNT
       */
      if (accountType === "professional") {
        /*
         * Upload profile picture
         */
        let profilePicturePath = null;

        try {
          profilePicturePath = await uploadFile(
            "professional-profile-pictures",
            profilePicture,
            user.id
          );
        } catch (uploadError) {
          console.error(uploadError);

          setError(
            "Account created, but profile picture upload failed. Please try again."
          );

          setLoading(false);
          return;
        }

        /*
         * Get public profile picture URL
         */
        const { data: publicUrlData } = supabase.storage
          .from("professional-profile-pictures")
          .getPublicUrl(profilePicturePath);

        const profilePictureUrl =
          publicUrlData?.publicUrl || null;

        /*
         * Upload optional National ID document
         */
        let nationalIdDocumentPath = null;

        if (nationalIdDocument) {
          try {
            nationalIdDocumentPath = await uploadFile(
              "professional-id-documents",
              nationalIdDocument,
              user.id
            );
          } catch (uploadError) {
            console.error(uploadError);

            setError(
              "Your account and profile picture were created, but the National ID document could not be uploaded."
            );

            setLoading(false);
            return;
          }
        }

        /*
         * Save professional profile
         */
        const { error: professionalError } = await supabase
          .from("professional_profiles")
          .insert({
            user_id: user.id,
            full_name: form.fullName.trim(),
            professional_name: form.fullName.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            country: form.country,

            national_id: form.nationalId.trim(),
            profile_picture_url: profilePictureUrl,
            national_id_document_url: nationalIdDocumentPath,

            professional_category: form.professionalCategory,
            years_of_experience: form.yearsOfExperience
              ? Number(form.yearsOfExperience)
              : null,
            bio: form.bio.trim() || null,

            is_active: true,
            is_available: true,
            is_verified: false,
            verification_status: "Pending",
          });

        if (professionalError) {
          console.error(professionalError);

          setError(
            "Your account was created, but the professional profile could not be saved."
          );

          setLoading(false);
          return;
        }
      }

      /*
       * REDIRECT
       */
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
    } catch (err) {
      console.error(err);

      setError(
        err?.message || "Something went wrong. Please try again."
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
              onClick={() => {
                setAccountType("customer");
                setError("");
              }}
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
              onClick={() => {
                setAccountType("professional");
                setError("");
              }}
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

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>
              Full Name <span style={styles.required}>*</span>
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              autoComplete="name"
              style={styles.input}
            />

            <label style={styles.label}>
              Email Address <span style={styles.required}>*</span>
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              style={styles.input}
            />

            <label style={styles.label}>
              Phone Number <span style={styles.required}>*</span>
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
              style={styles.input}
            />

            <label style={styles.label}>
              Country <span style={styles.required}>*</span>
            </label>

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

            {accountType === "professional" && (
              <>
                <div style={styles.sectionTitle}>
                  Professional Information
                </div>

                <label style={styles.label}>
                  Professional Category{" "}
                  <span style={styles.required}>*</span>
                </label>

                <select
                  name="professionalCategory"
                  value={form.professionalCategory}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    Select your professional category
                  </option>

                  {professionalCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <label style={styles.label}>
                  National ID Number{" "}
                  <span style={styles.required}>*</span>
                </label>

                <input
                  type="text"
                  name="nationalId"
                  placeholder="Enter your National ID number"
                  value={form.nationalId}
                  onChange={handleChange}
                  style={styles.input}
                />

                <label style={styles.label}>
                  Profile Picture{" "}
                  <span style={styles.required}>*</span>
                </label>

                <p style={styles.helpText}>
                  Use a clear photo of yourself. Maximum 5MB.
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  style={styles.fileInput}
                />

                {profilePicture && (
                  <div style={styles.fileSelected}>
                    ✓ {profilePicture.name}
                  </div>
                )}

                <label style={styles.label}>
                  National ID Document{" "}
                  <span style={styles.optional}>(Optional)</span>
                </label>

                <p style={styles.helpText}>
                  You can upload an image or PDF of your ID document.
                  Maximum 10MB.
                </p>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleNationalIdDocumentChange}
                  style={styles.fileInput}
                />

                {nationalIdDocument && (
                  <div style={styles.fileSelected}>
                    ✓ {nationalIdDocument.name}
                  </div>
                )}

                <label style={styles.label}>
                  Years of Experience{" "}
                  <span style={styles.optional}>(Optional)</span>
                </label>

                <input
                  type="number"
                  name="yearsOfExperience"
                  placeholder="e.g. 5"
                  min="0"
                  max="70"
                  value={form.yearsOfExperience}
                  onChange={handleChange}
                  style={styles.input}
                />

                <label style={styles.label}>
                  Professional Bio{" "}
                  <span style={styles.optional}>(Optional)</span>
                </label>

                <textarea
                  name="bio"
                  placeholder="Tell customers about your experience and services..."
                  value={form.bio}
                  onChange={handleChange}
                  rows="4"
                  style={styles.textarea}
                />
              </>
            )}

            <label style={styles.label}>
              Password <span style={styles.required}>*</span>
            </label>

            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                style={styles.passwordInput}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((value) => !value)
                }
                style={styles.showButton}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <label style={styles.label}>
              Confirm Password{" "}
              <span style={styles.required}>*</span>
            </label>

            <div style={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                style={styles.passwordInput}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((value) => !value)
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
              {loading
                ? "Creating Account..."
                : accountType === "professional"
                ? "Create Professional Account"
                : "Create Account"}
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
    WebkitTapHighlightColor: "transparent",
  },

  container: {
    width: "100%",
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

  form: {
    width: "100%",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    marginTop: "15px",
    color: "#333",
    fontWeight: "600",
    fontSize: "14px",
  },

  required: {
    color: "#dc2626",
  },

  optional: {
    color: "#777",
    fontWeight: "400",
  },

  sectionTitle: {
    marginTop: "28px",
    marginBottom: "4px",
    paddingBottom: "10px",
    borderBottom: "2px solid #e5eef7",
    color: "#0b4f8a",
    fontSize: "18px",
    fontWeight: "bold",
  },

  helpText: {
    marginTop: "-2px",
    marginBottom: "8px",
    color: "#777",
    fontSize: "12px",
    lineHeight: 1.4,
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    borderRadius: "9px",
    border: "1px solid #cfd7e2",
    fontSize: "16px",
    outline: "none",
    background: "#fff",
    color: "#222",
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    borderRadius: "9px",
    border: "1px solid #cfd7e2",
    fontSize: "16px",
    outline: "none",
    background: "#fff",
    color: "#222",
    resize: "vertical",
    fontFamily: "Arial, sans-serif",
    lineHeight: 1.5,
  },

  fileInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    borderRadius: "9px",
    border: "1px dashed #b8c7d9",
    background: "#f8fafc",
    fontSize: "14px",
  },

  fileSelected: {
    marginTop: "7px",
    padding: "8px 10px",
    background: "#ecfdf5",
    color: "#166534",
    borderRadius: "7px",
    fontSize: "12px",
    wordBreak: "break-word",
  },

  passwordWrapper: {
    display: "flex",
    width: "100%",
    gap: "8px",
    alignItems: "stretch",
  },

  passwordInput: {
    flex: 1,
    minWidth: 0,
    boxSizing: "border-box",
    padding: "14px",
    borderRadius: "9px",
    border: "1px solid #cfd7e2",
    fontSize: "16px",
    outline: "none",
    background: "#fff",
    color: "#222",
  },

  showButton: {
    flexShrink: 0,
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
    padding: "15px",
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
