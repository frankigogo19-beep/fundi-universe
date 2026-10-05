"use client";

import { useState } from "react";

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
  "Plumber",
  "Electrician",
  "Carpenter",
  "Mechanic",
  "Mason",
  "Painter",
  "Welder",
  "Cleaner",
  "Gardener",
  "Tailor",
  "Hairdresser",
  "Barber",
  "Women's Salon & Hair Braiding",
  "Toilet Unblocking",
  "Toilet Cleaning",
  "AC Technician",
  "Phone Repair",
  "Computer Technician",
  "Construction Worker",
  "Driver",
  "Photographer",
  "Graphic Designer",
  "Tutor",
  "Catering",
  "Security Guard",
  "Accountant",
  "Procurement Specialist",
  "Logistics Specialist",
  "Consultant",
  "Engineer",
  "IT Specialist",
  "Other",
];

const popularServices = [
  {
    name: "Plumber",
    description: "Water, pipes, taps and plumbing services.",
  },
  {
    name: "Electrician",
    description: "Electrical installation and repair services.",
  },
  {
    name: "Carpenter",
    description: "Furniture, doors, cabinets and woodwork.",
  },
  {
    name: "Mechanic",
    description: "Vehicle repair and maintenance services.",
  },
  {
    name: "Mason",
    description: "Building, brickwork and construction services.",
  },
  {
    name: "Painter",
    description: "House, office and commercial painting.",
  },
  {
    name: "Welder",
    description: "Metal fabrication, gates and welding work.",
  },
  {
    name: "Cleaner",
    description: "Home, office and commercial cleaning.",
  },
  {
    name: "Women's Salon & Hair Braiding",
    description: "Salon, beauty and professional hair braiding.",
  },
  {
    name: "Toilet Unblocking",
    description: "Professional blocked toilet and drainage services.",
  },
  {
    name: "AC Technician",
    description: "Air conditioning installation and repair.",
  },
  {
    name: "Computer Technician",
    description: "Computer repair, software and technical support.",
  },
];

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState("Tanzania");
  const [selectedService, setSelectedService] = useState("");
  const [location, setLocation] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();

    if (selectedCountry) {
      params.set("country", selectedCountry);
    }

    if (selectedService) {
      params.set("service", selectedService);
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    window.location.href = `/professionals?${params.toString()}`;
  }

  function searchService(service) {
    const params = new URLSearchParams();

    params.set("country", selectedCountry);
    params.set("service", service);

    if (location.trim()) {
      params.set("location", location.trim());
    }

    window.location.href = `/professionals?${params.toString()}`;
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">

          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
              F
            </div>

            <div>
              <h1 className="text-xl font-bold text-blue-600 sm:text-2xl">
                Fundi Universe
              </h1>

              <p className="text-xs text-gray-500">
                Find a Professional
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-2 md:flex">
            <a
              href="/professionals"
              className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Professionals
            </a>

            <a
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Login
            </a>

            <a
              href="/signup"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Sign Up
            </a>
          </nav>

          <div className="flex gap-2 md:hidden">
            <a
              href="/login"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
            >
              Login
            </a>

            <a
              href="/signup"
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
            >
              Sign Up
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-6 sm:py-24">

          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
              One platform. Professionals worldwide.
            </p>

            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Find the Right
              <span className="text-blue-600"> Professional</span>
              <br />
              for Your Job
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              Connect with skilled and trusted professionals for your home,
              business and everyday needs — wherever you are.
            </p>
          </div>

          {/* SEARCH */}
          <div className="mx-auto mt-10 max-w-6xl rounded-2xl border bg-white p-4 shadow-xl sm:p-6">
            <div className="grid gap-3 md:grid-cols-4">

              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full rounded-xl border px-4 py-3.5 outline-none focus:border-blue-500"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full rounded-xl border px-4 py-3.5 outline-none focus:border-blue-500"
              >
                <option value="">What service do you need?</option>

                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City / Location"
                className="w-full rounded-xl border px-4 py-3.5 outline-none focus:border-blue-500"
              />

              <button
                onClick={handleSearch}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Search Professionals
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-gray-500">
            <span>✓ Verified Professionals</span>
            <span>✓ Multiple Countries</span>
            <span>✓ Easy to Find</span>
            <span>✓ Professional Services</span>
          </div>
        </div>
      </section>

      {/* POPULAR SERVICES */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Explore Services
          </p>

          <h3 className="mt-2 text-3xl font-bold sm:text-4xl">
            Popular Professional Services
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Find skilled professionals for repairs, construction, beauty,
            technology, business and many other services.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularServices.map((service) => (
            <button
              key={service.name}
              onClick={() => searchService(service.name)}
              className="group rounded-2xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-600">
                {service.name.charAt(0)}
              </div>

              <h4 className="mt-5 text-lg font-bold group-hover:text-blue-600">
                {service.name}
              </h4>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {service.description}
              </p>

              <p className="mt-4 text-sm font-semibold text-blue-600">
                Find professionals →
              </p>
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/professionals"
            className="inline-flex rounded-xl border px-6 py-3 font-semibold hover:bg-gray-50"
          >
            View All Professionals
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Simple & Easy
            </p>

            <h3 className="mt-2 text-3xl font-bold sm:text-4xl">
              How Fundi Universe Works
            </h3>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">

            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                1
              </div>

              <h4 className="mt-5 text-xl font-bold">
                Search
              </h4>

              <p className="mt-3 text-gray-600">
                Choose your country, service and location to find the right
                professional.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                2
              </div>

              <h4 className="mt-5 text-xl font-bold">
                Connect
              </h4>

              <p className="mt-3 text-gray-600">
                Review professional profiles and connect with the person who
                matches your needs.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                3
              </div>

              <h4 className="mt-5 text-xl font-bold">
                Get the Job Done
              </h4>

              <p className="mt-3 text-gray-600">
                Agree on the work, complete the job and build a trusted
                professional relationship.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* GLOBAL PLATFORM */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Global Platform
            </p>

            <h3 className="mt-3 text-3xl font-bold sm:text-4xl">
              Professionals Without Borders
            </h3>

            <p className="mt-5 leading-7 text-gray-600">
              Fundi Universe is designed to connect customers with
              professionals across countries and cities around the world.
              Whether you need a fundi for your home, business or a specialized
              service, the platform makes it easier to find the right person.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {countries.slice(0, 9).map((country) => (
                <div
                  key={country}
                  className="rounded-xl border bg-white px-4 py-3 text-sm font-medium"
                >
                  {country}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-blue-600 p-8 text-white shadow-xl sm:p-10">

            <h4 className="text-2xl font-bold">
              Are you a Professional?
            </h4>

            <p className="mt-4 leading-7 text-blue-50">
              Create your professional profile, showcase your skills and
              connect with customers looking for your services.
            </p>

            <a
              href="/signup"
              className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-blue-600 hover:bg-gray-100"
            >
              Become a Professional
            </a>
          </div>

        </div>
      </section>

      {/* CUSTOMER CTA */}
      <section className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-6">

          <h3 className="text-3xl font-bold text-white sm:text-4xl">
            Need a Professional?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Find the right professional for your next job through Fundi
            Universe.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <a
              href="/professionals"
              className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white hover:bg-blue-700"
            >
              Find a Professional
            </a>

            <a
              href="/signup"
              className="rounded-xl border border-gray-600 px-7 py-3.5 font-semibold text-white hover:bg-gray-800"
            >
              Create Account
            </a>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white">

        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-4">

          <div>
            <h4 className="text-xl font-bold text-blue-600">
              Fundi Universe
            </h4>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              One platform connecting customers and professionals worldwide.
            </p>
          </div>

          <div>
            <h5 className="font-bold">
              Platform
            </h5>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <a href="/professionals" className="block hover:text-blue-600">
                Find Professionals
              </a>

              <a href="/signup" className="block hover:text-blue-600">
                Become a Professional
              </a>

              <a href="/login" className="block hover:text-blue-600">
                Login
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-bold">
              Services
            </h5>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <button
                onClick={() => searchService("Plumber")}
                className="block hover:text-blue-600"
              >
                Plumbing
              </button>

              <button
                onClick={() => searchService("Electrician")}
                className="block hover:text-blue-600"
              >
                Electrical
              </button>

              <button
                onClick={() => searchService("Mechanic")}
                className="block hover:text-blue-600"
              >
                Mechanics
              </button>

              <button
                onClick={() =>
                  searchService("Women's Salon & Hair Braiding")
                }
                className="block hover:text-blue-600"
              >
                Salon & Hair Braiding
              </button>

              <button
                onClick={() => searchService("Toilet Unblocking")}
                className="block hover:text-blue-600"
              >
                Toilet Unblocking
              </button>
            </div>
          </div>

          <div>
            <h5 className="font-bold">
              Account
            </h5>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <a href="/login" className="block hover:text-blue-600">
                Login
              </a>

              <a href="/signup" className="block hover:text-blue-600">
                Sign Up
              </a>

              <a href="/dashboard" className="block hover:text-blue-600">
                Dashboard
              </a>

              <a
                href="/professional-dashboard"
                className="block hover:text-blue-600"
              >
                Professional Dashboard
              </a>
            </div>
          </div>

        </div>

        <div className="border-t">
          <div className="mx-auto max-w-7xl px-5 py-6 text-center text-sm text-gray-500 sm:px-6">
            © {new Date().getFullYear()} Fundi Universe. All rights reserved.
          </div>
        </div>

      </footer>

    </main>
  );
}
