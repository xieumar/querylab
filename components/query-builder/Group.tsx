"use client";

import React from "react";
import { Group as GroupType } from "../../types";
import { useQueryStore } from "../../store/useQueryStore";
import { Rule } from "./Rule";
import { Button } from "../ui/button";
import { Plus, PlusCircle, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface GroupProps {
  group: GroupType;
  isRoot?: boolean;
}

export function Group({ group, isRoot = false }: GroupProps) {
  const { addRule, addGroup, removeNode, updateGroupLogic, toggleGroupCollapse } = useQueryStore();

  const handleAddRule = () => {
    addRule(group.id, {
      field: "id",
      operator: "equals",
      value: "",
    });
  };

  const handleAddGroup = () => {
    addGroup(group.id, "AND");
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border p-4 bg-background/50",
        isRoot ? "shadow-sm" : "ml-4 border-l-4 border-l-primary/20"
      )}
    >
      {/* Group Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => toggleGroupCollapse(group.id)}
          >
            {group.isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
               <ChevronDown className="h-4 w-4" />
            )}
          </Button>

          <div className="flex items-center rounded-md border p-0.5 bg-muted/50">
            <Button
              variant={group.logic === "AND" ? "default" : "ghost"}
              size="sm"
              className="h-7 px-3 text-xs"
              onClick={() => updateGroupLogic(group.id, "AND")}
            >
              AND
            </Button>
            <Button
              variant={group.logic === "OR" ? "default" : "ghost"}
              size="sm"
              className="h-7 px-3 text-xs"
              onClick={() => updateGroupLogic(group.id, "OR")}
            >
              OR
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleAddRule} className="h-8">
            <Plus className="mr-2 h-3 w-3" /> Rule
          </Button>
          <Button variant="outline" size="sm" onClick={handleAddGroup} className="h-8">
            <PlusCircle className="mr-2 h-3 w-3" /> Group
          </Button>
          {!isRoot && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeNode(group.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Group Children */}
      {!group.isCollapsed && (
        <div className="flex flex-col gap-3 pl-2">
          {group.children.length === 0 ? (
            <div className="text-sm text-muted-foreground italic py-2 pl-4 border-l-2 border-dashed">
              Empty group. Add a rule or nested group.
            </div>
          ) : (
            group.children.map((node) => {
              if (node.type === "rule") {
                return <Rule key={node.id} rule={node} />;
              }
              if (node.type === "group") {
                return <Group key={node.id} group={node} />;
              }
              return null;
            })
          )}
        </div>
      )}
    </div>
  );
}
