"use client";

import React, { useMemo } from "react";
import { useQueryStore } from "../../store/useQueryStore";
import { useSchemaStore } from "../../store/useSchemaStore";
import { useDataStore } from "../../store/useDataStore";
import { executeQuery } from "../../lib/engine";
import { SearchX } from "lucide-react";

export function ResultsInspector() {
  const { tree } = useQueryStore();
  const { schema } = useSchemaStore();
  const { dataset } = useDataStore();

  const { results } = useMemo(() => {
    return executeQuery(tree, dataset);
  }, [tree, dataset]);

  return (
    <div className="flex flex-col gap-4 w-full border-zinc-200 dark:border-zinc-800 pt-8">
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-950 shadow-sm">
        <div className="overflow-x-auto">
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
              <SearchX className="h-10 w-10 mb-4 opacity-50" />
              <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                No results found
              </p>
              <p className="text-sm">Try adjusting your query conditions.</p>
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-muted-foreground">
                <tr>
                  {schema.map((field) => (
                    <th
                      key={field.name}
                      className="px-6 py-4 font-medium capitalize"
                    >
                      {field.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {results.map((row, i) => (
                  <tr
                    key={row.id || i}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors"
                  >
                    {schema.map((field) => {
                      const value = row[field.name];

                      // Special styling for status if it exists, for backward compatibility
                      if (field.name.toLowerCase() === "status") {
                        return (
                          <td key={field.name} className="px-6 py-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                                value === "active"
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                  : value === "inactive"
                                    ? "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              }`}
                            >
                              {String(value)}
                            </span>
                          </td>
                        );
                      }

                      return (
                        <td
                          key={field.name}
                          className={`px-6 py-4 ${field.name === "id" ? "font-mono text-xs" : ""}`}
                        >
                          {value !== undefined && value !== null
                            ? String(value)
                            : "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
