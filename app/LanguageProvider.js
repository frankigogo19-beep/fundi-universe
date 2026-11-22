
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const LanguageContext = createContext(null);

export const languages = [
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

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("fundi-language");

    if (languages.some((item) => item.code === savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    if (!languages.some((item) => item.code === newLanguage)) {
      return;
    }

    setLanguage(newLanguage);
    localStorage.setItem("fundi-language", newLanguage);

    document.documentElement.lang = newLanguage;
    document.documentElement.dir =
      newLanguage === "ar" ? "rtl" : "ltr";
  };

  return (
    <LanguageContext.Provider
      value={{ language, changeLanguage, languages }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}

