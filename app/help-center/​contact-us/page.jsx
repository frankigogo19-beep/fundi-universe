"use client";

import React, { useState } from "react";
import Link from "next/link";
import ContactUs from "../../components/ContactUs";
import { SUPPORTED_LANGUAGES, getSupportText } from "../../utils/supportTranslations";

export default function ContactUsPage() {
  const [activeLang, setActiveLang] = useState("sw");
  const t = getSupportText(activeLang);
  const isRtl = activeLang === "ar";

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-50 text-gray-900 py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Top Bar: Back to Help Center & Language Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            href="/help-center"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← {t.helpTitle}
          </Link>

          <select
            aria-label="Select language"
            value={activeLang}
            onChange={(e) => setActiveLang(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* ContactUs Component */}
        <ContactUs activeLang={activeLang} />
      </div>
    </div>
  );
}
