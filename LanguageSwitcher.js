"use client";

import { useLanguage } from "./app/LanguageProvider";

export default function LanguageSwitcher() {
  const { language, changeLanguage, languages } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
      aria-label="Choose language"
      className="cursor-pointer rounded-lg border border-white/25 bg-[#0A254E] px-3 py-1.5 text-xs font-semibold text-white focus:border-orange-400 focus:outline-none sm:text-sm"
    >
      {languages.map((item) => (
        <option
          key={item.code}
          value={item.code}
          className="bg-white text-slate-900"
        >
          {item.flag} {item.name}
        </option>
      ))}
    </select>
  );
        }
