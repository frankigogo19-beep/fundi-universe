"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

export default function ProfessionalProfile() {
  const params = useParams();

  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfessional() {
      if (!params?.id) return;

      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("professional_profiles")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.error(error);
        setError("Professional profile could not be found.");
        setProfessional(null);
      } else {
        setProfessional(data);
      }

      setLoading(false);
    }

    loadProfessional();
  }, [params?.id]);

  if (loading) {
    return (
      <main style={styles.container}>
        <p style={styles.loading}>Loading professional profile...</p>
      </main>
    );
  }

  if (error || !professional) {
    return (
      <main style={styles.container}>
        <div style={styles.errorBox}>
          <h2>Profile Not Found</h2>
          <p>{error || "This professional profile does not exist."}</p>

          <button
            onClick={() => (window.location.href = "/professionals")}
            style={styles.backButton}
          >
            Back to Professionals
          </button>
        </div>
      </main>
    );
  }

  const initials = professional.full_name
    ? professional.full_name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "FU";

  return (
    <main style={styles.container}>
      <button
        onClick={() => (window.location.href = "/professionals")}
        style={styles.backButton}
      >
        ← Back to Professionals
      </button>

      <section style={styles.profileCard}>
        <div style={styles.profileHeader}>
          {professional.profile_photo ? (
            <img
              src={professional.profile_photo}
              alt={professional.full_name || "Professional"}
              style={styles.photo}
            />
          ) : (
            <div style={styles.initials}>{initials}</div>
          )}

          <div style={styles.headerInfo}>
            <div style={styles.nameRow}>
              <h1 style={styles.name}>
                {professional.full_name || "Professional"}
              </h1>

              {professional.is_verified && (
                <span style={styles.verified}>
                  ✓ Verified
                </span>
              )}
            </div>

            <p style={styles.title}>
              {professional.professional_title ||
                professional.professional_category ||
                "Professional Service Provider"}
            </p>

            <p style={styles.location}>
              📍{" "}
              {professional.location ||
                professional.city ||
                professional.country ||
                "Location not provided"}
            </p>

            {professional.availability && (
              <span style={styles.availability}>
                {professional.availability}
              </span>
            )}
          </div>
        </div>

        <div style={styles.divider}></div>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>About</h2>

          <p style={styles.text}>
            {professional.bio ||
              "This professional has not added a biography yet."}
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Professional Information</h2>

          <div style={styles.infoGrid}>
            <div style={styles.infoBox}>
              <strong>Category</strong>
              <span>
                {professional.professional_category || "Not provided"}
              </span>
            </div>

            <div style={styles.infoBox}>
              <strong>Experience</strong>
              <span>
                {professional.years_of_experience
                  ? `${professional.years_of_experience} years`
                  : "Not provided"}
              </span>
            </div>

            <div style={styles.infoBox}>
              <strong>Country</strong>
              <span>{professional.country || "Not provided"}</span>
            </div>

            <div style={styles.infoBox}>
              <strong>City</strong>
              <span>{professional.city || "Not provided"}</span>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Skills</h2>

          <div style={styles.skills}>
            {professional.skills ? (
              professional.skills
                .split(",")
                .map((skill, index) => (
                  <span key={index} style={styles.skill}>
                    {skill.trim()}
                  </span>
                ))
            ) : (
              <p style={styles.text}>No skills listed yet.</p>
            )}
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Qualifications</h2>

          <p style={styles.text}>
            {professional.qualifications ||
              "No qualifications provided yet."}
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Certificates</h2>

          <p style={styles.text}>
            {professional.certificates ||
              "No certificates provided yet."}
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Verification</h2>

          <div style={styles.verificationBox}>
            <strong>Status:</strong>{" "}
            {professional.verification_status || "Pending"}

            {professional.verification_notes && (
              <p style={styles.text}>
                {professional.verification_notes}
              </p>
            )}
          </div>
        </section>

        {professional.hourly_rate && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Service Rate</h2>

            <p style={styles.rate}>
              {professional.hourly_rate}{" "}
              {professional.currency || ""}
              <span style={styles.perHour}> / hour</span>
            </p>
          </section>
        )}

        <div style={styles.actionArea}>
          <button
            onClick={() => {
              alert(
                "Service request system will be connected next."
              );
            }}
            style={styles.requestButton}
          >
            Request Service
          </button>
        </div>
      </section>
    </main>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px 20px",
    background: "#f5f7fb",
    fontFamily: "Arial, sans-serif",
  },

  loading: {
    textAlign: "center",
    fontSize: "18px",
    paddingTop: "50px",
  },

  errorBox: {
    maxWidth: "700px",
    margin: "50px auto",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
  },

  backButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "20px",
    padding: "8px 0",
  },

  profileCard: {
    maxWidth: "900px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "30px",
    boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
  },

  profileHeader: {
    display: "flex",
    gap: "22px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  photo: {
    width: "130px",
    height: "130px",
    objectFit: "cover",
    borderRadius: "50%",
  },

  initials: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    background: "#e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    fontWeight: "bold",
  },

  headerInfo: {
    flex: 1,
  },

  nameRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  name: {
    margin: "0",
    fontSize: "30px",
  },

  verified: {
    background: "#e8f7ee",
    color: "#16803c",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold",
  },

  title: {
    fontSize: "18px",
    margin: "8px 0",
  },

  location: {
    color: "#555",
    margin: "8px 0",
  },

  availability: {
    display: "inline-block",
    marginTop: "8px",
    padding: "6px 10px",
    background: "#eef4ff",
    borderRadius: "20px",
    fontSize: "13px",
  },

  divider: {
    height: "1px",
    background: "#e5e7eb",
    margin: "28px 0",
  },

  section: {
    marginBottom: "28px",
  },

  sectionTitle: {
    fontSize: "21px",
    marginBottom: "12px",
  },

  text: {
    color: "#555",
    lineHeight: "1.7",
    whiteSpace: "pre-line",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
  },

  infoBox: {
    padding: "15px",
    background: "#f7f8fa",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  skill: {
    background: "#eef4ff",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "14px",
  },

  verificationBox: {
    padding: "16px",
    background: "#f7f8fa",
    borderRadius: "10px",
  },

  rate: {
    fontSize: "24px",
    fontWeight: "bold",
  },

  perHour: {
    fontSize: "15px",
    fontWeight: "normal",
  },

  actionArea: {
    marginTop: "35px",
    textAlign: "center",
  },

  requestButton: {
    width: "100%",
    maxWidth: "450px",
    padding: "15px 20px",
    border: "none",
    borderRadius: "10px",
    background: "#111827",
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
