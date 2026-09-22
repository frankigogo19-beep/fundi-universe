"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please login to view your notifications.");
      setLoading(false);
      return;
    }

    const { data, error: fetchError } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error(fetchError);
      setError("Unable to load notifications.");
      setLoading(false);
      return;
    }

    setNotifications(data || []);
    setLoading(false);
  }

  async function markAsRead(notificationId) {
    const { error: updateError } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId);

    if (updateError) {
      console.error(updateError);
      return;
    }

    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === notificationId
          ? { ...notification, is_read: true }
          : notification
      )
    );
  }

  async function markAllAsRead() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { error: updateError } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);

    if (updateError) {
      console.error(updateError);
      return;
    }

    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        is_read: true,
      }))
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Link
          href="/dashboard"
          style={{
            textDecoration: "none",
            color: "#2563eb",
            fontWeight: "600",
          }}
        >
          ← Back to Dashboard
        </Link>

        <div
          style={{
            marginTop: "20px",
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "28px",
                }}
              >
                Notifications
              </h1>

              <p
                style={{
                  marginTop: "8px",
                  color: "#64748b",
                }}
              >
                View your latest service requests and updates.
              </p>
            </div>

            {notifications.some(
              (notification) => !notification.is_read
            ) && (
              <button
                onClick={markAllAsRead}
                style={{
                  border: "none",
                  background: "#2563eb",
                  color: "#ffffff",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Mark All as Read
              </button>
            )}
          </div>

          {loading && (
            <p style={{ marginTop: "30px" }}>
              Loading notifications...
            </p>
          )}

          {error && (
            <p
              style={{
                marginTop: "30px",
                color: "#dc2626",
              }}
            >
              {error}
            </p>
          )}

          {!loading && !error && notifications.length === 0 && (
            <div
              style={{
                marginTop: "30px",
                padding: "30px",
                textAlign: "center",
                background: "#f8fafc",
                borderRadius: "12px",
                color: "#64748b",
              }}
            >
              You have no notifications yet.
            </div>
          )}

          {!loading &&
            !error &&
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => {
                  if (!notification.is_read) {
                    markAsRead(notification.id);
                  }
                }}
                style={{
                  marginTop: "16px",
                  padding: "18px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  background: notification.is_read
                    ? "#ffffff"
                    : "#eff6ff",
                  cursor: notification.is_read
                    ? "default"
                    : "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong>{notification.title}</strong>

                  {!notification.is_read && (
                    <span
                      style={{
                        fontSize: "12px",
                        background: "#2563eb",
                        color: "#ffffff",
                        padding: "4px 8px",
                        borderRadius: "20px",
                      }}
                    >
                      New
                    </span>
                  )}
                </div>

                <p
                  style={{
                    margin: "10px 0",
                    color: "#475569",
                  }}
                >
                  {notification.message}
                </p>

                <small style={{ color: "#94a3b8" }}>
                  {notification.created_at
                    ? new Date(
                        notification.created_at
                      ).toLocaleString()
                    : ""}
                </small>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
