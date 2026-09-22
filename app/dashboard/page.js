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

  async function updateRequest(request, newStatus) {
  if (!request?.id || !professional?.id) {
    return;
  }

  setUpdatingId(request.id);
  setError("");

  const { error: updateError } = await supabase
    .from("job_requests")
    .update({
      status: newStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", request.id)
    .eq("professional_id", professional.id);

  if (updateError) {
    console.error(updateError);
    setError("Unable to update the service request.");
    setUpdatingId(null);
    return;
  }

  if (request.customer_id) {
    const { error: notificationError } = await supabase
      .from("notifications")
      .insert([
        {
          user_id: request.customer_id,
          title: `Service Request ${newStatus}`,
          message: `Your service request "${request.title}" is now ${newStatus}.`,
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
            updated_at: new Date().toISOString(),
          }
        : item
    )
  );

  setUpdatingId(null);
  }requestId, newStatus) {
    setActionLoading(requestId);
    setError("");

    const { error: updateError } = await supabase
      .from("job_requests")
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", requestId)
      .eq("professional_id", professional.id);

    if (updateError) {
      console.error(updateError);
      setError("Unable to update the request.");
      setActionLoading(null);
      return;
    }

    setRequests((previous) =>
      previous.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: newStatus,
              updated_at: new Date().toISOString(),
            }
          : request
      )
    );

    setActionLoading(null);
  }

  async function updateNotes(requestId, notes) {
    setActionLoading(requestId);
    setError("");

    const { error: updateError } = await supabase
      .from("job_requests")
      .update({
        professional_notes: notes,
        updated_at: new Date().toISOString(),
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
              updated_at: new Date().toISOString(),
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
            <Link href="/professionals" className="secondary-button">
              View Professionals
            </Link>

            <Link href="/" className="secondary-button">
              Home
            </Link>
          </div>
        </header>

        {error && <div className="error-box">{error}</div>}

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
                    (request.status || "").toLowerCase() === "pending"
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
                    (request.status || "").toLowerCase() === "accepted"
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
                    (request.status || "").toLowerCase() === "completed"
                ).length
              }
            </strong>
          </div>
        </section>

        <section className="requests-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SERVICE REQUESTS</p>
              <h2>Requests From Customers</h2>
            </div>
          </div>

          {requests.length === 0 ? (
            <div className="empty-box">
              <h3>No service requests yet</h3>
              <p>
                When customers send you service requests, they will appear
                here.
              </p>
            </div>
          ) : (
            <div className="requests-list">
              {requests.map((request) => (
                <article className="request-card" key={request.id}>
                  <div className="request-header">
                    <div>
                      <h3>
                        {request.title || "Service Request"}
                      </h3>

                      <p className="request-date">
                        {request.created_at
                          ? new Date(
                              request.created_at
                            ).toLocaleString()
                          : ""}
                      </p>
                    </div>

                    <span className={getStatusClass(request.status)}>
                      {request.status || "Pending"}
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
                          {request.category || "Not specified"}
                        </strong>
                      </div>

                      <div>
                        <span>Country</span>
                        <strong>
                          {request.country || "Not specified"}
                        </strong>
                      </div>

                      <div>
                        <span>City</span>
                        <strong>
                          {request.city || "Not specified"}
                        </strong>
                      </div>

                      <div>
                        <span>Location</span>
                        <strong>
                          {request.location || "Not specified"}
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
                        <span>Customer Notes</span>
                        <p>{request.customer_notes}</p>
                      </div>
                    )}

                    <div className="professional-notes">
                      <label htmlFor={`notes-${request.id}`}>
                        Professional Notes
                      </label>

                      <textarea
                        id={`notes-${request.id}`}
                        defaultValue={
                          request.professional_notes || ""
                        }
                        placeholder="Add notes about this request..."
                        rows={4}
                      />

                      <button
                        type="button"
                        className="secondary-button"
                        disabled={actionLoading === request.id}
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
                          disabled={actionLoading === request.id}
                          onClick={() =>
                            updateRequest(
                              request.id,
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
                          disabled={actionLoading === request.id}
                          onClick={() =>
                            updateRequest(
                              request.id,
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
                        disabled={actionLoading === request.id}
                        onClick={() =>
                          updateRequest(
                            request.id,
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
                        disabled={actionLoading === request.id}
                        onClick={() =>
                          updateRequest(
                            request.id,
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

        .profile-summary {
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

        .profile-summary h2 {
          margin-bottom: 6px;
          color: #0f172a;
        }

        .profile-summary p {
          color: #64748b;
          margin-bottom: 12px;
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.04);
        }

        .stat-card span {
          display: block;
          color: #64748b;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .stat-card strong {
          font-size: 30px;
          color: #0f172a;
        }

        .requests-section {
          margin-top: 10px;
        }

        .section-heading {
          margin-bottom: 16px;
        }

        .section-heading h2 {
          color: #0f172a;
          margin-bottom: 0;
        }

        .requests-list {
          display: grid;
          gap: 18px;
        }

        .request-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 22px;
          box-shadow: 0 8px 25px rgba(15, 23, 42, 0.05);
        }

        .request-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e2e8f0;
        }

        .request-header h3 {
          margin-bottom: 6px;
          color: #0f172a;
          font-size: 20px;
        }

        .request-date {
          margin-bottom: 0;
          color: #94a3b8;
          font-size: 13px;
        }

        .status {
          display: inline-flex;
          align-items: center;
          padding: 7px 12px;
          border-radius: 999px;
          background: #f1f5f9;
          color: #475569;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
        }

        .status.pending {
          background: #fff7ed;
          color: #c2410c;
        }

        .status.accepted {
          background: #ecfdf5;
          color: #047857;
        }

        .status.rejected {
          background: #fef2f2;
          color: #b91c1c;
        }

        .status.progress {
          background: #eff6ff;
          color: #1d4ed8;
        }

        .status.completed {
          background: #f0fdf4;
          color: #15803d;
        }

        .request-body {
          padding: 18px 0;
        }

        .request-body > p {
          color: #475569;
          line-height: 1.7;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 18px;
        }

        .details-grid div {
          background: #f8fafc;
          border-radius: 12px;
          padding: 13px;
        }

        .details-grid span,
        .notes-box span {
          display: block;
          font-size: 12px;
          color: #64748b;
          margin-bottom: 5px;
        }

        .details-grid strong {
          color: #0f172a;
          font-size: 14px;
          word-break: break-word;
        }

        .notes-box {
          margin-top: 16px;
          padding: 15px;
          background: #f8fafc;
          border-radius: 12px;
        }

        .notes-box p {
          margin-bottom: 0;
          color: #475569;
          line-height: 1.6;
        }

        .professional-notes {
          margin-top: 18px;
        }

        .professional-notes label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
          color: #334155;
        }

        .professional-notes textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 12px;
          resize: vertical;
          font: inherit;
          outline: none;
          margin-bottom: 10px;
        }

        .professional-notes textarea:focus {
          border-color: #64748b;
        }

        .request-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
        }

        button,
        .primary-button,
        .secondary-button,
        .accept-button,
        .reject-button {
          border: 0;
          border-radius: 10px;
          padding: 11px 16px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .primary-button,
        .accept-button {
          background: #0f172a;
          color: white;
        }

        .secondary-button {
          background: #e2e8f0;
          color: #0f172a;
        }

        .reject-button {
          background: #fee2e2;
          color: #b91c1c;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-box {
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
          padding: 14px;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .empty-box,
        .loading {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 35px;
          text-align: center;
          color: #64748b;
        }

        .empty-box h3 {
          color: #0f172a;
          margin-bottom: 8px;
        }

        @media (max-width: 850px) {
          .topbar,
          .profile-summary {
            flex-direction: column;
            align-items: stretch;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .details-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 550px) {
          .page {
            padding: 22px 12px 45px;
          }

          h1 {
            font-size: 26px;
          }

          .stats-grid,
          .details-grid {
            grid-template-columns: 1fr;
          }

          .request-header {
            flex-direction: column;
          }

          .top-actions {
            width: 100%;
          }

          .top-actions a {
            flex: 1;
          }
        }
      `}</style>
    </main>
  );
    }
