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
  "IT & Technology",
  "Transport",
  "Tailoring",
  "Beauty & Hair",
  "Photography",
  "Security",
  "Agriculture",
  "Other",
];

const idTypes = [
  "National ID",
  "Passport",
  "Driving Licence",
  "Voter ID",
  "Other",
];

export default function ProfessionalProfilePage() {
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingId, setUploadingId] = useState(false);
  const [message, setMessage] = useState("");

  const [profilePhotoPreview, setProfilePhotoPreview] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    professional_category: "",
    country: "",
    city: "",
    location: "",
    phone: "",
    email: "",
    description: "",
    experience_years: "",
    availability: "Available",

    national_id_type: "",
    national_id: "",
    national_id_document_url: "",
    profile_photo_url: "",

    verification_status: "Pending",
    is_verified: false,
  });

  useEffect(() => {
    if (!id) return;
    loadProfessional();
  }, [id]);

  async function loadProfessional() {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("professional_profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      setMessage(`Unable to load profile: ${error.message}`);
      setLoading(false);
      return;
    }

    setForm({
      full_name: data?.full_name || data?.professional_name || "",
      professional_category:
        data?.professional_category || data?.professional_title || "",
      country: data?.country || "",
      city: data?.city || "",
      location: data?.location || data?.address || "",
      phone: data?.phone || "",
      email: data?.email || "",
      description: data?.bio || data?.description || "",
      experience_years:
        data?.years_of_experience ?? data?.years_experience ?? "",
      availability: data?.availability || "Available",

      national_id_type: data?.national_id_type || "",
      national_id: data?.national_id || "",
      national_id_document_url: data?.national_id_document_url || "",
      profile_photo_url:
        data?.profile_photo_url ||
        data?.profile_picture_url ||
        data?.profile_photo ||
        "",

      verification_status: data?.verification_status || "Pending",
      is_verified: data?.is_verified || false,
    });

    const existingPhoto =
      data?.profile_photo_url ||
      data?.profile_picture_url ||
      data?.profile_photo ||
      "";

    if (existingPhoto) {
      setProfilePhotoPreview(existingPhoto);
    }

    setLoading(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function uploadProfilePhoto(file) {
    if (!file || !id) return;

    setUploadingPhoto(true);
    setMessage("");

    try {
      const extension = file.name.split(".").pop();
      const filePath = `${id}/profile-${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("professional-profile-pictures")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicData } = supabase.storage
        .from("professional-profile-pictures")
        .getPublicUrl(filePath);

      const photoUrl = publicData?.publicUrl;

      if (!photoUrl) {
        throw new Error("Unable to create profile photo URL.");
      }

      const { error: updateError } = await supabase
        .from("professional_profiles")
        .update({
          profile_photo_url: photoUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (updateError) {
        throw updateError;
      }

      setForm((previous) => ({
        ...previous,
        profile_photo_url: photoUrl,
      }));

      setProfilePhotoPreview(photoUrl);
      setMessage("Profile photo uploaded successfully.");
    } catch (error) {
      console.error(error);
      setMessage(`Error uploading profile photo: ${error.message}`);
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function uploadIdentityDocument(file) {
    if (!file || !id) return;

    setUploadingId(true);
    setMessage("");

    try {
      const extension = file.name.split(".").pop();
      const filePath = `${id}/identity-${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("professional-id-documents")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      /*
       * ID documents should normally remain private.
       * We store the storage path in the database instead of
       * making the identity document publicly accessible.
       */
      const { error: updateError } = await supabase
        .from("professional_profiles")
        .update({
          national_id_document_url: filePath,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (updateError) {
        throw updateError;
      }

      setForm((previous) => ({
        ...previous,
        national_id_document_url: filePath,
      }));

      setMessage("Identity document uploaded successfully.");
    } catch (error) {
      console.error(error);
      setMessage(`Error uploading identity document: ${error.message}`);
    } finally {
      setUploadingId(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("professional_profiles")
      .update({
        full_name: form.full_name,
        professional_category: form.professional_category,
        country: form.country,
        city: form.city,
        location: form.location,
        phone: form.phone,
        email: form.email,
        bio: form.description,
        years_of_experience: form.experience_years
          ? Number(form.experience_years)
          : null,
        availability: form.availability,

        national_id_type: form.national_id_type,
        national_id: form.national_id,

        profile_photo_url: form.profile_photo_url || null,

        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      setMessage(`Error saving profile: ${error.message}`);
      setSaving(false);
      return;
    }

    setMessage("Profile updated successfully.");
    setSaving(false);
  }

  if (loading) {
    return (
      <main className="page">
        <div className="loadingCard">
          <div className="spinner"></div>
          <p>Loading professional profile...</p>
        </div>

        <style jsx>{styles}</style>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">

        {/* HEADER */}
        <div className="topBar">
          <div>
            <Link href="/professionals" className="backLink">
              ← Back to Professionals
            </Link>

            <h1>Professional Profile</h1>

            <p className="subtitle">
              Manage your professional information, identity and profile photo.
            </p>
          </div>

          <div
            className={
              form.availability === "Available"
                ? "status available"
                : "status unavailable"
            }
          >
            <span className="statusDot"></span>
            {form.availability}
          </div>
        </div>

        {/* MESSAGE */}
        {message && (
          <div
            className={
              message.toLowerCase().includes("error")
                ? "message error"
                : "message success"
            }
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSave}>

          {/* PROFILE PHOTO */}
          <section className="card">
            <div className="cardHeader">
              <div className="icon">📷</div>

              <div>
                <h2>Profile Photo</h2>
                <p>
                  Add a clear photo so customers can recognize your profile.
                </p>
              </div>
            </div>

            <div className="photoSection">

              <div className="photoPreview">
                {profilePhotoPreview ? (
                  <img
                    src={profilePhotoPreview}
                    alt="Professional profile"
                  />
                ) : (
                  <div className="photoPlaceholder">
                    <span>👤</span>
                    <small>No Photo</small>
                  </div>
                )}
              </div>

              <div className="photoActions">
                <label className="uploadButton">
                  {uploadingPhoto
                    ? "Uploading..."
                    : profilePhotoPreview
                    ? "Change Profile Photo"
                    : "Upload Profile Photo"}

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    hidden
                    disabled={uploadingPhoto}
                    onChange={(e) =>
                      uploadProfilePhoto(e.target.files?.[0])
                    }
                  />
                </label>

                <p>
                  JPG, PNG or WebP. Use a clear professional photo.
                </p>
              </div>

            </div>
          </section>

          {/* PERSONAL INFORMATION */}
          <section className="card">
            <div className="cardHeader">
              <div className="icon">👤</div>

              <div>
                <h2>Personal Information</h2>
                <p>Basic information about the professional.</p>
              </div>
            </div>

            <div className="formGrid">

              <div className="field">
                <label>Full Name</label>

                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="field">
                <label>Professional Category</label>

                <select
                  name="professional_category"
                  value={form.professional_category}
                  onChange={handleChange}
                >
                  <option value="">Select category</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Phone Number</label>

                <input
                  type="tel"
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
                  placeholder="example@email.com"
                />
              </div>

            </div>
          </section>

          {/* IDENTITY INFORMATION */}
          <section className="card">
            <div className="cardHeader">
              <div className="icon">🪪</div>

              <div>
                <h2>Identity Information</h2>
                <p>
                  Provide your identification details for professional
                  verification.
                </p>
              </div>
            </div>

            <div className="formGrid">

              <div className="field">
                <label>Identity Card Type</label>

                <select
                  name="national_id_type"
                  value={form.national_id_type}
                  onChange={handleChange}
                >
                  <option value="">Select ID type</option>

                  {idTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Identity Card Number</label>

                <input
                  type="text"
                  name="national_id"
                  value={form.national_id}
                  onChange={handleChange}
                  placeholder="Enter identity card number"
                />
              </div>

              <div className="field full">
                <label>Identity Card Document</label>

                <div className="documentBox">

                  <div>
                    <strong>
                      {form.national_id_document_url
                        ? "Identity document uploaded"
                        : "No identity document uploaded"}
                    </strong>

                    <p>
                      Upload a clear copy of your identity document.
                    </p>
                  </div>

                  <label className="documentButton">
                    {uploadingId
                      ? "Uploading..."
                      : form.national_id_document_url
                      ? "Replace Document"
                      : "Upload Document"}

                    <input
                      type="file"
                      hidden
                      accept=".jpg,.jpeg,.png,.webp,.pdf"
                      disabled={uploadingId}
                      onChange={(e) =>
                        uploadIdentityDocument(e.target.files?.[0])
                      }
                    />
                  </label>

                </div>
              </div>

            </div>
          </section>

          {/* LOCATION */}
          <section className="card">
            <div className="cardHeader">
              <div className="icon">📍</div>

              <div>
                <h2>Location</h2>
                <p>Where this professional provides services.</p>
              </div>
            </div>

            <div className="formGrid">

              <div className="field">
                <label>Country</label>

                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="e.g. Tanzania"
                />
              </div>

              <div className="field">
                <label>City</label>

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="e.g. Dar es Salaam"
                />
              </div>

              <div className="field full">
                <label>Location / Area</label>

                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Enter area, street or location"
                />
              </div>

            </div>
          </section>

          {/* PROFESSIONAL DETAILS */}
          <section className="card">
            <div className="cardHeader">
              <div className="icon">🛠️</div>

              <div>
                <h2>Professional Details</h2>
                <p>
                  Tell customers about your skills and experience.
                </p>
              </div>
            </div>

            <div className="formGrid">

              <div className="field">
                <label>Years of Experience</label>

                <input
                  type="number"
                  min="0"
                  name="experience_years"
                  value={form.experience_years}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                />
              </div>

              <div className="field">
                <label>Availability</label>

                <select
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>

              <div className="field full">
                <label>Professional Description</label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your professional skills, services and experience..."
                  rows="6"
                ></textarea>
              </div>

            </div>
          </section>

          {/* VERIFICATION */}
          <section className="card verificationCard">

            <div className="cardHeader">
              <div className="icon">✓</div>

              <div>
                <h2>Verification Status</h2>
                <p>
                  Your verification status will be managed by FUNDI UNIVERSE.
                </p>
              </div>
            </div>

            <div className="verificationBox">

              <div>
                <span className="verificationLabel">
                  Current Status
                </span>

                <strong>
                  {form.is_verified
                    ? "Verified"
                    : form.verification_status || "Pending"}
                </strong>
              </div>

              <div
                className={
                  form.is_verified
                    ? "verificationBadge verified"
                    : "verificationBadge pending"
                }
              >
                {form.is_verified ? "✓ Verified" : "Pending Verification"}
              </div>

            </div>

          </section>

          {/* ACTIONS */}
          <section className="actionsCard">

            <Link
              href="/professionals"
              className="cancelButton"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="saveButton"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>

          </section>

        </form>
      </div>

      <style jsx>{styles}</style>
    </main>
  );
}

const styles = `
  * {
    box-sizing: border-box;
  }

  .page {
    min-height: 100vh;
    background: #f5f7fb;
    padding: 30px 16px 60px;
    color: #172033;
  }

  .container {
    width: 100%;
    max-width: 1050px;
    margin: 0 auto;
  }

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 28px;
  }

  .backLink {
    display: inline-block;
    margin-bottom: 14px;
    color: #2563eb;
    text-decoration: none;
    font-size: 15px;
    font-weight: 600;
  }

  .backLink:hover {
    text-decoration: underline;
  }

  h1 {
    margin: 0;
    font-size: 32px;
    line-height: 1.2;
    font-weight: 800;
  }

  .subtitle {
    margin: 8px 0 0;
    color: #667085;
    font-size: 15px;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
  }

  .status.available {
    background: #ecfdf3;
    color: #087443;
  }

  .status.unavailable {
    background: #fff1f2;
    color: #be123c;
  }

  .statusDot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: currentColor;
  }

  .message {
    margin-bottom: 20px;
    padding: 15px 18px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
  }

  .message.success {
    background: #ecfdf3;
    color: #087443;
    border: 1px solid #a7f3d0;
  }

  .message.error {
    background: #fff1f2;
    color: #be123c;
    border: 1px solid #fecdd3;
  }

  .card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 26px;
    margin-bottom: 22px;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
  }

  .cardHeader {
    display: flex;
    align-items: center;
    gap: 14px;
    padding-bottom: 20px;
    margin-bottom: 22px;
    border-bottom: 1px solid #edf0f4;
  }

  .icon {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    background: #eff6ff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }

  .cardHeader h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 750;
  }

  .cardHeader p {
    margin: 5px 0 0;
    color: #667085;
    font-size: 14px;
  }

  .formGrid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .field.full {
    grid-column: 1 / -1;
  }

  label {
    font-size: 14px;
    font-weight: 700;
    color: #344054;
  }

  input,
  select,
  textarea {
    width: 100%;
    border: 1px solid #d0d5dd;
    border-radius: 10px;
    background: #ffffff;
    color: #101828;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  input,
  select {
    height: 50px;
    padding: 0 14px;
  }

  textarea {
    padding: 14px;
    resize: vertical;
    min-height: 130px;
    font-family: inherit;
    line-height: 1.5;
  }

  input::placeholder,
  textarea::placeholder {
    color: #98a2b3;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  .photoSection {
    display: flex;
    align-items: center;
    gap: 28px;
  }

  .photoPreview {
    width: 150px;
    height: 150px;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid #d0d5dd;
    background: #f8fafc;
    flex-shrink: 0;
  }

  .photoPreview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .photoPlaceholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #98a2b3;
    gap: 6px;
  }

  .photoPlaceholder span {
    font-size: 48px;
  }

  .photoPlaceholder small {
    font-size: 13px;
  }

  .photoActions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .photoActions p {
    margin: 0;
    color: #667085;
    font-size: 13px;
  }

  .uploadButton,
  .documentButton {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 46px;
    padding: 0 18px;
    border-radius: 10px;
    background: #2563eb;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }

  .uploadButton:hover,
  .documentButton:hover {
    background: #1d4ed8;
  }

  .documentBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 18px;
    border: 1px dashed #cbd5e1;
    border-radius: 12px;
    background: #f8fafc;
  }

  .documentBox strong {
    display: block;
    font-size: 14px;
    color: #344054;
  }

  .documentBox p {
    margin: 6px 0 0;
    color: #667085;
    font-size: 13px;
  }

  .verificationBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 18px;
    border-radius: 12px;
    background: #f8fafc;
    border: 1px solid #e5e7eb;
  }

  .verificationBox strong {
    display: block;
    margin-top: 5px;
    font-size: 17px;
  }

  .verificationLabel {
    color: #667085;
    font-size: 13px;
  }

  .verificationBadge {
    padding: 9px 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 700;
  }

  .verificationBadge.verified {
    background: #ecfdf3;
    color: #087443;
  }

  .verificationBadge.pending {
    background: #fff7ed;
    color: #c2410c;
  }

  .actionsCard {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
    padding: 6px 0;
  }

  .cancelButton,
  .saveButton {
    min-height: 48px;
    padding: 0 22px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .cancelButton {
    background: #ffffff;
    color: #344054;
    border: 1px solid #d0d5dd;
  }

  .saveButton {
    border: none;
    background: #2563eb;
    color: #ffffff;
  }

  .saveButton:hover {
    background: #1d4ed8;
  }

  .saveButton:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .loadingCard {
    max-width: 500px;
    margin: 100px auto;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 40px;
    text-align: center;
  }

  .spinner {
    width: 34px;
    height: 34px;
    border: 4px solid #e5e7eb;
    border-top-color: #2563eb;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 18px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 700px) {
    .page {
      padding: 20px 12px 45px;
    }

    .topBar {
      flex-direction: column;
      gap: 14px;
    }

    h1 {
      font-size: 26px;
    }

    .status {
      align-self: flex-start;
    }

    .card {
      padding: 20px 16px;
      border-radius: 14px;
    }

    .formGrid {
      grid-template-columns: 1fr;
      gap: 18px;
    }

    .field.full {
      grid-column: auto;
    }

    .cardHeader {
      align-items: flex-start;
    }

    .cardHeader h2 {
      font-size: 18px;
    }

    .photoSection {
      flex-direction: column;
      align-items: flex-start;
    }

    .photoPreview {
      width: 135px;
      height: 135px;
    }

    .photoActions {
      width: 100%;
    }

    .uploadButton {
      width: 100%;
    }

    .documentBox {
      flex-direction: column;
      align-items: stretch;
    }

    .documentButton {
      width: 100%;
    }

    .verificationBox {
      flex-direction: column;
      align-items: flex-start;
    }

    .actionsCard {
      flex-direction: column-reverse;
      align-items: stretch;
    }

    .cancelButton,
    .saveButton {
      width: 100%;
    }
  }
`;
