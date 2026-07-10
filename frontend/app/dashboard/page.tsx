import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        {/* rest of your actual dashboard UI */}
      </div>
    </ProtectedRoute>
  );
}