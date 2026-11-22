"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import LanguageSwitcher from "../LanguageSwitcher";

const countries = [
  "Tanzania",
  "Kenya",
  "Uganda",
  "Rwanda",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "India",
  "South Africa",
  "Germany",
  "France",
  "Canada",
  "Australia",
];

const categories = [
  { key: "plumber", label: "Plumber" },
  { key: "electrician", label: "Electrician" },
  { key: "carpenter", label: "Carpenter" },
  { key: "mechanic", label: "Mechanic" },
  { key: "welder", label: "Welder" },
  { key: "mason", label: "Mason" },
  { key: "painter", label: "Painter" },
  { key: "cleaner", label: "Cleaner" },
  { key: "gardener", label: "Gardener" },
  { key: "itSpecialist", label: "IT Specialist" },
  { key: "graphicDesigner", label: "Graphic Designer" },
  { key: "webDeveloper", label: "Web Developer" },
  { key: "photographer", label: "Photographer" },
  { key: "tailor", label: "Tailor" },
  { key: "acTechnician", label: "AC Technician" },
  { key: "phoneRepair", label: "Phone Repair" },
  { key: "hairBraiding", label: "Hair Braiding" },
  { key: "toiletUnblocking", label: "Toilet Unblocking" },
];

const categoryTranslations = {
  en: {
    plumber: "Plumber",
    electrician: "Electrician",
    carpenter: "Carpenter",
    mechanic: "Mechanic",
    welder: "Welder",
    mason: "Mason",
    painter: "Painter",
    cleaner: "Cleaner",
    gardener: "Gardener",
    itSpecialist: "IT Specialist",
    graphicDesigner: "Graphic Designer",
    webDeveloper: "Web Developer",
    photographer: "Photographer",
    tailor: "Tailor",
    acTechnician: "AC Technician",
    phoneRepair: "Phone Repair",
    hairBraiding: "Hair Braiding",
    toiletUnblocking: "Toilet Unblocking",
  },
  sw: {
    plumber: "Fundi Bomba",
    electrician: "Fundi Umeme",
    carpenter: "Fundi Seremala",
    mechanic: "Fundi Magari",
    welder: "Fundi Uchomeleaji",
    mason: "Fundi Uashi",
    painter: "Fundi Rangi",
    cleaner: "Msafishaji",
    gardener: "Mtunza Bustani",
    itSpecialist: "Mtaalamu wa IT",
    graphicDesigner: "Mbuni Picha",
    webDeveloper: "Mtengeneza Tovuti",
    photographer: "Mpiga Picha",
    tailor: "Fundi Cherehani",
    acTechnician: "Fundi wa AC",
    phoneRepair: "Fundi Simu",
    hairBraiding: "Kusuka Nywele",
    toiletUnblocking: "Kuzibua Vyoo",
  },
  fr: {
    plumber: "Plombier",
    electrician: "Électricien",
    carpenter: "Menuisier",
    mechanic: "Mécanicien",
    welder: "Soudeur",
    mason: "Maçon",
    painter: "Peintre",
    cleaner: "Agent d'entretien",
    gardener: "Jardinier",
    itSpecialist: "Spécialiste IT",
    graphicDesigner: "Graphiste",
    webDeveloper: "Développeur web",
    photographer: "Photographe",
    tailor: "Couturier",
    acTechnician: "Technicien clim",
    phoneRepair: "Réparation téléphone",
    hairBraiding: "Tressage",
    toiletUnblocking: "Débouchage",
  },
  es: {
    plumber: "Fontanero",
    electrician: "Electricista",
    carpenter: "Carpintero",
    mechanic: "Mecánico",
    welder: "Soldador",
    mason: "Albañil",
    painter: "Pintor",
    cleaner: "Limpiador",
    gardener: "Jardinero",
    itSpecialist: "Especialista TI",
    graphicDesigner: "Diseñador gráfico",
    webDeveloper: "Desarrollador web",
    photographer: "Fotógrafo",
    tailor: "Sastre",
    acTechnician: "Técnico de aire",
    phoneRepair: "Reparación de teléfonos",
    hairBraiding: "Trenzado",
    toiletUnblocking: "Desatasco",
  },
  ar: {
    plumber: "سباك",
    electrician: "كهربائي",
    carpenter: "نجار",
    mechanic: "ميكانيكي",
    welder: "لحام",
    mason: "بناء",
    painter: "دهان",
    cleaner: "عامل نظافة",
    gardener: "بستاني",
    itSpecialist: "أخصائي تقنية معلومات",
    graphicDesigner: "مصمم جرافيك",
    webDeveloper: "مطور ويب",
    photographer: "مصور",
    tailor: "خياط",
    acTechnician: "فني تكييف",
    phoneRepair: "إصلاح الهواتف",
    hairBraiding: "تضفير الشعر",
    toiletUnblocking: "تسليك المجاري",
  },
  pt: {
    plumber: "Encanador",
    electrician: "Eletricista",
    carpenter: "Carpinteiro",
    mechanic: "Mecânico",
    welder: "Soldador",
    mason: "Pedreiro",
    painter: "Pintor",
    cleaner: "Faxineiro",
    gardener: "Jardineiro",
    itSpecialist: "Especialista em TI",
    graphicDesigner: "Designer gráfico",
    webDeveloper: "Desenvolvedor web",
    photographer: "Fotógrafo",
    tailor: "Alfaiate",
    acTechnician: "Técnico de ar-condicionado",
    phoneRepair: "Conserto de celulares",
    hairBraiding: "Tranças",
    toiletUnblocking: "Desentupimento",
  },
  de: {
    plumber: "Klempner",
    electrician: "Elektriker",
    carpenter: "Tischler",
    mechanic: "Mechaniker",
    welder: "Schweißer",
    mason: "Maurer",
    painter: "Maler",
    cleaner: "Reinigungskraft",
    gardener: "Gärtner",
    itSpecialist: "IT-Spezialist",
    graphicDesigner: "Grafikdesigner",
    webDeveloper: "Webentwickler",
    photographer: "Fotograf",
    tailor: "Schneider",
    acTechnician: "Klimatechniker",
    phoneRepair: "Handyreparatur",
    hairBraiding: "Haarflechten",
    toiletUnblocking: "Rohrreinigung",
  },
  zh: {
    plumber: "水管工",
    electrician: "电工",
    carpenter: "木工",
    mechanic: "机械师",
    welder: "焊工",
    mason: "泥瓦匠",
    painter: "油漆工",
    cleaner: "清洁工",
    gardener: "园丁",
    itSpecialist: "IT 专家",
    graphicDesigner: "平面设计师",
    webDeveloper: "网站开发员",
    photographer: "摄影师",
    tailor: "裁缝",
    acTechnician: "空调技师",
    phoneRepair: "手机维修",
    hairBraiding: "编发",
    toiletUnblocking: "疏通管道",
  },
  hi: {
    plumber: "प्लंबर",
    electrician: "इलेक्ट्रीशियन",
    carpenter: "बढ़ई",
    mechanic: "मैकेनिक",
    welder: "वेल्डर",
    mason: "राजमिस्त्री",
    painter: "पेंटर",
    cleaner: "सफ़ाईकर्मी",
    gardener: "माली",
    itSpecialist: "आईटी विशेषज्ञ",
    graphicDesigner: "ग्राफ़िक डिज़ाइनर",
    webDeveloper: "वेब डेवलपर",
    photographer: "फ़ोटोग्राफ़र",
    tailor: "दर्ज़ी",
    acTechnician: "एसी तकनीशियन",
    phoneRepair: "फ़ोन मरम्मत",
    hairBraiding: "बाल गूँथना",
    toiletUnblocking: "पाइप सफ़ाई",
  },
  ja: {
    plumber: "配管工",
    electrician: "電気工事士",
    carpenter: "大工",
    mechanic: "整備士",
    welder: "溶接工",
    mason: "左官",
    painter: "塗装工",
    cleaner: "清掃スタッフ",
    gardener: "造園・庭師",
    itSpecialist: "ITスペシャリスト",
    graphicDesigner: "グラフィックデザイナー",
    webDeveloper: "Web開発者",
    photographer: "写真家",
    tailor: "仕立屋",
    acTechnician: "エアコン技術者",
    phoneRepair: "スマホ修理",
    hairBraiding: "ヘアブレイディング",
    toiletUnblocking: "排水詰まり解消",
  },
};

export default function Home() {
  const { language, t } = useLanguage();

  const [search, setSearch] = useState("");
  const [service, setService] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");

  const getCategoryName = (cat) =>
    categoryTranslations[language]?.[cat.key] || cat.label;

  const opportunities = [
    {
      title: t("intlBusinessTitle"),
      description: t("intlBusinessDesc"),
    },
    {
      title: t("profServicesTitle"),
      description: t("profServicesDesc"),
    },
    {
      title: t("globalCollabTitle"),
      description: t("globalCollabDesc"),
    },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (service) {
      params.set("service", service);
    }

    if (country) {
      params.set("country", country);
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    const query = params.toString();

    window.location.href = query
      ? `/professionals?${query}`
      : "/professionals";
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f9fc",
        color: "#172033",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e5eaf1",
          padding: "18px 6%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <a
          href="/"
          style={{
            fontSize: "23px",
            fontWeight: "800",
            color: "#1769aa",
            textDecoration: "none",
          }}
        >
          🌍 FUNDI UNIVERSE
        </a>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/professionals"
            style={{
              padding: "10px 14px",
              color: "#172033",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            {t("findProfessional")}
          </a>

          <a
            href="/login"
            style={{
              padding: "10px 14px",
              color: "#172033",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            {t("login")}
          </a>

          <a
            href="/signup"
            style={{
              padding: "11px 18px",
              borderRadius: "8px",
              background: "#172033",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            {t("signup")}
          </a>

          <LanguageSwitcher />
        </nav>
      </header>

      {/* HERO */}
      <section
        style={{
          padding: "75px 6% 60px",
          textAlign: "center",
          background:
            "linear-gradient(180deg, #eef6ff 0%, #f7f9fc 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 15px",
              borderRadius: "30px",
              background: "#ffffff",
              border: "1px solid #d9e4f2",
              color: "#1769aa",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            🌍 {t("tagline")}
          </div>

          <h1
            style={{
              fontSize: "clamp(38px, 7vw, 70px)",
              lineHeight: "1.08",
              margin: "0 0 22px",
              fontWeight: "800",
            }}
          >
            {t("heroTitle")}
          </h1>

          <p
            style={{
              maxWidth: "720px",
              margin: "0 auto",
              fontSize: "19px",
              lineHeight: "1.7",
              color: "#667085",
            }}
          >
            {t("heroSubtitle")}
          </p>

          {/* SEARCH */}
          <div
            style={{
              maxWidth: "1000px",
              margin: "35px auto 0",
              padding: "18px",
              background: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0 10px 35px rgba(20,40,80,0.08)",
              display: "grid",
              gridTemplateColumns: "2fr 1.2fr 1.2fr 1.5fr auto",
              gap: "10px",
            }}
          >
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "15px",
                border: "1px solid #d5dce7",
                borderRadius: "9px",
                outline: "none",
                fontSize: "14px",
              }}
            />

            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              style={{
                padding: "15px",
                border: "1px solid #d5dce7",
                borderRadius: "9px",
                background: "#ffffff",
                fontSize: "14px",
              }}
            >
              <option value="">{t("serviceOption")}</option>

              {categories.map((item) => {
                const label = getCategoryName(item);
                return (
                  <option key={item.key} value={item.label}>
                    {label}
                  </option>
                );
              })}
            </select>

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{
                padding: "15px",
                border: "1px solid #d5dce7",
                borderRadius: "9px",
                background: "#ffffff",
                fontSize: "14px",
              }}
            >
              <option value="">{t("countryOption")}</option>

              {countries.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder={t("locationPlaceholder")}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                padding: "15px",
                border: "1px solid #d5dce7",
                borderRadius: "9px",
                outline: "none",
                fontSize: "14px",
              }}
            />

            <button
              type="button"
              onClick={handleSearch}
              style={{
                padding: "15px 22px",
                border: "none",
                borderRadius: "9px",
                background: "#1769aa",
                color: "#ffffff",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              {t("searchButton")}
            </button>
          </div>

          {/* MAIN ACTIONS */}
          <div
            style={{
              marginTop: "28px",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <a
              href="/professionals"
              style={{
                padding: "14px 25px",
                borderRadius: "9px",
                background: "#1769aa",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              {t("findProfessional")}
            </a>

            <a
              href="/signup"
              style={{
                padding: "14px 25px",
                borderRadius: "9px",
                border: "1px solid #ccd5e2",
                background: "#ffffff",
                color: "#172033",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              {t("becomeProfessional")}
            </a>
          </div>

          {/* DASHBOARDS */}
          <div
            style={{
              marginTop: "25px",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <a
              href="/customers"
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                background: "#ffffff",
                border: "1px solid #d5dce7",
                color: "#172033",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {t("customerDashboard")}
            </a>

            <a
              href="/dashboard"
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                background: "#ffffff",
                border: "1px solid #d5dce7",
                color: "#172033",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {t("professionalDashboard")}
            </a>

            <a
              href="/notifications"
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                background: "#ffffff",
                border: "1px solid #d5dce7",
                color: "#172033",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              🔔 {t("notifications")}
            </a>
          </div>
        </div>
      </section>

      {/* TRUST FEATURES */}
      <section
        style={{
          padding: "55px 6%",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            {
              icon: "✓",
              title: t("verifiedProfessionals"),
              text: t("verifiedProfessionalsDesc"),
            },
            {
              icon: "★",
              title: t("reviewsRatings"),
              text: t("reviewsRatingsDesc"),
            },
            {
              icon: "🌍",
              title: t("worldwideAccess"),
              text: t("worldwideAccessDesc"),
            },
            {
              icon: "💳",
              title: t("globalPayments"),
              text: t("globalPaymentsDesc"),
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: "25px",
                border: "1px solid #e5eaf1",
                borderRadius: "14px",
                background: "#ffffff",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  marginBottom: "12px",
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: "18px",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#667085",
                  lineHeight: "1.6",
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR SERVICES */}
      <section
        style={{
          padding: "65px 6%",
          background: "#f7f9fc",
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "35px" }}>
            <h2
              style={{
                fontSize: "34px",
                margin: "0 0 12px",
              }}
            >
              {t("popularServices")}
            </h2>

            <p
              style={{
                color: "#667085",
                margin: 0,
              }}
            >
              {t("popularServicesDesc")}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "15px",
            }}
          >
            {categories.map((category) => {
              const label = getCategoryName(category);
              return (
                <a
                  key={category.key}
                  href={`/professionals?service=${encodeURIComponent(
                    category.label
                  )}`}
                  style={{
                    display: "block",
                    background: "#ffffff",
                    padding: "24px 15px",
                    borderRadius: "14px",
                    border: "1px solid #e5eaf1",
                    textAlign: "center",
                    fontWeight: "700",
                    color: "#172033",
                    textDecoration: "none",
                    boxShadow: "0 5px 18px rgba(20,40,80,0.04)",
                  }}
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* GLOBAL OPPORTUNITIES */}
      <section
        style={{
          padding: "70px 6%",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "34px",
              margin: "0 0 15px",
            }}
          >
            {t("opportunities")}
          </h2>

          <p
            style={{
              maxWidth: "750px",
              margin: "0 auto 40px",
              color: "#667085",
              lineHeight: "1.7",
            }}
          >
            {t("globalOpportunitiesDesc")}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              textAlign: "left",
            }}
          >
            {opportunities.map((item) => (
              <div
                key={item.title}
                style={{
                  padding: "25px",
                  borderRadius: "14px",
                  border: "1px solid #e5eaf1",
                  background: "#f9fbfd",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 12px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#667085",
                    lineHeight: "1.6",
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <a
            href="/global-opportunities"
            style={{
              display: "inline-block",
              marginTop: "35px",
              padding: "15px 28px",
              borderRadius: "9px",
              background: "#1769aa",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            {t("exploreGlobalOpportunities")}
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          padding: "70px 6%",
          background: "#f7f9fc",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "34px",
              margin: "0 0 40px",
            }}
          >
            {t("howItWorks")}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              {
                number: "1",
                title: t("step1Title"),
                text: t("step1Desc"),
              },
              {
                number: "2",
                title: t("step2Title"),
                text: t("step2Desc"),
              },
              {
                number: "3",
                title: t("step3Title"),
                text: t("step3Desc"),
              },
              {
                number: "4",
                title: t("step4Title"),
                text: t("step4Desc"),
              },
            ].map((item) => (
              <div
                key={item.number}
                style={{
                  padding: "28px",
                  background: "#ffffff",
                  borderRadius: "14px",
                  border: "1px solid #e5eaf1",
                }}
              >
                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    margin: "0 auto 15px",
                    borderRadius: "50%",
                    background: "#1769aa",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                  }}
                >
                  {item.number}
                </div>

                <h3 style={{ margin: "0 0 10px" }}>
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#667085",
                    lineHeight: "1.6",
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFESSIONAL CTA */}
      <section
        style={{
          padding: "70px 6%",
          background: "#172033",
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "38px",
              margin: "0 0 18px",
            }}
          >
            {t("skilledProTitle")}
          </h2>

          <p
            style={{
              color: "#d8deea",
              lineHeight: "1.7",
              fontSize: "17px",
            }}
          >
            {t("skilledProDesc")}
          </p>

          <a
            href="/signup"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "15px 30px",
              borderRadius: "9px",
              background: "#ffffff",
              color: "#172033",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            {t("becomeProfessional")}
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#ffffff",
          padding: "50px 6% 25px",
          borderTop: "1px solid #e5eaf1",
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "35px",
          }}
        >
          <div>
            <h3
              style={{
                marginTop: 0,
                color: "#1769aa",
              }}
            >
              🌍 FUNDI UNIVERSE
            </h3>

            <p
              style={{
                color: "#667085",
                lineHeight: "1.7",
              }}
            >
              {t("footerTagline")}
            </p>
          </div>

          <div>
            <h4>{t("platformHeading")}</h4>

            <a
              href="/professionals"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              {t("findProfessional")}
            </a>

            <a
              href="/signup"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              {t("becomeProfessional")}
            </a>

            <a
              href="/global-opportunities"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              {t("opportunities")}
            </a>
          </div>

          <div>
            <h4>{t("services")}</h4>

            <a
              href="/professionals"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              {t("popularServices")}
            </a>

            <a
              href="/professionals"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              {t("verifiedProfessionals")}
            </a>

            <a
              href="/professionals"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              {t("reviewsRatings")}
            </a>
          </div>

          <div>
            <h4>{t("accountHeading")}</h4>

            <a
              href="/login"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              {t("login")}
            </a>

            <a
              href="/signup"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              {t("signup")}
            </a>

            <a
              href="/notifications"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              {t("notifications")}
            </a>

            <a
              href="/customers"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              {t("customerDashboard")}
            </a>

            <a
              href="/dashboard"
              style={{
                display: "block",
                color: "#667085",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              {t("professionalDashboard")}
            </a>
          </div>
        </div>

        <div
          style={{
            marginTop: "40px",
            paddingTop: "20px",
            borderTop: "1px solid #e5eaf1",
            textAlign: "center",
            color: "#667085",
            fontSize: "14px",
          }}
        >
          {t("footerCopyright")}
        </div>
      </footer>
    </main>
  );
  }
