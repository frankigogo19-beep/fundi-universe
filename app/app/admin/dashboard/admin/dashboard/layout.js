import Link from "next/link";

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 bg-gray-900 text-white md:block">
          <div className="border-b border-gray-700 p-6">
            <h1 className="text-xl font-bold">
              🌍 FUNDI UNIVERSE
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Admin Dashboard
            </p>
          </div>

          <nav className="p-4">

            <Link
              href="/admin/dashboard"
              className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              📊 Overview
            </Link>

            <Link
              href="/admin/professionals"
              className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              👨‍🔧 Professionals
            </Link>

            <Link
              href="/admin/customers"
              className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              👥 Customers
            </Link>

            <Link
              href="/admin/jobs"
              className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              📋 Jobs & Bookings
            </Link>

            <Link
              href="/admin/verification"
              className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              ✅ Verification
            </Link>

            <Link
              href="/admin/payments"
              className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              💳 Payments
            </Link>

            <Link
              href="/admin/disputes"
              className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              ⚠️ Disputes
            </Link>

            <Link
              href="/admin/reviews"
              className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              ⭐ Reviews
            </Link>

            <Link
              href="/admin/notifications"
              className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              🔔 Notifications
            </Link>

            <Link
              href="/admin/global-opportunities"
              className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              🌍 Global Opportunities
            </Link>

            <Link
              href="/admin/services"
              className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              🛠️ Services
            </Link>

            <Link
              href="/admin/locations"
              className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              📍 Locations
            </Link>

            <Link
              href="/admin/reports"
              className="mb-2 block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              📈 Reports
            </Link>

            <div className="my-4 border-t border-gray-700" />

            <Link
              href="/"
              className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800"
            >
              🏠 Main Website
            </Link>

            <Link
              href="/dashboard"
              className="mt-2 block rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800"
            >
              👤 User Dashboard
            </Link>

          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">

          {/* Header */}
          <header className="border-b bg-white px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Admin Panel
                </h2>

                <p className="text-sm text-gray-500">
                  Manage FUNDI UNIVERSE
                </p>
              </div>

              <Link
                href="/"
                className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Visit Website
              </Link>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-4 md:p-8">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
    }
