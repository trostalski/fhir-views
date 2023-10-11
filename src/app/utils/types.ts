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
