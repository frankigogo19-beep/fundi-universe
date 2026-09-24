
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

/*
 * PROFESSIONAL CATEGORIES
 * These IDs must match service_categories in Supabase.
 * We use them directly here so signup does not depend
 * on reading service_categories from the browser.
 */
const professionalCategories = [
  {
    id: "86d45eb0-9abe-413d-8d40-2abd1ee2162e",
    name: "AC Technician",
  },
  {
    id: "08a43c22-84c5-4a9e-bb23-6d4e118e5825",
    name: "Appliance Technician",
  },
  {
    id: "83f1438a-319d-4487-bf03-5eb50a6d3a70",
    name: "Builder",
  },
  {
    id: "5f36d2f3-e323-4ce3-9dc0-be723004c588",
    name: "Carpenter",
  },
  {
    id: "95e6ae3c-0fa7-4692-b47f-8441d4979ef0",
    name: "Cleaning Professional",
  },
  {
    id: "5294374f-9fd1-4aac-b9e1-540d6a5f0712",
    name: "Computer Technician",
  },
  {
    id: "bec95ed0-ff4c-42c7-a329-596a6d7750b9",
    name: "Electrician",
  },
  {
    id: "9d1fdd62-0dc9-4f22-8cd6-62a04c7b5f17",
    name: "Electronics Technician",
  },
  {
    id: "91c3c452-457b-4545-ab52-d420b14d0de2",
    name: "Gardener",
  },
  {
    id: "212cdc95-6639-4133-9769-20810aca8c3e",
    name: "Glass & Aluminium Technician",
  },
  {
    id: "c0a32e73-d454-47c7-8c43-a0bd9e44021f",
    name: "Locksmith",
  },
  {
    id: "c2574dc3-2a0b-4da3-8e0a-24d20f8e0ba0",
    name: "Mechanic",
  },
  {
    id: "a22e31a5-6bd9-4e49-996a-4ac563b60a0d",
    name: "Moving & Relocation",
  },
  {
    id: "28cb67b5-53dc-48e1-9ee4-51918502c6c8",
    name: "Other",
  },
  {
    id: "d3c29201-53d3-4e92-8c39-e2ad12d92db4",
    name: "Painter",
  },
  {
    id: "7d4522fa-1017-4fd7-89a9-b0681dbdd6c7",
    name: "Plumber",
  },
  {
    id: "46cc1441-4f89-43a1-9515-eac0729410eb",
    name: "Roofer",
  },
  {
    id: "4038443b-86b2-4222-8a05-ae294e99e18d",
    name: "Solar Technician",
  },
  {
    id: "f516ae91-fd93-4fe4-b4bd-17e2cd81cd22",
    name: "Tiler",
  },
  {
    id: "68aa928a-6be4-4843-9fa3-ce6d567fa038",
    name: "Welder",
  },
];

export default function SignupPage() {
  const router = useRouter();

  const [accountType, setAccountType] = useState("customer");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [profilePicture, setProfilePicture] =
    useState(null);

  const [nationalIdDocument, setNationalIdDocument] =
    useState(null);

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

  async function uploadFile(
    bucket,
    file,
    userId
  ) {
    if (!file) return null;

    const cleanName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "-")
      .toLowerCase();

    const filePath =
      `${userId}/${Date.now()}-${cleanName}`;

    const { error: uploadError } =
      await supabase.storage
        .from(bucket)
        .upload(
          filePath,
          file,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

    if (uploadError) {
      throw uploadError;
    }

    return filePath;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    /*
     * BASIC VALIDATION
     */
    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.country ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError(
        "Please complete all required fields."
      );
      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    if (
      form.password.length < 6
    ) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    /*
     * PROFESSIONAL VALIDATION
     */
    let selectedCategory = null;

    if (
      accountType ===
      "professional"
    ) {
      if (
        !form.nationalId.trim()
      ) {
        setError(
          "National ID Number is required for professionals."
        );
        return;
      }

      if (
        !form.professionalCategory
      ) {
        setError(
          "Please select your professional category."
        );
        return;
      }

      selectedCategory =
        professionalCategories.find(
          (category) =>
            category.id ===
            form.professionalCategory
        );

      if (!selectedCategory) {
        setError(
          "Invalid professional category selected. Please select a category again."
        );
        return;
      }

      if (!profilePicture) {
        setError(
          "Profile picture is required for professionals."
        );
        return;
      }

      if (
        profilePicture.size >
        5 * 1024 * 1024
      ) {
        setError(
          "Profile picture must be 5MB or smaller."
        );
        return;
      }

      if (
        nationalIdDocument &&
        nationalIdDocument.size >
          10 * 1024 * 1024
      ) {
        setError(
          "National ID document must be 10MB or smaller."
        );
        return;
      }
    }

    setLoading(true);

    try {
      /*
       * CREATE AUTH ACCOUNT
       */
      const {
        data: authData,
        error: authError,
      } =
        await supabase.auth.signUp({
          email:
            form.email.trim(),
          password:
            form.password,
        });

      if (authError) {
        console.error(
          "AUTH ERROR:",
          authError
        );

        setError(
          `Account creation failed: ${
            authError.message ||
            "Unknown authentication error."
          }`
        );

        setLoading(false);
        return;
      }

      const user =
        authData?.user;

      if (!user) {
        setError(
          "Account creation failed. No user was returned."
        );

        setLoading(false);
        return;
      }

      console.log(
        "AUTH USER CREATED:",
        user.id
      );

      /*
       * SAVE BASIC PROFILE
       */
      const {
        error: profileError,
      } =
        await supabase
          .from("profiles")
          .insert({
            id: user.id,

            full_name:
              form.fullName.trim(),

            phone:
              form.phone.trim(),

            email:
              form.email.trim(),
          });

      if (profileError) {
        console.error(
          "PROFILE ERROR:",
          profileError
        );

        setError(
          `Profile could not be saved. Supabase error: ${
            profileError.message ||
            profileError.details ||
            profileError.hint ||
            "Unknown profile error."
          }`
        );

        setLoading(false);
        return;
      }

      console.log(
        "BASIC PROFILE SAVED SUCCESSFULLY"
      );

      /*
       * PROFESSIONAL ACCOUNT
       */
      if (
        accountType ===
        "professional"
      ) {
        const categoryId =
          selectedCategory.id;

        const categoryName =
          selectedCategory.name;

        console.log(
          "SELECTED CATEGORY:",
          categoryName
        );

        console.log(
          "CATEGORY ID:",
          categoryId
        );

        /*
         * UPLOAD PROFILE PICTURE
         */
        let profilePicturePath =
          null;

        try {
          profilePicturePath =
            await uploadFile(
              "professional-profile-pictures",
              profilePicture,
              user.id
            );

          console.log(
            "PROFILE PICTURE UPLOADED:",
            profilePicturePath
          );
        } catch (
          uploadError
        ) {
          console.error(
            "PROFILE PICTURE ERROR:",
            uploadError
          );

          setError(
            `Profile picture upload failed: ${
              uploadError?.message ||
              uploadError?.details ||
              "Unknown storage error."
            }`
          );

          setLoading(false);
          return;
        }

        /*
         * GET PUBLIC PROFILE PICTURE URL
         */
        const {
          data: publicUrlData,
        } =
          supabase.storage
            .from(
              "professional-profile-pictures"
            )
            .getPublicUrl(
              profilePicturePath
            );

        const profilePictureUrl =
          publicUrlData?.publicUrl ||
          null;

        /*
         * UPLOAD OPTIONAL NATIONAL ID
         */
        let nationalIdDocumentPath =
          null;

        if (
          nationalIdDocument
        ) {
          try {
            nationalIdDocumentPath =
              await uploadFile(
                "professional-id-documents",
                nationalIdDocument,
                user.id
              );

            console.log(
              "NATIONAL ID DOCUMENT UPLOADED:",
              nationalIdDocumentPath
            );
          } catch (
            uploadError
          ) {
            console.error(
              "NATIONAL ID DOCUMENT ERROR:",
              uploadError
            );

            setError(
              `National ID document upload failed: ${
                uploadError?.message ||
                uploadError?.details ||
                "Unknown storage error."
              }`
            );

            setLoading(false);
            return;
          }
        }

        /*
         * CREATE PROFESSIONAL PROFILE
         */
        const now =
          new Date().toISOString();

        const {
          error:
            professionalError,
        } =
          await supabase
            .from(
              "professional_profiles"
            )
            .insert({
              id:
                crypto.randomUUID(),

              user_id:
                user.id,

              category_id:
                categoryId,

              full_name:
                form.fullName.trim(),

              professional_name:
                form.fullName.trim(),

              email:
                form.email.trim(),

              phone:
                form.phone.trim(),

              country:
                form.country,

              professional_category:
                categoryName,

              national_id:
                form.nationalId.trim(),

              profile_picture_url:
                profilePictureUrl,

              national_id_document_url:
                nationalIdDocumentPath,

              years_of_experience:
                form.yearsOfExperience
                  ? Number(
                      form.yearsOfExperience
                    )
                  : null,

              bio:
                form.bio.trim() ||
                null,

              currency:
                "USD",

              is_available:
                true,

              is_verified:
                false,

              rating: 0,

              total_reviews: 0,

              verification_status:
                "Pending",

              is_active:
                true,

              created_at:
                now,

              updated_at:
                now,
            });

        if (
          professionalError
        ) {
          console.error(
            "PROFESSIONAL PROFILE ERROR:",
            professionalError
          );

          setError(
            `Professional profile could not be saved: ${
              professionalError.message ||
              professionalError.details ||
              professionalError.hint ||
              "Unknown professional profile error."
            }`
          );

          setLoading(false);
          return;
        }

        console.log(
          "PROFESSIONAL PROFILE SAVED SUCCESSFULLY"
        );
      }

      /*
       * REDIRECT
       */
      if (
        authData.session
      ) {
        setSuccess(
          "Account created successfully. Redirecting..."
        );

        setTimeout(() => {
          if (
            accountType ===
            "professional"
          ) {
            router.push(
              "/professional-dashboard"
            );
          } else {
            router.push(
              "/dashboard"
            );
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
      console.error(
        "GENERAL SIGNUP ERROR:",
        err
      );

      setError(
        `Something went wrong: ${
          err?.message ||
          "Unknown error."
        }`
      );

      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>

        <div style={styles.header}>
          <div style={styles.logo}>
            🌍🔧
          </div>

          <h1 style={styles.title}>
            FUNDI UNIVERSE
          </h1>

          <p style={styles.subtitle}>
            Create your account and join our
            global community
          </p>
        </div>

        <section style={styles.card}>

          <h2 style={styles.heading}>
            Create Account
          </h2>

          <p style={styles.description}>
            Choose how you want to use FUNDI
            UNIVERSE
          </p>

          <div
            style={
              styles.accountTypeGrid
            }
          >
            <button
              type="button"
              onClick={() => {
                setAccountType(
                  "customer"
                );
                setError("");
              }}
              style={{
                ...styles.accountButton,

                ...(accountType ===
                "customer"
                  ? styles.accountButtonActive
                  : {}),
              }}
            >
              👤 Customer
            </button>

            <button
              type="button"
              onClick={() => {
                setAccountType(
                  "professional"
                );
                setError("");
              }}
              style={{
                ...styles.accountButton,

                ...(accountType ===
                "professional"
                  ? styles.accountButtonActive
                  : {}),
              }}
            >
              🔧 Professional
            </button>
          </div>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          {success && (
            <div style={styles.success}>
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={styles.form}
          >

            <label style={styles.label}>
              Full Name{" "}
              <span
                style={styles.required}
              >
                *
              </span>
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
              Email Address{" "}
              <span
                style={styles.required}
              >
                *
              </span>
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
              Phone Number{" "}
              <span
                style={styles.required}
              >
                *
              </span>
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
              Country{" "}
              <span
                style={styles.required}
              >
                *
              </span>
            </label>

            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              style={styles.input}
            >
              {countries.map(
                (country) => (
                  <option
                    key={country}
                    value={country}
                  >
                    {country}
                  </option>
                )
              )}
            </select>

            {accountType ===
              "professional" && (
              <>
                <div
                  style={
                    styles.sectionTitle
                  }
                >
                  Professional Information
                </div>

                <label
                  style={styles.label}
                >
                  Professional Category{" "}
                  <span
                    style={
                      styles.required
                    }
                  >
                    *
                  </span>
                </label>

                <select
                  name="professionalCategory"
                  value={
                    form.professionalCategory
                  }
                  onChange={
                    handleChange
                  }
                  style={
                    styles.input
                  }
                >
                  <option value="">
                    Select your professional
                    category
                  </option>

                  {professionalCategories.map(
                    (category) => (
                      <option
                        key={
                          category.id
                        }
                        value={
                          category.id
                        }
                      >
                        {category.name}
                      </option>
                    )
                  )}
                </select>

                <label
                  style={styles.label}
                >
                  National ID Number{" "}
                  <span
                    style={
                      styles.required
                    }
                  >
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="nationalId"
                  placeholder="Enter your National ID number"
                  value={
                    form.nationalId
                  }
                  onChange={
                    handleChange
                  }
                  style={
                    styles.input
                  }
                />

                <label
                  style={styles.label}
                >
                  Profile Picture{" "}
                  <span
                    style={
                      styles.required
                    }
                  >
                    *
                  </span>
                </label>

                <p
                  style={
                    styles.helpText
                  }
                >
                  Use a clear photo of
                  yourself. Maximum 5MB.
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleProfilePictureChange
                  }
                  style={
                    styles.fileInput
                  }
                />

                {profilePicture && (
                  <div
                    style={
                      styles.fileSelected
                    }
                  >
                    ✓{" "}
                    {
                      profilePicture.name
                    }
                  </div>
                )}

                <label
                  style={styles.label}
                >
                  National ID Document{" "}
                  <span
                    style={
                      styles.optional
                    }
                  >
                    (Optional)
                  </span>
                </label>

                <p
                  style={
                    styles.helpText
                  }
                >
                  You can upload an image
                  or PDF of your ID document.
                  Maximum 10MB.
                </p>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={
                    handleNationalIdDocumentChange
                  }
                  style={
                    styles.fileInput
                  }
                />

                {nationalIdDocument && (
                  <div
                    style={
                      styles.fileSelected
                    }
                  >
                    ✓{" "}
                    {
                      nationalIdDocument.name
                    }
                  </div>
                )}

                <label
                  style={styles.label}
                >
                  Years of Experience{" "}
                  <span
                    style={
                      styles.optional
                    }
                  >
                    (Optional)
                  </span>
                </label>

                <input
                  type="number"
                  name="yearsOfExperience"
                  placeholder="e.g. 5"
                  min="0"
                  max="70"
                  value={
                    form.yearsOfExperience
                  }
                  onChange={
                    handleChange
                  }
                  style={
                    styles.input
                  }
                />

                <label
                  style={styles.label}
                >
                  Professional Bio{" "}
                  <span
                    style={
                      styles.optional
                    }
                  >
                    (Optional)
                  </span>
                </label>

                <textarea
                  name="bio"
                  placeholder="Tell customers about your experience and services..."
                  value={form.bio}
                  onChange={handleChange}
                  rows="4"
                  style={
                    styles.textarea
                  }
                />
              </>
            )}

            <label style={styles.label}>
              Password{" "}
              <span
                style={styles.required}
              >
                *
              </span>
            </label>

            <div
              style={
                styles.passwordWrapper
              }
            >
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                style={
                  styles.passwordInput
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (value) =>
                      !value
                  )
                }
                style={
                  styles.showButton
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>

            <label style={styles.label}>
              Confirm Password{" "}
              <span
                style={styles.required}
              >
                *
              </span>
            </label>

            <div
              style={
                styles.passwordWrapper
              }
            >
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm your password"
                value={
                  form.confirmPassword
                }
                onChange={
                  handleChange
                }
                autoComplete="new-password"
                style={
                  styles.passwordInput
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (value) =>
                      !value
                  )
                }
                style={
                  styles.showButton
                }
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitButton,

                ...(loading
                  ? styles.submitButtonDisabled
                  : {}),
              }}
            >
              {loading
                ? "Creating Account..."
                : accountType ===
                  "professional"
                ? "Create Professional Account"
                : "Create Account"}
            </button>

          </form>

          <div style={styles.loginArea}>
            <p
              style={styles.loginText}
            >
              Already have an account?
            </p>

            <Link
              href="/login"
              style={styles.loginLink}
            >
              Login
            </Link>
          </div>

          <div style={styles.backArea}>
            <Link
              href="/"
              style={styles.backLink}
            >
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
    fontFamily:
      "Arial, sans-serif",
    WebkitTapHighlightColor:
      "transparent",
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
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.08)",
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
    gridTemplateColumns:
      "1fr 1fr",
    gap: "10px",
    marginBottom: "24px",
  },

  accountButton: {
    padding: "14px 8px",
    borderRadius: "10px",
    border:
      "1px solid #d5dce5",
    background: "#fff",
    color: "#0b4f8a",
    fontWeight: "bold",
    cursor: "pointer",
  },

  accountButtonActive: {
    border:
      "2px solid #0b4f8a",
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
    borderBottom:
      "2px solid #e5eef7",
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
    border:
      "1px solid #cfd7e2",
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
    border:
      "1px solid #cfd7e2",
    fontSize: "16px",
    outline: "none",
    background: "#fff",
    color: "#222",
    resize: "vertical",
    fontFamily:
      "Arial, sans-serif",
    lineHeight: 1.5,
  },

  fileInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    borderRadius: "9px",
    border:
      "1px dashed #b8c7d9",
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
    wordBreak:
      "break-word",
  },

  passwordWrapper: {
    display: "flex",
    width: "100%",
    gap: "8px",
    alignItems:
      "stretch",
  },

  passwordInput: {
    flex: 1,
    minWidth: 0,
    boxSizing: "border-box",
    padding: "14px",
    borderRadius: "9px",
    border:
      "1px solid #cfd7e2",
    fontSize: "16px",
    outline: "none",
    background: "#fff",
    color: "#222",
  },

  showButton: {
    flexShrink: 0,
    border:
      "1px solid #cfd7e2",
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
    borderTop:
      "1px solid #e5e7eb",
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
