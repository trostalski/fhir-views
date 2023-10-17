import { ViewDefinition } from "./types";

export const emptyViewDef: ViewDefinition = {
  id: "",
  name: "",
  resource: "",
  select: [],
  where: [],
};

export const conditionsViewDef: ViewDefinition = {
  id: "1",
  name: "Condition",
  resource: "Condition",
  select: [
    {
      path: "code.coding.display",
      alias: "Diagnose",
    },
    {
      path: "code.coding.code",
      alias: "Code",
    },
    {
      path: "onsetDateTime",
      alias: "Datum",
    },
    {
      path: "category.coding.display",
      alias: "Category",
    },
    {
      path: "subject",
      alias: "Patient",
    },
    { path: "recorder.reference", alias: "Recorder" },
    {
      path: "clinicalStatus.coding.code",
      alias: "Status",
    },
  ],
};

export const observationViewDef: ViewDefinition = {
  id: "2",
  name: "Observation",
  resource: "Observation",
  select: [
    {
      path: "code.coding.display",
      alias: "Display",
    },
    {
      path: "code.coding.code",
      alias: "Code",
    },
    {
      path: "valueQuantity.value",
      alias: "Value",
    },
    {
      path: "valueQuantity.unit",
      alias: "Unit",
    },
    {
      path: "referenceRange[0].low.value",
      alias: "Low value",
    },
    {
      path: "referenceRange[0].high.value",
      alias: "High value",
    },
    {
      path: "effectiveDateTime",
      alias: "Date",
    },
    {
      path: "subject.reference",
      alias: "Patient",
    },
    { path: "encounter.reference", alias: "Encounter" },
  ],
};

export const patientViewDef: ViewDefinition = {
  id: "3",
  name: "Patient",
  resource: "Patient",
  select: [
    { path: "id", alias: "ID" },
    { path: "name", alias: "Name" },
    { path: "identifier.value", alias: "Identifier" },
    { alias: "Address", path: "address[0].text" },
    { alias: "BirthDate", path: "birthDate" },
    { alias: "Telecom", path: "telecom[0].value" },
  ],
  where: [{ path: "id" }],
};

export const locationViewDef: ViewDefinition = {
  id: "4",
  name: "Location",
  resource: "Location",
  select: [
    { path: "id", alias: "ID" },
    { path: "name", alias: "Name" },
    { path: "alias", alias: "Alias" },
    { path: "identifier.value", alias: "Identifier" },
    { path: "description", alias: "Description" },
    { path: "status", alias: "Status" },
    { path: "partOf.reference", alias: "PartOf" },
    { path: "physicalType.coding.display", alias: "PhysicalType" },
    { path: "type.coding.display", alias: "Type" },
  ],
  where: [],
};

export const encounterViewDef: ViewDefinition = {
  id: "5",
  name: "Encounter",
  resource: "Encounter",
  select: [
    { path: "id", alias: "ID" },
    { path: "subject.reference", alias: "Patient" },
    { path: "period.start", alias: "Start" },
    { path: "period.end", alias: "End" },
    { path: "status", alias: "Status" },
    { path: "type", alias: "Type" },
    { path: "participant[0].individual.reference", alias: "Doctors" },
    { path: "location.location.reference", alias: "Locations" },
    { path: "partOf.reference", alias: "PartOf" },
    { path: "class.display", alias: "Class" },
  ],
};

export const medicationRequestViewDef: ViewDefinition = {
  id: "6",
  name: "MedicationRequest",
  resource: "MedicationRequest",
  select: [
    { path: "status", alias: "Status" },
    { path: "intent", alias: "Intent" },
    { path: "medicationReference.reference", alias: "Medication" },
    { path: "subject.reference", alias: "Patient" },
    { path: "authoredOn", alias: "Date" },
  ],
};

export const medicationViewDef: ViewDefinition = {
  id: "7",
  name: "Medication",
  resource: "Medication",
  select: [
    { path: "id", alias: "ID" },
    { path: "code.coding.display", alias: "Display" },
    { path: "code.coding.code", alias: "Code" },
    { path: "form.coding.display", alias: "Form" },
    { path: "ingredient[0].itemReference.reference", alias: "Ingredient" },
    { path: "ingredient[0].strength.value", alias: "Strength" },
    { path: "ingredient[0].strength.unit", alias: "Unit" },
    { path: "ingredient[0].strength.code", alias: "Code" },
    { path: "ingredient[0].strength.system", alias: "System" },
  ],
};

export const diagnosticReportViewDef: ViewDefinition = {
  id: "8",
  name: "DiagnosticReport",
  resource: "DiagnosticReport",
  select: [
    { path: "id", alias: "ID" },
    { path: "code.coding.display", alias: "Display" },
    { path: "code.coding.code", alias: "Code" },
    { path: "subject.reference", alias: "Patient" },
    { path: "effectiveDateTime", alias: "Date" },
    { path: "status", alias: "Status" },
    { path: "category.coding.display", alias: "Category" },
    { path: "presentedForm[0].title", alias: "Document" },
    { path: "presentedForm[0].contentType", alias: "Document Type" },
    { path: "performer[0].reference", alias: "Performer" },
    { path: "encounter.reference", alias: "Encounter" },
  ],
};

export const viewTemplates = [
  conditionsViewDef,
  observationViewDef,
  locationViewDef,
  patientViewDef,
  encounterViewDef,
  medicationRequestViewDef,
  medicationViewDef,
  diagnosticReportViewDef,
];
