// app/(protected)/employees/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import Topbar from "@/components/layout/Topbar";
import Table, { Column } from "@/components/ui/Table";
import { Employee } from "@/types";
import { getEmployeesApi, deleteEmployeeApi } from "@/services/employee.service";
import { getErrorMessage } from "@/lib/errors";
import { useToast } from "@/context/ToastContext";
import { Search, Trash2 } from "lucide-react";

const PAGE_SIZE = 5;

export default function EmployeesPage() {
  const { showToast } = useToast();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEmployeesApi();
      setEmployees(data);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load employees"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return employees;
    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        emp.department.toLowerCase().includes(term)
    );
  }, [employees, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / PAGE_SIZE));

  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredEmployees.slice(start, start + PAGE_SIZE);
  }, [filteredEmployees, currentPage]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteEmployeeApi(id);
      showToast("Employee deleted successfully", "success");
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      showToast(getErrorMessage(err, "Failed to delete employee"), "error");
    } finally {
      setDeletingId(null);
    }
  };

  const columns: Column<Employee>[] = [
    {
      header: "Name",
      accessor: (emp) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-teal/15 text-teal font-mono font-medium text-xs flex items-center justify-center flex-shrink-0">
            {emp.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
          </div>
          <span className="font-medium">{emp.name}</span>
        </div>
      ),
    },
    { header: "Email", accessor: (emp) => <span className="text-slate">{emp.email}</span> },
    { header: "Department", accessor: (emp) => <span className="text-slate">{emp.department}</span> },
    {
      header: "Actions",
      accessor: (emp) => (
        <button
          onClick={() => handleDelete(emp.id)}
          disabled={deletingId === emp.id}
          className="inline-flex items-center gap-1.5 text-ember hover:text-ember/80 disabled:text-slate/50 text-sm font-medium"
        >
          <Trash2 size={14} />
          {deletingId === emp.id ? "Deleting..." : "Delete"}
        </button>
      ),
    },
  ];

  return (
    <>
      <Topbar title="Employees" subtitle={`${employees.length} total`} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="relative w-full max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
            <input
              type="text"
              placeholder="Search by name, email, or department..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-slate/25 rounded pl-9 pr-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition"
            />
          </div>
          <button
            className="bg-teal text-white px-4 py-2 rounded hover:opacity-90 transition text-sm font-medium"
            onClick={() => showToast("Create modal coming next", "info")}
          >
            + Create Employee
          </button>
        </div>

        {error && (
          <div className="bg-ember/10 border border-ember/25 text-ember text-sm px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <Table
          data={paginatedEmployees}
          columns={columns}
          keyExtractor={(emp) => emp.id}
          isLoading={loading}
          emptyMessage="No employees found"
        />

        {!loading && filteredEmployees.length > 0 && (
          <div className="flex items-center justify-between mt-4 text-sm text-slate">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-slate/25 rounded disabled:opacity-40 hover:bg-white transition"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-slate/25 rounded disabled:opacity-40 hover:bg-white transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}