"use client";

import { useQueryStore } from "../store/useQueryStore";
import { Group } from "../components/query-builder/Group";

export default function Home() {
  const { tree } = useQueryStore();

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans min-h-screen p-8 dark:bg-black">
      <main className="w-full max-w-4xl flex flex-col gap-8 bg-white dark:bg-zinc-950 p-8 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">QueryBuilder Sandbox</h1>
          <p className="text-muted-foreground">This is a temporary playground to test Phase 3: Recursive Group Rendering.</p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium">Visual Query</h2>
          <Group group={tree} isRoot />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-medium mb-4">Zustand State Preview</h2>
          <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg text-sm overflow-auto text-zinc-800 dark:text-zinc-200 border">
            {JSON.stringify(tree, null, 2)}
          </pre>
        </div>
      </main>
    </div>
  );
}

