import { useState } from "react";
import { Column } from "../../types/ui/Table";
import { Question } from "../../utils/alert/Alert";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

export type GenericTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
  rowsPerPage?: number;
  enableActions?: boolean;
  keyField?: keyof T;
  onEdit?: (key: T[keyof T]) => void;
  onDelete?: (key: T[keyof T]) => void;
};

export function GenericTable<T extends object>({
  data,
  columns,
  className = "",
  rowsPerPage = 5,
  enableActions = false,
  keyField,
  onEdit,
  onDelete,
}: GenericTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIdx, startIdx + rowsPerPage);

  const handleDelete = async (key: any) => {
    if ((await Question("Deseja realente excluir esse item?"))) {
      onDelete && onDelete(key);
    }
  }

  return (
    <div className={`overflow-x-auto rounded-lg ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
              >
                {col.header}
              </th>
            ))}
            {enableActions && (
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Ações
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {currentData.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-2 text-sm text-gray-800">
                  {col.render
                    ? col.render(row[col.accessor], row)
                    : String(row[col.accessor])}
                </td>
              ))}
              {enableActions && keyField && (
                <td className="px-4 py-2 text-sm text-gray-800 space-x-2">
                  <button
                    className="mr-5 cursor-pointer text-blue-600 hover:underline"
                    onClick={() => onEdit?.(row[keyField])}
                  >
                    <FaPencil/>
                  </button>
                  <button
                    className="cursor-pointer text-red-600 hover:underline"
                    onClick={() => handleDelete(row[keyField])}
                  >
                    <FaTrash/>
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700">
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <div className="space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border hover:bg-gray-100 disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border hover:bg-gray-100 disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
