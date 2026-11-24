"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { SUPPORTED_LANGUAGES, getSupportText } from "../../utils/supportTranslations";

const FAQ_ITEMS = [
  {
    id: 1,
    audience: "client",
    category: {
      sw: "Malipo",
      en: "Payments",
    },
    question: {
      sw: "Malipo ya huduma ya Fundi yanafanyika vipi?",
      en: "How are payments handled for a Fundi service?",
    },
    answer: {
      sw: "Unaweza kulipa kwa njia za malipo zinazoungwa mkono na mfumo baada ya kukubaliana na Fundi kuhusu gharama na muda wa kazi.",
      en: "You can pay through the payment methods supported on the platform after agreeing on cost and timeline with the Fundi.",
    },
  },
  {
    id: 2,
    audience: "fundi",
    category: {
      sw: "Akaunti & Verification",
      en: "Account & Verification",
    },
    question: {
      sw: "Ninahitaji nini ili kuthibitisha akaunti yangu ya Fundi?",
      en: "What do I need to verify my Fundi account?",
    },
    answer: {
      sw: "Kamilisha taarifa zako za wasifu, ujuzi wako, na hatua za uthibitisho wa akaunti ili wateja waweze kukuamini na kukupa oda kirahisi.",
      en: "Complete your profile details, skills, and account verification steps so clients can trust you and book you easily.",
    },
  },
  {
    id: 3,
    audience: "client",
    category: {
      sw: "Oda / Kazi",
      en: "Booking / Job",
    },
    question: {
      sw: "Ninawezaje kupata Fundi aliye karibu na eneo langu?",
      en: "How can I find a Fundi near my location?",
    },
    answer: {
      sw: "Tumia utafutaji au chaguo la huduma kwenye jukwaa kuchuja mafundi kulingana na aina ya kazi na eneo ulipo.",
      en: "Use search or service filters on the platform to narrow down Fundis by job type and your area.",
    },
  },
  {
    id: 4,
    audience: "fundi",
    category: {
      sw: "Mzozo / Ripoti",
      en: "Dispute / Report",
    },
    question: {
      sw: "Nifanyeje nikikumbana na changamoto au kutoelewana na mteja?",
      en: "What should I do if I face an issue or disagreement with a client?",
    },
    answer: {
      sw: "Wasiliana na timu ya msaada kupitia ukurasa wa Contact Us na utoe maelezo kamili ili tuweze kufuatilia haraka.",
      en: "Reach out to our support team via the Contact Us page with full details so we can follow up promptly.",
    },
  },
];

export default function HelpCenterPage() {
  const [activeLang, setActiveLang] = useState("sw");
  const [audience, setAudience] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState(1);

  const t = getSupportText(activeLang);
  const isRtl = activeLang === "ar";

  const getLocalized = (obj) => obj?.[activeLang] || obj?.en || obj?.sw || "";

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return FAQ_ITEMS.filter((item) => {
      const matchesAudience = audience === "all" || item.audience === audience;
      if (!matchesAudience) return false;

      if (!q) return true;

      const questionText = getLocalized(item.question).toLowerCase();
      const answerText = getLocalized(item.answer).toLowerCase();
      const categoryText = getLocalized(item.category).toLowerCase();

      return (
        questionText.includes(q) ||
        answerText.includes(q) ||
        categoryText.includes(q)
      );
    });
  }, [activeLang, audience, searchQuery]);

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-50 text-gray-900 py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Top Bar: Language Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/contact-us"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {t.contactBtn} →
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

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            {t.helpTitle}
          </h1>
          <p className="mt-2 text-base text-gray-600">{t.helpSubtitle}</p>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Audience Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { key: "all", label: t.all },
            { key: "client", label: t.client },
            { key: "fundi", label: t.fundi },
          ].map((tab) => {
            const active = audience === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setAudience(tab.key)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(item.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition"
                  >
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
                        {getLocalized(item.category)}
                      </span>
                      <span className="text-base font-medium text-gray-900">
                        {getLocalized(item.question)}
                      </span>
                    </div>
                    <span className="text-xl font-bold text-gray-400 shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-600 leading-relaxed bg-gray-50/50">
                      {getLocalized(item.answer)}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
              {t.noResults}
            </div>
          )}
        </div>

        {/* Contact CTA Box */}
        <div className="mt-10 rounded-2xl bg-blue-600 p-6 sm:p-8 text-center text-white shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold">{t.stillNeedHelp}</h2>
          <div className="mt-5">
            <Link
              href="/contact-us"
              className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow hover:bg-blue-50 transition"
            >
              {t.contactBtn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
