import { create } from "zustand";
import { QueryTree, Rule, Group, LogicOperator } from "../types";

interface QueryState {
  tree: QueryTree;
  addRule: (groupId: string, rule: Omit<Rule, "id" | "type">) => void;
  updateRule: (
    ruleId: string,
    updates: Partial<Omit<Rule, "id" | "type">>
  ) => void;
  removeNode: (nodeId: string) => void;
  addGroup: (parentId: string, logic: LogicOperator) => void;
  updateGroupLogic: (groupId: string, logic: LogicOperator) => void;
}

const initialTree: QueryTree = {
  id: "root",
  type: "group",
  logic: "AND",
  children: [],
};

export const useQueryStore = create<QueryState>((set) => ({
  tree: initialTree,

  addRule: (groupId, rule) =>
    set((state) => {
      const newRule: Rule = { ...rule, id: crypto.randomUUID(), type: "rule" };

      const recursivelyAdd = (node: Group): Group => {
        if (node.id === groupId) {
          return { ...node, children: [...node.children, newRule] };
        }
        return {
          ...node,
          children: node.children.map((child) =>
            child.type === "group" ? recursivelyAdd(child) : child
          ),
        };
      };

      return { tree: recursivelyAdd(state.tree) };
    }),

  updateRule: (ruleId, updates) =>
    set((state) => {
      const recursivelyUpdate = (node: Group): Group => {
        return {
          ...node,
          children: node.children.map((child) => {
            if (child.type === "rule" && child.id === ruleId) {
              return { ...child, ...updates };
            }
            if (child.type === "group") {
              return recursivelyUpdate(child);
            }
            return child;
          }),
        };
      };

      return { tree: recursivelyUpdate(state.tree) };
    }),

  removeNode: (nodeId) =>
    set((state) => {
      if (nodeId === "root") return state; // Cannot remove root

      const recursivelyRemove = (node: Group): Group => {
        return {
          ...node,
          children: node.children
            .filter((child) => child.id !== nodeId)
            .map((child) =>
              child.type === "group" ? recursivelyRemove(child) : child
            ),
        };
      };

      return { tree: recursivelyRemove(state.tree) };
    }),

  addGroup: (parentId, logic) =>
    set((state) => {
      const newGroup: Group = {
        id: crypto.randomUUID(),
        type: "group",
        logic,
        children: [],
      };

      const recursivelyAdd = (node: Group): Group => {
        if (node.id === parentId) {
          return { ...node, children: [...node.children, newGroup] };
        }
        return {
          ...node,
          children: node.children.map((child) =>
            child.type === "group" ? recursivelyAdd(child) : child
          ),
        };
      };

      return { tree: recursivelyAdd(state.tree) };
    }),

  updateGroupLogic: (groupId, logic) =>
    set((state) => {
      const recursivelyUpdate = (node: Group): Group => {
        if (node.id === groupId) {
          return { ...node, logic };
        }
        return {
          ...node,
          children: node.children.map((child) =>
            child.type === "group" ? recursivelyUpdate(child) : child
          ),
        };
      };

      return { tree: recursivelyUpdate(state.tree) };
    }),
}));
