import { QueryNode } from "../types";

const formatSqlValue = (value: any, operator: string) => {
  if (typeof value === "string") {
    if (operator === "contains") return `'%${value}%'`;
    if (operator === "starts_with") return `'${value}%'`;
    return `'${value}'`;
  }
  return value;
};

const mapSqlOperator = (operator: string) => {
  switch (operator) {
    case "equals":
      return "=";
    case "not_equals":
      return "!=";
    case "greater_than":
      return ">";
    case "less_than":
      return "<";
    case "contains":
      return "LIKE";
    case "starts_with":
      return "LIKE";
    case "in":
      return "IN";
    case "between":
      return "BETWEEN";
    default:
      return "=";
  }
};

export const generateSQL = (node: QueryNode): string => {
  if (node.type === "rule") {
    if (!node.field || node.value === undefined || node.value === "") return "";

    const field = node.field;
    const op = mapSqlOperator(node.operator);
    const val = formatSqlValue(node.value, node.operator);
    return `${field} ${op} ${val}`;
  }

  if (node.type === "group") {
    if (node.children.length === 0) return "";

    const childQueries = node.children
      .map(generateSQL)
      .filter((q) => q.length > 0);

    if (childQueries.length === 0) return "";

    const joined = childQueries.join(` ${node.logic} `);
    // Don't wrap root in parens if it only has one group/rule, to keep it clean
    if (node.id === "root" || childQueries.length === 1) {
      return joined;
    }
    return `(${joined})`;
  }

  return "";
};

const mapMongoOperator = (operator: string) => {
  switch (operator) {
    case "equals":
      return "$eq";
    case "not_equals":
      return "$ne";
    case "greater_than":
      return "$gt";
    case "less_than":
      return "$lt";
    case "in":
      return "$in";
    default:
      return "$eq";
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateMongo = (node: QueryNode): Record<string, any> | null => {
  if (node.type === "rule") {
    if (!node.field || node.value === undefined || node.value === "")
      return null;

    if (node.operator === "contains") {
      return { [node.field]: { $regex: node.value, $options: "i" } };
    }
    if (node.operator === "starts_with") {
      return { [node.field]: { $regex: `^${node.value}`, $options: "i" } };
    }
    const op = mapMongoOperator(node.operator);

    // For equals, mongo simplifies { field: { $eq: value } } to { field: value }
    if (op === "$eq") {
      return { [node.field]: node.value };
    }

    return { [node.field]: { [op]: node.value } };
  }

  if (node.type === "group") {
    const validChildren = node.children
      .map(generateMongo)
      .filter((q) => q !== null && Object.keys(q).length > 0);

    if (validChildren.length === 0) return null;

    // Flatten logic if root only has one child
    if (validChildren.length === 1 && node.id === "root")
      return validChildren[0];

    const logicOp = node.logic === "AND" ? "$and" : "$or";
    return { [logicOp]: validChildren };
  }

  return null;
};
