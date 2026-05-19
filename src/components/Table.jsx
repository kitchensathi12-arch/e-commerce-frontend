import Button from './ui/Buttons';
import { Plus, Search } from 'lucide-react';
import Input from './ui/Input';

export default function Table({
  buttonText,
  title,
  headers,
  length,
  children,
  page = 1,
  limit = 10,
  changePage,
  // changeLimit,
  totalData = 0,
  TotalPages = 1,
}) {
  const start = totalData === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalData);

  return (
    <div className="bg-off-white p-5 rounded-2xl min-h-screen font-dm-sans">
      <div className="bg-white rounded-2xl border border-border shadow-[0_2px_16px_rgba(92,58,30,0.07)] overflow-hidden">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-[#fffdf9]">
          <h2 className="text-[24px] font-bold text-brown-dark tracking-tight">{title}</h2>

          <div className="flex items-center gap-3">
            <Input leftIcon={<Search />} placeholder="Search..." />

            <Button className="rounded-xl! w-96!" leftIcon={<Plus />}>
              {buttonText}
            </Button>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-amber-pale border-b-[1.5px] border-border">
                {headers.map((item) => (
                  <th
                    key={item}
                    className="px-4 py-[11px] text-left text-[11px] font-semibold tracking-[0.7px] uppercase text-text-muted"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {length === 0 ? (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="px-4 py-10 text-center text-text-muted text-sm"
                  >
                    No data found.
                  </td>
                </tr>
              ) : (
                children
              )}
            </tbody>
          </table>
        </div>

        {/* ── Footer / Pagination ── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-t border-border bg-[#fffdf9]">
          {/* Left Text */}
          <p className="text-[13px] text-text-muted">
            Showing <span className="font-semibold text-brown">{start}</span> to{' '}
            <span className="font-semibold text-brown">{end}</span> of{' '}
            <span className="font-semibold text-brown">{totalData}</span> results
          </p>

          {/* Pagination */}
          <div className="flex items-center gap-2">
            {/* Prev */}
            <button
              onClick={() => changePage?.(Math.max(page - 1, 1))}
              disabled={page === 1}
              className="h-10 px-4 rounded-xl border border-border bg-white flex items-center justify-center text-sm font-medium text-text-muted hover:bg-amber-pale hover:text-amber hover:border-amber/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              ‹
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {Array.from({ length: TotalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => changePage?.(pageNumber)}
                  className={`h-10 ${page + 3 < pageNumber && 'hidden'} min-w-[40px] px-3 rounded-xl border text-sm font-medium flex items-center justify-center transition-all duration-200 shadow-sm
                  ${
                    page === pageNumber
                      ? 'bg-amber text-white border-amber shadow-md scale-105'
                      : 'bg-white border-border text-text-muted hover:bg-amber-pale hover:text-amber hover:border-amber/40'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => changePage?.(Math.min(page + 1, TotalPages))}
              disabled={page === TotalPages || TotalPages === 0}
              className="h-10 px-4 rounded-xl border border-border bg-white flex items-center justify-center text-sm font-medium text-text-muted hover:bg-amber-pale hover:text-amber hover:border-amber/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
