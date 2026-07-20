// components/employees/EditEmployeeModal.tsx
"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { updateEmployeeApi } from "@/services/employee.service";
import { getErrorMessage } from "@/lib/errors";
import { Employee } from "@/types";

interface EditEmployeeModalProps {
  employee: Employee | null;
  onClose: () => void;
  onUpdated: (employee: Employee) => void;
}

function EditEmployeeForm({
  employee,
  onClose,
  onUpdated,
}: {
  employee: Employee;
  onClose: () => void;
  onUpdated: (employee: Employee) => void;
}) {
  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [department, setDepartment] = useState(employee.department);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = (): string | null => {
    if (!name.trim()) return "Full name is required";
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email";
    if (!department.trim()) return "Department is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const updated = await updateEmployeeApi(
        employee.id,
        name.trim(),
        email.trim(),
        department.trim()
      );
      onUpdated(updated);
      onClose();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to update employee"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-ember/10 border border-ember/25 text-ember text-sm px-3 py-2 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-graphite mb-1.5">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-slate/25 rounded px-3 py-2 text-sm bg-paper focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-graphite mb-1.5">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-slate/25 rounded px-3 py-2 text-sm bg-paper focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-graphite mb-1.5">
          Department
        </label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full border border-slate/25 rounded px-3 py-2 text-sm bg-paper focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 rounded text-sm font-medium text-slate hover:bg-paper transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded text-sm font-medium bg-teal text-white hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

export default function EditEmployeeModal({
  employee,
  onClose,
  onUpdated,
}: EditEmployeeModalProps) {
  return (
    <Modal isOpen={employee !== null} onClose={onClose} title="Edit Employee">
      {employee && (
        <EditEmployeeForm
          key={employee.id}
          employee={employee}
          onClose={onClose}
          onUpdated={onUpdated}
        />
      )}
    </Modal>
  );
}