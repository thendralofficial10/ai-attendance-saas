// app/(protected)/layout.tsx
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-paper">
        <Sidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </ProtectedRoute>
  );
}