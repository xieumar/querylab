import { FieldSchema } from "../types";

export const mockUsersSchema: FieldSchema[] = [
  { name: "id", type: "string" },
  { name: "firstName", type: "string" },
  { name: "lastName", type: "string" },
  { name: "age", type: "number" },
  { name: "email", type: "string" },
  {
    name: "status",
    type: "enum",
    options: ["active", "inactive", "pending", "banned"],
  },
  {
    name: "role",
    type: "enum",
    options: ["admin", "editor", "viewer", "guest"],
  },
  { name: "createdAt", type: "date" },
  { name: "lastLogin", type: "date" },
];

export const mockProductsSchema: FieldSchema[] = [
  { name: "id", type: "string" },
  { name: "title", type: "string" },
  { name: "price", type: "number" },
  { name: "stock", type: "number" },
  {
    name: "category",
    type: "enum",
    options: ["electronics", "clothing", "home", "toys", "books"],
  },
  { name: "isAvailable", type: "enum", options: ["true", "false"] },
  { name: "releaseDate", type: "date" },
];
