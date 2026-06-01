import { QueryTree, Rule, QueryNode } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const evaluateRule = (rule: Rule, data: Record<string, any>): boolean => {
  const dataValue = data[rule.field];
  const ruleValue = rule.value;

  if (dataValue === undefined) return false;

  switch (rule.operator) {
    case "equals":
      return String(dataValue).toLowerCase() === String(ruleValue).toLowerCase();
    case "not_equals":
      return String(dataValue).toLowerCase() !== String(ruleValue).toLowerCase();
    case "greater_than":
      return Number(dataValue) > Number(ruleValue);
    case "less_than":
      return Number(dataValue) < Number(ruleValue);
    case "contains":
      return String(dataValue).toLowerCase().includes(String(ruleValue).toLowerCase());
    case "starts_with":
      return String(dataValue).toLowerCase().startsWith(String(ruleValue).toLowerCase());
    case "in":
      // simplistic 'in' handling for strings separated by commas
      const arr = String(ruleValue).split(",").map(s => s.trim().toLowerCase());
      return arr.includes(String(dataValue).toLowerCase());
    case "between":
      const [min, max] = String(ruleValue).split(",").map(Number);
      return Number(dataValue) >= min && Number(dataValue) <= max;
    default:
      return false;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const evaluateNode = (node: QueryNode, data: Record<string, any>): boolean => {
  if (node.type === "rule") {
    // If the rule has no field or no value, we ignore it (return true so it doesn't filter everything out)
    if (!node.field || node.value === undefined || node.value === "") return true;
    return evaluateRule(node, data);
  }

  if (node.type === "group") {
    if (node.children.length === 0) return true; // empty group matches everything

    if (node.logic === "AND") {
      return node.children.every(child => evaluateNode(child, data));
    } else {
      return node.children.some(child => evaluateNode(child, data));
    }
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeQuery = (tree: QueryTree, dataset: any[]): { results: any[], executionTimeMs: number } => {
  const start = performance.now();
  
  const results = dataset.filter((row) => evaluateNode(tree, row));
  
  const end = performance.now();
  
  return {
    results,
    executionTimeMs: Math.round(end - start),
  };
};
