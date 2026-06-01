"use client";

import { useQueryStore } from "../../store/useQueryStore";
import { Group } from "../query-builder/Group";
import { LivePreview } from "../query-builder/LivePreview";
import { ResultsInspector } from "../query-builder/ResultsInspector";
import { ThemeToggle } from "../ThemeToggle";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  Modifier,
} from "@dnd-kit/core";

const restrictToVerticalAxis: Modifier = ({ transform }) => {
  return {
    ...transform,
    x: 0,
  };
};

export function QueryBuilderPage() {
  const { tree, reorderNode } = useQueryStore();
  useKeyboardShortcuts();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderNode(active.id as string, over.id as string);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black font-sans p-4 md:p-8">
      <main className="w-full max-w-7xl mx-auto flex flex-col gap-8 bg-white dark:bg-zinc-950 p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-start justify-between border-b pb-6 dark:border-zinc-800">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              Visual Query Builder
            </h1>
            <p className="text-muted-foreground">
              Construct complex queries visually and preview the syntax in
              real-time.
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Builder */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-medium text-foreground">Builder</h2>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <Group group={tree} isRoot />
            </DndContext>
          </div>

          {/* Right Column: Live Preview */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-medium text-foreground">
              Live Syntax Preview
            </h2>
            <LivePreview />
          </div>
        </div>

        <ResultsInspector />
      </main>
    </div>
  );
}
