import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-6 px-4 text-sm text-gray-600">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 Fundi Universe. Haki zote zimehifadhiwa.</p>
        <div className="flex items-center gap-6">
          <Link href="/help-center" className="font-medium hover:text-blue-600 transition">
            Help Center
          </Link>
          <Link href="/contact-us" className="font-medium hover:text-blue-600 transition">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
