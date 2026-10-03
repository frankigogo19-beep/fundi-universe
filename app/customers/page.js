"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [markingRead, setMarkingRead] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);

  const [locationLoading, setLocationLoading] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setError("");

    try {
      const {
        data: { user: currentUser },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!currentUser) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      setUser(currentUser);

      // Check whether the logged-in user is an admin
      const {
        data: profileData,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", currentUser.id)
        .maybeSingle();

      if (!profileError && profileData?.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      // Load customer profile
      const {
        data: customerData,
        error: customerError,
      } = await supabase
        .from("customers")
        .select("*")
        .eq("user_id", currentUser.id)
        .maybeSingle();

      if (customerError) {
        throw customerError;
      }

      setCustomer(customerData);

      // Load service requests
      if (customerData?.id) {
        const {
          data: requestData,
          error: requestError,
        } = await supabase
          .from("job_requests")
          .select("*")
          .eq("customer_id", customerData.id)
          .order("created_at", { ascending: false });

        if (requestError) {
          console.error("Request loading error:", requestError);
        } else {
          setRequests(requestData || []);
        }
      }

      // Load notifications
      const {
        data: notificationData,
        error: notificationError,
      } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (notificationError) {
        console.error("Notification loading error:", notificationError);
      } else {
        setNotifications(notificationData || []);
      }
    } catch (err) {
      console.error("Dashboard error:", err);
      setError(err.message || "Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  function enableLocation() {
    setLocationLoading(true);
    setLocationMessage("");
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Location is not supported by your browser.");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          if (!user?.id) {
            throw new Error("User not found.");
          }

          const { error: updateError } = await supabase
            .from("customers")
            .update({
              latitude,
              longitude,
            })
            .eq("user_id", user.id);

          if (updateError) {
            throw updateError;
          }

          setCustomer((prev) =>
            prev
              ? {
                  ...prev,
                  latitude,
                  longitude,
                }
              : prev
          );

          setLocationMessage("Your location has been updated successfully.");
        } catch (err) {
          console.error("Location update error:", err);
          setLocationError(
            err.message || "Unable to save your location."
          );
        } finally {
          setLocationLoading(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);

        if (err.code === 1) {
          setLocationError(
            "Location permission was denied. Please allow location access."
          );
        } else if (err.code === 2) {
          setLocationError("Your location could not be determined.");
        } else {
          setLocationError("Unable to get your location.");
        }

        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  async function markNotificationRead(notificationId) {
    setMarkingRead(notificationId);

    try {
      const { error: updateError } = await supabase
        .from("notifications")
        .update({
          is_read: true,
        })
        .eq("id", notificationId)
        .eq("user_id", user.id);

      if (updateError) {
        throw updateError;
      }

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (err) {
      console.error("Mark notification read error:", err);
    } finally {
      setMarkingRead(null);
    }
  }

  async function markAllNotificationsRead() {
    if (!user?.id) return;

    setMarkingRead("all");

    try {
      const { error: updateError } = await supabase
        .from("notifications")
        .update({
          is_read: true,
        })
        .eq("user_id", user.id)
        .eq("is_read", false);

      if (updateError) {
        throw updateError;
      }

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          is_read: true,
        }))
      );
    } catch (err) {
      console.error("Mark all notifications read error:", err);
    } finally {
      setMarkingRead(null);
    }
  }

  function getStatusClass(status) {
    const value = String(status || "").toLowerCase();

    if (value === "completed" || value === "accepted") {
      return "status success";
    }

    if (value === "pending" || value === "requested") {
      return "status pending";
    }

    if (value === "cancelled" || value === "rejected") {
      return "status danger";
    }

    if (value === "in progress") {
      return "status progress";
    }

    return "status";
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  if (loading) {
    return (
      <main className="loading-page">
        <div className="loading-card">
          <div className="spinner"></div>
          <h2>Loading Dashboard...</h2>
          <p>Please wait a moment.</p>
        </div>

        <style jsx>{`
          .loading-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8fafc;
            padding: 20px;
          }

          .loading-card {
            background: white;
            padding: 40px;
            border-radius: 18px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
          }

          .spinner {
            width: 42px;
            height: 42px;
            border: 4px solid #e2e8f0;
            border-top-color: #2563eb;
            border-radius: 50%;
            margin: 0 auto 18px;
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          h2 {
            margin: 0 0 8px;
            color: #0f172a;
          }

          p {
            margin: 0;
            color: #64748b;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <header className="topbar">
        <div className="brand-area">
          <div className="logo">FU</div>

          <div>
            <h1>FUNDI UNIVERSE</h1>
            <span>Customer Dashboard</span>
          </div>
        </div>

        <div className="top-actions">
          <Link href="/professionals" className="primary-button">
            Find a Professional
          </Link>

          {isAdmin && (
            <Link href="/admin/dashboard" className="admin-button">
              ⚙️ Admin Dashboard
            </Link>
          )}

          <Link href="/" className="secondary-button">
            Home
          </Link>
        </div>
      </header>

      <section className="content">
        {error && (
          <div className="error-box">
            <strong>Unable to load dashboard</strong>
            <p>{error}</p>
          </div>
        )}

        <section className="welcome-card">
          <div>
            <p className="eyebrow">CUSTOMER AREA</p>

            <h2>
              Welcome{customer?.full_name ? `, ${customer.full_name}` : ""}
            </h2>

            <p>
              Find trusted professionals, request services and manage your
              service requests from one place.
            </p>
          </div>

          <div className="welcome-icon">👋</div>
        </section>

        <section className="location-card">
          <div className="location-info">
            <div className="section-icon">📍</div>

            <div>
              <h3>Your Location</h3>

              {customer?.latitude && customer?.longitude ? (
                <p>
                  Location is enabled. Professionals can use your location
                  when providing nearby services.
                </p>
              ) : (
                <p>
                  Enable your location to help us connect you with nearby
                  professionals.
                </p>
              )}

              {locationMessage && (
                <div className="success-message">{locationMessage}</div>
              )}

              {locationError && (
                <div className="location-error">{locationError}</div>
              )}
            </div>
          </div>

          <button
            className="location-button"
            onClick={enableLocation}
            disabled={locationLoading}
          >
            {locationLoading
              ? "Getting Location..."
              : customer?.latitude && customer?.longitude
              ? "Update Location"
              : "Enable Location"}
          </button>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div>
              <span>Total Requests</span>
              <strong>{requests.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔔</div>
            <div>
              <span>Unread Notifications</span>
              <strong>{unreadCount}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📍</div>
            <div>
              <span>Location</span>
              <strong>
                {customer?.latitude && customer?.longitude
                  ? "Enabled"
                  : "Not Set"}
              </strong>
            </div>
          </div>
        </section>

        <section className="section-card">
          <div className="section-header">
            <div>
              <h2>Notifications</h2>
              <p>Your latest platform notifications.</p>
            </div>

            {unreadCount > 0 && (
              <button
                className="text-button"
                onClick={markAllNotificationsRead}
                disabled={markingRead === "all"}
              >
                {markingRead === "all"
                  ? "Marking..."
                  : "Mark all as read"}
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔔</div>
              <h3>No notifications yet</h3>
              <p>
                You will see important updates about your requests here.
              </p>
            </div>
          ) : (
            <div className="notification-list">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${
                    !notification.is_read ? "unread" : ""
                  }`}
                >
                  <div className="notification-icon">🔔</div>

                  <div className="notification-content">
                    <h3>
                      {notification.title || "Notification"}
                    </h3>

                    <p>
                      {notification.message ||
                        "You have a new notification."}
                    </p>

                    {notification.created_at && (
                      <small>
                        {new Date(
                          notification.created_at
                        ).toLocaleString()}
                      </small>
                    )}
                  </div>

                  {!notification.is_read && (
                    <button
                      className="read-button"
                      onClick={() =>
                        markNotificationRead(notification.id)
                      }
                      disabled={markingRead === notification.id}
                    >
                      {markingRead === notification.id
                        ? "..."
                        : "Read"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="section-card">
          <div className="section-header">
            <div>
              <h2>Service Requests</h2>
              <p>Track the services you have requested.</p>
            </div>

            <Link href="/professionals" className="small-primary">
              + New Request
            </Link>
          </div>

          {requests.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛠️</div>
              <h3>No service requests yet</h3>
              <p>
                Find a professional and create your first service request.
              </p>

              <Link href="/professionals" className="primary-button">
                Find a Professional
              </Link>
            </div>
          ) : (
            <div className="request-list">
              {requests.map((request) => (
                <div className="request-item" key={request.id}>
                  <div className="request-main">
                    <h3>
                      {request.title ||
                        request.service_title ||
                        "Service Request"}
                    </h3>

                    <p>
                      {request.description ||
                        "No description provided."}
                    </p>

                    {request.created_at && (
                      <small>
                        Created{" "}
                        {new Date(
                          request.created_at
                        ).toLocaleDateString()}
                      </small>
                    )}
                  </div>

                  <div className={getStatusClass(request.status)}>
                    {request.status || "Pending"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="quick-links">
          <Link href="/professionals" className="quick-card">
            <span>🔎</span>
            <div>
              <h3>Find a Professional</h3>
              <p>Search for trusted professionals.</p>
            </div>
          </Link>

          <Link href="/notifications" className="quick-card">
            <span>🔔</span>
            <div>
              <h3>Notifications</h3>
              <p>View all your notifications.</p>
            </div>
          </Link>

          <Link href="/customers" className="quick-card">
            <span>👤</span>
            <div>
              <h3>Customer Area</h3>
              <p>Manage your customer information.</p>
            </div>
          </Link>

          {isAdmin && (
            <Link href="/admin/dashboard" className="quick-card admin-quick-card">
              <span>⚙️</span>
              <div>
                <h3>Admin Dashboard</h3>
                <p>Manage Fundi Universe platform.</p>
              </div>
            </Link>
          )}
        </section>
      </section>

      <style jsx>{`
        .dashboard-page {
          min-height: 100vh;
          background: #f8fafc;
          color: #0f172a;
        }

        .topbar {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          padding: 18px 5%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .brand-area {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: #2563eb;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 16px;
        }

        .brand-area h1 {
          margin: 0;
          font-size: 17px;
          font-weight: 900;
          letter-spacing: 0.3px;
        }

        .brand-area span {
          color: #64748b;
          font-size: 12px;
        }

        .top-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .primary-button,
        .secondary-button,
        .admin-button,
        .small-primary,
        .location-button {
          border-radius: 10px;
          padding: 11px 16px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: 0.2s ease;
        }

        .primary-button,
        .small-primary {
          background: #2563eb;
          color: white;
          border: 1px solid #2563eb;
        }

        .primary-button:hover,
        .small-primary:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        .secondary-button {
          background: white;
          color: #0f172a;
          border: 1px solid #cbd5e1;
        }

        .secondary-button:hover {
          background: #f8fafc;
        }

        .admin-button {
          background: #111827;
          color: white;
          border: 1px solid #334155;
        }

        .admin-button:hover {
          background: #1e293b;
          transform: translateY(-1px);
        }

        .content {
          width: min(1180px, 92%);
          margin: 0 auto;
          padding: 35px 0 60px;
        }

        .welcome-card {
          background: linear-gradient(135deg, #0f172a, #1e3a8a);
          color: white;
          border-radius: 20px;
          padding: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
        }

        .eyebrow {
          margin: 0 0 8px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          opacity: 0.75;
        }

        .welcome-card h2 {
          margin: 0 0 10px;
          font-size: 30px;
        }

        .welcome-card p:not(.eyebrow) {
          margin: 0;
          max-width: 700px;
          line-height: 1.6;
          color: #dbeafe;
        }

        .welcome-icon {
          font-size: 50px;
        }

        .location-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
        }

        .location-info {
          display: flex;
          align-items: flex-start;
          gap: 15px;
        }

        .section-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #eff6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
        }

        .location-card h3 {
          margin: 0 0 6px;
          font-size: 17px;
        }

        .location-card p {
          margin: 0;
          color: #64748b;
          line-height: 1.5;
        }

        .location-button {
          background: #0f172a;
          color: white;
          border: 1px solid #0f172a;
          white-space: nowrap;
        }

        .location-button:hover {
          background: #1e293b;
        }

        .location-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-message {
          margin-top: 8px;
          color: #15803d;
          font-size: 13px;
          font-weight: 700;
        }

        .location-error {
          margin-top: 8px;
          color: #dc2626;
          font-size: 13px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 22px;
        }

        .stat-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 22px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }

        .stat-card span {
          display: block;
          color: #64748b;
          font-size: 13px;
          margin-bottom: 5px;
        }

        .stat-card strong {
          font-size: 24px;
        }

        .section-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 24px;
          margin-bottom: 22px;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 18px;
        }

        .section-header h2 {
          margin: 0 0 5px;
          font-size: 21px;
        }

        .section-header p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
        }

        .text-button {
          border: none;
          background: transparent;
          color: #2563eb;
          font-weight: 700;
          cursor: pointer;
        }

        .notification-list,
        .request-list {
          display: grid;
          gap: 12px;
        }

        .notification-item,
        .request-item {
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .notification-item.unread {
          background: #eff6ff;
          border-color: #bfdbfe;
        }

        .notification-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notification-content {
          flex: 1;
        }

        .notification-content h3,
        .request-main h3 {
          margin: 0 0 5px;
          font-size: 15px;
        }

        .notification-content p,
        .request-main p {
          margin: 0 0 6px;
          color: #64748b;
          line-height: 1.5;
          font-size: 14px;
        }

        .notification-content small,
        .request-main small {
          color: #94a3b8;
          font-size: 12px;
        }

        .read-button {
          border: 1px solid #cbd5e1;
          background: white;
          border-radius: 8px;
          padding: 8px 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .request-main {
          flex: 1;
        }

        .status {
          padding: 7px 11px;
          border-radius: 999px;
          background: #f1f5f9;
          color: #475569;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
        }

        .status.success {
          background: #dcfce7;
          color: #166534;
        }

        .status.pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status.danger {
          background: #fee2e2;
          color: #991b1b;
        }

        .status.progress {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .empty-state {
          text-align: center;
          padding: 35px 20px;
          color: #64748b;
        }

        .empty-icon {
          font-size: 38px;
          margin-bottom: 10px;
        }

        .empty-state h3 {
          color: #0f172a;
          margin: 0 0 6px;
        }

        .empty-state p {
          margin: 0 0 18px;
        }

        .quick-links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        .quick-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          text-decoration: none;
          color: inherit;
          display: flex;
          gap: 13px;
          transition: 0.2s ease;
        }

        .quick-card:hover {
          transform: translateY(-2px);
          border-color: #93c5fd;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
        }

        .quick-card > span {
          font-size: 25px;
        }

        .quick-card h3 {
          margin: 0 0 5px;
          font-size: 15px;
        }

        .quick-card p {
          margin: 0;
          color: #64748b;
          font-size: 13px;
          line-height: 1.4;
        }

        .admin-quick-card {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .error-box {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
          padding: 16px;
          border-radius: 14px;
          margin-bottom: 20px;
        }

        .error-box p {
          margin: 5px 0 0;
        }

        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .quick-links {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 700px) {
          .topbar {
            align-items: flex-start;
            flex-direction: column;
          }

          .top-actions {
            width: 100%;
            justify-content: flex-start;
          }

          .welcome-card {
            padding: 24px;
          }

          .welcome-card h2 {
            font-size: 24px;
          }

          .welcome-icon {
            display: none;
          }

          .location-card {
            align-items: flex-start;
            flex-direction: column;
          }

          .location-button {
            width: 100%;
          }

          .section-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .notification-item,
          .request-item {
            align-items: flex-start;
          }

          .quick-links {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
