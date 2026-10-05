"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

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
  "Masonry",
  "Carpentry",
  "Plumbing",
  "Electrical",
  "Painting",
  "Welding",
  "Tiling",
  "Roofing",
  "Air Conditioning",
  "Refrigeration",
  "Mechanic",
  "Gardening",
  "Cleaning",
  "Security",
  "Hairdressing",
  "Hair Braiding",
  "Toilet Unblocking",
  "Tailoring",
  "Photography",
  "Cooking",
  "Driving",
  "ICT & Computer Services",
  "Phone Repair",
  "Appliance Repair",
  "Construction",
  "Interior Design",
  "Graphic Design",
  "Other Professional Services",
];

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState("Tanzania");
  const [selectedService, setSelectedService] = useState("");
  const [location, setLocation] = useState("");
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.role === "admin") {
      setIsAdmin(true);
    }
  }

  async function searchProfessionals() {
    setLoading(true);

    let query = supabase
      .from("professional_profiles")
      .select("*")
      .eq("active", true);

    if (selectedCountry) {
      query = query.eq("country", selectedCountry);
    }

    if (selectedService) {
      query = query.ilike("professional_category", `%${selectedService}%`);
    }

    if (location.trim()) {
      query = query.ilike("city", `%${location.trim()}%`);
    }

    const { data, error } = await query.limit(20);

    if (error) {
      console.error("Search error:", error);
      setProfessionals([]);
    } else {
      setProfessionals(data || []);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            Fundi <span className="text-blue-600">Universe</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/professionals"
              className="font-medium text-slate-600 hover:text-blue-600"
            >
              Professionals
            </Link>

            <Link
              href="/signup"
              className="font-medium text-slate-600 hover:text-blue-600"
            >
              Sign Up
            </Link>

            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-14 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              One platform. Professionals worldwide.
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Find a{" "}
              <span className="text-blue-600">Professional</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Find trusted professionals for your home, business, construction,
              technology, transport and many other services.
            </p>
          </div>

          {/* SEARCH CARD */}
          <div className="mx-auto mt-10 max-w-6xl rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {/* COUNTRY */}
              <div className="text-left">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Country
                </label>

                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* SERVICE */}
              <div className="text-left">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Service
                </label>

                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">All Services</option>

                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* LOCATION */}
              <div className="text-left">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  City / Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Dar es Salaam"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* SEARCH BUTTON */}
              <div className="flex items-end">
                <button
                  onClick={searchProfessionals}
                  disabled={loading}
                  className="w-full rounded-2xl bg-blue-600 px-5 py-4 font-bold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Searching..." : "Search Professionals"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold">
            Popular Services
          </h2>

          <p className="mt-2 text-slate-600">
            Select a service to quickly find the right professional.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 16).map((service) => (
            <button
              key={service}
              onClick={() => {
                setSelectedService(service);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className={`rounded-2xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg ${
                selectedService === service
                  ? "border-blue-500 ring-2 ring-blue-100"
                  : "border-slate-200"
              }`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                🔧
              </div>

              <h3 className="font-bold text-slate-900">{service}</h3>

              <p className="mt-2 text-sm text-slate-500">
                Find professionals
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* SEARCH RESULTS */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold">
              Professionals
            </h2>

            <p className="mt-2 text-slate-600">
              {selectedService
                ? `Showing ${selectedService} professionals`
                : `Professionals in ${selectedCountry}`}
            </p>
          </div>

          {loading ? (
            <div className="rounded-2xl border bg-slate-50 p-10 text-center">
              <p className="font-semibold text-slate-600">
                Searching for professionals...
              </p>
            </div>
          ) : professionals.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <div className="text-4xl">🔎</div>

              <h3 className="mt-4 text-xl font-bold">
                No professionals found
              </h3>

              <p className="mt-2 text-slate-500">
                Try another service, country or city.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {professionals.map((professional) => (
                <div
                  key={professional.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-blue-100 text-2xl font-bold text-blue-700">
                        {professional.profile_picture_url ? (
                          <img
                            src={professional.profile_picture_url}
                            alt="Professional"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          "👤"
                        )}
                      </div>

                      <div>
                        <h3 className="font-bold text-lg">
                          {professional.full_name ||
                            professional.name ||
                            "Professional"}
                        </h3>

                        <p className="text-sm text-blue-600">
                          {professional.professional_category ||
                            "Professional Service"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-2 text-sm text-slate-600">
                      <p>
                        <strong>Country:</strong>{" "}
                        {professional.country || "Not specified"}
                      </p>

                      <p>
                        <strong>City:</strong>{" "}
                        {professional.city || "Not specified"}
                      </p>

                      <p>
                        <strong>Status:</strong>{" "}
                        {professional.verification_status ||
                          "Pending verification"}
                      </p>
                    </div>

                    <Link
                      href={`/professionals/${professional.id}`}
                      className="mt-6 block rounded-2xl bg-slate-900 px-5 py-3 text-center font-bold text-white transition hover:bg-blue-600"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center text-white">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Are you a professional?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Join Fundi Universe and connect with customers looking for your
            services.
          </p>

          <Link
            href="/signup"
            className="mt-8 inline-block rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-500"
          >
            Become a Professional
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Fundi Universe. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
