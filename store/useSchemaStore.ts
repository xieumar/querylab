import { create } from "zustand";
import { FieldSchema } from "../types";
import { mockUsersSchema } from "../lib/mockSchemas";

interface SchemaState {
  schema: FieldSchema[];
  setSchema: (schema: FieldSchema[]) => void;
}

export const useSchemaStore = create<SchemaState>((set) => ({
  schema: mockUsersSchema,
  setSchema: (schema) => set({ schema }),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const inferSchemaFromDataset = (dataset: any[]): FieldSchema[] => {
  if (!dataset || dataset.length === 0) return [];

  const keys = new Set<string>();
  const types = new Map<string, string>();

  for (const row of dataset.slice(0, 10)) {
    for (const [key, value] of Object.entries(row)) {
      if (value !== null && value !== undefined) {
        keys.add(key);
        if (!types.has(key)) {
          types.set(key, typeof value);
        }
      }
    }
  }

  const schema: FieldSchema[] = [];
  for (const key of keys) {
    const t = types.get(key);
    if (t === "number") {
      schema.push({ name: key, type: "number" });
    } else if (t === "boolean") {
      schema.push({ name: key, type: "enum", options: ["true", "false"] });
    } else {
      schema.push({ name: key, type: "string" });
    }
  }

  return schema;
};
