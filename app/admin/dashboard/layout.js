"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    async function checkAdmin() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.replace("/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError || !profile || profile.role !== "admin") {
        router.replace("/");
        return;
      }

      if (active) {
        setChecking(false);
      }
    }

    checkAdmin();

    return () => {
      active = false;
    };
  }, [router]);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl bg-white px-6 py-5 text-center shadow-sm">
          <div className="text-2xl">🔐</div>

          <p className="mt-3 font-semibold text-slate-800">
            Checking admin access...
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Please wait
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
