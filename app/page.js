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
  "Hair Braiding",
  "Toilet Unblocking",
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

  const chooseService = (item) => {
    setService(item);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-[82px] max-w-7xl items-center justify-between px-5 lg:px-8">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center"
          >
            <img
              src="/logo.png"
              alt="Fundi Universe"
              className="h-14 w-auto object-contain sm:h-16"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-6 md:flex">

            <Link
              href="/professionals"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Professionals
            </Link>

            <Link
              href="/dashboard"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Customer Dashboard
            </Link>

            <Link
              href="/professional-dashboard"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
            >
              Professional Dashboard
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-slate-50"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Sign Up
            </Link>

          </nav>

          {/* MOBILE NAVIGATION */}
          <div className="flex items-center gap-2 md:hidden">

            <Link
              href="/login"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
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


      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-slate-950">

        {/* Decorative background */}
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">

          <div className="mx-auto max-w-5xl text-center text-white">

            {/* BADGE */}
            <div className="mb-7 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-black tracking-[0.18em] text-blue-50 backdrop-blur">
              GLOBAL PROFESSIONAL SERVICES PLATFORM
            </div>

            {/* TITLE */}
            <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Find a Professional
            </h1>

            {/* DESCRIPTION */}
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-blue-100 sm:text-xl">
              One platform. Professionals worldwide.
              Find trusted professionals for your work, home and business needs.
            </p>

            {/* =====================================================
                SEARCH CARD
            ===================================================== */}
            <div className="mx-auto mt-12 max-w-6xl rounded-[30px] border border-white/20 bg-white p-6 text-left shadow-2xl sm:p-8">

              <div className="mb-6">
                <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                  Find the right professional
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Select a country, service and location to find professionals
                  available for your needs.
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-4">

                {/* COUNTRY */}
                <div>
                  <label className="mb-2.5 block text-xs font-black uppercase tracking-wider text-slate-500">
                    Country
                  </label>

                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
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
                  <label className="mb-2.5 block text-xs font-black uppercase tracking-wider text-slate-500">
                    Service
                  </label>

                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">
                      Select a service
                    </option>

                    {services.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* LOCATION */}
                <div>
                  <label className="mb-2.5 block text-xs font-black uppercase tracking-wider text-slate-500">
                    Location
                  </label>

                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City or area"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* SEARCH BUTTON */}
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="h-14 w-full rounded-2xl bg-blue-600 px-5 font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 hover:shadow-xl active:scale-[0.98]"
                  >
                    Find Professionals
                  </button>
                </div>

              </div>
            </div>

            {/* HERO TRUST LINE */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-blue-100">
              <span>✓ Trusted Professionals</span>
              <span>✓ Multiple Countries</span>
              <span>✓ Multiple Services</span>
              <span>✓ Professional Profiles</span>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          PLATFORM INTRODUCTION
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Your Platform
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Everything in one place
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Customers and professionals get dedicated dashboards designed
            for managing their work, requests, services, communication and
            professional activities.
          </p>

        </div>


        {/* DASHBOARD CARDS */}
        <div className="mt-14 grid gap-7 md:grid-cols-2">

          {/* CUSTOMER */}
          <Link
            href="/dashboard"
            className="group rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-10"
          >

            <div className="flex items-center justify-between gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                👤
              </div>

              <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-black tracking-wide text-blue-700">
                CUSTOMER
              </span>

            </div>

            <h3 className="mt-8 text-2xl font-black text-slate-900 sm:text-3xl">
              Customer Dashboard
            </h3>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Find professionals, create job requests, manage jobs,
              messages, notifications, payments and reviews from one place.
            </p>

            <div className="mt-8 inline-flex rounded-xl bg-blue-50 px-5 py-3 font-black text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
              Open Customer Dashboard →
            </div>

          </Link>


          {/* PROFESSIONAL */}
          <Link
            href="/professional-dashboard"
            className="group rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-10"
          >

            <div className="flex items-center justify-between gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
                🛠️
              </div>

              <span className="rounded-full bg-orange-50 px-4 py-2 text-xs font-black tracking-wide text-orange-700">
                PROFESSIONAL
              </span>

            </div>

            <h3 className="mt-8 text-2xl font-black text-slate-900 sm:text-3xl">
              Professional Dashboard
            </h3>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Manage your profile, qualifications, job requests, accepted
              jobs, earnings, notifications, reviews and availability.
            </p>

            <div className="mt-8 inline-flex rounded-xl bg-orange-50 px-5 py-3 font-black text-orange-700 transition group-hover:bg-orange-500 group-hover:text-white">
              Open Professional Dashboard →
            </div>

          </Link>

        </div>
      </section>


      {/* =========================================================
          SERVICES
      ========================================================= */}
      <section className="border-y border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
              Professional Services
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Choose the service you need
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              Select a service to find professionals offering that service.
              Fundi Universe connects customers with professionals across
              different countries and locations.
            </p>

          </div>


          {/* SERVICE CARDS */}
          <div className="mx-auto mt-14 max-w-6xl">

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {services.map((item, index) => (

                <button
                  key={item}
                  type="button"
                  onClick={() => chooseService(item)}
                  className="group min-h-[120px] rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg"
                >

                  <div className="flex h-full flex-col justify-between">

                    <div className="flex items-start justify-between gap-3">

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-black text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-lg text-slate-300 transition group-hover:text-blue-500">
                        →
                      </span>

                    </div>

                    <p className="mt-6 text-base font-black leading-6 text-slate-800 group-hover:text-blue-700">
                      {item}
                    </p>

                  </div>

                </button>

              ))}

            </div>
          </div>

        </div>
      </section>


      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Simple Process
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Find the right professional in simple steps
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Fundi Universe is designed to make finding and connecting with
            professionals simple.
          </p>

        </div>


        <div className="mt-14 grid gap-6 md:grid-cols-3">

          {/* STEP 1 */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-xl font-black text-blue-700">
              01
            </div>

            <h3 className="mt-7 text-xl font-black">
              Choose a service
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Select the professional service you need from the available
              service categories.
            </p>

          </div>


          {/* STEP 2 */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-xl font-black text-orange-700">
              02
            </div>

            <h3 className="mt-7 text-xl font-black">
              Choose your location
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Select your country and enter your city or area to discover
              professionals around your preferred location.
            </p>

          </div>


          {/* STEP 3 */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-xl font-black text-green-700">
              03
            </div>

            <h3 className="mt-7 text-xl font-black">
              Connect with professionals
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Browse professional profiles, compare available options and
              connect with the right professional for your work.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          TRUST FEATURES
      ========================================================= */}
      <section className="bg-slate-100">

        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
              Why Fundi Universe
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Built for customers and professionals
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              A professional services platform designed to make it easier
              to discover, connect and work with professionals.
            </p>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {/* VERIFIED */}
            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm sm:p-9">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl text-green-700">
                ✓
              </div>

              <h3 className="mt-7 text-xl font-black">
                Verified Professionals
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                Professional profiles can include identity verification,
                qualifications, certificates and professional experience.
              </p>

            </div>


            {/* WORLDWIDE */}
            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm sm:p-9">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                🌍
              </div>

              <h3 className="mt-7 text-xl font-black">
                Professionals Worldwide
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                Connect customers with professionals across countries,
                cities and locations through one global platform.
              </p>

            </div>


            {/* REVIEWS */}
            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm sm:p-9">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-2xl">
                ⭐
              </div>

              <h3 className="mt-7 text-xl font-black">
                Reviews & Ratings
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                Customers can review completed work and help build trusted
                professional profiles through ratings and feedback.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
          GLOBAL COUNTRIES
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
            Global Reach
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Professionals across countries
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Fundi Universe is designed to connect customers and professionals
            across multiple countries and markets.
          </p>

        </div>


        <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {countries.map((item) => (

            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-5 text-center font-bold text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:text-blue-700 hover:shadow-md"
            >
              🌍 {item}
            </div>

          ))}

        </div>

      </section>


      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-slate-950">

        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 py-24 text-center text-white lg:py-28">

          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">
            Fundi Universe
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Ready to join Fundi Universe?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Create your account and connect with professionals or grow
            your professional service worldwide.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/signup"
              className="rounded-2xl bg-blue-600 px-8 py-4 font-black text-white shadow-lg transition hover:bg-blue-700"
            >
              Create Account
            </Link>

            <Link
              href="/professionals"
              className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-black text-white transition hover:bg-white/15"
            >
              Browse Professionals
            </Link>

          </div>

        </div>
      </section>


      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            {/* FOOTER LOGO */}
            <Link
              href="/"
              className="inline-flex items-center"
            >
              <img
                src="/logo.png"
                alt="Fundi Universe"
                className="h-12 w-auto object-contain"
              />
            </Link>


            {/* FOOTER LINKS */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">

              <Link
                href="/professionals"
                className="transition hover:text-blue-600"
              >
                Professionals
              </Link>

              <Link
                href="/signup"
                className="transition hover:text-blue-600"
              >
                Sign Up
              </Link>

              <Link
                href="/login"
                className="transition hover:text-blue-600"
              >
                Login
              </Link>

            </div>

          </div>


          <div className="mt-8 border-t border-slate-100 pt-6 text-center text-sm text-slate-500 md:text-left">
            © {new Date().getFullYear()} Fundi Universe. All rights reserved.
          </div>

        </div>
      </footer>

    </main>
  );
}
