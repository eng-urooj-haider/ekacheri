import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import * as XLSX from "xlsx";

const DataTable = ({
  columns,
  data,
  pageSize = 10,
  searchPlaceholder = "Search…",
  showExportButtons,
}) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    initialState: { pagination: { pageSize } },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Normal paginated rows for on-screen display.
  // PDF/Excel export pull from getFilteredRowModel() directly (all matching
  // rows, ignoring pagination) — see handleExportPdf / handleExportExcel.
  const rows = table.getRowModel().rows;

  const totalRows = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const from = pageIndex * pageSize + 1;
  const to = Math.min(from + pageSize - 1, totalRows);

  const handleExportExcel = () => {
    // Export all searched & sorted rows (ignores pagination)
    const exportRows = table.getFilteredRowModel().rows;
    const exportData = exportRows.map((row) => {
      const rowData = {};

      row.getVisibleCells().forEach((cell) => {
        // Skip Actions column
        if (cell.column.id === "actions") return;
        const header = cell.column.columnDef.header;
        rowData[header] = cell.getValue();
      });

      return rowData;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "export.xlsx");
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(14);
    doc.text("E-Kachehri", 14, 15);

    // Pull all filtered rows (same approach as Excel export) — ignores
    // pagination, respects current search/sort.
    const exportRows = table.getFilteredRowModel().rows;

    const tableData = exportRows.map((row) =>
      row
        .getVisibleCells()
        .filter((cell) => cell.column.id !== "actions") // skip Actions column
        .map((cell) => String(cell.getValue() ?? "")),
    );

    const tableHeaders = table
      .getHeaderGroups()[0]
      .headers.filter((h) => h.column.id !== "actions")
      .map((h) => h.column.columnDef.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      startY: 22,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [250, 180, 33] }, // amber, matches the theme
    });

    doc.save("ekachehri-report.pdf");
  };

  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3.5">
        <div className="flex w-full min-w-0 max-w-sm flex-1 items-center gap-2.5 rounded-xl bg-white/[0.04] px-3.5 py-2.5 ring-1 ring-white/[0.07] transition-all duration-200 focus-within:bg-white/[0.06] focus-within:ring-[#fab421]/25 sm:w-auto sm:min-w-[240px]">
          <svg
            className="size-4 shrink-0 text-gray-500"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.167 15.833a6.667 6.667 0 1 0 0-13.333 6.667 6.667 0 0 0 0 13.333ZM17.5 17.5l-3.625-3.625"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-transparent text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none"
          />
        </div>
        {showExportButtons && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportExcel}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Export Excel
            </button>
            <button
              onClick={handleExportPdf}
              className="rounded-lg bg-white/[0.06] px-4 py-2 text-sm font-medium text-gray-200 ring-1 ring-white/[0.1] transition hover:bg-white/[0.1]"
            >
              Download PDF
            </button>
            <span className="shrink-0 text-xs text-gray-500">
              {totalRows} {totalRows === 1 ? "result" : "results"}
            </span>
          </div>
        )}
      </div>

      {/* Table — scroll only inside this wrapper on small screens */}
      <div className="w-full min-w-0 overflow-x-auto">
        <table className="w-full min-w-full table-fixed border-collapse text-left text-sm">
          <colgroup>
            {columns.map((col) => (
              <col
                key={col.accessorKey ?? col.id}
                style={{ width: col.meta?.width ?? "auto" }}
              />
            ))}
          </colgroup>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-white/[0.06]">
                {headerGroup.headers.map((header) => {
                  const sortDir = header.column.getIsSorted();
                  const canSort = header.column.getCanSort();
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={`min-w-0 truncate px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500
                        ${canSort ? "cursor-pointer select-none hover:text-gray-300" : ""}`}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {canSort && (
                          <span className="flex flex-col leading-none text-[8px]">
                            <span
                              className={
                                sortDir === "asc"
                                  ? "text-[#fab421]"
                                  : "text-gray-600"
                              }
                            >
                              ▲
                            </span>
                            <span
                              className={
                                sortDir === "desc"
                                  ? "text-[#fab421]"
                                  : "text-gray-600"
                              }
                            >
                              ▼
                            </span>
                          </span>
                        )}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  No results found.
                </td>
              </tr>
            )}

            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-white/[0.04] text-gray-300 transition-colors duration-150 hover:bg-white/[0.03]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="min-w-0 max-w-0 truncate px-4 py-3"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] px-4 py-3.5">
        <span className="text-xs text-gray-500">
          {totalRows === 0
            ? "0 results"
            : `Showing ${from}–${to} of ${totalRows}`}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="flex size-8 items-center justify-center rounded-lg text-gray-400 ring-1 ring-white/[0.07] transition-colors duration-150 hover:bg-white/[0.05] hover:text-[#fab421] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
            aria-label="First page"
          >
            «
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex size-8 items-center justify-center rounded-lg text-gray-400 ring-1 ring-white/[0.07] transition-colors duration-150 hover:bg-white/[0.05] hover:text-[#fab421] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
            aria-label="Previous page"
          >
            ‹
          </button>

          <span className="px-2 text-xs text-gray-400 whitespace-nowrap">
            Page <span className="text-gray-200">{pageIndex + 1}</span> of{" "}
            <span className="text-gray-200">{pageCount || 1}</span>
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex size-8 items-center justify-center rounded-lg text-gray-400 ring-1 ring-white/[0.07] transition-colors duration-150 hover:bg-white/[0.05] hover:text-[#fab421] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
            aria-label="Next page"
          >
            ›
          </button>
          <button
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
            className="flex size-8 items-center justify-center rounded-lg text-gray-400 ring-1 ring-white/[0.07] transition-colors duration-150 hover:bg-white/[0.05] hover:text-[#fab421] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
            aria-label="Last page"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
