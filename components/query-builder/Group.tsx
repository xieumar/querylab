"use client";

import React from "react";
import { Group as GroupType, LogicOperator } from "../../types";
import { useQueryStore } from "../../store/useQueryStore";
import { Rule } from "./Rule";
import { Button } from "../ui/button";
import { Plus, Trash2, FolderPlus, Play } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

interface GroupProps {
  group: GroupType;
  isRoot?: boolean;
  onRunQuery?: () => void;
}

export function Group({ group, isRoot = false, onRunQuery }: GroupProps) {
  const { addRule, addGroup, removeNode, updateGroupLogic } = useQueryStore();

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
    <div className={cn("relative flex flex-col w-full", !isRoot && "mt-2")}>
      <div
        className={cn(
          "relative flex flex-col gap-3",
          isRoot ? "" : "pl-12 border-l-[1.5px] border-primary/30 ml-4 py-2"
        )}
      >
        {/* Logic Badge (Hanging on the line) */}
        {!isRoot && (
          <div className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-950 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center">
            <Select
              value={group.logic}
              onValueChange={(val) => {
                if (val) updateGroupLogic(group.id, val as LogicOperator);
              }}
            >
              <SelectTrigger className="h-8 border-0 shadow-none focus:ring-0 text-xs font-semibold text-primary px-3 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AND" className="text-xs font-medium">
                  And
                </SelectItem>
                <SelectItem value="OR" className="text-xs font-medium">
                  Or
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {isRoot && (
          <div className="flex items-center gap-2 mb-2">
            <Select
              value={group.logic}
              onValueChange={(val) => {
                if (val) updateGroupLogic(group.id, val as LogicOperator);
              }}
            >
              <SelectTrigger className="w-[80px] h-9 text-sm font-semibold text-primary bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AND" className="font-medium">
                  And
                </SelectItem>
                <SelectItem value="OR" className="font-medium">
                  Or
                </SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground font-medium">
              matching rules
            </span>
          </div>
        )}

        {/* Group Children */}
        <div className="flex flex-col gap-3">
          {group.children.length === 0 ? (
            <div className="text-sm text-muted-foreground italic py-3 pl-4 border border-dashed rounded-lg bg-zinc-50/50 dark:bg-zinc-900/50">
              Empty group. Add a rule or nested group.
            </div>
          ) : (
            <SortableContext
              items={group.children.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {group.children.map((node) => (
                <SortableItem key={node.id} id={node.id}>
                  {node.type === "rule" ? (
                    <Rule rule={node} />
                  ) : (
                    <Group group={node} />
                  )}
                </SortableItem>
              ))}
            </SortableContext>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between mt-2 gap-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddRule}
              className="text-primary hover:text-primary hover:bg-primary/5 border-primary/20 h-9 font-medium"
            >
              <Plus className="mr-1.5 h-4 w-4" /> Add rule
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddGroup}
              className="text-primary hover:text-primary hover:bg-primary/5 border-primary/20 h-9 font-medium"
            >
              <FolderPlus className="mr-1.5 h-4 w-4" /> Add inner group
            </Button>
            {isRoot &&
              onRunQuery &&
              (() => {
                const hasValidRules = (node: GroupType): boolean => {
                  return node.children.some(
                    (child) =>
                      child.type === "rule" ||
                      (child.type === "group" &&
                        hasValidRules(child as GroupType))
                  );
                };
                const canRunQuery = hasValidRules(group);

                return (
                  <Button
                    size="sm"
                    onClick={onRunQuery}
                    disabled={!canRunQuery}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm h-9 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Play className="w-4 h-4 mr-2 fill-current" /> Run Query
                  </Button>
                );
              })()}
          </div>

          {!isRoot && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeNode(group.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
