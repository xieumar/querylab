"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useQueryStore } from "@/store/useQueryStore";
import { useSchemaStore } from "@/store/useSchemaStore";
import { useDataStore } from "@/store/useDataStore";
import { mockUsersSchema, mockProductsSchema } from "@/lib/mockSchemas";
import { mockUsers, mockProducts } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { Database, Filter, Layers } from "lucide-react";
import { QueryTree, FieldSchema, QueryNode } from "@/types";

type Template = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  schema: FieldSchema[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataset: any[];
  query: QueryTree;
};

const TEMPLATES: Template[] = [
  {
    id: "active-admin",
    title: "Active Admins",
    description: "Finds all active administrators created in the last 30 days.",
    icon: <Database className="w-6 h-6 text-blue-500" />,
    schema: mockUsersSchema,
    dataset: mockUsers,
    query: {
      id: "root",
      type: "group",
      logic: "AND",
      children: [
        {
          id: "1",
          type: "rule",
          field: "role",
          operator: "equals",
          value: "admin",
        },
        {
          id: "2",
          type: "rule",
          field: "status",
          operator: "equals",
          value: "active",
        },
      ],
    },
  },
  {
    id: "high-value-electronics",
    title: "High-Value Electronics",
    description: "Filters for electronics priced over $500.",
    icon: <Filter className="w-6 h-6 text-emerald-500" />,
    schema: mockProductsSchema,
    dataset: mockProducts,
    query: {
      id: "root",
      type: "group",
      logic: "AND",
      children: [
        {
          id: "1",
          type: "rule",
          field: "category",
          operator: "equals",
          value: "electronics",
        },
        {
          id: "2",
          type: "rule",
          field: "price",
          operator: "greater_than",
          value: 500,
        },
      ],
    },
  },
  {
    id: "pending-viewers",
    title: "Pending Viewers",
    description: "Finds users with the viewer role who are still pending.",
    icon: <Layers className="w-6 h-6 text-indigo-500" />,
    schema: mockUsersSchema,
    dataset: mockUsers,
    query: {
      id: "root",
      type: "group",
      logic: "AND",
      children: [
        {
          id: "1",
          type: "rule",
          field: "role",
          operator: "equals",
          value: "viewer",
        },
        {
          id: "2",
          type: "rule",
          field: "status",
          operator: "equals",
          value: "pending",
        },
      ],
    },
  },
  {
    id: "marketing-campaign",
    title: "Marketing Campaign Targets",
    description: "Identifies active users who haven't logged in recently.",
    icon: <Database className="w-6 h-6 text-purple-500" />,
    schema: mockUsersSchema,
    dataset: mockUsers,
    query: {
      id: "root",
      type: "group",
      logic: "AND",
      children: [
        {
          id: "1",
          type: "rule",
          field: "status",
          operator: "equals",
          value: "active",
        },
        {
          id: "2",
          type: "rule",
          field: "lastLogin",
          operator: "less_than",
          value: "2024-01-01",
        },
      ],
    },
  },
  {
    id: "low-stock-alerts",
    title: "Low Stock Alerts",
    description: "Finds products that are low in stock or out of stock.",
    icon: <Filter className="w-6 h-6 text-red-500" />,
    schema: mockProductsSchema,
    dataset: mockProducts,
    query: {
      id: "root",
      type: "group",
      logic: "OR",
      children: [
        {
          id: "1",
          type: "rule",
          field: "stockCount",
          operator: "less_than",
          value: 10,
        },
        {
          id: "2",
          type: "rule",
          field: "isAvailable",
          operator: "equals",
          value: "false",
        },
      ],
    },
  },
  {
    id: "premium-users",
    title: "Premium Users",
    description: "Filters users with high engagement or premium roles.",
    icon: <Layers className="w-6 h-6 text-amber-500" />,
    schema: mockUsersSchema,
    dataset: mockUsers,
    query: {
      id: "root",
      type: "group",
      logic: "OR",
      children: [
        {
          id: "1",
          type: "rule",
          field: "role",
          operator: "equals",
          value: "admin",
        },
        {
          id: "2",
          type: "rule",
          field: "age",
          operator: "greater_than",
          value: 30,
        },
      ],
    },
  },
];

function QueryPreview({ node }: { node: QueryNode }) {
  if (node.type === "rule") {
    const displayValue = String(node.value);
    const opDisplay = node.operator.replace(/_/g, " ");
    return (
      <div className="inline-flex items-center gap-1.5 text-[11px] bg-white dark:bg-zinc-800 px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-700 shadow-sm">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
          {node.field}
        </span>
        <span className="text-zinc-400 dark:text-zinc-500 font-mono text-[10px]">
          {opDisplay}
        </span>
        <span
          className="text-primary font-medium truncate max-w-[80px]"
          title={displayValue}
        >
          {displayValue}
        </span>
      </div>
    );
  }

  if (node.type === "group") {
    return (
      <div className="flex flex-wrap items-center gap-y-2 gap-x-1.5">
        {node.children.map((child: QueryNode, i: number) => (
          <React.Fragment key={child.id}>
            {child.type === "group" && (
              <span className="text-zinc-400 dark:text-zinc-500 text-lg leading-none">
                (
              </span>
            )}
            <QueryPreview node={child} />
            {child.type === "group" && (
              <span className="text-zinc-400 dark:text-zinc-500 text-lg leading-none">
                )
              </span>
            )}
            {i < node.children.length - 1 && (
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mx-0.5">
                {node.logic}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
  return null;
}

export function TemplatesPage() {
  const router = useRouter();
  const importQuery = useQueryStore((state) => state.importQuery);
  const setSchema = useSchemaStore((state) => state.setSchema);
  const setDataset = useDataStore((state) => state.setDataset);

  const handleUseTemplate = (template: Template) => {
    setSchema(template.schema);
    setDataset(template.dataset);
    importQuery(template.query);
    router.push("/builder");
  };

  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-900/50 py-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Query Templates
          </h1>
          <p className="text-lg text-muted-foreground">
            Get started quickly with these pre-built query templates. Click
            &quot;Use Template&quot; to load the configuration directly into the
            Query Builder and customize it to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-shadow hover:shadow-md"
            >
              <div className="flex-1 flex flex-col">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center mb-6">
                  {template.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{template.title}</h3>
                <p className="text-muted-foreground mb-6">
                  {template.description}
                </p>
                <div className="mb-8 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800/50 flex-1">
                  <h4 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                    Query Preview
                  </h4>
                  <QueryPreview node={template.query} />
                </div>
              </div>
              <Button
                onClick={() => handleUseTemplate(template)}
                className="w-full"
                variant="outline"
              >
                Use Template
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
