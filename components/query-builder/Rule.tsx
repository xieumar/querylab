import React from "react";
import { Rule as RuleType, Operator } from "@/types";
import { useQueryStore } from "@/store";
import {
  mockSchema,
  getOperatorsForType,
  getDefaultOperatorForType,
  getDefaultValueForType,
} from "@/lib/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface RuleProps {
  rule: RuleType;
}

export const Rule = ({ rule }: RuleProps) => {
  const { updateRule, removeNode } = useQueryStore();
  const fieldSchema = mockSchema[rule.field];

  // Fallback in case field doesn't exist in schema somehow
  if (!fieldSchema) return null;

  const handleFieldChange = (field: string | null) => {
    if (!field) return;
    const schema = mockSchema[field];
    const operator = getDefaultOperatorForType(schema.type);
    const value = getDefaultValueForType(schema.type, operator, schema.options);
    updateRule(rule.id, { field, operator, value });
  };

  const handleOperatorChange = (operator: string | null) => {
    if (!operator) return;
    const value = getDefaultValueForType(
      fieldSchema.type,
      operator as Operator,
      fieldSchema.options
    );
    updateRule(rule.id, { operator: operator as Operator, value });
  };

  const handleValueChange = (value: unknown | null) => {
    if (value === null) return;
    updateRule(rule.id, { value });
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-md bg-card/50 border border-border/50 hover:border-border transition-colors">
      {/* Field Selector */}
      <Select value={rule.field} onValueChange={handleFieldChange}>
        <SelectTrigger className="w-[200px] bg-background">
          <SelectValue placeholder="Select field" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(mockSchema).map((key) => (
            <SelectItem key={key} value={key}>
              {mockSchema[key].name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Operator Selector */}
      <Select value={rule.operator} onValueChange={handleOperatorChange}>
        <SelectTrigger className="w-[150px] bg-background">
          <SelectValue placeholder="Select operator" />
        </SelectTrigger>
        <SelectContent>
          {getOperatorsForType(fieldSchema.type).map((op) => (
            <SelectItem key={op} value={op}>
              {op.replace(/_/g, " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Value Input */}
      {fieldSchema.type === "enum" && fieldSchema.options ? (
        <Select value={rule.value} onValueChange={handleValueChange}>
          <SelectTrigger className="w-[200px] bg-background">
            <SelectValue placeholder="Select value" />
          </SelectTrigger>
          <SelectContent>
            {fieldSchema.options.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : fieldSchema.type === "number" ? (
        <Input
          type="number"
          value={rule.value}
          onChange={(e) => handleValueChange(Number(e.target.value))}
          className="w-[200px] bg-background"
        />
      ) : fieldSchema.type === "date" ? (
        <Input
          type="date"
          value={rule.value}
          onChange={(e) => handleValueChange(e.target.value)}
          className="w-[200px] bg-background"
        />
      ) : (
        <Input
          type="text"
          value={rule.value}
          onChange={(e) => handleValueChange(e.target.value)}
          className="w-[200px] bg-background"
        />
      )}

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeNode(rule.id)}
        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors ml-auto"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
