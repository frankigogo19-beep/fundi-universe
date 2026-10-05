
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

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (country) params.set("country", country);
    if (service) params.set("service", service);
    if (location) params.set("location", location);

    window.location.href = `/professionals?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

          {/* OFFICIAL FUNDI UNIVERSE LOGO */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Fundi Universe"
              className="h-14 w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">

            <Link
              href="/professionals"
              className="text-sm font-semibold text-slate-700 transition hover:text-blue-600"
            >
              Professionals
            </Link>

            <Link
              href="/dashboard"
              className="text-sm font-semibold text-slate-700 transition hover:text-blue-600"
            >
              Customer Dashboard
            </Link>

            <Link
              href="/professional-dashboard"
              className="text-sm font-semibold text-slate-700 transition hover:text-blue-600"
            >
              Professional Dashboard
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Sign Up
            </Link>

          </nav>

          {/* MOBILE */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/login"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-bold text-white"
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

            <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-widest">
              GLOBAL PROFESSIONAL SERVICES PLATFORM
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Find a Professional
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              One platform. Professionals worldwide.
              Find trusted professionals for your work, home and business needs.
            </p>

            {/* SEARCH CARD */}
            <div className="mx-auto mt-10 max-w-5xl rounded-3xl bg-white p-5 text-left shadow-2xl">

              <div className="grid gap-4 md:grid-cols-4">

                {/* COUNTRY */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Country
                  </label>

                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
                  >
                    {countries.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SERVICE */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Service
                  </label>

                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
                  >
                    <option value="">Select a service</option>

                    {services.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* LOCATION */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Location
                  </label>

                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City or area"
                    className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500"
                  />
                </div>

                {/* SEARCH */}
                <div className="flex items-end">
                  <button
                    onClick={handleSearch}
                    className="h-14 w-full rounded-xl bg-blue-600 px-5 font-bold text-white shadow-lg transition hover:bg-blue-700"
                  >
                    Find Professionals
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Your Platform
          </p>

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
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
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
              Find professionals, create job requests, manage jobs,
              messages, notifications, payments and reviews.
            </p>

            <p className="mt-6 font-bold text-blue-600">
              Open Customer Dashboard →
            </p>
          </Link>

          {/* PROFESSIONAL */}
          <Link
            href="/professional-dashboard"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
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

            <p className="mt-6 font-bold text-orange-600">
              Open Professional Dashboard →
            </p>
          </Link>

        </div>
      </section>

      {/* SERVICES */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Professional Services
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Choose the service you need
            </h2>

            <p className="mt-4 text-slate-600">
              Select a service to find professionals offering that service.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {services.map((item) => (
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

      {/* TRUST FEATURES */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-3xl">✓</div>

            <h3 className="mt-5 text-xl font-black">
              Verified Professionals
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Professional profiles can include identity verification,
              qualifications, certificates and professional experience.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-3xl">🌍</div>

            <h3 className="mt-5 text-xl font-black">
              Professionals Worldwide
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Connect customers with professionals across countries,
              cities and locations.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-3xl">⭐</div>

            <h3 className="mt-5 text-xl font-black">
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
            Create your account and connect with professionals or grow
            your professional service worldwide.
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
      <footer className="border-t border-slate-200 bg-white">
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
