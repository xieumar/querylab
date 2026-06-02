"use client";

import { Button } from "@/components/ui/button";
import { useQueryStore } from "@/store/useQueryStore";
import { useSchemaStore } from "@/store/useSchemaStore";
import { mockUsersSchema, mockProductsSchema } from "@/lib/mockSchemas";
import { useRouter } from "next/navigation";
import { Database, Filter, Layers } from "lucide-react";
import { QueryTree, FieldSchema } from "@/types";

type Template = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  schema: FieldSchema[];
  query: QueryTree;
};

const TEMPLATES: Template[] = [
  {
    id: "active-admin",
    title: "Active Admins",
    description: "Finds all active administrators created in the last 30 days.",
    icon: <Database className="w-6 h-6 text-blue-500" />,
    schema: mockUsersSchema,
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
    description: "Filters for available electronics priced over $500.",
    icon: <Filter className="w-6 h-6 text-emerald-500" />,
    schema: mockProductsSchema,
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
          field: "isAvailable",
          operator: "equals",
          value: "true",
        },
        {
          id: "3",
          type: "rule",
          field: "price",
          operator: "greater_than",
          value: 500,
        },
      ],
    },
  },
  {
    id: "complex-user-filter",
    title: "Complex User Filter",
    description:
      "Nested logical groups finding pending viewers or inactive editors.",
    icon: <Layers className="w-6 h-6 text-indigo-500" />,
    schema: mockUsersSchema,
    query: {
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
        {
          id: "g2",
          type: "group",
          logic: "AND",
          children: [
            {
              id: "3",
              type: "rule",
              field: "role",
              operator: "equals",
              value: "editor",
            },
            {
              id: "4",
              type: "rule",
              field: "status",
              operator: "equals",
              value: "inactive",
            },
          ],
        },
      ],
    },
  },
];

export function TemplatesPage() {
  const router = useRouter();
  const importQuery = useQueryStore((state) => state.importQuery);
  const setSchema = useSchemaStore((state) => state.setSchema);

  const handleUseTemplate = (template: Template) => {
    setSchema(template.schema);
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
              <div>
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center mb-6">
                  {template.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{template.title}</h3>
                <p className="text-muted-foreground mb-8">
                  {template.description}
                </p>
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
