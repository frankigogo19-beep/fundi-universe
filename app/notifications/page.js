
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const filters = [
  { key: "all", label: "All" },
  { key: "booking", label: "Bookings" },
  { key: "message", label: "Messages" },
  { key: "payment", label: "Payments" },
  { key: "system", label: "System" },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let channel;

    async function initialize() {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("Please login to view your notifications.");
        setLoading(false);
        return;
      }

      setUserId(user.id);

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

      channel = supabase
        .channel(`notifications-${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            setNotifications((previous) => {
              const exists = previous.some(
                (notification) => notification.id === payload.new.id
              );

              if (exists) {
                return previous;
              }

              return [payload.new, ...previous];
            });
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
          (payload) => {
            setNotifications((previous) =>
              previous.map((notification) =>
                notification.id === payload.new.id
                  ? payload.new
                  : notification
              )
            );
          }
        )
        .on(
          "postgres_changes",
          {
            event: "postgres_changes",
            schema: "public",
            table: "notifications",
          },
          () => {}
        )
        .subscribe((status) => {
          console.log("Notifications realtime status:", status);
        });
    }

    initialize();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  async function markAsRead(notificationId) {
    const { error: updateError } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId)
      .eq("user_id", userId);

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
    if (!userId) return;

    const { error: updateError } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", userId)
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

  async function deleteNotification(notificationId) {
    const { error: deleteError } = await supabase
      .from("notifications")
      .delete()
      .eq("id", notificationId)
      .eq("user_id", userId);

    if (deleteError) {
      console.error(deleteError);
      return;
    }

    setNotifications((previous) =>
      previous.filter(
        (notification) => notification.id !== notificationId
      )
    );
  }

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "all") {
      return notifications;
    }

    return notifications.filter(
      (notification) => notification.type === activeFilter
    );
  }, [notifications, activeFilter]);

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  function formatDate(date) {
    if (!date) return "";

    return new Date(date).toLocaleString();
  }

  function getIcon(type) {
    switch (type) {
      case "booking":
        return "📅";
      case "message":
        return "💬";
      case "payment":
        return "💰";
      case "system":
        return "⚙️";
      default:
        return "🔔";
    }
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
                  color: "#0f172a",
                }}
              >
                Notifications
                {unreadCount > 0 && (
                  <span
                    style={{
                      marginLeft: "10px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "26px",
                      height: "26px",
                      padding: "0 7px",
                      borderRadius: "20px",
                      background: "#dc2626",
                      color: "#ffffff",
                      fontSize: "13px",
                      verticalAlign: "middle",
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
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

            {unreadCount > 0 && (
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

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "24px",
              borderBottom: "1px solid #e2e8f0",
              paddingBottom: "16px",
            }}
          >
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                style={{
                  border: "none",
                  padding: "9px 15px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontWeight: "600",
                  background:
                    activeFilter === filter.key
                      ? "#2563eb"
                      : "#f1f5f9",
                  color:
                    activeFilter === filter.key
                      ? "#ffffff"
                      : "#475569",
                }}
              >
                {filter.label}
              </button>
            ))}
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

          {!loading &&
            !error &&
            filteredNotifications.length === 0 && (
              <div
                style={{
                  marginTop: "30px",
                  padding: "40px 20px",
                  textAlign: "center",
                  background: "#f8fafc",
                  borderRadius: "12px",
                  color: "#64748b",
                }}
              >
                <div
                  style={{
                    fontSize: "40px",
                    marginBottom: "10px",
                  }}
                >
                  🔔
                </div>

                <strong>
                  No notifications found
                </strong>

                <p>
                  New updates and service activity will appear here.
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  marginTop: "16px",
                  padding: "18px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  background: notification.is_read
                    ? "#ffffff"
                    : "#eff6ff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#f8fafc",
                      borderRadius: "10px",
                      flexShrink: 0,
                    }}
                  >
                    {getIcon(notification.type)}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      <strong
                        style={{
                          color: "#0f172a",
                        }}
                      >
                        {notification.title}
                      </strong>

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
                        lineHeight: "1.5",
                      }}
                    >
                      {notification.message}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        flexWrap: "wrap",
                      }}
                    >
                      <small style={{ color: "#94a3b8" }}>
                        {formatDate(notification.created_at)}
                      </small>

                      {!notification.is_read && (
                        <button
                          onClick={() =>
                            markAsRead(notification.id)
                          }
                          style={{
                            border: "none",
                            background: "transparent",
                            color: "#2563eb",
                            cursor: "pointer",
                            fontWeight: "600",
                            padding: 0,
                          }}
                        >
                          Mark as read
                        </button>
                      )}

                      {notification.link && (
                        <Link
                          href={notification.link}
                          onClick={() => {
                            if (!notification.is_read) {
                              markAsRead(notification.id);
                            }
                          }}
                          style={{
                            color: "#2563eb",
                            fontWeight: "600",
                            textDecoration: "none",
                          }}
                        >
                          View
                        </Link>
                      )}

                      <button
                        onClick={() =>
                          deleteNotification(notification.id)
                        }
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#dc2626",
                          cursor: "pointer",
                          fontWeight: "600",
                          padding: 0,
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
