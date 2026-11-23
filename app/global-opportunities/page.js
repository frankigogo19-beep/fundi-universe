"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const opportunities = [
  {
    icon: "🌐",
    category: "International Business",
    title: "International Business Opportunities",
    description: "Discover cross-border trade, international markets, investment opportunities and strategic business partnerships.",
    tags: ["Global Trade", "Investment", "Partnerships"],
    number: "01",
  },
  {
    icon: "💼",
    category: "Career & Employment",
    title: "Global Career Opportunities",
    description: "Explore international career opportunities and connect with organizations seeking talented professionals.",
    tags: ["Remote Jobs", "Careers", "Employment"],
    number: "02",
  },
  {
    icon: "🤝",
    category: "Professional Networking",
    title: "Global Professional Connections",
    description: "Build meaningful relationships with consultants, experts, professionals and business leaders worldwide.",
    tags: ["Networking", "Collaboration", "Connections"],
    number: "03",
  },
  {
    icon: "📈",
    category: "Investment",
    title: "Investment Opportunities",
    description: "Discover promising business ventures, investment possibilities and partnerships designed for sustainable growth.",
    tags: ["Investors", "Startups", "Growth"],
    number: "04",
  },
  {
    icon: "🎓",
    category: "Skills & Development",
    title: "International Skills Development",
    description: "Discover professional training, international development programs and opportunities to advance your expertise.",
    tags: ["Training", "Education", "Skills"],
    number: "05",
  },
  {
    icon: "🏢",
    category: "Corporate Partnerships",
    title: "Corporate Partnerships",
    description: "Connect with companies seeking qualified service providers, suppliers and strategic business partners.",
    tags: ["Companies", "Suppliers", "Partnerships"],
    number: "06",
  },
];

const categories = [
  "All Opportunities",
  "International Business",
  "Career & Employment",
  "Professional Networking",
  "Investment",
  "Skills & Development",
  "Corporate Partnerships",
];

const highlights = [
  ["🌍", "Worldwide Reach", "Explore opportunities beyond borders."],
  ["🤝", "Global Connections", "Build valuable professional relationships."],
  ["📈", "Business Growth", "Discover new possibilities for growth."],
  ["🚀", "Global Ambition", "Turn international ideas into reality."],
];

export default function GlobalOpportunities() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Opportunities");

  const filtered = useMemo(() => {
    return opportunities.filter((item) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesSearch &&
        (category === "All Opportunities" || item.category === category);
    });
  }, [search, category]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#070D19] text-white">

      {/* HERO */}
      <section className="relative border-b border-white/[0.07]">
        <div className="pointer-events-none absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-blue-600/15 blur-[130px]" />
        <div className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 md:pb-28 md:pt-12 lg:px-12">

          <div className="mb-20 flex items-center justify-between gap-4">
            <Link href="/dashboard" className="text-sm font-semibold text-slate-300 hover:text-white">
              ← Dashboard
            </Link>

            <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-[10px] font-bold tracking-[0.16em] text-blue-300 sm:text-xs">
              ● GLOBAL OPPORTUNITIES
            </span>
          </div>

          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-300">
              🌍 EXPLORE A WORLD OF POSSIBILITIES
            </span>

            <h1 className="mt-8 text-4xl font-black leading-[1.2] tracking-tight sm:text-5xl md:text-7xl">
              Discover Global
              <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Opportunities.
              </span>
              <span className="mt-2 block">Go Beyond Borders.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg sm:leading-9">
              Explore international business opportunities, connect with
              professionals, discover investments and unlock possibilities
              that take your ambitions to the world.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#opportunities" className="rounded-xl bg-blue-600 px-8 py-4 text-center text-sm font-bold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500">
                Explore Opportunities →
              </a>

              <Link href="/professionals" className="rounded-xl border border-white/15 bg-white/[0.04] px-8 py-4 text-center text-sm font-bold transition hover:bg-white/10">
                Discover Professionals
              </Link>
            </div>
          </div>

          {/* HIGHLIGHTS */}
          <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(([icon, title, description]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-[#101e31]/80 p-7 transition hover:-translate-y-1 hover:border-blue-400/30">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-2xl">
                  {icon}
                </div>
                <h3 className="text-base font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section id="opportunities" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-24 lg:px-12">

        <div className="mb-12 max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-blue-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
              Explore & Discover
            </span>
          </div>

          <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            Opportunities Around
            <span className="mt-2 block text-blue-400">The World.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-400 sm:text-base">
            Your gateway to international opportunities. Explore different
            sectors, build connections and discover new ways to grow globally.
          </p>
        </div>

        {/* SEARCH AND FILTER */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-[#101e31] p-4 sm:p-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-500">
              ⌕
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search business, investment, careers..."
              className="w-full rounded-xl border border-white/10 bg-[#070D19] py-4 pl-12 pr-5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          <p className="mb-4 mt-6 text-xs font-bold uppercase tracking-wider text-slate-500">
            Browse by category
          </p>

          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-lg border px-4 py-3 text-xs font-semibold transition sm:text-sm ${
                  category === item
                    ? "border-blue-500 bg-blue-600 text-white"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-blue-400/50 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-7 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold">Explore Categories</h3>
            <p className="mt-2 text-xs text-slate-500">
              Discover opportunities across different sectors.
            </p>
          </div>
          <span className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-2 text-xs font-bold text-blue-300">
            {filtered.length} Results
          </span>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-[#14243a] to-[#0c1728] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-950/30 sm:p-8"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-3xl transition group-hover:bg-blue-500/20">
                  {item.icon}
                </div>
                <span className="text-sm font-bold tracking-widest text-slate-600">
                  {item.number}
                </span>
              </div>

              <div className="mt-8">
                <span className="inline-block rounded-md bg-blue-500/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-blue-400">
                  {item.category}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold leading-8 text-white sm:text-2xl">
                {item.title}
              </h3>

              <p className="mt-5 text-sm leading-8 text-slate-400">
                {item.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-medium text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => alert("This opportunity category will be connected to its dedicated opportunities page.")}
                className="mt-9 flex w-full items-center justify-between rounded-xl border border-blue-500/30 bg-blue-600/10 px-5 py-4 text-sm font-bold text-blue-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                Explore More
                <span className="text-xl transition group-hover:translate-x-1">→</span>
              </button>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#101e31] px-5 py-20 text-center">
            <div className="text-5xl">🔍</div>
            <h3 className="mt-6 text-xl font-bold">No Opportunities Found</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400">
              We could not find matching opportunities. Try a different search.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All Opportunities");
              }}
              className="mt-7 rounded-xl bg-blue-600 px-7 py-3 text-sm font-bold hover:bg-blue-500"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-[#102d59] via-[#122442] to-[#211b48] px-6 py-16 text-center sm:px-12 md:py-20">
          <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/10" />

          <div className="relative mx-auto max-w-3xl">
            <span className="text-4xl">🌍</span>
            <h2 className="mt-7 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              Your Next Opportunity
              <span className="mt-2 block text-blue-300">Starts Here.</span>
            </h2>
            <p className="mt-6 text-sm leading-8 text-slate-300 sm:text-base">
              Connect with the world. Discover possibilities.
              Build your future with Fundi Universe.
            </p>
            <Link href="/professionals" className="mt-9 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold transition hover:-translate-y-1 hover:bg-blue-500">
              Discover Professionals →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.07] px-5 py-8 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Fundi Universe.
        </p>
        <p className="mt-2 text-xs text-slate-600">
          One platform. Professionals worldwide.
        </p>
      </footer>

    </main>
  );
}
