import { FieldSchema, Operator } from "../types";

export const mockSchema: Record<string, FieldSchema> = {
  user_id: { name: "user_id", type: "string" },
  first_name: { name: "first_name", type: "string" },
  last_name: { name: "last_name", type: "string" },
  age: { name: "age", type: "number" },
  status: {
    name: "status",
    type: "enum",
    options: ["active", "pending", "suspended"],
  },
  country: {
    name: "country",
    type: "enum",
    options: ["USA", "UK", "Canada", "Nigeria", "Germany"],
  },
  region: {
    name: "region",
    type: "enum",
    options: ["NA", "EMEA", "APAC", "LATAM"],
  },
  created_at: { name: "created_at", type: "date" },
  is_verified: {
    name: "is_verified",
    type: "enum",
    options: ["true", "false"],
  }, // Treated as enum for simplicity
};

const stringOperators: Operator[] = [
  "equals",
  "not_equals",
  "contains",
  "starts_with",
  "in",
];
const numberOperators: Operator[] = [
  "equals",
  "not_equals",
  "greater_than",
  "less_than",
  "between",
  "in",
];
const dateOperators: Operator[] = [
  "equals",
  "not_equals",
  "greater_than",
  "less_than",
  "between",
];
const enumOperators: Operator[] = ["equals", "not_equals", "in"];

export const getOperatorsForType = (type: FieldSchema["type"]): Operator[] => {
  switch (type) {
    case "string":
      return stringOperators;
    case "number":
      return numberOperators;
    case "date":
      return dateOperators;
    case "enum":
      return enumOperators;
    default:
      return [];
  }
};

export const getDefaultOperatorForType = (
  type: FieldSchema["type"]
): Operator => {
  return getOperatorsForType(type)[0];
};

export const getDefaultValueForType = (
  type: FieldSchema["type"],
  operator: Operator,
  options?: string[]
) => {
  if (operator === "in" || operator === "between") return ""; // Or [] if we want array support
  switch (type) {
    case "string":
      return "";
    case "number":
      return 0;
    case "date":
      return new Date().toISOString().split("T")[0];
    case "enum":
      return options && options.length > 0 ? options[0] : "";
    default:
      return "";
  }
};
