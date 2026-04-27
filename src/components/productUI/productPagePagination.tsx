import type { PaginationProps } from "@/types/productsTypes";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const delta = 2;
  const pages: number[] = [];
  for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={15} />
      </button>

      {pages[0] > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="w-9 h-9 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">1</button>
          {pages[0] > 2 && <span className="text-gray-400 text-sm px-1">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 rounded-xl border text-sm font-medium transition ${p === currentPage ? 'bg-red-600 border-red-600 text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
        >
          {p}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && <span className="text-gray-400 text-sm px-1">…</span>}
          <button onClick={() => onPageChange(totalPages)} className="w-9 h-9 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
};