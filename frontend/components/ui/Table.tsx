// components/ui/Table.tsx
"use client";

export interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string | number;
  emptyMessage?: string;
  isLoading?: boolean;
}

export default function Table<T>({
  data,
  columns,
  keyExtractor,
  emptyMessage = "No records found",
  isLoading = false,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading...</div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">{emptyMessage}</div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={keyExtractor(row)} className="hover:bg-gray-50">
              {columns.map((col, idx) => (
                <td
                  key={idx}
                  className={`px-4 py-3 text-sm text-gray-700 ${col.className ?? ""}`}
                >
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}