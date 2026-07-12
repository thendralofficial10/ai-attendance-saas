// app/(protected)/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import Topbar from "@/components/layout/Topbar";
import { Employee } from "@/types";
import { getEmployeesApi } from "@/services/employee.service";
import { getErrorMessage } from "@/lib/errors";
import { Users } from "lucide-react";

export default function DashboardPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getEmployeesApi();
        setEmployees(data);
      } catch (err) {
        setError(getErrorMessage(err, "Failed to load dashboard data"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Topbar title="Dashboard" subtitle="Overview of your organization" />
      <div className="p-6">
        {error && (
          <div className="bg-ember/10 border border-ember/25 text-ember text-sm px-3 py-2 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border-t-2 border-t-teal border-x border-b border-slate/15 rounded-lg p-5">
            <div className="flex items-center gap-2 text-slate text-xs font-medium uppercase tracking-wide mb-2">
              <Users size={14} />
              Total Employees
            </div>
            <p className="font-display font-semibold text-3xl text-graphite">
              {loading ? "—" : employees.length}
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate/15 rounded-lg p-6 text-sm text-slate">
          Attendance summary cards (Present / Late / Absent) will appear here
          once the Attendance module is wired to the backend.
        </div>
      </div>
    </>
  );
}