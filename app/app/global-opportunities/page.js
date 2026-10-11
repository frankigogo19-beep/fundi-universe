

"use client";

import Link from "next/link";

const opportunities = [
  {
    icon: "🌍",
    title: "International Business Opportunities",
    description:
      "Discover ways to connect businesses and professionals in Tanzania, Africa and international markets.",
    category: "Business",
  },
  {
    icon: "🤝",
    title: "Global Collaboration",
    description:
      "Build partnerships with customers, skilled professionals and businesses around the world.",
    category: "Partnerships",
  },
  {
    icon: "💼",
    title: "Professional Services",
    description:
      "Explore professional services in construction, technology, transport, maintenance and other industries.",
    category: "Services",
  },
  {
    icon: "📈",
    title: "Business Partnerships",
    description:
      "Find opportunities to develop business relationships and explore potential international cooperation.",
    category: "Growth",
  },
  {
    icon: "🚀",
    title: "Startup & Innovation",
    description:
      "Explore ideas, innovation and opportunities to grow businesses across different markets.",
    category: "Innovation",
  },
  {
    icon: "🌐",
    title: "International Markets",
    description:
      "Learn about markets and potential connections in Tanzania, Kenya, Uganda, Rwanda, the USA, UK, UAE, India and beyond.",
    category: "Markets",
  },
];

export default function GlobalOpportunitiesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5">
          <Link href="/" className="text-lg font-bold">
            🌍 FUNDI UNIVERSE
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-white/30 px-4 py-2 text-sm hover:bg-white/10"
          >
            Home
          </Link>
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 md:pb-20 md:pt-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-orange-400">
            Connecting Tanzania to the World
          </p>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            Global Opportunities
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Discover opportunities to connect people, professionals and
            businesses across countries, industries and international markets.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/professionals"
              className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
            >
              Find a Professional
            </Link>

            <Link
              href="/signup"
              className="rounded-xl border border-white/30 px-6 py-3 font-bold text-white hover:bg-white/10"
            >
              Join Fundi Universe
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <div className="mb-9">
          <h2 className="text-2xl font-bold md:text-3xl">
            Explore Opportunities
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Explore different areas for business growth, professional
            connections and international collaboration.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-3xl">
                {item.icon}
              </div>

              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                {item.category}
              </p>

              <h3 className="text-xl font-bold">{item.title}</h3>

              <p className="mt-3 leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-2 md:items-center md:py-16">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              Grow Beyond Borders
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
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

            <p className="mt-3 leading-7 text-slate-300">
              Join a growing professional network and prepare to explore
              opportunities across different markets.
            </p>

            <Link
              href="/signup"
              className="mt-6 inline-block rounded-xl bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-5 py-7 text-center text-sm text-slate-400">
        © 2026 Fundi Universe. Connecting people with skilled professionals
        worldwide.
        <div className="mt-3">
          <Link href="/" className="text-white hover:underline">
            Return to Home
          </Link>
        </div>
      </footer>
    </main>
  );
}
