import ProtectedRoute from "@/components/ProtectedRoute";

export default function AttendancePage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Attendance</h1>
        {/* rest of your actual dashboard UI */}
      </div>
    </ProtectedRoute>
  );
}