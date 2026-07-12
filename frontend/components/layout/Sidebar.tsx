// components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, CalendarCheck, User, Clock, LogOut } from "lucide-react";
import { clearAuth, getUser } from "@/lib/auth";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/employees", label: "Employees", icon: Users },
  { href: "/attendance", label: "Attendance", icon: CalendarCheck },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
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
    <aside className="w-56 flex-shrink-0 bg-graphite flex flex-col h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-white/[0.07]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-teal rounded flex items-center justify-center flex-shrink-0">
            <Clock size={14} className="text-white" />
          </div>
          <span className="font-display font-semibold text-[15px] text-white tracking-tight">
            AttendIQ
          </span>
        </div>
        <p className="text-slate text-[10px] font-mono mt-1 tracking-widest uppercase pl-[36px]">
          HR Platform
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors duration-100 ${
                isActive
                  ? "bg-teal text-white"
                  : "text-slate hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <Icon size={16} />
              <span className="font-medium">{item.label}</span>
              {isActive && <div className="ml-auto w-1 h-1 rounded-full bg-white/60" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-white/[0.07]">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full bg-teal/20 text-teal font-mono font-medium text-xs flex items-center justify-center flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-medium truncate">
              {user?.name ?? "Unknown User"}
            </p>
            <p className="text-slate text-[10px] font-mono capitalize">
              {user?.role ?? "—"}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-slate hover:bg-ember/10 hover:text-ember transition-colors"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}