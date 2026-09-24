"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Overview",
    icon: "📊",
    href: "/admin/dashboard",
  },
  {
    title: "Professionals",
    icon: "👨‍🔧",
    href: "/admin/professionals",
  },
  {
    title: "Customers",
    icon: "👤",
    href: "/admin/customers",
  },
  {
    title: "Jobs & Bookings",
    icon: "💼",
    href: "/admin/jobs",
  },
  {
    title: "Verification",
    icon: "✅",
    href: "/admin/verification",
  },
  {
    title: "Payments",
    icon: "💳",
    href: "/admin/payments",
  },
  {
    title: "Disputes & Safety",
    icon: "⚠️",
    href: "/admin/disputes",
  },
  {
    title: "Reviews & Ratings",
    icon: "⭐",
    href: "/admin/reviews",
  },
  {
    title: "Notifications",
    icon: "🔔",
    href: "/admin/notifications",
  },
  {
    title: "Global Opportunities",
    icon: "🌍",
    href: "/admin/global-opportunities",
  },
  {
    title: "Services & Categories",
    icon: "🛠️",
    href: "/admin/services",
  },
  {
    title: "Countries & Locations",
    icon: "📍",
    href: "/admin/locations",
  },
  {
    title: "Reports & Analytics",
    icon: "📈",
    href: "/admin/reports",
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          background: "#111827",
          color: "#ffffff",
          minHeight: "100vh",
          padding: "20px 14px",
          boxSizing: "border-box",
          position: "sticky",
          top: 0,
          alignSelf: "flex-start",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "8px 10px 22px",
            borderBottom: "1px solid #374151",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "800",
            }}
          >
            FUNDI UNIVERSE
          </div>

          <div
            style={{
              fontSize: "11px",
              color: "#9ca3af",
              marginTop: "5px",
              letterSpacing: "1px",
            }}
          >
            ADMIN CENTER
          </div>
        </div>

        {/* Navigation */}
        <nav>
          {menuItems.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  padding: "11px 12px",
                  marginBottom: "5px",
                  borderRadius: "9px",
                  textDecoration: "none",
                  color: active ? "#ffffff" : "#d1d5db",
                  background: active ? "#374151" : "transparent",
                  fontSize: "13px",
                  fontWeight: active ? "700" : "500",
                }}
              >
                <span style={{ fontSize: "17px" }}>
                  {item.icon}
                </span>

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom links */}
        <div
          style={{
            borderTop: "1px solid #374151",
            marginTop: "20px",
            paddingTop: "15px",
          }}
        >
          <Link
            href="/"
            style={{
              display: "block",
              color: "#d1d5db",
              textDecoration: "none",
              fontSize: "13px",
              padding: "10px 12px",
            }}
          >
            ← Main Website
          </Link>

          <Link
            href="/dashboard"
            style={{
              display: "block",
              color: "#d1d5db",
              textDecoration: "none",
              fontSize: "13px",
              padding: "10px 12px",
            }}
          >
            👤 User Dashboard
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
      }
