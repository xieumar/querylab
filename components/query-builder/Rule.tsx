"use client";

import React, { useMemo } from "react";
import { useQueryStore } from "../../store/useQueryStore";
import { useSchemaStore } from "../../store/useSchemaStore";
import { Rule as RuleType, Operator } from "../../types";
import { getValidOperatorsForType, formatOperator } from "../../lib/operators";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface RuleProps {
  rule: RuleType;
}

export function Rule({ rule }: RuleProps) {
  const { updateRule, removeNode } = useQueryStore();
  const { schema } = useSchemaStore();

  const currentFieldSchema = useMemo(
    () => schema.find((f) => f.name === rule.field) || schema[0],
    [schema, rule.field]
  );

  const validOperators = useMemo(
    () => getValidOperatorsForType(currentFieldSchema?.type || "string"),
    [currentFieldSchema]
  );

  const handleFieldChange = (value: string | null) => {
    if (!value) return;
    const newFieldSchema = schema.find((f) => f.name === value);
    const newValidOperators = getValidOperatorsForType(
      newFieldSchema?.type || "string"
    );

    // Reset operator and value if they are no longer valid for the new field
    let newOperator = rule.operator;
    if (!newValidOperators.includes(rule.operator)) {
      newOperator = newValidOperators[0];
    }

    let newValue = rule.value;
    if (newFieldSchema?.type === "enum") {
      newValue = newFieldSchema.options?.[0] || "";
    } else if (newFieldSchema?.type === "number") {
      newValue = 0;
    } else {
      newValue = "";
    }

    updateRule(rule.id, {
      field: value,
      operator: newOperator,
      value: newValue,
    });
  };

  const handleOperatorChange = (value: string | null) => {
    if (!value) return;
    updateRule(rule.id, { operator: value as Operator });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    updateRule(rule.id, {
      value: currentFieldSchema?.type === "number" ? Number(val) : val,
    });
  };

  const renderValueInput = () => {
    if (currentFieldSchema?.type === "enum") {
      return (
        <Select
          value={String(rule.value)}
          onValueChange={(val) => {
            if (val !== null) updateRule(rule.id, { value: val });
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a value" />
          </SelectTrigger>
          <SelectContent>
            {currentFieldSchema.options?.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (currentFieldSchema?.type === "date") {
      return (
        <Input
          type="date"
          value={String(rule.value)}
          onChange={handleValueChange}
          className="w-[200px]"
        />
      );
    }

    return (
      <Input
        type={currentFieldSchema?.type === "number" ? "number" : "text"}
        value={rule.value}
        onChange={handleValueChange}
        placeholder="Value"
        className="w-[200px]"
      />
    );
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-card rounded-lg border shadow-sm">
      <Select value={rule.field} onValueChange={handleFieldChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select field" />
        </SelectTrigger>
        <SelectContent>
          {schema.map((field) => (
            <SelectItem key={field.name} value={field.name}>
              {field.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={rule.operator} onValueChange={handleOperatorChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select operator" />
        </SelectTrigger>
        <SelectContent>
          {validOperators.map((op) => (
            <SelectItem key={op} value={op}>
              {formatOperator(op)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {renderValueInput()}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeNode(rule.id)}
        className="ml-auto text-muted-foreground hover:text-destructive"
        aria-label="Remove rule"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
