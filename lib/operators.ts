import { Operator, FieldSchema } from "../types";

export const getValidOperatorsForType = (
  type: FieldSchema["type"]
): Operator[] => {
  switch (type) {
    case "string":
      return ["equals", "not_equals", "contains", "starts_with", "in"];
    case "number":
      return [
        "equals",
        "not_equals",
        "greater_than",
        "less_than",
        "between",
        "in",
      ];
    case "date":
      return ["equals", "not_equals", "greater_than", "less_than", "between"];
    case "enum":
      return ["equals", "not_equals", "in"];
    default:
      return ["equals"];
  }
};

export const formatOperator = (operator: Operator): string => {
  return operator
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
