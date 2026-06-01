import { describe, it, expect } from "vitest";
import { executeQuery } from "./engine";
import { QueryTree } from "../types";

const mockData = [
  { id: 1, name: "Alice", age: 30, role: "admin", status: "active" },
  { id: 2, name: "Bob", age: 25, role: "user", status: "active" },
  { id: 3, name: "Charlie", age: 35, role: "user", status: "inactive" },
  { id: 4, name: "Diana", age: 28, role: "admin", status: "inactive" },
];

describe("Query Engine", () => {
  it("should return all data for an empty root group", () => {
    const tree: QueryTree = {
      id: "root",
      type: "group",
      logic: "AND",
      children: [],
    };
    const { results } = executeQuery(tree, mockData);
    expect(results).toHaveLength(4);
  });

  it("should correctly evaluate a single equals rule", () => {
    const tree: QueryTree = {
      id: "root",
      type: "group",
      logic: "AND",
      children: [
        {
          id: "r1",
          type: "rule",
          field: "role",
          operator: "equals",
          value: "admin",
        },
      ],
    };
    const { results } = executeQuery(tree, mockData);
    expect(results).toHaveLength(2);
    expect(results.map((r) => r.name)).toEqual(["Alice", "Diana"]);
  });

  it("should correctly evaluate AND logic with multiple rules", () => {
    const tree: QueryTree = {
      id: "root",
      type: "group",
      logic: "AND",
      children: [
        {
          id: "r1",
          type: "rule",
          field: "role",
          operator: "equals",
          value: "admin",
        },
        {
          id: "r2",
          type: "rule",
          field: "status",
          operator: "equals",
          value: "active",
        },
      ],
    };
    const { results } = executeQuery(tree, mockData);
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("Alice");
  });

  it("should correctly evaluate OR logic with multiple rules", () => {
    const tree: QueryTree = {
      id: "root",
      type: "group",
      logic: "OR",
      children: [
        {
          id: "r1",
          type: "rule",
          field: "name",
          operator: "equals",
          value: "Alice",
        },
        {
          id: "r2",
          type: "rule",
          field: "name",
          operator: "equals",
          value: "Bob",
        },
      ],
    };
    const { results } = executeQuery(tree, mockData);
    expect(results).toHaveLength(2);
    expect(results.map((r) => r.name)).toEqual(["Alice", "Bob"]);
  });

  it("should correctly evaluate deeply nested groups", () => {
    const tree: QueryTree = {
      id: "root",
      type: "group",
      logic: "OR",
      children: [
        {
          id: "g1",
          type: "group",
          logic: "AND",
          children: [
            {
              id: "r1",
              type: "rule",
              field: "role",
              operator: "equals",
              value: "admin",
            },
            {
              id: "r2",
              type: "rule",
              field: "status",
              operator: "equals",
              value: "active",
            },
          ],
        },
        {
          id: "g2",
          type: "group",
          logic: "AND",
          children: [
            {
              id: "r3",
              type: "rule",
              field: "role",
              operator: "equals",
              value: "user",
            },
            {
              id: "r4",
              type: "rule",
              field: "age",
              operator: "greater_than",
              value: 30,
            },
          ],
        },
      ],
    };
    // Expected: (admin AND active) OR (user AND age > 30)
    // admin AND active = Alice
    // user AND age > 30 = Charlie
    const { results } = executeQuery(tree, mockData);
    expect(results).toHaveLength(2);
    expect(results.map((r) => r.name)).toEqual(["Alice", "Charlie"]);
  });

  it("should correctly handle numeric operators (greater_than, less_than)", () => {
    const tree: QueryTree = {
      id: "root",
      type: "group",
      logic: "AND",
      children: [
        {
          id: "r1",
          type: "rule",
          field: "age",
          operator: "greater_than",
          value: 25,
        },
        {
          id: "r2",
          type: "rule",
          field: "age",
          operator: "less_than",
          value: 35,
        },
      ],
    };
    const { results } = executeQuery(tree, mockData);
    expect(results).toHaveLength(2);
    expect(results.map((r) => r.name)).toEqual(["Alice", "Diana"]); // 30 and 28
  });

  it("should correctly handle contains and starts_with", () => {
    const tree: QueryTree = {
      id: "root",
      type: "group",
      logic: "OR",
      children: [
        {
          id: "r1",
          type: "rule",
          field: "name",
          operator: "contains",
          value: "li",
        },
        {
          id: "r2",
          type: "rule",
          field: "name",
          operator: "starts_with",
          value: "D",
        },
      ],
    };
    // contains 'li': Alice, Charlie
    // starts_with 'D': Diana
    const { results } = executeQuery(tree, mockData);
    expect(results).toHaveLength(3);
    expect(results.map((r) => r.name)).toEqual(["Alice", "Charlie", "Diana"]);
  });

  it("should correctly handle the 'in' operator", () => {
    const tree: QueryTree = {
      id: "root",
      type: "group",
      logic: "AND",
      children: [
        {
          id: "r1",
          type: "rule",
          field: "name",
          operator: "in",
          value: "alice, charlie",
        },
      ],
    };
    const { results } = executeQuery(tree, mockData);
    expect(results).toHaveLength(2);
    expect(results.map((r) => r.name)).toEqual(["Alice", "Charlie"]);
  });

  it("should correctly handle the 'between' operator", () => {
    const tree: QueryTree = {
      id: "root",
      type: "group",
      logic: "AND",
      children: [
        {
          id: "r1",
          type: "rule",
          field: "age",
          operator: "between",
          value: "25,30",
        },
      ],
    };
    const { results } = executeQuery(tree, mockData);
    expect(results).toHaveLength(3);
    expect(results.map((r) => r.name)).toEqual(["Alice", "Bob", "Diana"]); // 30, 25, 28
  });
});
