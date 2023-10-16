import { ViewDefinition } from "./types";

export const emptyViewDef: ViewDefinition = {
  id: "",
  name: "",
  resource: "",
  select: [],
  where: [],
};

export const activeConditionsViewDef: ViewDefinition = {
  id: "1",
  name: "Active conditions",
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
      path: "clinicalStatus.coding.code",
      alias: "Status",
    },
  ],
  where: [
    {
      path: "clinicalStatus.coding.code='active'",
      desription: "Status",
    },
  ],
};

export const allConditionsViewDef: ViewDefinition = {
  id: "2",
  name: "Inactive conditions",
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
      path: "clinicalStatus.coding.code",
      alias: "Status",
    },
  ],
};

export const mediationViewDef: ViewDefinition = {
  id: "3",
  name: "Medication",
  resource: "MedicationRequest",
  select: [
    {
      path: "medicationCodeableConcept.coding.display",
      alias: "Drug",
    },
    {
      path: "medicationCodeableConcept.coding.code",
      alias: "Code",
    },
    {
      path: "authoredOn",
      alias: "Date",
    },
  ],
};

export const observationViewDef: ViewDefinition = {
  id: "4",
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
  id: "5",
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
  id: "6",
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
  id: "7",
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

export const viewTemplates = [
  activeConditionsViewDef,
  allConditionsViewDef,
  mediationViewDef,
  observationViewDef,
  locationViewDef,
  patientViewDef,
  encounterViewDef,
];
