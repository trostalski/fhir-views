import { ViewDefinition, ViewResult } from "./types";
import { compile } from "fhirpath";

export const evaluateView = (view: ViewDefinition, data: any) => {
  let result: ViewResult = [];
  const filteredResources = [];
  const whereConstraints = view.where || [];
  const selects = view.select;
  const entries = data.entry;

  for (const whereConstraint of whereConstraints) {
    const compiled = compile(whereConstraint.path);
    for (const entry of entries) {
      const resource = entry.resource;
      const evaluated = compiled(resource);
      if (evaluated && evaluated.length > 0) {
        filteredResources.push(resource);
      }
    }
  }

  for (const select of selects) {
    const compiled = compile(select.path);
    for (const index in filteredResources) {
      const resource = filteredResources[index];
      const evaluated = compiled(resource);
      if (!result[index]) {
        result[index] = {}; // Initialize result[index] if it doesn't exist
      }
      result[index][select.alias || select.path] = evaluated[0];
    }
  }
  return result;
};
