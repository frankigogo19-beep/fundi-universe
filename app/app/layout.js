export const metadata = {
  title: "Fundi Universe",
  description: "Find trusted professionals for your jobs and services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
