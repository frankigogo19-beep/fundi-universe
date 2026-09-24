"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

const categories = [
  "Construction",
  "Electrical",
  "Electronics Technician",
  "Plumbing",
  "Carpentry",
  "Painting",
  "Welding",
  "Cleaning",
  "Gardening",
  "Mechanic",
  "IT",
  "Phone Repair",
  "Computer Repair",
  "Automotive",
  "Tailoring",
  "Beauty",
  "Photography",
  "Catering",
  "Transport",
  "Other",
];

const idTypes = [
  "National ID",
  "Passport",
  "Driver License",
  "Voter ID",
  "Other",
];

export default function ProfessionalProfilePage() {
  const params = useParams();
  const id = params?.id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingId, setUploadingId] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    location: "",
    category_id: "",
    professional_category: "",
    id_type: "",
    id_number: "",
    national_id: "",
    national_id_document_url: "",
    years_of_experience: "",
    bio: "",
    available: true,
    profile_picture_url: "",
    profile_photo_url: "",
  });

  useEffect(() => {
    if (id) {
      loadProfile();
    }
  }, [id]);

  async function loadProfile() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error: fetchError } = await supabase
        .from("professional_profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      if (!data) {
        throw new Error("Professional profile not found.");
      }

      setProfile(data);

      setForm({
        full_name: data.full_name || "",
        email: data.email || "",
        phone: data.phone || "",
        country: data.country || "",
        city: data.city || "",
        location: data.location || "",
        category_id: data.category_id || "",
        professional_category:
          data.professional_category ||
          data.category ||
          "",
        id_type: data.id_type || "",
        id_number: data.id_number || "",
        national_id: data.national_id || "",
        national_id_document_url:
          data.national_id_document_url || "",
        years_of_experience:
          data.years_of_experience ?? "",
        bio: data.bio || "",
        available: data.available ?? true,
        profile_picture_url:
          data.profile_picture_url || "",
        profile_photo_url:
          data.profile_photo_url || "",
      });
    } catch (err) {
      console.error("Load profile error:", err);

      setError(
        err?.message ||
          "Failed to load professional profile."
      );

      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  async function uploadProfilePhoto(e) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadingPhoto(true);
    setMessage("");
    setError("");

    try {
      if (!id) {
        throw new Error(
          "Professional profile ID is missing."
        );
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          "Please upload a JPG, PNG or WebP image."
        );
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error(
          "Image must be less than 5MB."
        );
      }

      const extension =
        file.name
          .split(".")
          .pop()
          ?.toLowerCase() || "jpg";

      const fileName =
        `${id}-${Date.now()}.${extension}`;

      const filePath =
        `professional-profiles/${fileName}`;

      const { error: uploadError } =
        await supabase.storage
          .from(
            "professional-profile-pictures"
          )
          .upload(
            filePath,
            file,
            {
              cacheControl: "3600",
              upsert: false,
              contentType: file.type,
            }
          );

      if (uploadError) {
        throw new Error(
          uploadError.message ||
            "Failed to upload profile photo."
        );
      }

      const { data: urlData } =
        supabase.storage
          .from(
            "professional-profile-pictures"
          )
          .getPublicUrl(filePath);

      const publicUrl =
        urlData?.publicUrl;

      if (!publicUrl) {
        throw new Error(
          "Could not create profile photo URL."
        );
      }

      const { error: updateError } =
        await supabase
          .from("professional_profiles")
          .update({
            profile_picture_url: publicUrl,
            profile_photo_url: publicUrl,
          })
          .eq("id", id);

      if (updateError) {
        throw new Error(
          updateError.message ||
            "Failed to save profile photo."
        );
      }

      setForm((prev) => ({
        ...prev,
        profile_picture_url: publicUrl,
        profile_photo_url: publicUrl,
      }));

      setProfile((prev) => ({
        ...prev,
        profile_picture_url: publicUrl,
        profile_photo_url: publicUrl,
      }));

      setMessage(
        "Profile photo uploaded successfully."
      );
    } catch (err) {
      console.error(
        "Profile photo upload error:",
        err
      );

      setError(
        err?.message ||
          "Failed to upload profile photo."
      );
    } finally {
      setUploadingPhoto(false);
      e.target.value = "";
    }
  }

  async function uploadNationalIdDocument(e) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadingId(true);
    setMessage("");
    setError("");

    try {
      if (!id) {
        throw new Error(
          "Professional profile ID is missing."
        );
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "application/pdf",
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          "Please upload JPG, PNG, WebP or PDF."
        );
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error(
          "ID document must be less than 10MB."
        );
      }

      const extension =
        file.name
          .split(".")
          .pop()
          ?.toLowerCase() || "pdf";

      const fileName =
        `${id}-${Date.now()}.${extension}`;

      const filePath =
        `professional-id-documents/${fileName}`;

      const { error: uploadError } =
        await supabase.storage
          .from(
            "professional-id-documents"
          )
          .upload(
            filePath,
            file,
            {
              cacheControl: "3600",
              upsert: false,
              contentType: file.type,
            }
          );

      if (uploadError) {
        throw new Error(
          uploadError.message ||
            "Failed to upload ID document."
        );
      }

      const { error: updateError } =
        await supabase
          .from("professional_profiles")
          .update({
            national_id_document_url:
              filePath,
          })
          .eq("id", id);

      if (updateError) {
        throw new Error(
          updateError.message ||
            "Failed to save ID document."
        );
      }

      setForm((prev) => ({
        ...prev,
        national_id_document_url:
          filePath,
      }));

      setMessage(
        "Identity document uploaded successfully."
      );
    } catch (err) {
      console.error(
        "ID document upload error:",
        err
      );

      setError(
        err?.message ||
          "Failed to upload ID document."
      );
    } finally {
      setUploadingId(false);
      e.target.value = "";
    }
  }

  async function saveProfile(e) {
    e.preventDefault();

    if (!id) {
      setError(
        "Professional profile ID is missing."
      );
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const updateData = {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        country: form.country,
        city: form.city,
        location: form.location,
        category_id:
          form.category_id || null,
        professional_category:
          form.professional_category,
        id_type: form.id_type,
        id_number: form.id_number,
        national_id: form.national_id,
        national_id_document_url:
          form.national_id_document_url,
        years_of_experience:
          form.years_of_experience === ""
            ? null
            : Number(
                form.years_of_experience
              ),
        bio: form.bio,
        available: form.available,
        profile_picture_url:
          form.profile_picture_url,
        profile_photo_url:
          form.profile_photo_url,
      };

      const { data, error: updateError } =
        await supabase
          .from("professional_profiles")
          .update(updateData)
          .eq("id", id)
          .select()
          .single();

      if (updateError) {
        throw new Error(
          updateError.message ||
            "Failed to save professional profile."
        );
      }

      setProfile(data);

      setForm((prev) => ({
        ...prev,
        ...data,
        full_name: data.full_name || "",
        email: data.email || "",
        phone: data.phone || "",
        country: data.country || "",
        city: data.city || "",
        location: data.location || "",
        category_id:
          data.category_id || "",
        professional_category:
          data.professional_category ||
          data.category ||
          "",
        id_type: data.id_type || "",
        id_number:
          data.id_number || "",
        national_id:
          data.national_id || "",
        national_id_document_url:
          data.national_id_document_url ||
          "",
        years_of_experience:
          data.years_of_experience ?? "",
        bio: data.bio || "",
        available:
          data.available ?? true,
        profile_picture_url:
          data.profile_picture_url ||
          "",
        profile_photo_url:
          data.profile_photo_url ||
          "",
      }));

      setMessage(
        "Professional profile saved successfully."
      );
    } catch (err) {
      console.error(
        "Save profile error:",
        err
      );

      setError(
        err?.message ||
          "Failed to save professional profile."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main style={styles.page}>
        <div style={styles.loadingCard}>
          Loading professional profile...
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1>Professional Profile</h1>

          <p>
            {error ||
              "Profile not found."}
          </p>

          <Link href="/professionals">
            ← Back to Professionals
          </Link>
        </div>
      </main>
    );
  }

  const photoUrl =
    form.profile_picture_url ||
    form.profile_photo_url;

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <Link
          href="/professionals"
          style={styles.backLink}
        >
          ← Back to Professionals
        </Link>

        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>
              Professional Profile
            </h1>

            <p style={styles.subtitle}>
              Manage your professional
              information, identity,
              verification and profile photo.
            </p>
          </div>

          <div
            style={{
              ...styles.status,
              background:
                form.available
                  ? "#dcfce7"
                  : "#fee2e2",
              color:
                form.available
                  ? "#166534"
                  : "#991b1b",
            }}
          >
            {form.available
              ? "Available"
              : "Unavailable"}
          </div>
        </div>

        {message && (
          <div style={styles.success}>
            {message}
          </div>
        )}

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>
            📷 Profile Photo
          </h2>

          <p style={styles.sectionText}>
            Add a clear photo so customers
            can recognize you.
          </p>

          <div style={styles.photoPreview}>
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={
                  form.full_name ||
                  "Professional"
                }
                style={styles.photo}
              />
            ) : (
              <span style={styles.avatar}>
                👤
              </span>
            )}
          </div>

          <label style={styles.uploadButton}>
            {uploadingPhoto
              ? "Uploading..."
              : "Change Profile Photo"}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={
                uploadProfilePhoto
              }
              disabled={
                uploadingPhoto
              }
              hidden
            />
          </label>

          <p style={styles.helpText}>
            JPG, PNG or WebP. Maximum 5MB.
          </p>
        </section>

        <form onSubmit={saveProfile}>
          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>
              👤 Personal Information
            </h2>

            <p style={styles.sectionText}>
              Basic information about the
              professional.
            </p>

            <div style={styles.grid}>
              <Field
                label="Full Name"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Full name"
              />

              <Field
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />

              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+255..."
              />

              <Field
                label="Country"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
              />

              <Field
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
              />

              <Field
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Area / Street / Location"
                full
              />
            </div>
          </section>

          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>
              🛠️ Professional Information
            </h2>

            <p style={styles.sectionText}>
              Skills, category and experience.
            </p>

            <div style={styles.grid}>
              <div style={styles.field}>
                <label style={styles.label}>
                  Professional Category
                </label>

                <select
                  name="professional_category"
                  value={
                    form.professional_category
                  }
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    Select category
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                  )}
                </select>
              </div>

              <Field
                label="Years of Experience"
                name="years_of_experience"
                type="number"
                min="0"
                value={
                  form.years_of_experience
                }
                onChange={handleChange}
                placeholder="e.g. 5"
              />

              <div style={styles.fieldFull}>
                <label style={styles.label}>
                  About Professional
                </label>

                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Describe your skills and experience..."
                  rows={5}
                  style={{
                    ...styles.input,
                    resize: "vertical",
                  }}
                />
              </div>
            </div>
          </section>

          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>
              🪪 Identity & Verification
            </h2>

            <p style={styles.sectionText}>
              Identity information is used
              for professional verification.
            </p>

            <div style={styles.grid}>
              <div style={styles.field}>
                <label style={styles.label}>
                  Identity Card Type
                </label>

                <select
                  name="id_type"
                  value={form.id_type}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    Select ID type
                  </option>

                  {idTypes.map(
                    (type) => (
                      <option
                        key={type}
                        value={type}
                      >
                        {type}
                      </option>
                    )
                  )}
                </select>
              </div>

              <Field
                label="Identity Card Number"
                name="id_number"
                value={form.id_number}
                onChange={handleChange}
                placeholder="Enter ID number"
              />

              <div style={styles.fieldFull}>
                <label style={styles.label}>
                  National ID Number
                </label>

                <input
                  name="national_id"
                  value={form.national_id}
                  onChange={handleChange}
                  placeholder="National ID number"
                  style={styles.input}
                />
              </div>

              <div style={styles.fieldFull}>
                <label style={styles.label}>
                  National ID Document
                </label>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={
                    uploadNationalIdDocument
                  }
                  disabled={uploadingId}
                  style={styles.fileInput}
                />

                <p style={styles.helpText}>
                  {uploadingId
                    ? "Uploading identity document..."
                    : form.national_id_document_url
                    ? "Identity document uploaded."
                    : "Optional. JPG, PNG, WebP or PDF. Maximum 10MB."}
                </p>
              </div>
            </div>
          </section>

          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>
              ⚙️ Availability
            </h2>

            <label style={styles.checkboxRow}>
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
                style={styles.checkbox}
              />

              <span>
                Available for new jobs
              </span>
            </label>
          </section>

          <div style={styles.actions}>
            <button
              type="submit"
              disabled={saving}
              style={{
                ...styles.saveButton,
                opacity: saving ? 0.6 : 1,
              }}
            >
              {saving
                ? "Saving..."
                : "Save Professional Profile"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  full = false,
}) {
  return (
    <div
      style={
        full
          ? styles.fieldFull
          : styles.field
      }
    >
      <label style={styles.label}>
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "24px",
    background: "#f6f8fb",
    color: "#172033",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },

  backLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },

  header: {
    margin: "20px 0 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  title: {
    margin: "0 0 8px",
    fontSize: "32px",
  },

  subtitle: {
    margin: 0,
    color: "#64748b",
  },

  status: {
    padding: "9px 14px",
    borderRadius: "999px",
    fontWeight: "700",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "24px",
    boxSizing: "border-box",
  },

  loadingCard: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "16px",
    textAlign: "center",
  },

  success: {
    padding: "14px 16px",
    marginBottom: "20px",
    borderRadius: "10px",
    background: "#dcfce7",
    color: "#166534",
    fontWeight: "600",
  },

  error: {
    padding: "14px 16px",
    marginBottom: "20px",
    borderRadius: "10px",
    background: "#fee2e2",
    color: "#991b1b",
    fontWeight: "600",
  },

  sectionTitle: {
    margin: "0 0 8px",
    fontSize: "22px",
  },

  sectionText: {
    margin: "0 0 20px",
    color: "#64748b",
  },

  photoPreview: {
    width: "150px",
    height: "150px",
    margin: "20px 0",
    borderRadius: "50%",
    overflow: "hidden",
    background: "#eef2f7",
    border: "4px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  avatar: {
    fontSize: "55px",
  },

  uploadButton: {
    display: "inline-block",
    padding: "11px 18px",
    borderRadius: "9px",
    background: "#2563eb",
    color: "#ffffff",
    fontWeight: "700",
    cursor: "pointer",
  },

  helpText: {
    margin: "10px 0 0",
    color: "#64748b",
    fontSize: "13px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: "18px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  fieldFull: {
    gridColumn: "1 / -1",
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  label: {
    fontWeight: "700",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    padding: "12px",
    fontSize: "15px",
    background: "#ffffff",
  },

  fileInput: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    padding: "10px",
    background: "#ffffff",
  },

  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "700",
    cursor: "pointer",
  },

  checkbox: {
    width: "18px",
    height: "18px",
  },

  actions: {
    paddingBottom: "40px",
  },

  saveButton: {
    border: "none",
    borderRadius: "10px",
    padding: "13px 20px",
    background: "#111827",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  },
};
