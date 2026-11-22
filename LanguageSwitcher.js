
"use client";

import { useLanguage } from "./app/LanguageProvider";

export default function LanguageSwitcher() {
  const { language, changeLanguage, languages } = useLanguage();

  return (
    <div className="language-switcher">
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        aria-label="Choose language"
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

