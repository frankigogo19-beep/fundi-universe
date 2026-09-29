
"use client";

import Link from "next/link";

const stats = [
  {
    title: "Total Professionals",
    value: "0",
    description: "Registered professionals",
    icon: "👨‍🔧",
  },
  {
    title: "Total Customers",
    value: "0",
    description: "Registered customers",
    icon: "👤",
  },
  {
    title: "Job Requests",
    value: "0",
    description: "Total service requests",
    icon: "📋",
  },
  {
    title: "Pending Verification",
    value: "0",
    description: "Awaiting verification",
    icon: "⏳",
  },
];

const management = [
  {
    title: "Professionals",
    description: "View, verify and manage professionals.",
    icon: "👨‍🔧",
    href: "/admin/dashboard/professionals",
  },
  {
    title: "Customers",
    description: "View and manage registered customers.",
    icon: "👥",
    href: "/admin/dashboard/customers",
  },
  {
    title: "Job Requests",
    description: "Monitor customer service requests.",
    icon: "📋",
    href: "/admin/dashboard/jobs",
  },
  {
    title: "Verification",
    description: "Review professional verification.",
    icon: "✅",
    href: "/admin/dashboard/verification",
  },
  {
    title: "Settings",
    description: "Manage platform administration settings.",
    icon: "⚙️",
    href: "/admin/dashboard/settings",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden md:flex w-64 bg-slate-950 text-white flex-col">

          <div className="px-6 py-7 border-b border-slate-800">
            <h1 className="text-xl font-bold">
              FUNDI UNIVERSE
            </h1>

            <p className="text-xs text-slate-400 mt-1">
              ADMIN PANEL
            </p>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">

            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-slate-950 font-semibold"
            >
              <span>🏠</span>
              Dashboard
            </Link>

            <Link
              href="/admin/dashboard/professionals"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
            >
              <span>👨‍🔧</span>
              Professionals
            </Link>

            <Link
              href="/admin/dashboard/customers"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
            >
              <span>👥</span>
              Customers
            </Link>

            <Link
              href="/admin/dashboard/jobs"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
            >
              <span>📋</span>
              Job Requests
            </Link>

            <Link
              href="/admin/dashboard/verification"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
            >
              <span>✅</span>
              Verification
            </Link>

            <Link
              href="/admin/dashboard/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
            >
              <span>⚙️</span>
              Settings
            </Link>

          </nav>

          <div className="p-4 border-t border-slate-800">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
            >
              <span>↩️</span>
              Back to Website
            </Link>
          </div>

        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1">

          {/* TOP BAR */}
          <header className="bg-white border-b border-slate-200">
            <div className="px-6 md:px-10 py-5 flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Fundi Universe Administration
                </p>

                <h2 className="text-2xl md:text-3xl font-bold mt-1">
                  Dashboard
                </h2>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center">
                  A
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Administrator
                  </p>

                  <p className="text-xs text-slate-500">
                    Admin
                  </p>
                </div>
              </div>

            </div>
          </header>

          {/* CONTENT */}
          <section className="px-6 md:px-10 py-8 max-w-7xl mx-auto">

            {/* INTRO */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold">
                Overview
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Monitor and manage Fundi Universe from one place.
              </p>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
                >

                  <div className="flex items-start justify-between">

                    <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                      {stat.icon}
                    </div>

                    <span className="text-xs font-medium text-slate-400">
                      LIVE
                    </span>

                  </div>

                  <p className="text-sm text-slate-500 mt-6">
                    {stat.title}
                  </p>

                  <p className="text-3xl font-bold mt-2">
                    {stat.value}
                  </p>

                  <p className="text-xs text-slate-400 mt-2">
                    {stat.description}
                  </p>

                </div>
              ))}

            </div>

            {/* MANAGEMENT */}
            <div className="mt-12">

              <div className="mb-6">
                <h3 className="text-xl font-semibold">
                  Management
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Manage the main areas of Fundi Universe.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                {management.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                  >

                    <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>

                    <h4 className="text-lg font-bold mt-5">
                      {item.title}
                    </h4>

                    <p className="text-sm text-slate-500 mt-2 leading-6">
                      {item.description}
                    </p>

                    <div className="mt-5 text-sm font-semibold">
                      Open →
                    </div>

                  </Link>
                ))}

              </div>

            </div>

            {/* RECENT ACTIVITY */}
            <div className="mt-12">

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

                <div className="px-6 py-5 border-b border-slate-200">
                  <h3 className="text-lg font-bold">
                    Recent Activity
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Latest activity across the platform.
                  </p>
                </div>

                <div className="px-6 py-12 text-center">

                  <div className="text-4xl">
                    📊
                  </div>

                  <p className="font-semibold mt-4">
                    No activity yet
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    Platform activity will appear here.
                  </p>

                </div>

              </div>

            </div>

          </section>

        </main>

      </div>
    </div>
  );
}
