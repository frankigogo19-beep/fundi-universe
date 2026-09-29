
"use client";

import Link from "next/link";

const stats = [
  {
    title: "Professionals",
    value: "0",
    description: "Registered professionals",
    icon: "👨‍🔧",
  },
  {
    title: "Customers",
    value: "0",
    description: "Registered customers",
    icon: "👥",
  },
  {
    title: "Job Requests",
    value: "0",
    description: "Total requests",
    icon: "📋",
  },
  {
    title: "Verification",
    value: "0",
    description: "Pending reviews",
    icon: "✓",
  },
];

const quickActions = [
  {
    title: "Manage Professionals",
    description: "View and manage professionals",
    href: "/admin/dashboard/professionals",
    icon: "👨‍🔧",
  },
  {
    title: "View Customers",
    description: "Manage registered customers",
    href: "/admin/dashboard/customers",
    icon: "👥",
  },
  {
    title: "Review Verification",
    description: "Check pending verification",
    href: "/admin/dashboard/verification",
    icon: "✓",
  },
  {
    title: "Job Requests",
    description: "Monitor customer requests",
    href: "/admin/dashboard/jobs",
    icon: "📋",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <section>
        <p className="text-sm font-semibold text-slate-500">
          Overview
        </p>

        <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Dashboard Overview
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Welcome back, Frank. Here is what is happening
              across Fundi Universe.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex w-fit items-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            View Website
          </Link>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-4 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Main Grid */}
      <section className="grid gap-6 xl:grid-cols-3">
        {/* Recent Activity */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h3 className="font-bold text-slate-900">
                Recent Activity
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Latest platform activity
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
              Live
            </span>
          </div>

          <div className="p-6">
            <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
              <div className="text-center">
                <div className="text-3xl">📊</div>

                <p className="mt-3 font-semibold text-slate-700">
                  No recent activity
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Platform activity will appear here.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Status */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <h3 className="font-bold text-slate-900">
              Platform Status
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Current system status
            </p>
          </div>

          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Website
                </p>
                <p className="text-xs text-slate-400">
                  Public platform
                </p>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                Online
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Database
                </p>
                <p className="text-xs text-slate-400">
                  Supabase
                </p>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                Connected
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Admin Security
                </p>
                <p className="text-xs text-slate-400">
                  Protected area
                </p>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                Active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="mb-5">
          <h3 className="text-xl font-bold text-slate-900">
            Quick Actions
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Quickly access important administration areas.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl transition group-hover:bg-slate-200">
                {action.icon}
              </div>

              <h4 className="mt-5 font-bold text-slate-900">
                {action.title}
              </h4>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                {action.description}
              </p>

              <p className="mt-4 text-sm font-semibold text-slate-900">
                Open →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Overview */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Fundi Universe Administration
            </h3>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              This private administration area will allow you to
              manage professionals, customers, job requests,
              verification, payments and platform settings.
            </p>
          </div>

          <Link
            href="/admin/dashboard/settings"
            className="inline-flex w-fit items-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Open Settings
          </Link>
        </div>
      </section>
    </div>
  );
}
