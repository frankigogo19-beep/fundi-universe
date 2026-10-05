
"use client";

import { useState } from "react";
import Link from "next/link";

const countries = [
  "Tanzania",
  "Kenya",
  "Uganda",
  "Rwanda",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "India",
  "South Africa",
  "Germany",
  "France",
  "Canada",
  "Australia",
];

const services = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Masonry",
  "Painting",
  "Welding",
  "Mechanic",
  "Tailoring",
  "Hairdressing",
  "Ususi",
  "Uzibuaji wa Vyoo",
  "Cleaning",
  "Gardening",
  "AC & Refrigeration",
  "Phone Repair",
  "Computer & IT",
  "Construction",
  "Photography",
  "Catering",
  "Security",
];

export default function Home() {
  const [country, setCountry] = useState("Tanzania");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  const searchProfessionals = () => {
    const params = new URLSearchParams();

    if (country) params.set("country", country);
    if (service) params.set("service", service);
    if (location) params.set("location", location);

    window.location.href = `/professionals?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

          {/* OFFICIAL LOGO */}
          <Link href="/" className="flex items-center">
            <img
              src="/fundi-universe-logo.png"
              alt="Fundi Universe"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/professionals"
              className="text-sm font-semibold text-slate-700 hover:text-blue-600"
            >
              Professionals
            </Link>

            <Link
              href="/dashboard"
              className="text-sm font-semibold text-slate-700 hover:text-blue-600"
            >
              Customer Dashboard
            </Link>

            <Link
              href="/professional-dashboard"
              className="text-sm font-semibold text-slate-700 hover:text-blue-600"
            >
              Professional Dashboard
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold hover:bg-slate-50"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </nav>

          <div className="flex gap-2 md:hidden">
            <Link
              href="/login"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-slate-900">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">

          <div className="mx-auto max-w-4xl text-center text-white">

            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              GLOBAL PROFESSIONAL SERVICES PLATFORM
            </span>

            <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Find a Professional
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100 sm:text-xl">
              One platform. Professionals worldwide.
              Find trusted professionals for your work, home and business needs.
            </p>

            {/* SEARCH BOX */}
            <div className="mx-auto mt-10 max-w-5xl rounded-3xl bg-white p-4 shadow-2xl">
              <div className="grid gap-3 md:grid-cols-4">

                <div>
                  <label className="mb-2 block text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Country
                  </label>

                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                  >
                    {countries.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Service
                  </label>

                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                  >
                    <option value="">Select a service</option>

                    {services.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Location
                  </label>

                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City or area"
                    className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={searchProfessionals}
                    className="h-14 w-full rounded-xl bg-blue-600 px-6 font-bold text-white shadow-lg transition hover:bg-blue-700"
                  >
                    Find Professionals
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD CARDS */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Your Platform
          </span>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Everything in one place
          </h2>

          <p className="mt-4 text-slate-600">
            Customers and professionals get dedicated dashboards designed
            for managing their work, requests and services.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          {/* CUSTOMER */}
          <Link
            href="/dashboard"
            className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                👤
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                CUSTOMER
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-black">
              Customer Dashboard
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Find professionals, create job requests, manage your jobs,
              messages, notifications, payments and reviews.
            </p>

            <div className="mt-6 font-bold text-blue-600 group-hover:text-blue-700">
              Open Customer Dashboard →
            </div>
          </Link>

          {/* PROFESSIONAL */}
          <Link
            href="/professional-dashboard"
            className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
                🛠️
              </div>

              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
                PROFESSIONAL
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-black">
              Professional Dashboard
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Manage your profile, qualifications, job requests, accepted
              jobs, earnings, notifications, reviews and availability.
            </p>

            <div className="mt-6 font-bold text-orange-600 group-hover:text-orange-700">
              Open Professional Dashboard →
            </div>
          </Link>

        </div>
      </section>

      {/* SERVICES */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Professional Services
            </span>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Choose the service you need
            </h2>

            <p className="mt-4 text-slate-600">
              Select a service to find professionals offering that service.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {services.slice(0, 12).map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setService(item);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-left font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  {item}
                </button>
              ))}

            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() =>
                  document
                    .getElementById("all-services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="font-bold text-blue-600 hover:text-blue-700"
              >
                View all services ↓
              </button>
            </div>
          </div>

          <div id="all-services" className="mx-auto mt-10 max-w-5xl">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {services.slice(12).map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setService(item);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-left font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  {item}
                </button>
              ))}

            </div>
          </div>

        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="text-3xl">✓</div>
            <h3 className="mt-4 text-xl font-black">
              Verified Professionals
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Profiles can include identity verification, qualifications,
              certificates and professional experience.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="text-3xl">🌍</div>
            <h3 className="mt-4 text-xl font-black">
              Professionals Worldwide
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Connect customers with professionals across countries and
              locations.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="text-3xl">⭐</div>
            <h3 className="mt-4 text-xl font-black">
              Reviews & Ratings
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Customers can review completed work and help build trusted
              professional profiles.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center text-white">

          <h2 className="text-3xl font-black sm:text-4xl">
            Ready to join Fundi Universe?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Create your account and connect with professionals or grow your
            professional service worldwide.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/signup"
              className="rounded-xl bg-blue-600 px-7 py-3.5 font-bold hover:bg-blue-700"
            >
              Create Account
            </Link>

            <Link
              href="/professionals"
              className="rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 font-bold hover:bg-white/15"
            >
              Browse Professionals
            </Link>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-8">

          <p>
            © {new Date().getFullYear()} Fundi Universe. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link href="/professionals" className="hover:text-blue-600">
              Professionals
            </Link>

            <Link href="/signup" className="hover:text-blue-600">
              Sign Up
            </Link>

            <Link href="/login" className="hover:text-blue-600">
              Login
            </Link>
          </div>

        </div>
      </footer>

    </main>
  );
}
