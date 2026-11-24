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
      style={{
        minHeight: "100vh",
        background: "#f7f9fc",
        color: "#172033",
        fontFamily: "Arial, sans-serif",
        padding: "40px 6%",
      }}
    >
      <div style={{ maxWidth: "850px", margin: "0 auto" }}>
        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <Link
              href="/"
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#1769aa",
                textDecoration: "none",
              }}
            >
              ← Home
            </Link>
            <Link
              href="/help-center/contact-us"
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#1769aa",
                textDecoration: "none",
              }}
            >
              {t.contactBtn} →
            </Link>
          </div>

          <select
            aria-label="Select language"
            value={activeLang}
            onChange={(e) => setActiveLang(e.target.value)}
            style={{
              borderRadius: "8px",
              border: "1px solid #d5dce7",
              background: "#ffffff",
              padding: "8px 12px",
              fontSize: "14px",
              color: "#172033",
            }}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "34px", fontWeight: "800", margin: "0 0 10px" }}>
            {t.helpTitle}
          </h1>
          <p style={{ margin: 0, fontSize: "16px", color: "#667085" }}>
            {t.helpSubtitle}
          </p>
        </div>

        {/* Search Input */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            style={{
              width: "100%",
              boxSizing: "border-box",
              borderRadius: "10px",
              border: "1px solid #d5dce7",
              background: "#ffffff",
              padding: "14px 16px",
              fontSize: "15px",
              color: "#172033",
              outline: "none",
            }}
          />
        </div>

        {/* Audience Filter Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "28px" }}>
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
                style={{
                  borderRadius: "8px",
                  padding: "10px 18px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  border: active ? "none" : "1px solid #d5dce7",
                  background: active ? "#1769aa" : "#ffffff",
                  color: active ? "#ffffff" : "#172033",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        <div style={{ display: "grid", gap: "12px" }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #e5eaf1",
                    background: "#ffffff",
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(item.id)}
                    aria-expanded={isOpen}
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "16px",
                      padding: "18px 20px",
                      textAlign: "left",
                      background: "#ffffff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          display: "block",
                          fontSize: "12px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          color: "#1769aa",
                          marginBottom: "4px",
                        }}
                      >
                        {getLocalized(item.category)}
                      </span>
                      <span style={{ fontSize: "16px", fontWeight: "700", color: "#172033" }}>
                        {getLocalized(item.question)}
                      </span>
                    </div>
                    <span style={{ fontSize: "22px", fontWeight: "700", color: "#1769aa" }}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        borderTop: "1px solid #e5eaf1",
                        padding: "16px 20px",
                        fontSize: "15px",
                        color: "#667085",
                        lineHeight: "1.6",
                        background: "#f9fbfd",
                      }}
                    >
                      {getLocalized(item.answer)}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div
              style={{
                borderRadius: "12px",
                border: "1px solid #e5eaf1",
                background: "#ffffff",
                padding: "30px",
                textAlign: "center",
                fontSize: "15px",
                color: "#667085",
              }}
            >
              {t.noResults}
            </div>
          )}
        </div>

        {/* Contact CTA Box */}
        <div
          style={{
            marginTop: "40px",
            borderRadius: "16px",
            background: "#172033",
            padding: "35px 25px",
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          <h2 style={{ fontSize: "22px", fontWeight: "700", margin: "0 0 18px" }}>
            {t.stillNeedHelp}
          </h2>
          <Link
            href="/help-center/contact-us"
            style={{
              display: "inline-block",
              borderRadius: "8px",
              background: "#ffffff",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: "700",
              color: "#172033",
              textDecoration: "none",
            }}
          >
            {t.contactBtn}
          </Link>
        </div>
      </div>
    </div>
  );
}
