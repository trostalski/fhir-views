// db.ts
import Dexie, { Table } from "dexie";
import { ViewDefinition } from "../utils/types";

export class MySubClassedDexie extends Dexie {
  viewDefinitions!: Table<ViewDefinition, string>;

  constructor() {
    super("fhir-views-db");
    this.version(1).stores({
      viewDefinitions: "id",
    });
  }
}

export const db = new MySubClassedDexie();
