import React from "react";
import { Group as GroupType } from "@/types";
import { useQueryStore } from "@/store";
import { Rule } from "./Rule";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ChevronDown, ChevronRight, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface GroupProps {
  group: GroupType;
  isRoot?: boolean;
}

export const Group = ({ group, isRoot = false }: GroupProps) => {
  const {
    addRule,
    addGroup,
    removeNode,
    updateGroupLogic,
    toggleGroupCollapse,
  } = useQueryStore();

  const handleAddRule = () => {
    // Add rule with defaults
    addRule(group.id, { field: "user_id", operator: "equals", value: "" });
  };

  const handleAddGroup = () => {
    addGroup(group.id, "AND");
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-lg p-4 border transition-colors relative",
        isRoot ? "bg-card border-border" : "bg-card/40 border-border/60 ml-4",
        group.isCollapsed ? "pb-4" : "pb-6"
      )}
    >
      {/* Decorative connecting line for nested groups */}
      {!isRoot && (
        <div className="absolute -left-4 top-0 bottom-0 w-px bg-border/60 -z-10" />
      )}
      {!isRoot && (
        <div className="absolute -left-4 top-8 w-4 h-px bg-border/60 -z-10" />
      )}

      {/* Group Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {!isRoot && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
              onClick={() => toggleGroupCollapse(group.id)}
            >
              {group.isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          )}

          <div className="flex items-center bg-background rounded-md border border-border p-0.5 shadow-sm">
            <button
              onClick={() => updateGroupLogic(group.id, "AND")}
              className={cn(
                "px-3 py-1 text-xs font-semibold rounded-sm transition-all",
                group.logic === "AND"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              AND
            </button>
            <button
              onClick={() => updateGroupLogic(group.id, "OR")}
              className={cn(
                "px-3 py-1 text-xs font-semibold rounded-sm transition-all",
                group.logic === "OR"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              OR
            </button>
          </div>

          <span className="text-xs text-muted-foreground ml-2 font-medium flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            {isRoot ? "GLOBAL GROUP" : "Nested Logic Block"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!group.isCollapsed && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddRule}
                className="h-8 text-xs bg-background"
              >
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Rule
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddGroup}
                className="h-8 text-xs bg-background"
              >
                <Layers className="h-3.5 w-3.5 mr-1" /> Add Group
              </Button>
            </>
          )}

          {!isRoot && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeNode(group.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Children */}
      {!group.isCollapsed && group.children.length > 0 && (
        <div className="flex flex-col gap-3 mt-2 pl-2">
          {group.children.map((node) => {
            if (node.type === "rule") {
              return <Rule key={node.id} rule={node} />;
            }
            if (node.type === "group") {
              return <Group key={node.id} group={node} />;
            }
            return null;
          })}
        </div>
      )}

      {/* Empty State / Add Buttons if collapsed/empty */}
      {!group.isCollapsed && group.children.length === 0 && (
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border/50 rounded-md bg-background/30 text-muted-foreground mt-2">
          <p className="text-sm mb-4">No rules in this group</p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={handleAddRule}>
              <Plus className="h-4 w-4 mr-1" /> Add Rule
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
