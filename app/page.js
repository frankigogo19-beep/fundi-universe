"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState("Tanzania");
  const [selectedService, setSelectedService] = useState("");
  const [location, setLocation] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();

      setIsAdmin(profile?.role === "admin");
    } catch (error) {
      console.error("Admin check error:", error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-5 border-b bg-white">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Fundi Universe
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/professionals"
            className="text-gray-700 hover:text-blue-600"
          >
            Professionals
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Sign Up
          </Link>

          {!loading && isAdmin && (
            <Link
              href="/admin/dashboard"
              className="rounded-lg border border-blue-600 px-5 py-2 text-blue-600 hover:bg-blue-50"
            >
              Admin
            </Link>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="px-6 py-20 text-center bg-gray-50">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find a Professional
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-gray-600 mb-10">
          One platform. Professionals worldwide.
        </p>

        {/* SEARCH BOX */}
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-lg">
          <div className="grid gap-4 md:grid-cols-4">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="rounded-lg border p-3"
            >
              <option>Tanzania</option>
              <option>Kenya</option>
              <option>Uganda</option>
              <option>Rwanda</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>UAE</option>
              <option>India</option>
              <option>South Africa</option>
              <option>Germany</option>
              <option>France</option>
              <option>Canada</option>
              <option>Australia</option>
            </select>

            <input
              type="text"
              placeholder="Service e.g. Mechanic"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="rounded-lg border p-3"
            />

            <input
              type="text"
              placeholder="City or location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-lg border p-3"
            />

            <Link
              href={`/professionals?country=${encodeURIComponent(
                selectedCountry
              )}&service=${encodeURIComponent(
                selectedService
              )}&location=${encodeURIComponent(location)}`}
              className="flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Find Professional
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <h2 className="mb-3 text-xl font-bold">Verified Professionals</h2>
            <p className="text-gray-600">
              Find professionals with profiles, qualifications and verification
              information.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h2 className="mb-3 text-xl font-bold">Find Nearby</h2>
            <p className="text-gray-600">
              Search for professionals based on your city and location.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h2 className="mb-3 text-xl font-bold">Work With Confidence</h2>
            <p className="text-gray-600">
              Connect with professionals and manage your service requests in
              one platform.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t px-6 py-8 text-center text-gray-500">
        © {new Date().getFullYear()} Fundi Universe. All rights reserved.
      </footer>
    </main>
  );
}
