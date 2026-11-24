import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { getSupportText } from "../utils/supportTranslations";

export default function HelpCenter({ activeLang = "sw", onNavigateToContact }) {
  const t = getSupportText(activeLang);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [audience, setAudience] = useState("all");
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      let { data, error } = await supabase
        .from("help_articles")
        .select("*")
        .eq("language_code", activeLang)
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (!error && (!data || data.length === 0) && activeLang !== "en") {
        const fallback = await supabase
          .from("help_articles")
          .select("*")
          .eq("language_code", "en")
          .eq("is_published", true)
          .order("sort_order", { ascending: true });
        data = fallback.data;
      }

      setArticles(data || []);
      setLoading(false);
    }

    fetchArticles();
  }, [activeLang]);

  const filteredArticles = articles.filter((item) => {
    const matchesAudience = audience === "all" || item.audience === audience;
    const matchesSearch =
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchesAudience && matchesSearch;
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.helpTitle}</h1>
        <p className="text-gray-600 mt-2">{t.helpSubtitle}</p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="flex gap-2 mb-6">
        {["all", "client", "fundi"].map((tab) => (
          <button
            key={tab}
            onClick={() => setAudience(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              audience === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t[tab]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-14 bg-gray-100 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : filteredArticles.length === 0 ? (
        <p className="text-center text-gray-500 py-8">{t.noResults}</p>
      ) : (
        <div className="space-y-3">
          {filteredArticles.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-900 hover:bg-gray-50"
                >
                  <span>{item.question}</span>
                  <span className="text-xl text-gray-500">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-10 p-6 bg-blue-50 rounded-xl text-center">
        <p className="text-gray-800 font-medium mb-3">{t.stillNeedHelp}</p>
        <button
          onClick={onNavigateToContact}
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          {t.contactBtn}
        </button>
      </div>
    </div>
  );
          }
