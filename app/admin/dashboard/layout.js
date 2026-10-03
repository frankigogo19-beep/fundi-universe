"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const menuItems = [
  {
    name: "Overview",
    href: "/admin/dashboard",
    icon: "▦",
  },
  {
    name: "Professionals",
    href: "/admin/dashboard/professionals",
    icon: "👨‍🔧",
  },
  {
    name: "Customers",
    href: "/admin/dashboard/customers",
    icon: "👥",
  },
  {
    name: "Job Requests",
    href: "/admin/dashboard/jobs",
    icon: "📋",
  },
  {
    name: "Verification",
    href: "/admin/dashboard/verification",
    icon: "✓",
  },
  {
    name: "Payments",
    href: "/admin/dashboard/payments",
    icon: "💳",
  },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);
  const [adminName, setAdminName] = useState("Admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkAdmin() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          router.replace("/login");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("full_name, role")
          .eq("user_id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Admin profile error:", profileError);

          if (active) {
            router.replace("/");
          }

          return;
        }

        if (!profile || profile.role !== "admin") {
          if (active) {
            router.replace("/");
          }

          return;
        }

        if (active) {
          setAdminName(profile.full_name || "Admin");
          setChecking(false);
        }
      } catch (error) {
        console.error("Admin access error:", error);

        if (active) {
          router.replace("/");
        }
      }
    }

    checkAdmin();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      router.replace("/login");
    }
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white px-8 py-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-xl text-white">
            🔐
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Checking admin access
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please wait...
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-20 items-center border-b border-slate-200 px-6">
          <Link
            href="/admin/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white">
              FU
            </div>

            <div>
              <p className="font-bold text-slate-900">
                Fundi Universe
              </p>

              <p className="text-xs text-slate-500">
                Administration
              </p>
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/admin/dashboard" &&
                  pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg text-base">
                    {item.icon}
                  </span>

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="my-6 border-t border-slate-200" />

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            System
          </p>

          <Link
            href="/admin/dashboard/settings"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
              pathname.startsWith("/admin/dashboard/settings")
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg">
              ⚙️
            </span>

            <span>Settings</span>
          </Link>
        </div>

        <div className="border-t border-slate-200 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              {adminName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">
                {adminName}
              </p>

              <p className="text-xs text-slate-500">
                Administrator
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <span>↪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg lg:hidden"
                aria-label="Open sidebar"
              >
                ☰
              </button>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Administration
                </p>

                <h1 className="mt-1 text-lg font-bold text-slate-900">
                  Fundi Universe Admin
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="hidden rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:block"
              >
                View Website
              </Link>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                {adminName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-5rem)] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
