"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const opportunities = [
  {
    icon: "🌍",
    title: "International Business Opportunities",
    description:
      "Discover ways to connect businesses and professionals in Tanzania, Africa and international markets.",
    details:
      "Expand your business reach by connecting directly with verified service providers, suppliers, and corporate clients across East Africa and global trade hubs.",
    category: "Business",
    actionText: "Find Business Partners",
    actionHref: "/",
  },
  {
    icon: "🤝",
    title: "Global Collaboration",
    description:
      "Build partnerships with customers, skilled professionals and businesses around the world.",
    details:
      "Collaborate on cross-border projects, joint ventures, and remote technical support with trusted professionals on Fundi Universe.",
    category: "Partnerships",
    actionText: "Start Collaborating",
    actionHref: "/",
  },
  {
    icon: "💼",
    title: "Professional Services",
    description:
      "Explore professional services in construction, technology, transport, maintenance and other industries.",
    details:
      "Hire vetted engineers, IT specialists, logistics experts, and certified technicians ready to deliver high-standard services.",
    category: "Services",
    actionText: "Browse Professionals",
    actionHref: "/",
  },
  {
    icon: "📈",
    title: "Business Partnerships",
    description:
      "Find opportunities to develop business relationships and explore potential international cooperation.",
    details:
      "Position your company for long-term growth through strategic alliances, subcontracting opportunities, and B2B networking.",
    category: "Growth",
    actionText: "Join the Network",
    actionHref: "/",
  },
  {
    icon: "🚀",
    title: "Startup & Innovation",
    description:
      "Explore ideas, innovation and opportunities to grow businesses across different markets.",
    details:
      "Connect with tech innovators, product builders, and growth specialists to turn local solutions into scalable global products.",
    category: "Innovation",
    actionText: "Explore Innovators",
    actionHref: "/",
  },
  {
    icon: "🌐",
    title: "International Markets",
    description:
      "Learn about markets and potential connections in Tanzania, Kenya, Uganda, Rwanda, the USA, UK, UAE, India and beyond.",
    details:
      "Access regional and global demand across East Africa, the Middle East, Europe, North America, and Asia from one unified platform.",
    category: "Markets",
    actionText: "Get Started Today",
    actionHref: "/",
  },
];

const categories = [
  "All",
  "Business",
  "Partnerships",
  "Services",
  "Growth",
  "Innovation",
  "Markets",
];

export default function GlobalOpportunitiesPage() {
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter opportunities by active category and search input
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased selection:bg-orange-500/15 selection:text-orange-700">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-base font-bold tracking-tight text-slate-900"
          >
            <span className="text-xl">🌍</span>
            <span>FUNDI UNIVERSE</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Home
            </Link>
            <Link
              href="/"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-orange-700">
              <span>Connecting Tanzania to Global Markets</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
              Global Opportunities for Modern Professionals
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg lg:leading-8">
              Discover opportunities to connect people, professionals and
              businesses across countries, industries and international markets.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/"
                className="rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-500"
              >
                Find a Professional
              </Link>

              <Link
                href="/"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Join Fundi Universe
              </Link>
            </div>
          </div>

          {/* Clean Metric Strip */}
          <div className="mt-16 grid grid-cols-1 gap-8 border-t border-slate-100 pt-10 sm:grid-cols-3">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Regional & Global Reach
              </p>
              <p className="text-sm font-medium text-slate-700">
                Tanzania, Kenya, Uganda, Rwanda, UAE, UK, USA, India & beyond
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Core Sectors
              </p>
              <p className="text-sm font-medium text-slate-700">
                Construction, technology, transport, maintenance & enterprise
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Interactive Exploration
              </p>
              <p className="text-sm font-medium text-slate-700">
                Select any opportunity card to inspect scope and next steps
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Directory Section */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        {/* Section Header + Search */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
              Directory
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Explore Opportunities
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Browse key areas for business growth, professional connections and
              international collaboration.
            </p>
          </div>

          <div className="w-full lg:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic or market..."
              aria-label="Search opportunities"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 transition focus:border-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/5"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium transition sm:text-sm ${
                  isActive
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "border border-slate-200/90 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {filteredOpportunities.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setSelectedOpportunity(item)}
                className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-7 text-left shadow-2xs transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-900/10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50 text-xl transition group-hover:scale-105">
                      {item.icon}
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold leading-snug tracking-tight text-slate-900 transition group-hover:text-orange-600">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-900 transition group-hover:text-orange-600 sm:text-sm">
                  <span>View details</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <p className="text-base font-semibold text-slate-900">
              No matching opportunities found
            </p>
            <p className="mt-1.5 text-sm text-slate-500">
              Adjust your search term or switch back to All categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-5 cursor-pointer rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Bottom Feature Section */}
      <section className="border-t border-slate-200/80 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8 lg:py-24">
          <div className="space-y-4 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
              Global Network
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Grow Beyond Borders
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base sm:leading-7">
              Fundi Universe aims to make it easier for customers,
              professionals and businesses to discover one another and build
              valuable connections locally and internationally.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFC] p-8 lg:col-span-5 lg:p-9">
            <p className="text-2xl tracking-wider">🌍 🤝 💼</p>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
              One platform. Professionals worldwide.
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
              Join a growing professional network and prepare to explore
              opportunities across different markets.
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-2xs transition hover:bg-orange-500"
              >
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200/80 bg-[#F8FAFC]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-slate-500 sm:flex-row lg:px-8">
          <p>© 2026 Fundi Universe. Connecting people with skilled professionals worldwide.</p>
          <Link
            href="/"
            className="font-medium text-slate-700 transition hover:text-slate-950"
          >
            Return to Home →
          </Link>
        </div>
      </footer>

      {/* Clean Modal */}
      {selectedOpportunity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-xs"
          onClick={() => setSelectedOpportunity(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-7 shadow-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50 text-2xl">
                  {selectedOpportunity.icon}
                </div>
                <div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {selectedOpportunity.category}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOpportunity(null)}
                className="cursor-pointer rounded-lg p-2 text-sm text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
              {selectedOpportunity.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {selectedOpportunity.description}
            </p>

            <div className="mt-5 rounded-xl border border-slate-200/80 bg-[#F8FAFC] p-4 text-sm leading-relaxed text-slate-700">
              {selectedOpportunity.details}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={() => setSelectedOpportunity(null)}
                className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>

              <Link
                href={selectedOpportunity.actionHref}
                className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-2xs transition hover:bg-orange-500"
              >
                {selectedOpportunity.actionText} →
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
    }
