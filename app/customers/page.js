"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function CustomerDashboard() {
  const [user, setUser] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [markingRead, setMarkingRead] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setError("");

    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    if (!currentUser) {
      setError("Please login to access your customer dashboard.");
      setLoading(false);
      return;
    }

    setUser(currentUser);

    const {
      data: customerData,
      error: customerError,
    } = await supabase
      .from("customers")
      .select("*")
      .eq("user_id", currentUser.id)
      .maybeSingle();

    if (customerError) {
      console.error("Customer profile error:", customerError);
      setError(
        `Unable to load your customer profile: ${customerError.message}`
      );
      setLoading(false);
      return;
    }

    setCustomer(customerData);

    const {
      data: requestData,
      error: requestError,
    } = await supabase
      .from("job_requests")
      .select("*")
      .eq("customer_id", currentUser.id)
      .order("created_at", { ascending: false });

    if (requestError) {
      console.error("Job requests error:", requestError);
      setRequests([]);
    } else {
      setRequests(requestData || []);
    }

    const {
      data: notificationData,
      error: notificationError,
    } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("created_at", { ascending: false });

    if (notificationError) {
      console.error("Notifications error:", notificationError);
      setNotifications([]);
    } else {
      setNotifications(notificationData || []);
    }

    setLoading(false);
  }

  async function markAsRead(notificationId) {
    if (!user) return;

    setMarkingRead(notificationId);

    const { error: updateError } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId)
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Mark as read error:", updateError);
      setMarkingRead(null);
      return;
    }

    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === notificationId
          ? { ...notification, is_read: true }
          : notification
      )
    );

    setMarkingRead(null);
  }

  async function markAllAsRead() {
    if (!user) return;

    const unreadIds = notifications
      .filter((notification) => !notification.is_read)
      .map((notification) => notification.id);

    if (unreadIds.length === 0) return;

    const { error: updateError } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .in("id", unreadIds);

    if (updateError) {
      console.error("Mark all as read error:", updateError);
      return;
    }

    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        is_read: true,
      }))
    );
  }

  function getRequestStatusClass(status) {
    const value = (status || "").toLowerCase();

    if (value === "pending") return "status pending";
    if (value === "accepted") return "status accepted";
    if (value === "rejected") return "status rejected";

    if (value === "in progress" || value === "started") {
      return "status progress";
    }

    if (value === "completed") return "status completed";

    return "status";
  }

  function getNotificationClass(notification) {
    return notification.is_read
      ? "notification-card read"
      : "notification-card unread";
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  if (loading) {
    return (
      <main className="page">
        <div className="container">
          <div className="loading">
            Loading customer dashboard...
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

            <h1>Customer Dashboard</h1>

            <p className="welcome">
              Welcome,{" "}
              {customer?.full_name ||
                customer?.name ||
                user?.email ||
                "Customer"}
            </p>
          </div>

          <div className="top-actions">
            <Link
              href="/professionals"
              className="primary-button"
            >
              Find a Professional
            </Link>

            <Link href="/" className="secondary-button">
              Home
            </Link>
          </div>
        </header>

        {error && (
          <div className="error-box">
            {error}
          </div>
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
            <span>Notifications</span>
            <strong>{unreadCount}</strong>
          </div>

        </section>

        <section className="notifications-section">

          <div className="section-heading">

            <div>
              <p className="eyebrow">NOTIFICATIONS</p>

              <h2>
                Notifications{" "}

                {unreadCount > 0 && (
                  <span className="notification-count">
                    {unreadCount}
                  </span>
                )}
              </h2>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                className="secondary-button"
                onClick={markAllAsRead}
              >
                Mark All as Read
              </button>
            )}

          </div>

          {notifications.length === 0 ? (

            <div className="empty-box">

              <div className="notification-icon">
                🔔
              </div>

              <h3>No notifications yet</h3>

              <p>
                When a professional responds to your
                service request, you will see the
                notification here.
              </p>

            </div>

          ) : (

            <div className="notifications-list">

              {notifications.map((notification) => (

                <article
                  key={notification.id}
                  className={getNotificationClass(
                    notification
                  )}
                >

                  <div className="notification-icon">
                    🔔
                  </div>

                  <div className="notification-content">

                    <div className="notification-top">

                      <h3>
                        {notification.title ||
                          "Notification"}
                      </h3>

                      {!notification.is_read && (
                        <span className="new-badge">
                          NEW
                        </span>
                      )}

                    </div>

                    <p>
                      {notification.message ||
                        "You have a new notification."}
                    </p>

                    {notification.created_at && (
                      <span className="notification-date">
                        {new Date(
                          notification.created_at
                        ).toLocaleString()}
                      </span>
                    )}

                    {!notification.is_read && (
                      <button
                        type="button"
                        className="read-button"
                        disabled={
                          markingRead === notification.id
                        }
                        onClick={() =>
                          markAsRead(notification.id)
                        }
                      >
                        {markingRead === notification.id
                          ? "Updating..."
                          : "Mark as Read"}
                      </button>
                    )}

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

        <section className="requests-section">

          <div className="section-heading">

            <div>
              <p className="eyebrow">
                MY SERVICE REQUESTS
              </p>

              <h2>My Requests</h2>
            </div>

            <Link
              href="/professionals"
              className="secondary-button"
            >
              Find Professional
            </Link>

          </div>

          {requests.length === 0 ? (

            <div className="empty-box">

              <h3>No service requests yet</h3>

              <p>
                Find a professional and send a service
                request to get started.
              </p>

              <Link
                href="/professionals"
                className="primary-button"
              >
                Find a Professional
              </Link>

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

                      {request.created_at && (
                        <p className="request-date">
                          {new Date(
                            request.created_at
                          ).toLocaleString()}
                        </p>
                      )}

                    </div>

                    <span
                      className={getRequestStatusClass(
                        request.status
                      )}
                    >
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
                        <span>Budget</span>

                        <strong>
                          {request.budget !== null &&
                          request.budget !== undefined &&
                          request.budget !== ""
                            ? `${request.currency || ""} ${
                                request.budget
                              }`
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

                      <div>
                        <span>Location</span>

                        <strong>
                          {request.location ||
                            "Not specified"}
                        </strong>
                      </div>

                    </div>

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
          box-shadow:
            0 6px 20px rgba(15, 23, 42, 0.04);
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

        .notifications-section,
        .requests-section {
          margin-top: 24px;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          margin-bottom: 16px;
        }

        .section-heading h2 {
          color: #0f172a;
          margin-bottom: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .notification-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
          height: 24px;
          padding: 0 7px;
          border-radius: 999px;
          background: #dc2626;
          color: white;
          font-size: 12px;
        }

        .notifications-list,
        .requests-list {
          display: grid;
          gap: 14px;
        }

        .notification-card {
          display: flex;
          gap: 15px;
          padding: 18px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow:
            0 6px 20px rgba(15, 23, 42, 0.04);
        }

        .notification-card.unread {
          border-left: 4px solid #0f172a;
          background: #ffffff;
        }

        .notification-card.read {
          opacity: 0.8;
        }

        .notification-icon {
          width: 42px;
          height: 42px;
          min-width: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: #f1f5f9;
          font-size: 20px;
        }

        .notification-content {
          flex: 1;
        }

        .notification-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .notification-top h3 {
          margin-bottom: 0;
          color: #0f172a;
          font-size: 17px;
        }

        .new-badge {
          padding: 4px 7px;
          border-radius: 999px;
          background: #0f172a;
          color: white;
          font-size: 10px;
          font-weight: 800;
        }

        .notification-content p {
          color: #475569;
          line-height: 1.6;
          margin-bottom: 8px;
        }

        .notification-date,
        .request-date {
          display: block;
          color: #94a3b8;
          font-size: 12px;
        }

        .read-button {
          margin-top: 10px;
          border: 0;
          background: #e2e8f0;
          color: #0f172a;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .request-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 20px;
          box-shadow:
            0 8px 25px rgba(15, 23, 42, 0.05);
        }

        .request-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e2e8f0;
        }

        .request-header h3 {
          margin-bottom: 5px;
          color: #0f172a;
          font-size: 19px;
        }

        .status {
          display: inline-flex;
          align-items: center;
          padding: 7px 12px;
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
          padding-top: 16px;
        }

        .request-body > p {
          color: #475569;
          line-height: 1.7;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 16px;
        }

        .details-grid div {
          background: #f8fafc;
          border-radius: 10px;
          padding: 12px;
        }

        .details-grid span {
          display: block;
          font-size: 11px;
          color: #64748b;
          margin-bottom: 4px;
        }

        .details-grid strong {
          color: #0f172a;
          font-size: 13px;
          word-break: break-word;
        }

        .primary-button,
        .secondary-button {
          border-radius: 10px;
          padding: 11px 16px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          border: 0;
        }

        .primary-button {
          background: #0f172a;
          color: white;
        }

        .secondary-button {
          background: #e2e8f0;
          color: #0f172a;
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

        .empty-box .primary-button {
          margin-top: 12px;
        }

        @media (max-width: 850px) {
          .topbar {
            flex-direction: column;
            align-items: stretch;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .details-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .section-heading {
            align-items: flex-start;
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

          .section-heading {
            flex-direction: column;
          }

          .top-actions {
            width: 100%;
          }

          .top-actions a {
            flex: 1;
          }

          .notification-card {
            padding: 15px;
          }

          .request-header {
            flex-direction: column;
          }
        }

      `}</style>
    </main>
  );
}
