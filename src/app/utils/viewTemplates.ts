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
      alias: "Datum",
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
      alias: "Observatie",
    },
    {
      path: "code.coding.code",
      alias: "Code",
    },
    {
      path: "effectiveDateTime",
      alias: "Datum",
    },
  ],
};

export const patientViewDef: ViewDefinition = {
  id: "5",
  name: "Patient",
  resource: "Patient",
  select: [
    { path: "id", alias: "id" },
    { path: "name", alias: "name" },
    { path: "identifier.value", alias: "identifier" },
    { alias: "address", path: "address[0].text" },
    { alias: "birthDate", path: "birthDate" },
    { alias: "telecom", path: "telecom[0].value" },
  ],
  where: [{ path: "id" }],
};

export const locationViewDef: ViewDefinition = {
  id: "6",
  name: "Location",
  resource: "Location",
  select: [
    { path: "id", alias: "id" },
    { path: "name", alias: "name" },
    { path: "alias", alias: "alias" },
    { path: "identifier.value", alias: "identifier" },
    { path: "description", alias: "description" },
    { path: "status", alias: "status" },
    { path: "partOf.reference", alias: "partOf" },
    { path: "physicalType.coding.display", alias: "physicalType" },
    { path: "type.coding.display", alias: "type" },
  ],
  where: [],
};

export const encounterViewDef: ViewDefinition = {
  id: "7",
  name: "Encounter",
  resource: "Encounter",
  select: [
    { path: "id", alias: "id" },
    { path: "subject.reference", alias: "patient" },
    { path: "period.start", alias: "start" },
    { path: "period.end", alias: "end" },
    { path: "status", alias: "status" },
    { path: "type", alias: "type" },
    { path: "participant[0].individual.reference", alias: "doctors" },
    { path: "location.location.reference", alias: "locations" },
    { path: "partOf.reference", alias: "partOf" },
    { path: "class.display", alias: "class" },
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
