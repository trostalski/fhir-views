"use client";
// Generic Table component for rendering view result
import React, { use, useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ViewResult } from "./ViewContainer";
import { ViewDefinition } from "../utils/types";

interface ViewTableProps {
  viewResult: any;
  viewDef: ViewDefinition;
}

const ViewTable = (props: ViewTableProps) => {
  const { viewResult, viewDef } = props;
  const [data, setData] = useState<ViewResult[]>(() => [...viewResult]);

  useEffect(() => {
    setData(viewResult);
  }, [viewResult]);

  const columns = viewDef.select.map((sel) => ({
    Header: sel.alias || sel.path,
    accessorKey: sel.alias || sel.path,
    id: sel.alias || sel.path,
    cell: (info: any) => JSON.stringify(info.getValue()),
  }));

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(), // Assuming getCoreRowModel() is defined somewhere
  });

  return (
    <table className="inline-block text-sm h-full shadow-lg overflow-x-scroll border-separate">
      <thead className="bg-primary-color text-white text-left">
        {table.getHeaderGroups().map((headerGroup, index) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={`px-4 ${index === 0 && "rounded-tl-md"} ${
                  index === table.getHeaderGroups().length - 1 &&
                  "rounded-tr-md"
                }`}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="rounded-b-md">
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
