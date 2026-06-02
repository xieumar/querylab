export type Operator =
  | "equals"
  | "not_equals"
  | "contains"
  | "starts_with"
  | "greater_than"
  | "less_than"
  | "in"
  | "between";

export type LogicOperator = "AND" | "OR";

export interface Rule {
  id: string;
  type: "rule";
  field: string;
  operator: Operator;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export interface Group {
  id: string;
  type: "group";
  logic: LogicOperator;
  children: (Rule | Group)[];
  isCollapsed?: boolean;
}

export type QueryNode = Rule | Group;

export type QueryTree = Group;

export interface FieldSchema {
  name: string;
  type: "string" | "number" | "date" | "enum";
  options?: string[]; // for enum type
}
