"use client";

import { useState } from "react";
import Link from "next/link";

const opportunities = [
  {
    icon: "🌐",
    title: "International Business Opportunities",
    description: "Cross-border trade, investment and business opportunities.",
    details:
      "Expand your business reach by connecting directly with verified service providers, suppliers, and corporate clients across East Africa and global trade hubs.",
    actionText: "Explore Business Opportunities",
    actionHref: "/",
  },
  {
    icon: "🤝",
    title: "Global Collaboration",
    description: "International professionals and organizations.",
    details:
      "Collaborate on cross-border projects, joint ventures, and remote technical support with trusted professionals on Fundi Universe.",
    actionText: "Start Collaborating",
    actionHref: "/",
  },
  {
    icon: "💼",
    title: "Professional Services",
    description: "Skilled experts for projects across industries.",
    details:
      "Hire vetted engineers, IT specialists, logistics experts, and certified technicians ready to deliver high-standard services.",
    actionText: "Find a Professional",
    actionHref: "/",
  },
  {
    icon: "👥",
    title: "Business Partnerships",
    description: "Strategic relationships worldwide.",
    details:
      "Position your company for long-term growth through strategic alliances, subcontracting opportunities, and B2B networking.",
    actionText: "Join Fundi Universe",
    actionHref: "/",
  },
  {
    icon: "🚀",
    title: "Startup & Innovation",
    description: "Startup support, ideas and innovation networks.",
    details:
      "Connect with tech innovators, product builders, and growth specialists to turn local solutions into scalable global products.",
    actionText: "Explore Innovators",
    actionHref: "/",
  },
  {
    icon: "📈",
    title: "International Markets",
    description: "New markets, suppliers and global customers.",
    details:
      "Learn about markets and potential connections in Tanzania, Kenya, Uganda, Rwanda, the USA, UK, UAE, India and beyond.",
    actionText: "Get Started",
    actionHref: "/",
  },
];

const steps = [
  {
    number: "1",
    icon: "🔍",
    title: "Find",
    description: "Discover global opportunities",
  },
  {
    number: "2",
    icon: "📋",
    title: "Request",
    description: "Submit your interest",
  },
  {
    number: "3",
    icon: "👥",
    title: "Connect",
    description: "Meet trusted partners",
  },
  {
    number: "4",
    icon: "✓",
    title: "Complete",
    description: "Achieve your goals",
  },
];

export default function GlobalOpportunitiesPage() {
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  return (
    <main className="min-h-screen bg-[#F4F7FB] text-slate-900 antialiased">
      {/* 1. Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-blue-900/60 bg-[#071B3A] text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-orange-400 bg-blue-950 text-xl">
                🔧
              </span>
              <span className="text-xl font-extrabold tracking-tight leading-none">
                <span className="block text-white">Fundi</span>
                <span className="block text-orange-400">Universe</span>
              </span>
            </Link>

            <div className="hidden border-l border-white/20 pl-4 text-xs leading-snug text-slate-200 md:block">
              <p className="font-semibold text-white">One platform.</p>
              <p>Professionals worldwide</p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-1 sm:gap-2 text-sm font-medium">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              <span>🏠</span>
              <span>Home</span>
            </Link>

            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              <span>👥</span>
              <span>Professionals</span>
            </Link>

            <Link
              href="/global-opportunities"
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-3.5 py-2 font-semibold text-white shadow-sm"
            >
              <span>🌐</span>
              <span>Global Opportunities</span>
            </Link>

            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              <span>ⓘ</span>
              <span>About</span>
            </Link>

            <Link
              href="/"
              className="ml-1 flex items-center gap-1.5 rounded-lg px-3 py-2 text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              <span>👤</span>
              <span>Sign In</span>
            </Link>

            <Link
              href="/"
              className="ml-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:from-orange-600 hover:to-amber-600"
            >
              Join Fundi Universe →
            </Link>
          </nav>
        </div>
      </header>

      {/* 2. Hero Banner with World Connections Visual */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#04142E] via-[#07295E] to-[#0C4694] text-white">
        {/* Decorative World Grid & Connection Arcs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 72% 45%, rgba(56, 189, 248, 0.45), transparent 55%), radial-gradient(rgba(147, 197, 253, 0.35) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 24px 24px",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-12 md:py-16">
          <div className="space-y-5 md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-blue-950/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-200">
              <span>🌐</span>
              <span>GLOBAL CONNECTIONS</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[54px] lg:leading-[1.1]">
              Connecting <span className="text-orange-400">Tanzania</span> to the
              World
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
              Discover international business opportunities, professional services
              and global collaboration.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#explore-opportunities"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:from-orange-600 hover:to-amber-600"
              >
                <span>🔍</span>
                <span>Explore Opportunities →</span>
              </a>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/35 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-xs transition hover:bg-white/20"
              >
                <span>👥</span>
                <span>Find a Professional →</span>
              </Link>
            </div>
          </div>

          {/* Right-side Global Network Hub Graphic */}
          <div className="md:col-span-5">
            <div className="relative rounded-2xl border border-sky-300/25 bg-blue-950/55 p-6 backdrop-blur-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-sky-200">
                <span>EAST AFRICA HUB • TANZANIA</span>
                <span className="rounded-full bg-orange-500/20 px-2.5 py-0.5 text-orange-300">
                  ACTIVE NETWORK
                </span>
              </div>

              <div className="my-6 flex items-center justify-center">
                <div className="relative flex h-40 w-full items-center justify-center rounded-xl border border-sky-400/20 bg-gradient-to-tr from-blue-950 via-blue-900/70 to-sky-900/50">
                  <div className="flex flex-col items-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-white shadow-lg shadow-orange-500/40">
                      TZ
                    </span>
                    <span className="mt-2 text-xs font-bold tracking-wide text-white">
                      Tanzania → Global Markets
                    </span>
                  </div>
                  <span className="absolute left-6 top-6 rounded-full bg-sky-400/20 px-2.5 py-0.5 text-[11px] font-semibold text-sky-100">
                    Americas
                  </span>
                  <span className="absolute right-6 top-6 rounded-full bg-sky-400/20 px-2.5 py-0.5 text-[11px] font-semibold text-sky-100">
                    Europe & UAE
                  </span>
                  <span className="absolute bottom-5 left-8 rounded-full bg-sky-400/20 px-2.5 py-0.5 text-[11px] font-semibold text-sky-100">
                    Africa
                  </span>
                  <span className="absolute bottom-5 right-8 rounded-full bg-sky-400/20 px-2.5 py-0.5 text-[11px] font-semibold text-sky-100">
                    Asia
                  </span>
                </div>
              </div>

              <p className="text-center text-xs text-sky-100/90">
                Tanzania • Kenya • Uganda • Rwanda • USA • UK • UAE • India &
                beyond
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Explore Global Opportunities Section */}
      <section
        id="explore-opportunities"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6"
      >
        <div className="mb-8 text-center">
          <h2 className="inline-block text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Explore <span className="text-blue-600">Global</span> Opportunities
            <span className="mx-auto mt-1.5 block h-1 w-16 rounded-full bg-orange-500" />
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setSelectedOpportunity(item)}
              className="group flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200/90 bg-white p-5 text-left shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-600 transition group-hover:bg-blue-100">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-base font-bold leading-snug text-slate-900 transition group-hover:text-blue-700">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {item.description}
                  </p>
                </div>
              </div>

              <span className="shrink-0 border-l border-slate-200 pl-3.5 text-sm font-semibold text-blue-600 transition group-hover:translate-x-0.5 group-hover:text-orange-600">
                Explore →
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Grow Beyond Borders Step Bar */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-blue-100 bg-[#EAF1FA] px-5 py-7 sm:px-8">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Grow <span className="text-blue-600">Beyond</span> Borders
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex items-center gap-3.5"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {step.number}
                </span>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl text-blue-700">
                  {step.icon}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="ml-auto hidden text-lg font-bold text-slate-400 lg:inline"
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Call-to-Action Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#051B3E] via-[#0A387A] to-[#0E4FA8] px-4 py-7 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Your next opportunity can be{" "}
            <span className="text-orange-400">global</span>
          </h2>

          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:from-orange-600 hover:to-amber-600"
          >
            <span>Get Started →</span>
          </Link>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-[#041229] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 sm:px-6 lg:flex-row">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-orange-400 bg-blue-950 text-xl">
                🔧
              </span>
              <span className="text-lg font-extrabold leading-none">
                <span className="block text-white">Fundi</span>
                <span className="block text-orange-400">Universe</span>
              </span>
            </Link>

            <div className="border-l border-white/20 pl-4 text-xs leading-snug text-slate-300">
              <p className="font-semibold text-white">One platform.</p>
              <p>Professionals worldwide</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-200 sm:text-sm">
            <Link href="/" className="hover:text-orange-400">
              Home
            </Link>
            <span className="text-white/25">|</span>
            <Link href="/" className="hover:text-orange-400">
              Professionals
            </Link>
            <span className="text-white/25">|</span>
            <Link href="/global-opportunities" className="text-orange-400">
              Global Opportunities
            </Link>
            <span className="text-white/25">|</span>
            <Link href="/" className="hover:text-orange-400">
              About
            </Link>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
            <div className="flex items-center gap-2">
              <a
                href="#explore-opportunities"
                aria-label="Facebook"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white hover:bg-blue-500"
              >
                f
              </a>
              <a
                href="#explore-opportunities"
                aria-label="X"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white hover:bg-slate-700"
              >
                𝕏
              </a>
              <a
                href="#explore-opportunities"
                aria-label="YouTube"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white hover:bg-red-500"
              >
                ▶
              </a>
              <a
                href="#explore-opportunities"
                aria-label="LinkedIn"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-xs font-bold text-white hover:bg-sky-500"
              >
                in
              </a>
            </div>

            <div className="text-center text-[11px] leading-relaxed text-slate-300 sm:text-right">
              <p>© 2026 Fundi Universe. All rights reserved.</p>
              <p className="text-slate-400">
                Connecting people. Building opportunities.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal ikibonyezwa kadi yoyote */}
      {selectedOpportunity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          onClick={() => setSelectedOpportunity(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-600">
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

            <h3 className="mt-4 text-2xl font-bold text-slate-900">
              {selectedOpportunity.title}
            </h3>

            <p className="mt-2 text-sm font-medium text-blue-700">
              {selectedOpportunity.description}
            </p>

            <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
              {selectedOpportunity.details}
            </p>

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
                className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-bold text-white hover:from-orange-600 hover:to-amber-600"
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
