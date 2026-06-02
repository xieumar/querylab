"use client";

import React, { useMemo } from "react";
import { useQueryStore } from "../../store/useQueryStore";
import { executeQuery } from "../../lib/engine";
import { mockUsers } from "../../lib/mockData";
import { SearchX } from "lucide-react";

export function ResultsInspector() {
  const { tree } = useQueryStore();

  const { results } = useMemo(() => {
    return executeQuery(tree, mockUsers);
  }, [tree]);

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
                  <th className="px-6 py-4 font-medium">ID</th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Age</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {results.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs">{row.id}</td>
                    <td className="px-6 py-4 font-medium">
                      {row.firstName} {row.lastName}
                    </td>
                    <td className="px-6 py-4">{row.age}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {row.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize">{row.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          row.status === "active"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : row.status === "inactive"
                              ? "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
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
