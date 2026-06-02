import { describe, it, expect, beforeEach } from "vitest";
import { useQueryStore } from "./useQueryStore";

describe("useQueryStore", () => {
  beforeEach(() => {
    // Reset the store before each test
    useQueryStore.setState({
      tree: {
        id: "root",
        type: "group",
        logic: "AND",
        children: [],
      },
      savedQueries: {},
      history: [],
    });
  });

  it("should have the correct initial state", () => {
    const state = useQueryStore.getState();
    expect(state.tree.id).toBe("root");
    expect(state.tree.type).toBe("group");
    expect(state.tree.logic).toBe("AND");
    expect(state.tree.children).toHaveLength(0);
  });

  it("should add a rule to the root group", () => {
    const store = useQueryStore.getState();
    store.addRule("root", {
      field: "age",
      operator: "greater_than",
      value: 18,
    });

    const newState = useQueryStore.getState();
    expect(newState.tree.children).toHaveLength(1);

    const newRule = newState.tree.children[0];
    expect(newRule.type).toBe("rule");
    if (newRule.type === "rule") {
      expect(newRule.field).toBe("age");
      expect(newRule.operator).toBe("greater_than");
      expect(newRule.value).toBe(18);
      expect(newRule.id).toBeDefined();
    }
  });

  it("should update an existing rule", () => {
    const store = useQueryStore.getState();
    store.addRule("root", {
      field: "status",
      operator: "equals",
      value: "active",
    });

    const ruleId = useQueryStore.getState().tree.children[0].id;

    useQueryStore.getState().updateRule(ruleId, {
      value: "inactive",
    });

    const updatedRule = useQueryStore.getState().tree.children[0];
    if (updatedRule.type === "rule") {
      expect(updatedRule.value).toBe("inactive");
      expect(updatedRule.field).toBe("status"); // unchanged
    }
  });

  it("should remove a node", () => {
    const store = useQueryStore.getState();
    store.addRule("root", {
      field: "name",
      operator: "contains",
      value: "John",
    });

    expect(useQueryStore.getState().tree.children).toHaveLength(1);
    const ruleId = useQueryStore.getState().tree.children[0].id;

    useQueryStore.getState().removeNode(ruleId);
    expect(useQueryStore.getState().tree.children).toHaveLength(0);
  });

  it("should add a nested group", () => {
    const store = useQueryStore.getState();
    store.addGroup("root", "OR");

    const newState = useQueryStore.getState();
    expect(newState.tree.children).toHaveLength(1);

    const newGroup = newState.tree.children[0];
    expect(newGroup.type).toBe("group");
    if (newGroup.type === "group") {
      expect(newGroup.logic).toBe("OR");
      expect(newGroup.children).toHaveLength(0);
    }
  });

  it("should add a rule to a nested group", () => {
    const store = useQueryStore.getState();
    store.addGroup("root", "OR");

    const groupId = useQueryStore.getState().tree.children[0].id;

    useQueryStore.getState().addRule(groupId, {
      field: "country",
      operator: "equals",
      value: "USA",
    });

    const group = useQueryStore.getState().tree.children[0];
    if (group.type === "group") {
      expect(group.children).toHaveLength(1);
      const rule = group.children[0];
      if (rule.type === "rule") {
        expect(rule.field).toBe("country");
      }
    }
  });

  it("should update group logic", () => {
    const store = useQueryStore.getState();
    store.addGroup("root", "OR");

    const groupId = useQueryStore.getState().tree.children[0].id;

    useQueryStore.getState().updateGroupLogic(groupId, "AND");

    const group = useQueryStore.getState().tree.children[0];
    if (group.type === "group") {
      expect(group.logic).toBe("AND");
    }
  });

  it("should handle pushing to history and maintaining limits", () => {
    // Push 15 items
    for (let i = 0; i < 15; i++) {
      useQueryStore.getState().pushHistory();
    }

    const newState = useQueryStore.getState();
    // Should cap at 10 items
    expect(newState.history).toHaveLength(10);
    // The timestamp should exist
    expect(newState.history[0].timestamp).toBeDefined();
  });

  it("should handle saving and deleting queries", () => {
    const store = useQueryStore.getState();

    store.saveQuery("My Custom Query");
    let newState = useQueryStore.getState();

    expect(newState.savedQueries["My Custom Query"]).toBeDefined();
    expect(newState.savedQueries["My Custom Query"].id).toBe("root");

    newState.deleteSavedQuery("My Custom Query");
    newState = useQueryStore.getState();

    expect(newState.savedQueries["My Custom Query"]).toBeUndefined();
  });
});
