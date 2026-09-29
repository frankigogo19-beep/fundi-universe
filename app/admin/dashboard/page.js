
"use client";

import Link from "next/link";

export default function AdminDashboard() {
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
      description: "Professionals awaiting verification",
      icon: "⏳",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Fundi Universe Admin</h1>
            <p className="text-sm text-gray-500 mt-1">
              Platform administration dashboard
            </p>
          </div>

          <Link
            href="/"
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50"
          >
            Back to Website
          </Link>
        </div>
      </header>

      {/* Dashboard */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-gray-500 mt-2">
            Monitor and manage Fundi Universe from one place.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="text-3xl">{stat.icon}</div>
                <span className="text-xs text-gray-400">LIVE</span>
              </div>

              <h3 className="text-sm font-medium text-gray-500 mt-5">
                {stat.title}
              </h3>

              <p className="text-3xl font-bold mt-2">{stat.value}</p>

              <p className="text-sm text-gray-500 mt-2">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Management */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-5">Management</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Link
              href="/admin/dashboard/professionals"
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl mb-4">👨‍🔧</div>
              <h3 className="text-lg font-bold">Professionals</h3>
              <p className="text-sm text-gray-500 mt-2">
                View, verify and manage registered professionals.
              </p>
            </Link>

            <Link
              href="/admin/dashboard/customers"
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-lg font-bold">Customers</h3>
              <p className="text-sm text-gray-500 mt-2">
                View and manage customers using Fundi Universe.
              </p>
            </Link>

            <Link
              href="/admin/dashboard/jobs"
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-lg font-bold">Job Requests</h3>
              <p className="text-sm text-gray-500 mt-2">
                Monitor service requests between customers and professionals.
              </p>
            </Link>

            <Link
              href="/admin/dashboard/verification"
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-lg font-bold">Verification</h3>
              <p className="text-sm text-gray-500 mt-2">
                Review professional verification and identity information.
              </p>
            </Link>

            <Link
              href="/admin/dashboard/settings"
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-lg font-bold">Settings</h3>
              <p className="text-sm text-gray-500 mt-2">
                Configure platform administration settings.
              </p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-10">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold">Recent Activity</h2>

            <div className="mt-6 text-center py-10">
              <div className="text-4xl">📊</div>
              <p className="font-medium mt-4">No activity yet</p>
              <p className="text-sm text-gray-500 mt-1">
                Platform activity will appear here.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
