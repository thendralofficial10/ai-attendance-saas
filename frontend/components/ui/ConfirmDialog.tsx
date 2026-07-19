// components/ui/ConfirmDialog.tsx
"use client";

import Modal from "./Modal";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
  danger?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  loading = false,
  danger = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex gap-3">
        {danger && (
          <div className="w-9 h-9 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={18} className="text-ember" />
          </div>
        )}
        <p className="text-sm text-slate pt-1.5">{message}</p>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 rounded text-sm font-medium text-slate hover:bg-paper transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className={`px-4 py-2 rounded text-sm font-medium text-white transition disabled:opacity-50 ${
            danger ? "bg-ember hover:opacity-90" : "bg-teal hover:opacity-90"
          }`}
        >
          {loading ? "Please wait..." : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}