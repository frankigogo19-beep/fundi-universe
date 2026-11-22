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
    <main className="min-h-screen bg-slate-100 text-slate-900 antialiased">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 text-base font-bold text-slate-900"
          >
            <span className="text-2xl">🌍</span>
            <span className="tracking-wide">FUNDI UNIVERSE</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              href="/"
              className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Wrapper with Generous Spacing */}
      <div className="mx-auto max-w-6xl space-y-12 px-6 py-12 lg:px-8 lg:py-16">
        {/* 1. Hero Box */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12 lg:p-14">
          <div className="max-w-3xl space-y-7">
            <span className="inline-block rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-orange-700">
              Connecting Tanzania to Global Markets
            </span>

            <h1 className="text-3xl font-bold leading-snug text-slate-950 sm:text-5xl sm:leading-tight">
              Global Opportunities for Modern Professionals
            </h1>

            <p className="text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
              Discover opportunities to connect people, professionals and
              businesses across countries, industries and international markets.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/"
                className="rounded-xl bg-orange-600 px-7 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-500 sm:text-base"
              >
                Find a Professional
              </Link>

              <Link
                href="/"
                className="rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:text-base"
              >
                Join Fundi Universe
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Three Separated Highlight Boxes */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Regional & Global Reach
            </p>
            <p className="text-base leading-7 text-slate-700">
              Tanzania, Kenya, Uganda, Rwanda, UAE, UK, USA, India & beyond.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Core Sectors
            </p>
            <p className="text-base leading-7 text-slate-700">
              Construction, technology, transport, maintenance & enterprise.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Interactive Exploration
            </p>
            <p className="text-base leading-7 text-slate-700">
              Select any opportunity box below to inspect scope and next steps.
            </p>
          </div>
        </section>

        {/* 3. Filter & Search Box */}
        <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-xl space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
                Directory
              </p>
              <h2 className="text-2xl font-bold leading-snug text-slate-950 sm:text-3xl">
                Explore Opportunities
              </h2>
              <p className="text-base leading-8 text-slate-600">
                Browse key areas for business growth, professional connections
                and international collaboration.
              </p>
            </div>

            <div className="w-full lg:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic or market..."
                aria-label="Search opportunities"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-6">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. Separated Opportunity Boxes Grid */}
        <section>
          {filteredOpportunities.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {filteredOpportunities.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setSelectedOpportunity(item)}
                  className="group flex cursor-pointer flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-2xl transition group-hover:scale-105">
                        {item.icon}
                      </div>
                      <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-700">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold leading-snug text-slate-900 transition group-hover:text-orange-600">
                      {item.title}
                    </h3>

                    <p className="text-base leading-8 text-slate-600">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5 text-sm font-semibold text-slate-900 transition group-hover:text-orange-600">
                    <span>View details</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4 rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center">
              <p className="text-lg font-bold text-slate-900">
                No matching opportunities found
              </p>
              <p className="text-base leading-7 text-slate-500">
                Adjust your search term or switch back to All categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="mt-2 cursor-pointer rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* 5. Bottom Feature Boxes (Grow Beyond Borders) */}
        <section className="grid gap-8 lg:grid-cols-12">
          <div className="flex flex-col justify-center space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10 lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
              Global Network
            </p>
            <h2 className="text-2xl font-bold leading-snug text-slate-950 sm:text-3xl">
              Grow Beyond Borders
            </h2>
            <p className="text-base leading-8 text-slate-600">
              Fundi Universe aims to make it easier for customers,
              professionals and businesses to discover one another and build
              valuable connections locally and internationally.
            </p>
          </div>

          <div className="flex flex-col justify-between space-y-6 rounded-3xl border border-slate-800 bg-slate-950 p-8 text-white shadow-sm sm:p-10 lg:col-span-5">
            <div className="space-y-4">
              <p className="text-3xl tracking-widest">🌍 🤝 💼</p>
              <h3 className="text-xl font-bold leading-snug">
                One platform. Professionals worldwide.
              </h3>
              <p className="text-base leading-8 text-slate-300">
                Join a growing professional network and prepare to explore
                opportunities across different markets.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-500"
              >
                Get Started →
              </Link>
            </div>
          </div>
        </section>

        {/* 6. Footer Box */}
        <footer className="rounded-3xl border border-slate-200 bg-white px-8 py-8 shadow-sm">
          <div className="flex flex-col items-center justify-between gap-4 text-sm leading-7 text-slate-600 sm:flex-row">
            <p>
              © 2026 Fundi Universe. Connecting people with skilled
              professionals worldwide.
            </p>
            <Link
              href="/"
              className="font-semibold text-slate-900 transition hover:text-orange-600"
            >
              Return to Home →
            </Link>
          </div>
        </footer>
      </div>

      {/* Modal Box */}
      {selectedOpportunity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-6 backdrop-blur-xs"
          onClick={() => setSelectedOpportunity(null)}
        >
          <div
            className="w-full max-w-lg space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-2xl">
                  {selectedOpportunity.icon}
                </div>
                <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-700">
                  {selectedOpportunity.category}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOpportunity(null)}
                className="cursor-pointer rounded-xl p-2 text-base text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold leading-snug text-slate-950">
                {selectedOpportunity.title}
              </h3>

              <p className="text-base leading-8 text-slate-600">
                {selectedOpportunity.description}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base leading-8 text-slate-700">
              {selectedOpportunity.details}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={() => setSelectedOpportunity(null)}
                className="cursor-pointer rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>

              <Link
                href={selectedOpportunity.actionHref}
                className="rounded-xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-500"
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
