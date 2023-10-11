import { ViewResult } from "./types";

export const generateUniqueID = () => {
  return Math.random().toString(36).substr(2, 9);
};

const convertToCSV = (viewResult: ViewResult[]) => {
  const header = Object.keys(viewResult[0]).join(",") + "\n";
  const rows = viewResult.map((row) =>
    Object.values(row)
      .map((value) => `"${value}"`)
      .join(",")
  );

  return header + rows.join("\n");
};

export const handleExportClick = (
  viewResult: ViewResult,
  filename: string | undefined
) => {
  const csvData = convertToCSV(viewResult);
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename + ".csv" || "data.csv";
  a.click();
  window.URL.revokeObjectURL(url);
};

export const getUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};
