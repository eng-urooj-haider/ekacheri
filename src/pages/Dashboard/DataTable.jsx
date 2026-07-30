import { useState, useEffect, useRef } from "react"; // NEW: useRef added
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import * as XLSX from "xlsx";

const DataTable = ({
  columns,
  fetchData,
  queryKey,
  pageSize = 10,
  searchPlaceholder = "Search…",
  showExportButtons,
  id = null,
}) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize });

  const isSearchAction = useRef(false); // NEW: tracks whether the NEXT fetch was caused by search

  useEffect(() => {
    const timeout = setTimeout(() => {
      isSearchAction.current = true; // NEW: mark this upcoming fetch as search-triggered
      setDebouncedSearch(globalFilter);
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, 400);

    return () => clearTimeout(timeout);
  }, [globalFilter]);

  const { data: apiData, isFetching } = useQuery({
    queryKey: [queryKey, pagination, debouncedSearch],
    queryFn: () => {
      const skipLoader = isSearchAction.current; // NEW: read the flag
      isSearchAction.current = false; // NEW: reset immediately so it doesn't leak into the next (e.g. pagination) fetch
      return fetchData({
        id: id,
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        search: debouncedSearch,
        skipLoader, // NEW
      });
    },
    placeholderData: keepPreviousData,
  });

  const data = apiData?.data ?? [];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    manualPagination: true,
    manualFiltering: true,
    pageCount: apiData?.last_page ?? -1,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const rows = table.getRowModel().rows;
  const totalRows = apiData?.total ?? 0;
  const pageIndex = pagination.pageIndex;
  const pageCount = apiData?.last_page ?? 1;
  const from = apiData?.from ?? 0;
  const to = apiData?.to ?? 0;

  // ...rest of the component (export functions, JSX) stays exactly the same

  const handleExportExcel = () => {
    const exportRows = table.getFilteredRowModel().rows;
    const exportData = exportRows.map((row) => {
      const rowData = {};
      row.getVisibleCells().forEach((cell) => {
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
    doc.setFontSize(14);
    doc.text("E-Kachehri", 14, 15);

    const exportRows = table.getFilteredRowModel().rows;
    const tableData = exportRows.map((row) =>
      row
        .getVisibleCells()
        .filter((cell) => cell.column.id !== "actions")
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
      headStyles: { fillColor: [250, 180, 33] },
    });

    doc.save("ekachehri-report.pdf");
  };

  return (
    <div className="relative w-full min-w-0 overflow-x-auto overflow-y-visible rounded-3xl bg-white border border-[#E6EDF7] shadow-lg shadow-[#2D6BA3]/5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDF2F8] px-4 py-3.5">
        <div
          className="flex w-full min-w-0 max-w-sm flex-1 items-center gap-2.5 rounded-xl  px-3.5 py-2.5  transition-all duration-200 bg-[#F7FAFD]
border border-[#E4ECF5]
focus-within:bg-white
focus-within:border-[#F5A623]
focus-within:ring-4
focus-within:ring-[#F5A623]/15 sm:w-auto sm:min-w-[240px]"
        >
          <svg
            className="size-4 shrink-0 text-[#6B87B5]"
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
            className="w-full bg-transparent text-sm text-gray-700 placeholder:text-[#6B87B5] focus:outline-none"
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
            <span className="shrink-0 text-xs text-[#6B87B5]">
              {totalRows} {totalRows === 1 ? "result" : "results"}
            </span>
          </div>
        )}
      </div>

      {/* Table */}
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
                      className={`min-w-0 truncate px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#2F4F7F]
    ${
      canSort
        ? "cursor-pointer select-none transition-colors hover:text-[#FAB421]"
        : ""
    }`}
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
                  className="px-4 py-10 text-center text-sm text-[#6B87B5]"
                >
                  No results found.
                </td>
              </tr>
            )}

            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-[#E8EEF8] transition-colors duration-150 hover:bg-[#F8FBFF]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 text-sm font-medium text-[#2F4F7F]"
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
        <span className="text-xs text-[#6B87B5]">
          {totalRows === 0
            ? "0 results"
            : `Showing ${from}–${to} of ${totalRows}`}
          {isFetching && " · Updating…"}
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
