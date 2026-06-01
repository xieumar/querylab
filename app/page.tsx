"use client";

import { useQueryStore } from "@/store";
import { Group } from "@/components/query-builder";

export default function Home() {
  const { tree } = useQueryStore();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Query Builder Test Sandbox
          </h1>
          <p className="text-muted-foreground">
            This is a temporary page to test the Group component and Zustand
            store.
          </p>
        </div>

        <div className="rounded-lg shadow-sm">
          <Group group={tree} isRoot={true} />
        </div>

        <div className="p-4 rounded-lg bg-black text-green-400 font-mono text-sm overflow-auto">
          <h3 className="text-white mb-2">Live Zustand State:</h3>
          <pre>{JSON.stringify(tree, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
