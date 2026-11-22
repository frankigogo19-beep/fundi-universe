
"use client";

import { useState, useEffect } from "react";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "sw", name: "Kiswahili", flag: "🇹🇿" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
];

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("fundi-language");

    if (languages.some((item) => item.code === saved)) {
      setLanguage(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  function changeLanguage(code) {
    setLanguage(code);

    localStorage.setItem("fundi-language", code);
    document.documentElement.lang = code;

    window.dispatchEvent(
      new CustomEvent("languageChanged", {
        detail: code,
      })
    );
  }

  return (
    <div className="language-switcher">
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        aria-label="Select language"
      >
        {languages.map((item) => (
          <option key={item.code} value={item.code}>
            {item.flag} {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
