// components/employees/CreateEmployeeModal.tsx
"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { createEmployeeApi } from "@/services/employee.service";
import { getErrorMessage } from "@/lib/errors";
import { Employee } from "@/types";

interface CreateEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (employee: Employee) => void;
}

export default function CreateEmployeeModal({
  isOpen,
  onClose,
  onCreated,
}: CreateEmployeeModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setDepartment("");
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

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
      const newEmployee = await createEmployeeApi(name.trim(), email.trim(), department.trim());
      onCreated(newEmployee);
      resetForm();
      onClose();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to create employee"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Employee">
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
            placeholder="Jane Doe"
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
            placeholder="jane.doe@company.com"
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
            placeholder="Engineering"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={handleClose}
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
            {loading ? "Creating..." : "Save Employee"}
          </button>
        </div>
      </form>
    </Modal>
  );
}