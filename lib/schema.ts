import { z } from "zod";
import { QueryTree, Group } from "../types";

export const LogicOperatorSchema = z.enum(["AND", "OR"]);

export const OperatorSchema = z.enum([
  "equals",
  "not_equals",
  "greater_than",
  "less_than",
  "contains",
  "starts_with",
  "in",
  "between",
]);

export const RuleSchema = z.object({
  id: z.string(),
  type: z.literal("rule"),
  field: z.string(),
  operator: OperatorSchema,
  value: z.any(),
});

// Zod requires lazy evaluation for recursive schemas
export const GroupSchema: z.ZodType<Group> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: z.literal("group"),
    logic: LogicOperatorSchema,
    children: z.array(z.union([RuleSchema, GroupSchema])),
    isCollapsed: z.boolean().optional(),
  })
);

export const QueryTreeSchema = GroupSchema;

/**
 * Validates and parses a JSON string into a QueryTree.
 * Throws an error if the JSON is invalid or the schema doesn't match.
 */
export const parseQueryTree = (jsonString: string): QueryTree => {
  try {
    const parsedJson = JSON.parse(jsonString);
    const result = QueryTreeSchema.safeParse(parsedJson);

    if (!result.success) {
      throw new Error(
        "The file format does not match a valid Query Builder structure."
      );
    }

    return result.data as QueryTree;
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      throw new Error("Invalid JSON file");
    }
    throw error;
  }
};
