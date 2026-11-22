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
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* 1. Header & Hero Section */}
      <header className="bg-slate-950 text-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
          <Link href="/" className="text-lg font-extrabold tracking-tight">
            🌍 FUNDI UNIVERSE
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-white/25 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
          >
            Home
          </Link>
        </nav>

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-12 md:pb-20 md:pt-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-orange-400 sm:text-sm">
            Connecting Tanzania to the World
          </p>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Global Opportunities
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Discover opportunities to connect people, professionals and
            businesses across countries, industries and international markets.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600 sm:text-base"
            >
              Find a Professional
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 sm:text-base"
            >
              Join Fundi Universe
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Quick Highlights Strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-200 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="py-5 sm:pr-6">
            <p className="text-sm font-extrabold text-slate-900">
              East Africa & Global Reach
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
              Tanzania, Kenya, Uganda, Rwanda, UAE, UK, USA, India & more.
            </p>
          </div>

          <div className="py-5 sm:px-6">
            <p className="text-sm font-extrabold text-slate-900">
              Multi-Industry Network
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
              Construction, tech, transport, maintenance, trade & innovation.
            </p>
          </div>

          <div className="py-5 sm:pl-6">
            <p className="text-sm font-extrabold text-slate-900">
              Direct Connections
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
              Tap any opportunity card to view details and take the next step.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Filter Controls & Opportunities Grid */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:py-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Explore Opportunities
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Filter by category or click any card below to view more details.
            </p>
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search opportunities..."
              aria-label="Search opportunities"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition sm:text-sm ${
                  isActive
                    ? "bg-slate-950 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOpportunities.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setSelectedOpportunity(item)}
                className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                    {item.icon}
                  </div>

                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                    {item.category}
                  </p>

                  <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-orange-600 sm:text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center border-t border-slate-100 pt-4 text-sm font-bold text-orange-600">
                  <span>Explore {item.category}</span>
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-base font-bold text-slate-800">
              No opportunities matched your filter.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try clearing your search or selecting All categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 cursor-pointer rounded-xl bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 4. Grow Beyond Borders Callout */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-2 md:items-center md:py-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Grow Beyond Borders
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Fundi Universe aims to make it easier for customers,
              professionals and businesses to discover one another and build
              valuable connections locally and internationally.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-950 p-7 text-white md:p-9">
            <p className="text-3xl">🌍 🤝 💼</p>

            <h3 className="mt-4 text-xl font-bold">
              One platform. Professionals worldwide.
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
              Join a growing professional network and prepare to explore
              opportunities across different markets.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="bg-slate-950 px-5 py-8 text-center text-sm text-slate-400">
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

      {/* 6. Opportunity Details Modal */}
      {selectedOpportunity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedOpportunity(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-3xl">
                {selectedOpportunity.icon}
              </div>

              <button
                type="button"
                onClick={() => setSelectedOpportunity(null)}
                className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-blue-700">
              {selectedOpportunity.category}
            </p>

            <h3 className="mt-1 text-2xl font-bold text-slate-900">
              {selectedOpportunity.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              {selectedOpportunity.description}
            </p>

            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              {selectedOpportunity.details}
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
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
