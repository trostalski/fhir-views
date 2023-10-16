"use client";
// Generic Table component for rendering view result
import React, { use, useEffect, useState } from "react";
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ViewResult } from "./ViewContainer";
import { ViewDefinition } from "../utils/types";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import TableFilter from "./TableFilter";

interface ViewTableProps {
  viewResult: any;
  viewDef: ViewDefinition;
}

const ViewTable = (props: ViewTableProps) => {
  const { viewResult, viewDef } = props;
  const [data, setData] = useState<ViewResult[]>(() => [...viewResult]);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    setData(viewResult);
  }, [viewResult]);

  const columns = viewDef.select.map((sel) => ({
    header: () => (
      <span className="whitespace-nowrap">{sel.alias || sel.path}</span>
    ),
    accessorKey: sel.alias || sel.path,
    id: sel.alias || sel.path,
    cell: (info: any) =>
      typeof info.getValue() === "object"
        ? JSON.stringify(info.getValue())
        : info.getValue(),
  }));

  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      sorting: sorting,
    },
    getCoreRowModel: getCoreRowModel(), // Assuming getCoreRowModel() is defined somewher
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <table className="inline-block text-xs grow shadow-lg overflow-scroll border-separate">
      <colgroup>
        {columns.map((column) => (
          <col key={column.id} className="w-full" />
        ))}
      </colgroup>
      <thead className="bg-primary-color text-white text-left">
        {table.getHeaderGroups().map((headerGroup, index) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={`py-0.5 px-2 grow ${
                  index === 0 && "rounded-tl-md"
                } ${
                  index === table.getHeaderGroups().length - 1 &&
                  "rounded-tr-md"
                }`}
              >
                {header.isPlaceholder ? null : (
                  <div className="flex flex-col">
                    <div
                      className="flex flex-row shrink-0 w-full items-center justify-between cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      <div className="flex flex-col items-center relative w-4 h-5">
                        <FaSortUp
                          className={`absolute top-0 ${
                            header.column.getIsSorted() && !sorting[0].desc
                              ? "text-complementary-primary-color"
                              : "text-white"
                          }`}
                          size={20}
                        />
                        <FaSortDown
                          className={`absolute top-0 ${
                            header.column.getIsSorted() && sorting[0].desc
                              ? "text-complementary-primary-color"
                              : "text-white"
                          }`}
                          size={20}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      {header.column.getCanFilter() ? (
                        <TableFilter column={header.column} table={table} />
                      ) : null}
                    </div>
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="rounded-b-md h-full w-full overflow-scroll">
        {table.getRowModel().rows.map((row, index) => (
          <tr
            key={row.id}
            className={`${
              index % 2 === 0 ? "bg-white" : "bg-gray-100"
            } transition hover:text-button-hover-color`}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-4">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};

export default ViewTable;
