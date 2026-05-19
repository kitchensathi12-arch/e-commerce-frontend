import { useState } from "react";

export const StatusBadge = ({ value }) => {
  const styles = {
    active:     "bg-green-100 text-green-700",
    inactive:   "bg-red-100 text-red-600",
    pending:    "bg-yellow-100 text-yellow-700",
    featured:   "bg-blue-100 text-blue-700",
    outofstock: "bg-purple-100 text-purple-700",
  };
  const key = (value || "").toLowerCase().replace(/\s+/g, "");
  const cls = styles[key] || "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${cls}`}>
      {value}
    </span>
  );
};

/**
 * AdminTable — reusable table component
 *
 * Props:
 *  title       {string}    Table heading
 *  columns     {Array}     [{ key, label, sortable?, type?: "status"|"image", render?, width? }]
 *  data        {Array}     Array of row objects
 *  onAdd       {Function}  Add button handler
 *  onEdit      {Function}  Called with row on Edit
 *  onDelete    {Function}  Called with row on Delete
 *  addLabel    {string}    Button label (default: "Add New")
 *  rowsPerPage {number}    Rows per page (default: 8)
 *  searchable  {boolean}   Show search (default: true)
 *  showActions {boolean}   Show edit/delete (default: true)
 */
export default function AdminTable({
  title = "Table",
  columns = [],
  data = [],
  onAdd,
  onEdit,
  onDelete,
  addLabel = "Add New",
  rowsPerPage = 8,
  searchable = true,
  showActions = true,
}) {
  const [search, setSearch]   = useState("");
  const [page, setPage]       = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const filtered = data.filter((row) =>
    Object.values(row).some((v) =>
      String(v ?? "").toLowerCase().includes(search.toLowerCase())
    )
  );

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const cmp = String(a[sortKey] ?? "").localeCompare(
          String(b[sortKey] ?? ""), undefined, { numeric: true }
        );
        return sortDir === "asc" ? cmp : -cmp;
      })
    : filtered;

  const totalPages  = Math.max(1, Math.ceil(sorted.length / rowsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pageData    = sorted.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
    .reduce((acc, p, i, arr) => {
      if (i > 0 && p - arr[i - 1] > 1) acc.push("...");
      acc.push(p);
      return acc;
    }, []);

  const start = sorted.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const end   = Math.min(currentPage * rowsPerPage, sorted.length);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 px-5 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center gap-2 flex-wrap">
          {searchable && (
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
              <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className="bg-transparent outline-none text-sm text-gray-700 w-40 placeholder:text-gray-400"
                placeholder="Search..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
          )}
          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              {addLabel}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap select-none ${col.sortable ? "cursor-pointer hover:text-gray-700" : ""}`}
                  style={{ width: col.width || "auto" }}
                >
                  {col.label}
                  {col.sortable && (
                    <span className="ml-1 opacity-50">
                      {sortKey === col.key ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
                    </span>
                  )}
                </th>
              ))}
              {showActions && (
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {pageData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (showActions ? 1 : 0)}
                  className="text-center py-12 text-sm text-gray-400"
                >
                  No records found
                </td>
              </tr>
            ) : (
              pageData.map((row, idx) => (
                <tr key={row.id ?? idx} className="hover:bg-gray-50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-gray-700 align-middle">
                      {col.render
                        ? col.render(row[col.key], row)
                        : col.type === "image"
                        ? row[col.key]
                          ? <img src={row[col.key]} alt="" className="w-9 h-9 object-contain rounded-md border border-gray-100 bg-white" />
                          : <span className="text-gray-300">—</span>
                        : col.type === "status"
                        ? <StatusBadge value={row[col.key]} />
                        : row[col.key] ?? "—"}
                    </td>
                  ))}
                  {showActions && (
                    <td className="px-4 py-3 text-right align-middle">
                      <div className="flex items-center justify-end gap-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors"
                          >
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Edit
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md transition-colors"
                          >
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                              <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                            </svg>
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between flex-wrap gap-3 px-5 py-3 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Showing <span className="font-medium text-gray-600">{start}</span> – <span className="font-medium text-gray-600">{end}</span> of <span className="font-medium text-gray-600">{sorted.length}</span>
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>

          {pagesArray.map((item, i) =>
            item === "..." ? (
              <span key={`e${i}`} className="px-1 text-xs text-gray-400">…</span>
            ) : (
              <button
                key={item}
                onClick={() => setPage(item)}
                className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${
                  item === currentPage
                    ? "bg-amber-600 text-white border border-amber-600"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            )
          )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

    </div>
  );
}