"use client";

import { useQueryStore } from "../store/useQueryStore";
import { Group } from "../components/query-builder/Group";
import { LivePreview } from "../components/query-builder/LivePreview";

export default function Home() {
  const { tree } = useQueryStore();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black font-sans p-4 md:p-8">
      <main className="w-full max-w-7xl mx-auto flex flex-col gap-8 bg-white dark:bg-zinc-950 p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col gap-2 border-b pb-6 dark:border-zinc-800">
          <h1 className="text-3xl font-semibold tracking-tight">
            Visual Query Builder
          </h1>
          <p className="text-muted-foreground">
            Construct complex queries visually and preview the syntax in
            real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Builder */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-medium text-foreground">Builder</h2>
            <Group group={tree} isRoot />
          </div>

          {/* Right Column: Live Preview */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-medium text-foreground">
              Live Syntax Preview
            </h2>
            <div className="sticky top-8">
              <LivePreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
