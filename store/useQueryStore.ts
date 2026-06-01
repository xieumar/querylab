import { create } from "zustand";
import { temporal } from "zundo";
import { QueryTree, Rule, Group, LogicOperator, QueryNode } from "../types";

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
  toggleGroupCollapse: (groupId: string) => void;
  reorderNode: (activeId: string, overId: string) => void;
}

const initialTree: QueryTree = {
  id: "root",
  type: "group",
  logic: "AND",
  children: [],
};

export const useQueryStore = create<QueryState>()(
  temporal((set) => ({
    tree: initialTree,

    addRule: (groupId, rule) =>
      set((state) => {
        const newRule: Rule = {
          ...rule,
          id: crypto.randomUUID(),
          type: "rule",
        };

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

    toggleGroupCollapse: (groupId) =>
      set((state) => {
        const recursivelyToggle = (node: Group): Group => {
          if (node.id === groupId) {
            return { ...node, isCollapsed: !node.isCollapsed };
          }
          return {
            ...node,
            children: node.children.map((child) =>
              child.type === "group" ? recursivelyToggle(child) : child
            ),
          };
        };

        return { tree: recursivelyToggle(state.tree) };
      }),

    reorderNode: (activeId: string, overId: string) =>
      set((state) => {
        // Deep clone the tree to mutate it safely
        const newTree = JSON.parse(JSON.stringify(state.tree));

        let activeParent: Group | null = null;
        let overParent: Group | null = null;

        const findParents = (group: Group) => {
          for (const child of group.children) {
            if (child.id === activeId) activeParent = group;
            if (child.id === overId) overParent = group;
            if (child.type === "group") findParents(child as Group);
          }
        };
        findParents(newTree);

        const aParent = activeParent as Group | null;
        const oParent = overParent as Group | null;

        if (!aParent || !oParent) return state;

        // Same group reorder
        if (aParent.id === oParent.id) {
          const oldIndex = aParent.children.findIndex(
            (c: QueryNode) => c.id === activeId
          );
          const newIndex = aParent.children.findIndex(
            (c: QueryNode) => c.id === overId
          );

          const [movedNode] = aParent.children.splice(oldIndex, 1);
          aParent.children.splice(newIndex, 0, movedNode);
        } else {
          // Cross-group move
          const oldIndex = aParent.children.findIndex(
            (c: QueryNode) => c.id === activeId
          );
          const newIndex = oParent.children.findIndex(
            (c: QueryNode) => c.id === overId
          );

          const [movedNode] = aParent.children.splice(oldIndex, 1);
          oParent.children.splice(newIndex, 0, movedNode);
        }

        return { tree: newTree };
      }),
  }))
);
