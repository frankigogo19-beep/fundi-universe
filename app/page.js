
"use client";
import { useState } from "react";
const countries = [ "Tanzania", "Kenya", "Uganda", "Rwanda", "United States", "United Kingdom", "United Arab Emirates", "India", "South Africa", "Germany", "France", "Canada", "Australia", ];
const services = [ "Plumber", "Electrician", "Carpenter", "Mechanic", "Mason", "Painter", "Welder", "Cleaner", "Gardener", "Tailor", "Hairdresser", "Barber", "Women's Salon & Hair Braiding", "Toilet Unblocking", "AC Technician", "Phone Repair", "Computer Technician", "Construction Worker", "Driver", "Photographer", "Graphic Designer", "Tutor", "Catering", "Security Guard", "Other", ];
export default function Home() { const [selectedCountry, setSelectedCountry] = useState("Tanzania"); const [selectedService, setSelectedService] = useState(""); const [location, setLocation] = useState("");
function handleSearch() { const params = new URLSearchParams();
if (selectedCountry) {
  params.set("country", selectedCountry);
}

if (selectedService) {
  params.set("service", selectedService);
}

if (location) {
  params.set("location", location);
}

window.location.href = `/professionals?${params.toString()}`;
}
return ( 
  {/* HEADER */}
  <header className="border-b bg-white">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

      <div>
        <h1 className="text-2xl font-bold text-blue-600">
          Fundi Universe
        </h1>

        <p className="text-sm text-gray-500">
          Find a Professional
        </p>
      </div>

      <nav className="flex items-center gap-3">
        <a
          href="/professionals"
          className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100"
        >
          Professionals
        </a>

        <a
          href="/signup"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Sign Up
        </a>
      </nav>

    </div>
  </header>

  {/* HERO */}
  <section className="bg-gray-50">
    <div className="mx-auto max-w-7xl px-6 py-20 text-center">

      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Find a Professional
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
        One platform. Professionals worldwide.
      </p>

      {/* SEARCH BOX */}
      <div className="mx-auto mt-10 max-w-5xl rounded-2xl bg-white p-5 shadow-lg">

        <div className="grid gap-4 md:grid-cols-4">

          {/* COUNTRY */}
          <select
            value={selectedCountry}
            onChange={(e) =>
              setSelectedCountry(e.target.value)
            }
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          {/* SERVICE */}
          <select
            value={selectedService}
            onChange={(e) =>
              setSelectedService(e.target.value)
            }
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="">
              Select Professional
            </option>

            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>

          {/* LOCATION */}
          <input
            type="text"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            placeholder="City / Location"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
          />

          {/* SEARCH */}
          <button
            onClick={handleSearch}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Search
          </button>

        </div>
      </div>
    </div>
  </section>

  {/* PROFESSIONAL CATEGORIES */}
  <section className="mx-auto max-w-7xl px-6 py-16">

    <div className="text-center">

      <h3 className="text-3xl font-bold">
        Popular Professional Services
      </h3>

      <p className="mt-3 text-gray-600">
        Find trusted professionals for different services.
      </p>

    </div>

    <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

      {services.map((service) => (
        <button
          key={service}
          onClick={() => {
            window.location.href =
              `/professionals?country=${encodeURIComponent(
                selectedCountry
              )}&service=${encodeURIComponent(service)}`;
          }}
          className="rounded-2xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >

          <h4 className="font-semibold">
            {service}
          </h4>

          <p className="mt-2 text-sm text-gray-500">
            Find {service} professionals
          </p>

        </button>
      ))}

    </div>
  </section>

  {/* FOOTER */}
  <footer className="border-t bg-gray-50">

    <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Fundi Universe. All rights reserved.
    </div>

  </footer>

</main>
); }
