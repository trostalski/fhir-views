export type ViewResult = any;

interface SelectDefinition {
  path: string;
  alias?: string;
}

interface WhereDefinition {
  path: string;
  desription?: string;
}

export interface ViewDefinition {
  id: string;
  resource: string;
  select: SelectDefinition[];
  name?: string;
  where?: WhereDefinition[];
}

export interface Bundle {
  id?: string;
  resourceType: string;
  type: string;
  entry: { resource: { resourceType: string; id?: string } }[];
}
