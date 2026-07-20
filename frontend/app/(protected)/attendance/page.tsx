// app/(protected)/attendance/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import Topbar from "@/components/layout/Topbar";
import Table, { Column } from "@/components/ui/Table";
import { Attendance } from "@/types";
import { checkInApi, getAttendanceApi } from "@/services/attendance.service";
import { getErrorMessage } from "@/lib/errors";
import { getUser } from "@/lib/auth";
import { useToast } from "@/context/ToastContext";
import { CheckCircle2 } from "lucide-react";

type StatusFilter = "All" | "present" | "late" | "absent";

const statusStyles: Record<Attendance["status"], string> = {
  present: "bg-teal/10 text-teal border border-teal/25",
  late: "bg-amber/10 text-[#9B6E1A] border border-amber/30",
  absent: "bg-ember/10 text-ember border border-ember/25",
};

const statusDot: Record<Attendance["status"], string> = {
  present: "bg-teal",
  late: "bg-amber",
  absent: "bg-ember",
};

export default function AttendancePage() {
  const { showToast } = useToast();
  const user = getUser();

  const [records, setRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<StatusFilter>("All");
  const [checkingIn, setCheckingIn] = useState(false);

  const fetchAttendance = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAttendanceApi();
      setRecords(data);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load attendance records"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAttendance();
  }, []);

  const filteredRecords = useMemo(() => {
    if (filter === "All") return records;
    return records.filter((r) => r.status === filter);
  }, [records, filter]);

  const hasCheckedInToday = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return records.some((r) => r.employee_id === user?.id && r.date === today);
  }, [records, user]);

  const handleCheckIn = async () => {
    if (!user) return;
    setCheckingIn(true);
    try {
      // NOTE: assumes employee.id === user.id — confirm this matches
      // your backend schema; adjust if employees are linked differently.
      const newRecord = await checkInApi(user.id);
      setRecords((prev) => [newRecord, ...prev]);
      showToast("Checked in successfully", "success");
    } catch (err) {
      showToast(getErrorMessage(err, "Check-in failed"), "error");
    } finally {
      setCheckingIn(false);
    }
  };

  const columns: Column<Attendance>[] = [
    {
      header: "Employee",
      accessor: (r) => (
        <div>
          <p className="font-medium text-graphite">{r.name ?? `Employee #${r.employee_id}`}</p>
          {r.department && <p className="text-xs text-slate">{r.department}</p>}
        </div>
      ),
    },
    {
      header: "Date",
      accessor: (r) => <span className="font-mono text-xs text-slate">{r.date}</span>,
    },
    {
      header: "Check-in Time",
      accessor: (r) => (
        <span className="font-mono text-xs text-graphite">{r.check_in_time ?? "—"}</span>
      ),
    },
    {
      header: "Status",
      accessor: (r) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium tracking-wide capitalize ${statusStyles[r.status]}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${statusDot[r.status]}`} />
          {r.status}
        </span>
      ),
    },
  ];

  const filters: StatusFilter[] = ["All", "present", "late", "absent"];

  return (
    <>
      <Topbar title="Attendance" subtitle="Track check-ins and daily status" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition ${
                  filter === f
                    ? "bg-teal text-white"
                    : "bg-white border border-slate/25 text-slate hover:bg-paper"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={handleCheckIn}
            disabled={checkingIn || hasCheckedInToday}
            className="inline-flex items-center gap-2 bg-teal text-white px-4 py-2 rounded hover:opacity-90 transition text-sm font-medium disabled:opacity-50"
          >
            <CheckCircle2 size={15} />
            {hasCheckedInToday
              ? "Checked in today"
              : checkingIn
              ? "Checking in..."
              : "Check In"}
          </button>
        </div>

        {error && (
          <div className="bg-ember/10 border border-ember/25 text-ember text-sm px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <Table
          data={filteredRecords}
          columns={columns}
          keyExtractor={(r) => r.id}
          isLoading={loading}
          emptyMessage="No attendance records found"
        />
      </div>
    </>
  );
}