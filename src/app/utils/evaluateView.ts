import { toastError, toastInfo } from "../components/toasts";
import { Bundle, ViewDefinition, ViewResult } from "./types";
import { compile } from "fhirpath";

const isBundle = (data: any) => {
  if (data.resourceType !== "Bundle") {
    return false;
  }
  return true;
};

export const evaluateView = (view: ViewDefinition, bundle: Bundle) => {
  let result: ViewResult = [];
  if (!isBundle(bundle)) {
    toastError("Input is not a valid FHIR Bundle");
    return;
  }
  if (!bundle.entry || bundle.entry.length === 0) {
    toastInfo("Input Bundle has no entries");
    return [];
  }
  const whereConstraints = view.where || [];
  const selects = view.select;
  const removedResources: any[] = [];
  const resources = bundle.entry.map((e) => e.resource);

  for (const whereConstraint of whereConstraints) {
    const compiled = compile(whereConstraint.path);
    for (const resource of resources) {
      if (resource.resourceType !== view.resource) {
        continue;
      }
      const evaluated = compiled(resource);
      if (!evaluated || !evaluated[0] || evaluated.length == 0) {
        // constraint not met and resource should be removed
        removedResources.push(resource);
      }
    }
  }

  const filteredResources = resources.filter(
    (r) => !removedResources.includes(r)
  );

  for (const select of selects) {
    const compiled = compile(select.path);
    for (const index in filteredResources) {
      const resource = resources[index];
      const evaluated = compiled(resource);
      if (!result[index]) {
        result[index] = {}; // Initialize result[index] if it doesn't exist
      }
      if (evaluated.length > 1) {
        result[index][select.alias || select.path] = evaluated.join(", ");
      } else {
        result[index][select.alias || select.path] = evaluated[0];
      }
    }
  }

  // filter rows where all columns are undefined
  result = result.filter((row: any) => {
    return Object.values(row).some((value) => value !== undefined);
  });

  return result;
};
