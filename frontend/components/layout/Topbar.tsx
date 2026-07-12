// components/layout/Topbar.tsx
"use client";

export default function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="h-14 flex-shrink-0 bg-white border-b border-slate/15 px-6 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h1 className="font-display font-semibold text-[15px] text-graphite leading-none">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-slate mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}