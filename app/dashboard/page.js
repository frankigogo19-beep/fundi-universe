
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

  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const [city, setCity] = useState("");
  const [citySaving, setCitySaving] = useState(false);
  const [cityMessage, setCityMessage] = useState("");
  const [cityError, setCityError] = useState("");

  const [locationLoading, setLocationLoading] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    let channel;

    async function initializeDashboard() {
      await loadDashboard();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      await loadUnreadNotifications();

      channel = supabase
        .channel(`dashboard-notifications-${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            loadUnreadNotifications();
          }
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            loadUnreadNotifications();
          }
        )
        .subscribe((status) => {
          if (status === "SUBSCRIBED") {
            console.log("Notification realtime connected.");
          }
        });
    }

    initializeDashboard();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  async function loadUnreadNotifications() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { count, error: notificationError } = await supabase
      .from("notifications")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .eq("is_read", false);

    if (notificationError) {
      console.error(
        "Unread notifications error:",
        notificationError
      );
      return;
    }

    setUnreadNotifications(count || 0);
  }

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError(
          "Please log in to view your professional dashboard."
        );
        return;
      }

      const {
        data: professionalData,
        error: professionalError,
      } = await supabase
        .from("professional_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (professionalError) {
        console.error(
          "Professional profile error:",
          professionalError
        );
        setError(
          "Unable to load your professional profile."
        );
        return;
      }

      if (!professionalData) {
        setError("Professional profile not found.");
        return;
      }

      setProfessional(professionalData);
      setCity(professionalData.city || "");

      if (
        professionalData.latitude !== null &&
        professionalData.longitude !== null &&
        professionalData.latitude !== undefined &&
        professionalData.longitude !== undefined
      ) {
        setLocationMessage("Your location is enabled.");
      }

      const {
        data: requestsData,
        error: requestsError,
      } = await supabase
        .from("job_requests")
        .select("*")
        .eq("professional_id", professionalData.id)
        .order("created_at", {
          ascending: false,
        });

      if (requestsError) {
        console.error(
          "Service requests error:",
          requestsError
        );
        setError(
          "Unable to load your service requests."
        );
        setRequests([]);
        return;
      }

      setRequests(requestsData || []);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError(
        "Something went wrong while loading your dashboard."
      );
    } finally {
      setLoading(false);
    }
  }

  async function saveCity() {
    if (!professional) return;

    const cleanCity = city.trim();

    if (!cleanCity) {
      setCityError("Please enter your city.");
      setCityMessage("");
      return;
    }

    try {
      setCitySaving(true);
      setCityError("");
      setCityMessage("");

      const { data, error: updateError } = await supabase
        .from("professional_profiles")
        .update({
          city: cleanCity,
        })
        .eq("id", professional.id)
        .select()
        .single();

      if (updateError) {
        console.error(
          "City update error:",
          updateError
        );
        setCityError("Unable to save your city.");
        return;
      }

      setProfessional(data);
      setCity(data.city || "");
      setCityMessage("City saved successfully.");
    } catch (err) {
      console.error("Save city error:", err);
      setCityError(
        "Something went wrong while saving your city."
      );
    } finally {
      setCitySaving(false);
    }
  }

  function enableLocation() {
    if (!professional) return;

    setLocationLoading(true);
    setLocationMessage("");
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError(
        "Location is not supported by your browser."
      );
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const { data, error: updateError } =
            await supabase
              .from("professional_profiles")
              .update({
                latitude,
                longitude,
                location_updated_at:
                  new Date().toISOString(),
              })
              .eq("id", professional.id)
              .select()
              .single();

          if (updateError) {
            console.error(
              "Location update error:",
              updateError
            );
            setLocationError(
              "Unable to save your location."
            );
            return;
          }

          setProfessional(data);
          setLocationMessage(
            "Your location has been enabled successfully."
          );
        } catch (err) {
          console.error("Location error:", err);
          setLocationError(
            "Something went wrong while saving your location."
          );
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);

        if (error.code === 1) {
          setLocationError(
            "Location permission was denied. Please allow location access in your browser."
          );
        } else if (error.code === 2) {
          setLocationError(
            "Your location could not be detected."
          );
        } else {
          setLocationError(
            "Unable to get your location. Please try again."
          );
        }

        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }

  async function updateRequest(request, newStatus) {
    if (!professional) return;

    try {
      setActionLoading(
        `${request.id}-${newStatus}`
      );

      const { error: updateError } = await supabase
        .from("job_requests")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", request.id)
        .eq("professional_id", professional.id);

      if (updateError) {
        console.error(
          "Request update error:",
          updateError
        );
        alert("Unable to update this request.");
        return;
      }

      setRequests((currentRequests) =>
        currentRequests.map((item) =>
          item.id === request.id
            ? {
                ...item,
                status: newStatus,
                updated_at:
                  new Date().toISOString(),
              }
            : item
        )
      );

      if (request.customer_id) {
        const notificationMessage =
          newStatus === "Accepted"
            ? "Your service request has been accepted by the professional."
            : newStatus === "Rejected"
            ? "Your service request has been rejected by the professional."
            : newStatus === "In Progress"
            ? "Your service request is now in progress."
            : newStatus === "Completed"
            ? "Your service request has been marked as completed."
            : `Your service request status is now ${newStatus}.`;

        const { error: notificationError } =
          await supabase.from("notifications").insert({
            user_id: request.customer_id,
            title: "Service Request Update",
            message: notificationMessage,
            type: "job_request",
            is_read: false,
          });

        if (notificationError) {
          console.error(
            "Notification error:",
            notificationError
          );
        }
      }
    } catch (err) {
      console.error(
        "Update request error:",
        err
      );
      alert(
        "Something went wrong while updating the request."
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function updateNotes(requestId, notes) {
    if (!professional) return;

    try {
      const { error: updateError } = await supabase
        .from("job_requests")
        .update({
          professional_notes: notes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", requestId)
        .eq("professional_id", professional.id);

      if (updateError) {
        console.error(
          "Notes update error:",
          updateError
        );
        alert("Unable to save your notes.");
        return;
      }

      setRequests((currentRequests) =>
        currentRequests.map((item) =>
          item.id === requestId
            ? {
                ...item,
                professional_notes: notes,
              }
            : item
        )
      );
    } catch (err) {
      console.error("Notes error:", err);
      alert(
        "Something went wrong while saving notes."
      );
    }
  }

  function getStatusClass(status) {
    const normalized = (
      status || "Pending"
    ).toLowerCase();

    if (normalized === "accepted")
      return "accepted";

    if (normalized === "rejected")
      return "rejected";

    if (normalized === "in progress")
      return "progress";

    if (normalized === "completed")
      return "completed";

    if (normalized === "started")
      return "progress";

    return "pending";
  }

  function getStatusLabel(status) {
    if (!status) return "Pending";

    if (status === "In progress") {
      return "In Progress";
    }

    return status;
  }

  const pendingCount = requests.filter(
    (request) =>
      (request.status || "Pending").toLowerCase() ===
      "pending"
  ).length;

  const acceptedCount = requests.filter(
    (request) =>
      (request.status || "").toLowerCase() ===
      "accepted"
  ).length;

  const completedCount = requests.filter(
    (request) =>
      (request.status || "").toLowerCase() ===
      "completed"
  ).length;

  if (loading) {
    return (
      <main className="loading-page">
        <div className="loading-card">
          <div className="spinner"></div>
          <h2>
            Loading Professional Dashboard...
          </h2>
          <p>Please wait.</p>
        </div>

        <style jsx>{`
          .loading-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f5f7fb;
            padding: 20px;
          }

          .loading-card {
            background: white;
            padding: 35px;
            border-radius: 18px;
            text-align: center;
            box-shadow: 0 10px 30px
              rgba(0, 0, 0, 0.08);
          }

          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #ddd;
            border-top-color: #111827;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin: 0 auto 20px;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </main>
    );
  }

  if (!professional) {
    return (
      <main className="error-page">
        <div className="error-card">
          <h2>Professional Profile</h2>

          <p>
            {error ||
              "Professional profile not found."}
          </p>

          <Link href="/" className="back-button">
            Back Home
          </Link>
        </div>

        <style jsx>{`
          .error-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f5f7fb;
            padding: 20px;
          }

          .error-card {
            background: white;
            padding: 35px;
            border-radius: 18px;
            text-align: center;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 10px 30px
              rgba(0, 0, 0, 0.08);
          }

          .error-card p {
            color: #dc2626;
            margin: 15px 0 25px;
          }

          .back-button {
            display: inline-block;
            padding: 12px 18px;
            background: #111827;
            color: white;
            text-decoration: none;
            border-radius: 10px;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <header className="topbar">
        <div>
          <div className="brand">
            FUNDI UNIVERSE
          </div>

          <h1>Professional Dashboard</h1>
        </div>

        <div className="top-links">
          <Link
            href="/notifications"
            className="notification-link"
          >
            <span className="notification-bell">
              🔔
            </span>

            <span>Notifications</span>

            {unreadNotifications > 0 && (
              <span className="notification-badge">
                {unreadNotifications > 99
                  ? "99+"
                  : unreadNotifications}
              </span>
            )}
          </Link>

          <Link href="/professionals">
            View Professionals
          </Link>

          <Link href="/">Home</Link>
        </div>
      </header>

      <div className="container">
        {error && (
          <div className="error-banner">
            <strong>Notice:</strong> {error}

            <button onClick={loadDashboard}>
              Retry
            </button>
          </div>
        )}

        <section className="welcome-card">
          <div>
            <p className="small-label">
              WELCOME
            </p>

            <h2>
              Welcome,{" "}
              {professional.full_name ||
                professional.professional_name ||
                "Professional"}
            </h2>

            <p className="professional-title">
              {professional.professional_title ||
                professional.professional_category ||
                "Professional"}
            </p>

            <div className="profile-meta">
              <span>
                🌍{" "}
                {professional.country ||
                  "Country not set"}
              </span>

              <span>
                📍{" "}
                {professional.city ||
                  "City not set"}
              </span>

              <span
                className={`verification ${
                  professional.verification_status
                    ? professional.verification_status.toLowerCase()
                    : "pending"
                }`}
              >
                {professional.verification_status ||
                  "Pending"}
              </span>
            </div>
          </div>

          <Link
            href={`/professionals/${professional.id}`}
            className="profile-button"
          >
            View My Profile
          </Link>
        </section>

        <section className="city-card">
          <div className="section-title">
            <div>
              <p className="small-label">
                PROFILE LOCATION
              </p>

              <h2>Set Your City</h2>
            </div>
          </div>

          <p className="section-description">
            Add your city so customers can see where
            you are based.
          </p>

          <div className="city-form">
            <input
              type="text"
              value={city}
              onChange={(event) =>
                setCity(event.target.value)
              }
              placeholder="Enter your city"
            />

            <button
              onClick={saveCity}
              disabled={citySaving}
              className="save-button"
            >
              {citySaving
                ? "Saving..."
                : "Save City"}
            </button>
          </div>

          {cityMessage && (
            <p className="success-message">
              {cityMessage}
            </p>
          )}

          {cityError && (
            <p className="field-error">
              {cityError}
            </p>
          )}
        </section>

        <section className="location-card">
          <div className="section-title">
            <div>
              <p className="small-label">
                YOUR LOCATION
              </p>

              <h2>Enable Your Location</h2>
            </div>

            <div className="location-icon">
              📍
            </div>
          </div>

          <p className="section-description">
            Allow FUNDI UNIVERSE to access your
            location so customers can find you when
            they search for nearby professionals.
          </p>

          {professional.latitude &&
          professional.longitude ? (
            <div className="location-enabled">
              <strong>
                ✓ Location Enabled
              </strong>

              <span>
                Your current location is saved in
                FUNDI UNIVERSE.
              </span>
            </div>
          ) : (
            <button
              onClick={enableLocation}
              disabled={locationLoading}
              className="location-button"
            >
              {locationLoading
                ? "Getting Your Location..."
                : "📍 Enable My Location"}
            </button>
          )}

          {locationMessage && (
            <p className="success-message">
              {locationMessage}
            </p>
          )}

          {locationError && (
            <p className="field-error">
              {locationError}
            </p>
          )}
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <span>Total Requests</span>
            <strong>
              {requests.length}
            </strong>
          </div>

          <div className="stat-card">
            <span>Pending</span>
            <strong>
              {pendingCount}
            </strong>
          </div>

          <div className="stat-card">
            <span>Accepted</span>
            <strong>
              {acceptedCount}
            </strong>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <strong>
              {completedCount}
            </strong>
          </div>
        </section>

        <section className="requests-section">
          <div className="section-title">
            <div>
              <p className="small-label">
                SERVICE REQUESTS
              </p>

              <h2>
                Requests From Customers
              </h2>
            </div>

            <button
              onClick={loadDashboard}
              className="refresh-button"
            >
              ↻ Refresh
            </button>
          </div>

          {requests.length === 0 ? (
            <div className="empty-card">
              <div className="empty-icon">
                📋
              </div>

              <h3>
                No service requests yet
              </h3>

              <p>
                When customers send you service
                requests, they will appear here.
              </p>
            </div>
          ) : (
            <div className="requests-list">
              {requests.map((request) => {
                const status =
                  request.status || "Pending";

                const normalizedStatus =
                  status.toLowerCase();

                return (
                  <article
                    key={request.id}
                    className="request-card"
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
                        className={`status ${getStatusClass(
                          status
                        )}`}
                      >
                        {getStatusLabel(
                          status
                        )}
                      </span>
                    </div>

                    <div className="request-description">
                      <p>
                        {request.description ||
                          "No description provided."}
                      </p>
                    </div>

                    <div className="request-details">
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
                          {request.budget
                            ? `${request.budget} ${
                                request.currency ||
                                ""
                              }`
                            : "Not specified"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Requested Date
                        </span>

                        <strong>
                          {request.requested_date
                            ? new Date(
                                request.requested_date
                              ).toLocaleDateString()
                            : "Not specified"}
                        </strong>
                      </div>
                    </div>

                    {request.customer_notes && (
                      <div className="customer-notes">
                        <strong>
                          Customer Notes
                        </strong>

                        <p>
                          {request.customer_notes}
                        </p>
                      </div>
                    )}

                    <div className="notes-section">
                      <label>
                        Your Notes
                      </label>

                      <textarea
                        defaultValue={
                          request.professional_notes ||
                          ""
                        }
                        placeholder="Add notes about this request..."
                        onBlur={(event) =>
                          updateNotes(
                            request.id,
                            event.target.value
                          )
                        }
                      />
                    </div>

                    <div className="actions">
                      {normalizedStatus ===
                        "pending" && (
                        <>
                          <button
                            className="accept-button"
                            disabled={
                              actionLoading ===
                              `${request.id}-Accepted`
                            }
                            onClick={() =>
                              updateRequest(
                                request,
                                "Accepted"
                              )
                            }
                          >
                            {actionLoading ===
                            `${request.id}-Accepted`
                              ? "Accepting..."
                              : "Accept Request"}
                          </button>

                          <button
                            className="reject-button"
                            disabled={
                              actionLoading ===
                              `${request.id}-Rejected`
                            }
                            onClick={() =>
                              updateRequest(
                                request,
                                "Rejected"
                              )
                            }
                          >
                            {actionLoading ===
                            `${request.id}-Rejected`
                              ? "Rejecting..."
                              : "Reject"}
                          </button>
                        </>
                      )}

                      {normalizedStatus ===
                        "accepted" && (
                        <button
                          className="progress-button"
                          disabled={
                            actionLoading ===
                            `${request.id}-In Progress`
                          }
                          onClick={() =>
                            updateRequest(
                              request,
                              "In Progress"
                            )
                          }
                        >
                          {actionLoading ===
                          `${request.id}-In Progress`
                            ? "Starting..."
                            : "Start Job"}
                        </button>
                      )}

                      {normalizedStatus ===
                        "in progress" && (
                        <button
                          className="complete-button"
                          disabled={
                            actionLoading ===
                            `${request.id}-Completed`
                          }
                          onClick={() =>
                            updateRequest(
                              request,
                              "Completed"
                            )
                          }
                        >
                          {actionLoading ===
                          `${request.id}-Completed`
                            ? "Completing..."
                            : "Mark Completed"}
                        </button>
                      )}

                      {normalizedStatus ===
                        "completed" && (
                        <span className="completed-message">
                          ✓ Job Completed
                        </span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          background: #f5f7fb;
          color: #111827;
        }

        .topbar {
          background: #111827;
          color: white;
          padding: 22px 6%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .brand {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 2px;
          opacity: 0.85;
          margin-bottom: 5px;
        }

        .topbar h1 {
          margin: 0;
          font-size: 25px;
        }

        .top-links {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .top-links a {
          color: white;
          text-decoration: none;
          padding: 10px 14px;
          border: 1px solid
            rgba(255, 255, 255, 0.2);
          border-radius: 9px;
          font-size: 14px;
        }

        .notification-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .notification-bell {
          font-size: 17px;
        }

        .notification-badge {
          min-width: 19px;
          height: 19px;
          padding: 0 5px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #ef4444;
          color: white;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 800;
          line-height: 1;
        }

        .container {
          width: min(1150px, 92%);
          margin: 30px auto 60px;
        }

        .error-banner {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
          padding: 14px 16px;
          border-radius: 12px;
          margin-bottom: 20px;
          display: flex;
          gap: 12px;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .error-banner button {
          border: none;
          background: #991b1b;
          color: white;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
        }

        .welcome-card,
        .city-card,
        .location-card,
        .request-card,
        .empty-card {
          background: white;
          border-radius: 18px;
          box-shadow: 0 8px 25px
            rgba(0, 0, 0, 0.06);
        }

        .welcome-card {
          padding: 28px;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: center;
          margin-bottom: 20px;
        }

        .small-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #6b7280;
          margin: 0 0 7px;
        }

        .welcome-card h2 {
          margin: 0;
          font-size: 27px;
        }

        .professional-title {
          margin: 8px 0 14px;
          color: #4b5563;
          font-weight: 600;
        }

        .profile-meta {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }

        .profile-meta span {
          background: #f3f4f6;
          padding: 7px 10px;
          border-radius: 8px;
          font-size: 13px;
        }

        .profile-meta .verification {
          font-weight: 700;
          background: #fff7ed;
          color: #9a3412;
        }

        .profile-button,
        .save-button,
        .location-button {
          text-decoration: none;
          border: none;
          cursor: pointer;
          background: #111827;
          color: white;
          padding: 12px 17px;
          border-radius: 10px;
          font-weight: 700;
        }

        .city-card,
        .location-card {
          padding: 25px;
          margin-bottom: 20px;
        }

        .section-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .section-title h2 {
          margin: 0;
          font-size: 21px;
        }

        .section-description {
          color: #6b7280;
          margin: 10px 0 18px;
          line-height: 1.6;
        }

        .city-form {
          display: flex;
          gap: 10px;
        }

        .city-form input {
          flex: 1;
          min-width: 0;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          padding: 13px 14px;
          font-size: 15px;
          outline: none;
        }

        .city-form input:focus {
          border-color: #111827;
        }

        .save-button {
          white-space: nowrap;
        }

        .success-message {
          color: #166534;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 10px 12px;
          border-radius: 9px;
          margin: 12px 0 0;
          font-size: 14px;
        }

        .field-error {
          color: #b91c1c;
          background: #fef2f2;
          border: 1px solid #fecaca;
          padding: 10px 12px;
          border-radius: 9px;
          margin: 12px 0 0;
          font-size: 14px;
        }

        .location-icon {
          font-size: 28px;
        }

        .location-enabled {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 14px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .location-enabled strong {
          color: #166534;
        }

        .location-enabled span {
          color: #4b5563;
          font-size: 14px;
        }

        .location-button:disabled,
        .save-button:disabled,
        .actions button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: white;
          padding: 22px;
          border-radius: 15px;
          box-shadow: 0 8px 25px
            rgba(0, 0, 0, 0.05);
        }

        .stat-card span {
          display: block;
          color: #6b7280;
          font-size: 13px;
          margin-bottom: 8px;
        }

        .stat-card strong {
          font-size: 29px;
        }

        .requests-section {
          margin-top: 10px;
        }

        .refresh-button {
          background: white;
          border: 1px solid #d1d5db;
          padding: 9px 13px;
          border-radius: 9px;
          cursor: pointer;
          font-weight: 600;
        }

        .empty-card {
          margin-top: 18px;
          padding: 50px 25px;
          text-align: center;
        }

        .empty-icon {
          font-size: 42px;
          margin-bottom: 10px;
        }

        .empty-card h3 {
          margin: 0 0 8px;
        }

        .empty-card p {
          color: #6b7280;
          margin: 0;
        }

        .requests-list {
          display: grid;
          gap: 18px;
          margin-top: 18px;
        }

        .request-card {
          padding: 24px;
        }

        .request-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
        }

        .request-header h3 {
          margin: 0 0 6px;
          font-size: 20px;
        }

        .request-date {
          margin: 0;
          color: #9ca3af;
          font-size: 12px;
        }

        .status {
          padding: 7px 11px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 800;
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
          background: #f0fdf4;
          color: #15803d;
        }

        .request-description {
          margin: 18px 0;
          padding: 14px;
          background: #f9fafb;
          border-radius: 10px;
        }

        .request-description p {
          margin: 0;
          line-height: 1.6;
          color: #374151;
        }

        .request-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .request-details div {
          background: #f9fafb;
          padding: 12px;
          border-radius: 9px;
        }

        .request-details span {
          display: block;
          color: #9ca3af;
          font-size: 11px;
          margin-bottom: 4px;
        }

        .request-details strong {
          font-size: 14px;
          word-break: break-word;
        }

        .customer-notes {
          margin-top: 15px;
          padding: 14px;
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: 10px;
        }

        .customer-notes strong {
          display: block;
          margin-bottom: 5px;
        }

        .customer-notes p {
          margin: 0;
          color: #4b5563;
          line-height: 1.5;
        }

        .notes-section {
          margin-top: 18px;
        }

        .notes-section label {
          display: block;
          font-weight: 700;
          font-size: 13px;
          margin-bottom: 7px;
        }

        .notes-section textarea {
          width: 100%;
          min-height: 90px;
          resize: vertical;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          padding: 12px;
          font-family: inherit;
          font-size: 14px;
          box-sizing: border-box;
        }

        .actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        .actions button {
          border: none;
          padding: 11px 15px;
          border-radius: 9px;
          color: white;
          cursor: pointer;
          font-weight: 700;
        }

        .accept-button {
          background: #15803d;
        }

        .reject-button {
          background: #dc2626;
        }

        .progress-button {
          background: #6d28d9;
        }

        .complete-button {
          background: #2563eb;
        }

        .completed-message {
          color: #15803d;
          font-weight: 800;
          padding: 10px 0;
        }

        @media (max-width: 800px) {
          .topbar {
            flex-direction: column;
            align-items: flex-start;
          }

          .welcome-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .request-details {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 550px) {
          .container {
            width: 94%;
            margin-top: 20px;
          }

          .welcome-card,
          .city-card,
          .location-card,
          .request-card {
            padding: 18px;
          }

          .city-form {
            flex-direction: column;
          }

          .city-form input {
            width: 100%;
            box-sizing: border-box;
          }

          .save-button {
            width: 100%;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .stat-card {
            padding: 17px;
          }

          .stat-card strong {
            font-size: 24px;
          }

          .request-details {
            grid-template-columns: 1fr;
          }

          .request-header {
            flex-direction: column;
          }

          .top-links {
            width: 100%;
          }

          .top-links a {
            flex: 1;
            text-align: center;
          }

          .notification-link {
            flex: 1;
          }
        }
      `}</style>
    </main>
  );
}
