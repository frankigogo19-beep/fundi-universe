
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

export default function ProfessionalProfilePage() {
  const params = useParams();
  const id = params?.id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    category: "",
    country: "",
    city: "",
    location: "",
    phone: "",
    email: "",
    bio: "",
    available: true,
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

    const { data, error } = await supabase
      .from("professional_profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      setError("Failed to load professional profile.");
      setLoading(false);
      return;
    }

    setProfile(data);

    setForm({
      full_name: data.full_name || "",
      category: data.category || "",
      country: data.country || "",
      city: data.city || "",
      location: data.location || "",
      phone: data.phone || "",
      email: data.email || "",
      bio: data.bio || "",
      available: data.available ?? true,
      profile_photo_url: data.profile_photo_url || "",
    });

    setLoading(false);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function uploadProfilePhoto(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);
    setMessage("");
    setError("");

    try {
      if (!id) {
        throw new Error("Professional profile ID is missing.");
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error("Please upload a JPG, PNG or WebP image.");
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Image must be less than 5MB.");
      }

      const fileExt = file.name.split(".").pop().toLowerCase();
      const fileName = `${id}-${Date.now()}.${fileExt}`;
      const filePath = `professional-profiles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-photos")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw new Error(uploadError.message);
      }

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("profile-photos")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData?.publicUrl;

      if (!publicUrl) {
        throw new Error("Could not create profile photo URL.");
      }

      const { error: updateError } = await supabase
        .from("professional_profiles")
        .update({
          profile_photo_url: publicUrl,
        })
        .eq("id", id);

      if (updateError) {
        console.error("Database update error:", updateError);
        throw new Error(updateError.message);
      }

      setForm((prev) => ({
        ...prev,
        profile_photo_url: publicUrl,
      }));

      setProfile((prev) => ({
        ...prev,
        profile_photo_url: publicUrl,
      }));

      setMessage("Profile photo uploaded successfully.");
    } catch (err) {
      console.error(err);
      setError(
        err?.message || "Failed to upload profile photo."
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function saveProfile(e) {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    const { error } = await supabase
      .from("professional_profiles")
      .update({
        full_name: form.full_name,
        category: form.category,
        country: form.country,
        city: form.city,
        location: form.location,
        phone: form.phone,
        email: form.email,
        bio: form.bio,
        available: form.available,
        profile_photo_url: form.profile_photo_url,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      setError(error.message);
      setSaving(false);
      return;
    }

    setMessage("Professional profile saved successfully.");

    setProfile((prev) => ({
      ...prev,
      ...form,
    }));

    setSaving(false);
  }

  if (loading) {
    return (
      <main className="page">
        <div className="card">
          <p>Loading professional profile...</p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="page">
        <div className="card">
          <h1>Professional Profile</h1>
          <p>{error || "Profile not found."}</p>

          <Link href="/professionals">
            ← Back to Professionals
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="topbar">
        <Link href="/professionals">
          ← Back to Professionals
        </Link>
      </div>

      <div className="header">
        <div>
          <h1>Professional Profile</h1>
          <p>
            Manage your professional information, identity and
            profile photo.
          </p>
        </div>

        <div
          className={
            form.available
              ? "status available"
              : "status unavailable"
          }
        >
          {form.available ? "Available" : "Unavailable"}
        </div>
      </div>

      {message && (
        <div className="success">
          {message}
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <section className="card photo-card">
        <div>
          <h2>📷 Profile Photo</h2>

          <p>
            Add a clear photo so customers can recognize your
            profile.
          </p>

          <div className="photo-preview">
            {form.profile_photo_url ? (
              <img
                src={form.profile_photo_url}
                alt={form.full_name || "Professional"}
              />
            ) : (
              <div className="placeholder">
                👤
              </div>
            )}
          </div>

          <label className="upload-button">
            {uploading
              ? "Uploading..."
              : "Change Profile Photo"}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={uploadProfilePhoto}
              disabled={uploading}
              hidden
            />
          </label>

          <small>
            JPG, PNG or WebP. Maximum size 5MB.
          </small>
        </div>
      </section>

      <form onSubmit={saveProfile}>
        <section className="card">
          <h2>👤 Personal Information</h2>
          <p>Basic information about the professional.</p>

          <div className="grid">
            <div className="field">
              <label>Full Name</label>
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Full name"
              />
            </div>

            <div className="field">
              <label>Category</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">
                  Select category
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Country</label>

              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </div>

            <div className="field">
              <label>City</label>

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
              />
            </div>

            <div className="field full">
              <label>Location</label>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Area / Street / Location"
              />
            </div>

            <div className="field">
              <label>Phone Number</label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+255..."
              />
            </div>

            <div className="field">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
            </div>

            <div className="field full">
              <label>About Professional</label>

              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Describe your skills and experience..."
                rows={5}
              />
            </div>

            <div className="availability">
              <label>
                <input
                  type="checkbox"
                  name="available"
                  checked={form.available}
                  onChange={handleChange}
                />

                <span>
                  Available for new jobs
                </span>
              </label>
            </div>
          </div>
        </section>

        <div className="actions">
          <button
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Professional Profile"}
          </button>
        </div>
      </form>

      <style jsx>{`
        .page {
          min-height: 100vh;
          padding: 24px;
          background: #f6f8fb;
          color: #172033;
        }

        .topbar {
          max-width: 1000px;
          margin: 0 auto 20px;
        }

        .topbar a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 600;
        }

        .header {
          max-width: 1000px;
          margin: 0 auto 24px;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: center;
        }

        h1 {
          margin: 0 0 8px;
          font-size: 32px;
        }

        h2 {
          margin: 0 0 8px;
          font-size: 22px;
        }

        p {
          margin: 0 0 16px;
          color: #64748b;
        }

        .status {
          padding: 9px 14px;
          border-radius: 999px;
          font-weight: 700;
          white-space: nowrap;
        }

        .available {
          background: #dcfce7;
          color: #166534;
        }

        .unavailable {
          background: #fee2e2;
          color: #991b1b;
        }

        .card {
          max-width: 1000px;
          margin: 0 auto 24px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
        }

        .success,
        .error {
          max-width: 1000px;
          margin: 0 auto 20px;
          padding: 14px 16px;
          border-radius: 10px;
          font-weight: 600;
        }

        .success {
          background: #dcfce7;
          color: #166534;
        }

        .error {
          background: #fee2e2;
          color: #991b1b;
        }

        .photo-card {
          display: flex;
          align-items: center;
        }

        .photo-preview {
          width: 150px;
          height: 150px;
          margin: 20px 0;
          border-radius: 50%;
          overflow: hidden;
          background: #eef2f7;
          border: 4px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .photo-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .placeholder {
          font-size: 55px;
        }

        .upload-button {
          display: inline-block;
          padding: 11px 18px;
          border-radius: 9px;
          background: #2563eb;
          color: white;
          font-weight: 700;
          cursor: pointer;
          margin-right: 12px;
        }

        .upload-button:hover {
          background: #1d4ed8;
        }

        small {
          color: #64748b;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .field.full {
          grid-column: 1 / -1;
        }

        label {
          font-weight: 700;
        }

        input,
        select,
        textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #cbd5e1;
          border-radius: 9px;
          padding: 12px;
          font-size: 15px;
          background: white;
        }

        textarea {
          resize: vertical;
        }

        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .availability {
          grid-column: 1 / -1;
        }

        .availability label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .availability input {
          width: auto;
        }

        .actions {
          max-width: 1000px;
          margin: 0 auto;
          padding-bottom: 40px;
        }

        .actions button {
          border: none;
          border-radius: 10px;
          padding: 13px 20px;
          background: #111827;
          color: white;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
        }

        .actions button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 700px) {
          .page {
            padding: 16px;
          }

          .header {
            align-items: flex-start;
            flex-direction: column;
          }

          .grid {
            grid-template-columns: 1fr;
          }

          .field.full {
            grid-column: auto;
          }

          .availability {
            grid-column: auto;
          }

          .card {
            padding: 18px;
          }

          h1 {
            font-size: 27px;
          }
        }
      `}</style>
    </main>
  );
}

  

   
