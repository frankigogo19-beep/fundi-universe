import "./globals.css";
import { LanguageProvider } from "./LanguageProvider";
import LanguageSwitcher from "../LanguageSwitcher";

export const metadata = {
  title: "Fundi Universe",
  description: "One platform. Professionals worldwide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <div className="border-b border-white/10 bg-[#071B3A] px-4 py-2">
            <div className="mx-auto flex max-w-7xl items-center justify-end">
              <LanguageSwitcher />
            </div>
          </div>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
