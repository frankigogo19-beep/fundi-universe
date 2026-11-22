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

const translations = {
  en: {
    home: "Home",
    dashboard: "Dashboard",
    professionals: "Professionals",
    opportunities: "Global Opportunities",
    services: "Services",
    about: "About Us",
    contact: "Contact Us",
    login: "Login",
    register: "Create Account",
    settings: "Settings",
    logout: "Logout",
    welcome: "Welcome to Fundi Universe",
    tagline: "One platform. Professionals worldwide.",
    findProfessional: "Find a Professional",
    getStarted: "Get Started",
  },
  sw: {
    home: "Nyumbani",
    dashboard: "Dashibodi",
    professionals: "Wataalamu",
    opportunities: "Fursa za Kimataifa",
    services: "Huduma",
    about: "Kuhusu Sisi",
    contact: "Wasiliana Nasi",
    login: "Ingia",
    register: "Fungua Akaunti",
    settings: "Mipangilio",
    logout: "Toka",
    welcome: "Karibu Fundi Universe",
    tagline: "Jukwaa moja. Wataalamu duniani kote.",
    findProfessional: "Tafuta Mtaalamu",
    getStarted: "Anza Sasa",
  },
  fr: {
    home: "Accueil",
    dashboard: "Tableau de bord",
    professionals: "Professionnels",
    opportunities: "Opportunités mondiales",
    services: "Services",
    about: "À propos",
    contact: "Contact",
    login: "Connexion",
    register: "Créer un compte",
    settings: "Paramètres",
    logout: "Déconnexion",
    welcome: "Bienvenue sur Fundi Universe",
    tagline: "Une plateforme. Des professionnels partout.",
    findProfessional: "Trouver un professionnel",
    getStarted: "Commencer",
  },
  es: {
    home: "Inicio",
    dashboard: "Panel",
    professionals: "Profesionales",
    opportunities: "Oportunidades globales",
    services: "Servicios",
    about: "Sobre nosotros",
    contact: "Contacto",
    login: "Iniciar sesión",
    register: "Crear cuenta",
    settings: "Configuración",
    logout: "Cerrar sesión",
    welcome: "Bienvenido a Fundi Universe",
    tagline: "Una plataforma. Profesionales en todo el mundo.",
    findProfessional: "Encontrar un profesional",
    getStarted: "Comenzar",
  },
  ar: {
    home: "الرئيسية",
    dashboard: "لوحة التحكم",
    professionals: "المحترفون",
    opportunities: "الفرص العالمية",
    services: "الخدمات",
    about: "من نحن",
    contact: "اتصل بنا",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",
    welcome: "مرحباً بك في Fundi Universe",
    tagline: "منصة واحدة. محترفون حول العالم.",
    findProfessional: "ابحث عن محترف",
    getStarted: "ابدأ الآن",
  },
  pt: {
    home: "Início",
    dashboard: "Painel",
    professionals: "Profissionais",
    opportunities: "Oportunidades globais",
    services: "Serviços",
    about: "Sobre nós",
    contact: "Contato",
    login: "Entrar",
    register: "Criar conta",
    settings: "Configurações",
    logout: "Sair",
    welcome: "Bem-vindo ao Fundi Universe",
    tagline: "Uma plataforma. Profissionais em todo o mundo.",
    findProfessional: "Encontrar profissional",
    getStarted: "Começar",
  },
  de: {
    home: "Startseite",
    dashboard: "Dashboard",
    professionals: "Fachkräfte",
    opportunities: "Globale Möglichkeiten",
    services: "Dienstleistungen",
    about: "Über uns",
    contact: "Kontakt",
    login: "Anmelden",
    register: "Konto erstellen",
    settings: "Einstellungen",
    logout: "Abmelden",
    welcome: "Willkommen bei Fundi Universe",
    tagline: "Eine Plattform. Fachkräfte weltweit.",
    findProfessional: "Fachkraft finden",
    getStarted: "Loslegen",
  },
  zh: {
    home: "首页",
    dashboard: "控制面板",
    professionals: "专业人士",
    opportunities: "全球机会",
    services: "服务",
    about: "关于我们",
    contact: "联系我们",
    login: "登录",
    register: "创建账户",
    settings: "设置",
    logout: "退出",
    welcome: "欢迎来到 Fundi Universe",
    tagline: "一个平台，连接全球专业人士。",
    findProfessional: "寻找专业人士",
    getStarted: "立即开始",
  },
  hi: {
    home: "होम",
    dashboard: "डैशबोर्ड",
    professionals: "पेशेवर",
    opportunities: "वैश्विक अवसर",
    services: "सेवाएँ",
    about: "हमारे बारे में",
    contact: "संपर्क",
    login: "लॉग इन",
    register: "खाता बनाएँ",
    settings: "सेटिंग्स",
    logout: "लॉग आउट",
    welcome: "Fundi Universe में आपका स्वागत है",
    tagline: "एक मंच। दुनिया भर के पेशेवर।",
    findProfessional: "पेशेवर खोजें",
    getStarted: "शुरू करें",
  },
  ja: {
    home: "ホーム",
    dashboard: "ダッシュボード",
    professionals: "専門家",
    opportunities: "世界の機会",
    services: "サービス",
    about: "私たちについて",
    contact: "お問い合わせ",
    login: "ログイン",
    register: "アカウント作成",
    settings: "設定",
    logout: "ログアウト",
    welcome: "Fundi Universeへようこそ",
    tagline: "一つのプラットフォーム。世界中の専門家。",
    findProfessional: "専門家を探す",
    getStarted: "始める",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("fundi-language");

    if (languages.some((item) => item.code === saved)) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";
  }, [language]);

  function changeLanguage(code) {
    if (!languages.some((item) => item.code === code)) return;

    setLanguage(code);
    localStorage.setItem("fundi-language", code);
  }

  function t(key) {
    return (
      translations[language]?.[key] ||
      translations.en[key] ||
      key
    );
  }

  return (
    <LanguageContext.Provider
      value={{ language, changeLanguage, languages, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
