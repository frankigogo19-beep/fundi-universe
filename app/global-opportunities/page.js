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

  // Filter opportunities by active category and search text
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
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* Top Bar & Hero Section */}
      <header className="bg-slate-950 text-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
          <Link href="/" className="text-lg font-extrabold tracking-tight">
            🌍 FUNDI UNIVERSE
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
          >
            Home
          </Link>
        </nav>

        <div className="mx-auto max-w-7xl space-y-6 px-6 pb-16 pt-14 md:pb-20 md:pt-16">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 sm:text-sm">
            Connecting Tanzania to the World
          </p>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Global Opportunities
          </h1>

          <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Discover opportunities to connect people, professionals and
            businesses across countries, industries and international markets.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/"
              className="rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600 sm:text-base"
            >
              Find a Professional
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 sm:text-base"
            >
              Join Fundi Universe
            </Link>
          </div>
        </div>
      </header>

      {/* Highlights Boxes */}
      <section className="mx-auto max-w-7xl px-6 pt-12">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-extrabold text-slate-900">
              East Africa & Global Reach
            </p>
            <p className="text-sm leading-6 text-slate-600">
              Tanzania, Kenya, Uganda, Rwanda, UAE, UK, USA, India & more.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-extrabold text-slate-900">
              Multi-Industry Network
            </p>
            <p className="text-sm leading-6 text-slate-600">
              Construction, tech, transport, maintenance, trade & innovation.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-extrabold text-slate-900">
              Direct Connections
            </p>
            <p className="text-sm leading-6 text-slate-600">
              Tap any opportunity box below to read details and continue.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Box & Opportunity Cards */}
      <section className="mx-auto max-w-7xl space-y-8 px-6 py-14 md:py-16">
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Explore Opportunities
              </h2>
              <p className="text-sm leading-6 text-slate-600 sm:text-base">
                Filter by category or search to find the right opportunity box.
              </p>
            </div>

            <div className="w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search opportunities..."
                aria-label="Search opportunities"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 border-t border-slate-100 pt-5">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-bold transition sm:text-sm ${
                    isActive
                      ? "bg-slate-950 text-white"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Separated Opportunity Boxes */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOpportunities.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setSelectedOpportunity(item)}
                className="group flex cursor-pointer flex-col justify-between space-y-6 rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <div className="space-y-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                    {item.icon}
                  </div>

                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    {item.category}
                  </p>

                  <h3 className="text-xl font-bold leading-snug text-slate-900 transition group-hover:text-orange-600">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-5 text-sm font-bold text-orange-600">
                  <span>Explore {item.category}</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-base font-bold text-slate-800">
              No opportunities matched your filter.
            </p>
            <p className="text-sm text-slate-500">
              Try clearing your search or selecting All categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="cursor-pointer rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Bottom Callout Section */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:grid-cols-2 md:items-center md:py-16">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Grow Beyond Borders
            </h2>

            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              Fundi Universe aims to make it easier for customers,
              professionals and businesses to discover one another and build
              valuable connections locally and internationally.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl bg-slate-950 p-7 text-white md:p-9">
            <p className="text-3xl">🌍 🤝 💼</p>

            <h3 className="text-xl font-bold">
              One platform. Professionals worldwide.
            </h3>

            <p className="text-sm leading-7 text-slate-300 sm:text-base">
              Join a growing professional network and prepare to explore
              opportunities across different markets.
            </p>

            <div className="pt-2">
              <Link
                href="/"
                className="inline-block rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-6 py-8 text-center text-sm text-slate-400">
        <p>
          © 2026 Fundi Universe. Connecting people with skilled professionals
          worldwide.
        </p>
        <div className="mt-3">
          <Link href="/" className="font-medium text-white hover:underline">
            Return to Home
          </Link>
        </div>
      </footer>

      {/* Details Modal */}
      {selectedOpportunity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedOpportunity(null)}
        >
          <div
            className="w-full max-w-lg space-y-5 rounded-2xl bg-white p-7 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                {selectedOpportunity.icon}
              </div>

              <button
                type="button"
                onClick={() => setSelectedOpportunity(null)}
                className="cursor-pointer rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                {selectedOpportunity.category}
              </p>

              <h3 className="text-2xl font-bold text-slate-900">
                {selectedOpportunity.title}
              </h3>

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                {selectedOpportunity.description}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
              {selectedOpportunity.details}
            </div>

            <div className="flex flex-wrap justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedOpportunity(null)}
                className="cursor-pointer rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Close
              </button>

              <Link
                href={selectedOpportunity.actionHref}
                className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600"
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
