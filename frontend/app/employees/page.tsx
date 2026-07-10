import ProtectedRoute from "@/components/ProtectedRoute";

export default function EmployeePage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Employee</h1>
        {/* rest of your actual dashboard UI */}
      </div>
    </ProtectedRoute>
  );
}