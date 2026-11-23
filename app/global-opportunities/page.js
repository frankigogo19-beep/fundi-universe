"use client";

import { useState } from "react";
import Link from "next/link";

const opportunities = [
  {
    icon: "🌐",
    category: "International Business",
    title: "International Business Opportunities",
    description:
      "Discover cross-border trade, investment and business opportunities. Connect with companies and professionals worldwide.",
    tags: ["Global Trade", "Investment", "Partnerships"],
    color: "blue",
  },
  {
    icon: "💼",
    category: "Career & Employment",
    title: "Global Career Opportunities",
    description:
      "Explore international career opportunities and connect with organizations looking for skilled professionals.",
    tags: ["Remote Jobs", "Careers", "Employment"],
    color: "purple",
  },
  {
    icon: "🤝",
    category: "Professional Networking",
    title: "Global Professional Connections",
    description:
      "Build valuable relationships with professionals, consultants and business leaders across different countries.",
    tags: ["Networking", "Collaboration", "Connections"],
    color: "cyan",
  },
  {
    icon: "📈",
    category: "Investment",
    title: "Investment Opportunities",
    description:
      "Explore business investments, strategic partnerships and opportunities for sustainable growth.",
    tags: ["Investors", "Startups", "Growth"],
    color: "green",
  },
  {
    icon: "🎓",
    category: "Skills & Development",
    title: "International Skills Development",
    description:
      "Discover professional training, development programs and opportunities to improve your skills.",
    tags: ["Training", "Education", "Skills"],
    color: "orange",
  },
  {
    icon: "🏢",
    category: "Corporate Partnerships",
    title: "Corporate Partnerships",
    description:
      "Connect with companies seeking professional service providers, suppliers and strategic partners.",
    tags: ["Companies", "Suppliers", "Partnerships"],
    color: "pink",
  },
];

export default function GlobalOpportunities() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "International Business",
    "Career & Employment",
    "Professional Networking",
    "Investment",
    "Skills & Development",
    "Corporate Partnerships",
  ];

  const filtered = opportunities.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      );

    return (
      matchesSearch &&
      (category === "All" || item.category === category)
    );
  });

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-[#07111f] to-purple-900/30" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            GLOBAL OPPORTUNITIES
          </div>

          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Discover Opportunities.
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Connect Beyond Borders.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
            Explore international business opportunities, professional
            connections, investments and career possibilities through
            one global platform.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#opportunities"
              className="rounded-xl bg-blue-600 px-7 py-4 font-bold transition hover:bg-blue-500"
            >
              Explore Opportunities →
            </a>

            <Link
              href="/dashboard"
              className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-semibold hover:bg-white/10"
            >
              Back to Dashboard
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              ["🌍", "Global Reach", "Connect worldwide"],
              ["🤝", "Connections", "Build relationships"],
              ["📈", "Growth", "Discover possibilities"],
              ["🚀", "Innovation", "Think beyond borders"],
            ].map(([icon, title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="text-3xl">{icon}</div>
                <h3 className="mt-3 font-bold">{title}</h3>
                <p className="mt-1 text-xs text-slate-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section
        id="opportunities"
        className="mx-auto max-w-7xl px-5 py-16 md:px-10"
      >
        <div className="mb-9">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
            Explore & Discover
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Opportunities Around the World
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Find new possibilities, develop partnerships and expand
            your professional network.
          </p>
        </div>

        {/* SEARCH */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#101d30] p-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search opportunities..."
            className="w-full bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-500"
          />
        </div>

        {/* FILTERS */}
        <div className="mb-9 flex gap-2 overflow-x-auto pb-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full border px-5 py-3 text-sm font-semibold transition ${
                category === item
                  ? "border-blue-500 bg-blue-600 text-white"
                  : "border-white/10 bg-white/5 text-slate-400 hover:border-blue-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* CARDS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.title}
              className="group rounded-3xl border border-white/10 bg-gradient-to-br from-[#13243b] to-[#0b1525] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-950/40"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-3xl">
                  {item.icon}
                </div>
                <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs text-blue-300">
                  Explore
                </span>
              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-wider text-blue-400">
                {item.category}
              </p>

              <h3 className="mt-3 text-xl font-bold leading-snug">
                {item.title}
              </h3>

              <p className="mt-4 min-h-24 text-sm leading-7 text-slate-400">
                {item.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() =>
                  alert(
                    "This opportunity category will be connected to its dedicated opportunities page."
                  )
                }
                className="mt-7 flex w-full items-center justify-between rounded-xl border border-blue-500/30 bg-blue-600/10 px-5 py-4 font-bold text-blue-300 transition hover:bg-blue-600 hover:text-white"
              >
                Explore More <span>→</span>
              </button>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 py-16 text-center">
            <div className="text-4xl">🔍</div>
            <h3 className="mt-4 text-xl font-bold">
              No opportunities found
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Try another search or category.
            </p>
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-10">
        <div className="rounded-3xl border border-blue-400/20 bg-gradient-to-r from-blue-900/50 via-[#122442] to-purple-900/40 p-8 text-center md:p-14">
          <h2 className="text-3xl font-black md:text-4xl">
            Your Next Opportunity Starts Here.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            Connect with the world. Discover possibilities.
            Build your future with Fundi Universe.
          </p>

          <Link
            href="/professionals"
            className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-4 font-bold hover:bg-blue-500"
          >
            Discover Professionals →
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-7 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Fundi Universe. One platform.
        Professionals worldwide.
      </footer>
    </main>
  );
}
