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
    setMessage("");

    try {
      const { data, error: fetchError } = await supabase
        .from("professional_profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        throw new Error(
          fetchError.message || "Failed to load professional profile."
        );
      }

      if (!data) {
        throw new Error("Professional profile not found.");
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
    } catch (err) {
      console.error("Load profile error:", err);
      setError(
        err?.message || "Failed to load professional profile."
      );
      setProfile(null);
    } finally {
      setLoading(false);
    }
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

    if (!file) {
      return;
    }

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
        throw new Error(
          "Please upload a JPG, PNG or WebP image."
        );
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Image must be less than 5MB.");
      }

      const fileExtension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const fileName = `${id}-${Date.now()}.${fileExtension}`;

      const filePath = `professional-profiles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-photos")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);

        throw new Error(
          uploadError.message ||
            "Failed to upload profile photo."
        );
      }

      const { data: publicUrlData } = supabase.storage
        .from("profile-photos")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData?.publicUrl;

      if (!publicUrl) {
        throw new Error(
          "Could not create profile photo URL."
        );
      }

      const { error: updateError } = await supabase
        .from("professional_profiles")
        .update({
          profile_photo_url: publicUrl,
        })
        .eq("id", id);

      if (updateError) {
        console.error(
          "Profile photo database error:",
          updateError
        );

        throw new Error(
          updateError.message ||
            "Failed to save profile photo."
        );
      }

      setForm((prev) => ({
        ...prev,
        profile_photo_url: publicUrl,
      }));

      setProfile((prev) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          profile_photo_url: publicUrl,
        };
      });

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
      setUploading(false);

      if (e.target) {
        e.target.value = "";
      }
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
      const { data, error: updateError } = await supabase
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
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        console.error(
          "Profile save error:",
          updateError
        );

        throw new Error(
          updateError.message ||
            "Failed to save professional profile."
        );
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
        profile_photo_url:
          data.profile_photo_url || "",
      });

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
      <main
        style={{
          minHeight: "100vh",
          padding: "24px",
          background: "#f6f8fb",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <p>Loading professional profile...</p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "24px",
          background: "#f6f8fb",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            background: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
          }}
        >
          <h1>Professional Profile</h1>

          <p>
            {error || "Profile not found."}
          </p>

          <Link href="/professionals">
            ← Back to Professionals
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px",
        background: "#f6f8fb",
        color: "#172033",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto 20px",
        }}
      >
        <Link
          href="/professionals"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          ← Back to Professionals
        </Link>
      </div>

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "32px",
            }}
          >
            Professional Profile
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
            }}
          >
            Manage your professional information,
            identity and profile photo.
          </p>
        </div>

        <div
          style={{
            padding: "9px 14px",
            borderRadius: "999px",
            fontWeight: "700",
            background: form.available
              ? "#dcfce7"
              : "#fee2e2",
            color: form.available
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
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto 20px",
            padding: "14px 16px",
            borderRadius: "10px",
            background: "#dcfce7",
            color: "#166534",
            fontWeight: "600",
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto 20px",
            padding: "14px 16px",
            borderRadius: "10px",
            background: "#fee2e2",
            color: "#991b1b",
            fontWeight: "600",
          }}
        >
          {error}
        </div>
      )}

      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto 24px",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "24px",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            margin: "0 0 8px",
            fontSize: "22px",
          }}
        >
          📷 Profile Photo
        </h2>

        <p
          style={{
            margin: "0 0 16px",
            color: "#64748b",
          }}
        >
          Add a clear photo so customers can
          recognize your profile.
        </p>

        <div
          style={{
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
          }}
        >
          {form.profile_photo_url ? (
            <img
              src={form.profile_photo_url}
              alt={
                form.full_name ||
                "Professional"
              }
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                fontSize: "55px",
              }}
            >
              👤
            </div>
          )}
        </div>

        <label
          style={{
            display: "inline-block",
            padding: "11px 18px",
            borderRadius: "9px",
            background: "#2563eb",
            color: "#ffffff",
            fontWeight: "700",
            cursor: uploading
              ? "not-allowed"
              : "pointer",
            opacity: uploading ? 0.7 : 1,
          }}
        >
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

        <div
          style={{
            marginTop: "10px",
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          JPG, PNG or WebP. Maximum size 5MB.
        </div>
      </section>

      <form onSubmit={saveProfile}>
        <section
          style={{
            maxWidth: "1000px",
            margin: "0 auto 24px",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "24px",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              margin: "0 0 8px",
              fontSize: "22px",
            }}
          >
            👤 Personal Information
          </h2>

          <p
            style={{
              margin: "0 0 20px",
              color: "#64748b",
            }}
          >
            Basic information about the professional.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, minmax(0, 1fr))",
              gap: "18px",
            }}
          >
            <div>
              <label
                htmlFor="full_name"
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontWeight: "700",
                }}
              >
                Full Name
              </label>

              <input
                id="full_name"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Full name"
                style={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="category"
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontWeight: "700",
                }}
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                style={inputStyle}
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

            <div>
              <label
                htmlFor="country"
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontWeight: "700",
                }}
              >
                Country
              </label>

              <input
                id="country"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                style={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="city"
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontWeight: "700",
                }}
              >
                City
              </label>

              <input
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                style={inputStyle}
              />
            </div>

            <div
              style={{
                gridColumn: "1 / -1",
              }}
            >
              <label
                htmlFor="location"
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontWeight: "700",
                }}
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Area / Street / Location"
                style={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontWeight: "700",
                }}
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+255..."
                style={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontWeight: "700",
                }}
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
                style={inputStyle}
              />
            </div>

            <div
              style={{
                gridColumn: "1 / -1",
              }}
            >
              <label
                htmlFor="bio"
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontWeight: "700",
                }}
              >
                About Professional
              </label>

              <textarea
                id="bio"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Describe your skills and experience..."
                rows={5}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
              />
            </div>

            <div
              style={{
                gridColumn: "1 / -1",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="available"
                  checked={form.available}
                  onChange={handleChange}
                  style={{
                    width: "18px",
                    height: "18px",
                  }}
                />

                <span>
                  Available for new jobs
                </span>
              </label>
            </div>
          </div>
        </section>

        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            paddingBottom: "40px",
          }}
        >
          <button
            type="submit"
            disabled={saving}
            style={{
              border: "none",
              borderRadius: "10px",
              padding: "13px 20px",
              background: "#111827",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "700",
              cursor: saving
                ? "not-allowed"
                : "pointer",
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving
              ? "Saving..."
              : "Save Professional Profile"}
          </button>
        </div>
      </form>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #cbd5e1",
  borderRadius: "9px",
  padding: "12px",
  fontSize: "15px",
  background: "#ffffff",
};
