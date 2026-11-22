
import "./globals.css";

export const metadata = {
  title: "Fundi Universe",
  description: "One platform. Professionals worldwide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

