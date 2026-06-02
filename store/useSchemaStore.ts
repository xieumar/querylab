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
