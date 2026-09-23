"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function ProfessionalDashboard() {
  const [requests, setRequests] = useState([]);
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const [locationLoading, setLocationLoading] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please login to access your professional dashboard.");
      setLoading(false);
      return;
    }

    const { data: professionalData, error: professionalError } =
      await supabase
        .from("professional_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

    if (professionalError) {
      console.error(professionalError);
      setError("Unable to load your professional profile.");
      setLoading(false);
      return;
    }

    if (!professionalData) {
      setError(
        "Professional profile not found. Please complete your professional profile."
      );
      setLoading(false);
      return;
    }

    setProfessional(professionalData);

    if (
      professionalData.latitude !== null &&
      professionalData.latitude !== undefined &&
      professionalData.longitude !== null &&
      professionalData.longitude !== undefined
    ) {
      setLocationMessage("Your location is enabled.");
    }

    const { data, error: fetchError } = await supabase
      .from("job_requests")
      .select(`
        *,
        professional_profiles (
          id,
          full_name,
          professional_title,
          professional_category
        )
      `)
      .eq("professional_id", professionalData.id)
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error(fetchError);
      setError("Unable to load your service requests.");
      setRequests([]);
    } else {
      setRequests(data || []);
    }

    setLoading(false);
  }

  async function enableLocation() {
    if (!professional) {
      setLocationError("Professional profile not found.");
      return;
    }

    setLocationLoading(true);
    setLocationMessage("");
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError(
        "Location is not supported by this browser."
      );
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const updatedAt = new Date().toISOString();

        const { error: updateError } = await supabase
          .from("professional_profiles")
          .update({
            latitude,
            longitude,
            location_updated_at: updatedAt,
          })
          .eq("id", professional.id);

        if (updateError) {
          console.error("Location update error:", updateError);

          setLocationError(
            `Unable to save your location: ${updateError.message}`
          );

          setLocationLoading(false);
          return;
        }

        setProfessional((previous) => ({
          ...(previous || {}),
          latitude,
          longitude,
          location_updated_at: updatedAt,
        }));

        setLocationMessage(
          "Location enabled successfully. FUNDI UNIVERSE can now use your location to help customers find you nearby."
        );

        setLocationLoading(false);
      },
      (geoError) => {
        console.error("Geolocation error:", geoError);

        if (geoError.code === 1) {
          setLocationError(
            "Location permission was denied. Please allow location access in your browser settings."
          );
        } else if (geoError.code === 2) {
          setLocationError(
            "Your location could not be determined. Please try again."
          );
        } else if (geoError.code === 3) {
          setLocationError(
            "Location request timed out. Please try again."
          );
        } else {
          setLocationError(
            "Unable to access your location. Please try again."
          );
        }

        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000,
      }
    );
  }

  async function updateRequest(request, newStatus) {
    if (!request?.id || !professional?.id) {
      return;
    }

    setActionLoading(request.id);
    setError("");

    const now = new Date().toISOString();

    const { error: updateError } = await supabase
      .from("job_requests")
      .update({
        status: newStatus,
        updated_at: now,
      })
      .eq("id", request.id)
      .eq("professional_id", professional.id);

    if (updateError) {
      console.error(updateError);
      setError("Unable to update the service request.");
      setActionLoading(null);
      return;
    }

    if (request.customer_id) {
      const { error: notificationError } = await supabase
        .from("notifications")
        .insert([
          {
            user_id: request.customer_id,
            title: `Service Request ${newStatus}`,
            message: `Your service request "${
              request.title || "Service Request"
            }" is now ${newStatus}.`,
            type: "job_request_update",
            related_request_id: request.id,
            is_read: false,
          },
        ]);

      if (notificationError) {
        console.error(notificationError);
      }
    }

    setRequests((previous) =>
      previous.map((item) =>
        item.id === request.id
          ? {
              ...item,
              status: newStatus,
              updated_at: now,
            }
          : item
      )
    );

    setActionLoading(null);
  }

  async function updateNotes(requestId, notes) {
    if (!professional?.id) {
      return;
    }

    setActionLoading(requestId);
    setError("");

    const now = new Date().toISOString();

    const { error: updateError } = await supabase
      .from("job_requests")
      .update({
        professional_notes: notes,
        updated_at: now,
      })
      .eq("id", requestId)
      .eq("professional_id", professional.id);

    if (updateError) {
      console.error(updateError);
      setError("Unable to save your notes.");
      setActionLoading(null);
      return;
    }

    setRequests((previous) =>
      previous.map((request) =>
        request.id === requestId
          ? {
              ...request,
              professional_notes: notes,
              updated_at: now,
            }
          : request
      )
    );

    setActionLoading(null);
  }

  function getStatusClass(status) {
    const value = (status || "").toLowerCase();

    if (value === "pending") {
      return "status pending";
    }

    if (value === "accepted") {
      return "status accepted";
    }

    if (value === "rejected") {
      return "status rejected";
    }

    if (value === "in progress" || value === "started") {
      return "status progress";
    }

    if (value === "completed") {
      return "status completed";
    }

    return "status";
  }

  const locationEnabled =
    professional?.latitude !== null &&
    professional?.latitude !== undefined &&
    professional?.longitude !== null &&
    professional?.longitude !== undefined;

  if (loading) {
    return (
      <main className="page">
        <div className="container">
          <div className="loading">
            Loading professional dashboard...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">
        <header className="topbar">
          <div>
            <p className="eyebrow">FUNDI UNIVERSE</p>

            <h1>Professional Dashboard</h1>

            {professional && (
              <p className="welcome">
                Welcome,{" "}
                {professional.full_name ||
                  professional.professional_name ||
                  "Professional"}
              </p>
            )}
          </div>

          <div className="top-actions">
            <Link
              href="/professionals"
              className="secondary-button"
            >
              View Professionals
            </Link>

            <Link
              href="/"
              className="secondary-button"
            >
              Home
            </Link>
          </div>
        </header>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {professional && (
          <section className="profile-summary">
            <div>
              <h2>
                {professional.full_name ||
                  professional.professional_name ||
                  "Professional"}
              </h2>

              <p>
                {professional.professional_title ||
                  professional.professional_category ||
                  "Professional"}
              </p>

              <div className="profile-meta">
                <span>
                  {professional.country || "Country not set"}
                </span>

                <span>
                  {professional.city || "City not set"}
                </span>

                <span>
                  {professional.verification_status || "Pending"}
                </span>
              </div>
            </div>

            <div className="profile-actions">
              <Link
                href={`/professionals/${professional.id}`}
                className="primary-button"
              >
                View My Profile
              </Link>
            </div>
          </section>
        )}

        {professional && (
          <section className="location-card">
            <div className="location-icon">
              📍
            </div>

            <div className="location-content">
              <p className="eyebrow">
                YOUR LOCATION
              </p>

              <h2>
                {locationEnabled
                  ? "Location Enabled"
                  : "Enable Your Location"}
              </h2>

              <p>
                {locationEnabled
                  ? "Your location is saved securely and can help customers find you when they search for nearby professionals."
                  : "Allow FUNDI UNIVERSE to access your location so customers can find you when they search for nearby professionals."}
              </p>

              {locationMessage && (
                <div className="success-message">
                  ✓ {locationMessage}
                </div>
              )}

              {locationError && (
                <div className="location-error">
                  {locationError}
                </div>
              )}

              {!locationEnabled && (
                <button
                  type="button"
                  className="location-button"
                  onClick={enableLocation}
                  disabled={locationLoading}
                >
                  {locationLoading
                    ? "Getting Location..."
                    : "📍 Enable My Location"}
                </button>
              )}

              {locationEnabled && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={enableLocation}
                  disabled={locationLoading}
                >
                  {locationLoading
                    ? "Updating..."
                    : "Update My Location"}
                </button>
              )}
            </div>
          </section>
        )}

        <section className="stats-grid">
          <div className="stat-card">
            <span>Total Requests</span>
            <strong>{requests.length}</strong>
          </div>

          <div className="stat-card">
            <span>Pending</span>

            <strong>
              {
                requests.filter(
                  (request) =>
                    (request.status || "").toLowerCase() ===
                    "pending"
                ).length
              }
            </strong>
          </div>

          <div className="stat-card">
            <span>Accepted</span>

            <strong>
              {
                requests.filter(
                  (request) =>
                    (request.status || "").toLowerCase() ===
                    "accepted"
                ).length
              }
            </strong>
          </div>

          <div className="stat-card">
            <span>Completed</span>

            <strong>
              {
                requests.filter(
                  (request) =>
                    (request.status || "").toLowerCase() ===
                    "completed"
                ).length
              }
            </strong>
          </div>
        </section>

        <section className="requests-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                SERVICE REQUESTS
              </p>

              <h2>
                Requests From Customers
              </h2>
            </div>
          </div>

          {requests.length === 0 ? (
            <div className="empty-box">
              <h3>
                No service requests yet
              </h3>

              <p>
                When customers send you service requests,
                they will appear here.
              </p>
            </div>
          ) : (
            <div className="requests-list">
              {requests.map((request) => (
                <article
                  className="request-card"
                  key={request.id}
                >
                  <div className="request-header">
                    <div>
                      <h3>
                        {request.title ||
                          "Service Request"}
                      </h3>

                      <p className="request-date">
                        {request.created_at
                          ? new Date(
                              request.created_at
                            ).toLocaleString()
                          : ""}
                      </p>
                    </div>

                    <span
                      className={getStatusClass(
                        request.status
                      )}
                    >
                      {request.status ||
                        "Pending"}
                    </span>
                  </div>

                  <div className="request-body">
                    <p>
                      {request.description ||
                        "No description provided."}
                    </p>

                    <div className="details-grid">
                      <div>
                        <span>Category</span>

                        <strong>
                          {request.category ||
                            "Not specified"}
                        </strong>
                      </div>

                      <div>
                        <span>Country</span>

                        <strong>
                          {request.country ||
                            "Not specified"}
                        </strong>
                      </div>

                      <div>
                        <span>City</span>

                        <strong>
                          {request.city ||
                            "Not specified"}
                        </strong>
                      </div>

                      <div>
                        <span>Location</span>

                        <strong>
                          {request.location ||
                            "Not specified"}
                        </strong>
                      </div>

                      <div>
                        <span>Budget</span>

                        <strong>
                          {request.budget !== null &&
                          request.budget !== undefined &&
                          request.budget !== ""
                            ? `${request.currency || ""} ${request.budget}`
                            : "Not specified"}
                        </strong>
                      </div>

                      <div>
                        <span>Requested Date</span>

                        <strong>
                          {request.requested_date ||
                            "Not specified"}
                        </strong>
                      </div>
                    </div>

                    {request.customer_notes && (
                      <div className="notes-box">
                        <span>
                          Customer Notes
                        </span>

                        <p>
                          {request.customer_notes}
                        </p>
                      </div>
                    )}

                    <div className="professional-notes">
                      <label
                        htmlFor={`notes-${request.id}`}
                      >
                        Professional Notes
                      </label>

                      <textarea
                        id={`notes-${request.id}`}
                        defaultValue={
                          request.professional_notes ||
                          ""
                        }
                        placeholder="Add notes about this request..."
                        rows={4}
                      />

                      <button
                        type="button"
                        className="secondary-button"
                        disabled={
                          actionLoading ===
                          request.id
                        }
                        onClick={(event) =>
                          updateNotes(
                            request.id,
                            event.currentTarget
                              .previousElementSibling
                              .value
                          )
                        }
                      >
                        {actionLoading === request.id
                          ? "Saving..."
                          : "Save Notes"}
                      </button>
                    </div>
                  </div>

                  <div className="request-actions">
                    {request.status === "Pending" && (
                      <>
                        <button
                          type="button"
                          className="accept-button"
                          disabled={
                            actionLoading ===
                            request.id
                          }
                          onClick={() =>
                            updateRequest(
                              request,
                              "Accepted"
                            )
                          }
                        >
                          {actionLoading === request.id
                            ? "Updating..."
                            : "Accept Request"}
                        </button>

                        <button
                          type="button"
                          className="reject-button"
                          disabled={
                            actionLoading ===
                            request.id
                          }
                          onClick={() =>
                            updateRequest(
                              request,
                              "Rejected"
                            )
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {request.status === "Accepted" && (
                      <button
                        type="button"
                        className="accept-button"
                        disabled={
                          actionLoading ===
                          request.id
                        }
                        onClick={() =>
                          updateRequest(
                            request,
                            "In Progress"
                          )
                        }
                      >
                        {actionLoading === request.id
                          ? "Updating..."
                          : "Start Job"}
                      </button>
                    )}

                    {request.status === "In Progress" && (
                      <button
                        type="button"
                        className="accept-button"
                        disabled={
                          actionLoading ===
                          request.id
                        }
                        onClick={() =>
                          updateRequest(
                            request,
                            "Completed"
                          )
                        }
                      >
                        {actionLoading === request.id
                          ? "Updating..."
                          : "Mark Completed"}
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #f6f8fb;
          padding: 32px 18px 60px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
        }

        .eyebrow {
          margin: 0 0 6px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.2px;
          color: #64748b;
        }

        h1,
        h2,
        h3,
        p {
          margin-top: 0;
        }

        h1 {
          margin-bottom: 8px;
          font-size: 32px;
          color: #0f172a;
        }

        .welcome {
          margin-bottom: 0;
          color: #64748b;
        }

        .top-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .profile-summary,
        .location-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 24px;
          margin-bottom: 22px;
          box-shadow: 0 8px 25px rgba(15, 23, 42, 0.05);
        }

        .profile-summary h2,
        .location-content h2 {
          margin-bottom: 6px;
          color: #0f172a;
        }

        .profile-summary p,
        .location-content > p:not(.eyebrow) {
          color: #64748b;
          line-height: 1.6;
        }

        .profile-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .profile-meta span {
          padding: 6px 10px;
          border-radius: 999px;
          background: #f1f5f9;
          color: #475569;
          font-size: 13px;
        }

        .location-card {
          justify-content: flex-start;
        }

        .location-icon {
          width: 48px;
          height: 48px;
          min-width: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: #f1f5f9;
          font-size: 23px;
        }

        .location-content {
          flex: 1;
        }

        .location-content > .eyebrow {
          margin-bottom: 6px;
        }

        .location-content > p:not(.eyebrow) {
          max-width: 800px;
          margin-bottom: 14px;
        }

        .success-message {
          margin-bottom: 14px;
          padding: 10px 12px;
          border-radius: 10px;
          background: #ecfdf5;
          color: #047857;
          border: 1px solid #a7f3d0;
          line-height: 1.5;
        }

        .location-error {
          margin-bottom: 14px;
          padding: 10px 12px;
          border-radius: 10px;
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
          line-height: 1.5;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }

        .stat-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 8px 25px rgba(15, 23, 42, 0.04);
        }

        .stat-card span {
          display: block;
          margin-bottom: 8px;
          color: #64748b;
          font-size: 14px;
        }

        .stat-card strong {
          font-size: 28px;
          color: #0f172a;
        }

        .requests-section {
          margin-top: 10px;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .section-heading h2 {
          margin-bottom: 0;
          color: #0f172a;
        }

        .empty-box {
          padding: 36px 24px;
          text-align: center;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
        }

        .empty-box h3 {
          margin-bottom: 8px;
          color: #0f172a;
        }

        .empty-box p {
          margin-bottom: 0;
          color: #64748b;
        }

        .requests-list {
          display: grid;
          gap: 18px;
        }

        .request-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(15, 23, 42, 0.04);
        }

        .request-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          padding: 20px 22px;
          border-bottom: 1px solid #e2e8f0;
        }

        .request-header h3 {
          margin-bottom: 6px;
          color: #0f172a;
        }

        .request-date {
          margin-bottom: 0;
          color: #94a3b8;
          font-size: 13px;
        }

        .status {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 10px;
          border-radius: 999px;
          background: #f1f5f9;
          color: #475569;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
        }

        .status.pending {
          background: #fff7ed;
          color: #c2410c;
        }

        .status.accepted {
          background: #eff6ff;
          color: #1d4ed8;
        }

        .status.rejected {
          background: #fef2f2;
          color: #b91c1c;
        }

        .status.progress {
          background: #f5f3ff;
          color: #6d28d9;
        }

        .status.completed {
          background: #ecfdf5;
          color: #047857;
        }

        .request-body {
          padding: 22px;
        }

        .request-body > p {
          color: #475569;
          line-height: 1.7;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 18px;
        }

        .details-grid > div {
          padding: 14px;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }

        .details-grid span,
        .notes-box span {
          display: block;
          margin-bottom: 5px;
          color: #64748b;
          font-size: 12px;
          font-weight: 700;
        }

        .details-grid strong {
          color: #0f172a;
          font-size: 14px;
          word-break: break-word;
        }

        .notes-box {
          margin-top: 18px;
          padding: 15px;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }

        .notes-box p {
          margin-bottom: 0;
          color: #475569;
          line-height: 1.6;
        }

        .professional-notes {
          margin-top: 20px;
        }

        .professional-notes label {
          display: block;
          margin-bottom: 8px;
          color: #334155;
          font-size: 14px;
          font-weight: 700;
        }

        .professional-notes textarea {
          width: 100%;
          box-sizing: border-box;
          resize: vertical;
          padding: 12px;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          background: white;
          color: #0f172a;
          font: inherit;
          outline: none;
          margin-bottom: 10px;
        }

        .professional-notes textarea:focus {
          border-color: #64748b;
        }

        .request-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 18px 22px;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .primary-button,
        .secondary-button,
        .location-button,
        .accept-button,
        .reject-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 10px 16px;
          border-radius: 10px;
          border: 1px solid transparent;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.2s ease;
          box-sizing: border-box;
        }

        .primary-button {
          background: #0f172a;
          color: white;
        }

        .secondary-button {
          background: white;
          color: #334155;
          border-color: #cbd5e1;
        }

        .location-button,
        .accept-button {
          background: #0f172a;
          color: white;
        }

        .reject-button {
          background: #fef2f2;
          color: #b91c1c;
          border-color: #fecaca;
        }

        .primary-button:hover,
        .secondary-button:hover,
        .location-button:hover,
        .accept-button:hover,
        .reject-button:hover {
          opacity: 0.88;
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .error-box {
          margin-bottom: 20px;
          padding: 14px 16px;
          border-radius: 12px;
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        }

        .loading {
          padding: 80px 20px;
          text-align: center;
          color: #64748b;
          font-size: 16px;
        }

        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .details-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .page {
            padding: 22px 14px 40px;
          }

          .topbar,
          .profile-summary,
          .location-card {
            align-items: flex-start;
            flex-direction: column;
          }

          .top-actions,
          .profile-actions {
            width: 100%;
          }

          .top-actions .secondary-button,
          .profile-actions .primary-button {
            width: 100%;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }

          .request-header {
            flex-direction: column;
          }

          .request-actions {
            flex-direction: column;
          }

          .request-actions button {
            width: 100%;
          }

          h1 {
            font-size: 27px;
          }
        }

        @media (max-width: 420px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
