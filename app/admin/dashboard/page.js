
"use client";

import Link from "next/link";

const overviewCards = [
  {
    title: "Professionals",
    value: "0",
    description: "Registered professionals",
    icon: "👨‍🔧",
    href: "/admin/dashboard/professionals",
  },
  {
    title: "Customers",
    value: "0",
    description: "Registered customers",
    icon: "👥",
    href: "/admin/dashboard/customers",
  },
  {
    title: "Job Requests",
    value: "0",
    description: "Total service requests",
    icon: "📋",
    href: "/admin/dashboard/jobs",
  },
  {
    title: "Pending Verification",
    value: "0",
    description: "Waiting for review",
    icon: "⏳",
    href: "/admin/dashboard/verification",
  },
];

const managementItems = [
  {
    title: "Professionals",
    description: "Manage professional accounts and profiles.",
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
    description: "Review professional verification requests.",
    icon: "✓",
    href: "/admin/dashboard/verification",
  },
  {
    title: "Categories",
    description: "Manage professional service categories.",
    icon: "🗂️",
    href: "/admin/dashboard/categories",
  },
  {
    title: "Payments",
    description: "Monitor platform payment activity.",
    icon: "💳",
    href: "/admin/dashboard/payments",
  },
];

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Fundi Universe
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight">
              Admin Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage and monitor the Fundi Universe platform.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-xl border bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              ← Website
            </Link>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-lg text-white">
              A
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Welcome */}
        <section className="mb-8 rounded-2xl bg-slate-900 p-7 text-white shadow-sm">
          <p className="text-sm font-medium text-slate-300">
            Platform Administration
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Welcome to Fundi Universe Admin
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            From here you can monitor professionals, customers, job requests,
            verification, payments and other important platform activities.
          </p>
        </section>

        {/* Overview */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Overview</h2>
            <p className="mt-1 text-sm text-slate-500">
              Quick summary of your platform.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {overviewCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl">
                    {card.icon}
                  </div>

                  <span className="text-xl text-slate-300 transition group-hover:text-blue-600">
                    →
                  </span>
                </div>

                <p className="mt-6 text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <p className="mt-1 text-3xl font-bold">{card.value}</p>

                <p className="mt-2 text-xs text-slate-400">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Management */}
        <section className="mt-10">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Management</h2>
            <p className="mt-1 text-sm text-slate-500">
              Access the main administration areas.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {managementItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t pt-4">
                  <span className="text-xs font-semibold text-slate-400">
                    OPEN SECTION
                  </span>

                  <span className="font-semibold text-blue-600 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Activity */}
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">Recent Activity</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Latest platform activities.
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                LIVE
              </span>
            </div>

            <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center">
              <div className="text-3xl">📊</div>

              <p className="mt-3 font-semibold text-slate-700">
                No activity yet
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Recent platform activity will appear here.
              </p>
            </div>
          </div>

          {/* Verification */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="font-bold">Professional Verification</h2>

              <p className="mt-1 text-sm text-slate-500">
                Monitor professional verification status.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-amber-50 p-4 text-center">
                <p className="text-2xl font-bold text-amber-600">0</p>
                <p className="mt-1 text-xs font-medium text-amber-700">
                  Pending
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-4 text-center">
                <p className="text-2xl font-bold text-emerald-600">0</p>
                <p className="mt-1 text-xs font-medium text-emerald-700">
                  Approved
                </p>
              </div>

              <div className="rounded-xl bg-red-50 p-4 text-center">
                <p className="text-2xl font-bold text-red-600">0</p>
                <p className="mt-1 text-xs font-medium text-red-700">
                  Rejected
                </p>
              </div>
            </div>

            <Link
              href="/admin/dashboard/verification"
              className="mt-6 block rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Manage Verification
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center text-xs text-slate-400">
          Fundi Universe Administration • Private Admin Area
        </footer>
      </div>
    </main>
  );
}
