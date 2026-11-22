
import "./globals.css";
import { LanguageProvider } from "./LanguageProvider";

export const metadata = {
  title: "Fundi Universe",
  description: "One platform. Professionals worldwide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
