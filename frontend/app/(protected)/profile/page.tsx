// app/(protected)/profile/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { clearAuth, getUser } from "@/lib/auth";
import Topbar from "@/components/layout/Topbar";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const user = getUser();

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  return (
    <>
      <Topbar title="Profile" subtitle="Your account details" />
      <div className="p-6">
        <div className="max-w-md bg-white border border-slate/15 rounded-lg p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-teal/15 text-teal font-mono font-semibold text-xl flex items-center justify-center mb-3">
              {initials}
            </div>
            <h2 className="font-display font-semibold text-lg text-graphite">
              {user?.name ?? "Unknown User"}
            </h2>
            <span className="mt-1.5 inline-block px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-teal/10 text-teal border border-teal/25 capitalize">
              {user?.role ?? "—"}
            </span>
          </div>

          <div className="space-y-3 mb-6 pt-6 border-t border-slate/15">
            <div className="flex justify-between text-sm">
              <span className="text-slate">Email</span>
              <span className="text-graphite font-medium">{user?.email ?? "—"}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 border border-ember text-ember py-2.5 rounded text-sm font-medium hover:bg-ember/5 transition"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}