// app/(protected)/attendance/page.tsx
import Topbar from "@/components/layout/Topbar";

export default function AttendancePage() {
  return (
    <>
      <Topbar title="Attendance" subtitle="Track check-ins and daily status" />
      <div className="p-6">
        <div className="bg-white border border-slate/15 rounded-lg p-10 text-center">
          <p className="text-slate text-sm">
            Attendance module coming next — we'll build this once{" "}
            <code className="font-mono text-graphite bg-paper px-1.5 py-0.5 rounded">
              attendance.service.ts
            </code>{" "}
            is ready.
          </p>
        </div>
      </div>
    </>
  );
}