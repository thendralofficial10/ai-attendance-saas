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
    return <div className="text-center py-10 text-slate text-sm">Loading...</div>;
  }

  if (data.length === 0) {
    return <div className="text-center py-10 text-slate text-sm">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-x-auto border border-slate/15 rounded-lg bg-white">
      <table className="min-w-full divide-y divide-slate/15">
        <thead className="bg-paper">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-3 text-left text-xs font-medium text-slate uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate/10">
          {data.map((row) => (
            <tr key={keyExtractor(row)} className="hover:bg-paper/60 transition-colors">
              {columns.map((col, idx) => (
                <td
                  key={idx}
                  className={`px-4 py-3 text-sm text-graphite ${col.className ?? ""}`}
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