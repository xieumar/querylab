"use client";

import { useQueryStore } from "../../store/useQueryStore";
import { Group } from "../query-builder/Group";
import { LivePreview } from "../query-builder/LivePreview";
import { ResultsInspector } from "../query-builder/ResultsInspector";
import { Sidebar } from "../query-builder/Sidebar";
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

import { useRef } from "react";
import { Button } from "../ui/button";
import { Download, Upload, Play } from "lucide-react";
import { parseQueryTree } from "../../lib/schema";

const restrictToVerticalAxis: Modifier = ({ transform }) => {
  return {
    ...transform,
    x: 0,
  };
};

export function QueryBuilderPage() {
  const { tree, reorderNode, importQuery, pushHistory } = useQueryStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleExport = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(tree, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "query_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const newTree = parseQueryTree(content);
        importQuery(newTree);
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("An error occurred");
        }
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black font-sans p-4 md:p-8">
      <main className="w-full max-w-7xl mx-auto flex flex-col gap-8 bg-white dark:bg-zinc-950 p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b pb-6 dark:border-zinc-800 gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              Visual Query Builder
            </h1>
            <p className="text-muted-foreground">
              Construct complex queries visually and preview the syntax in
              real-time.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept=".json"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImport}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" /> Import JSON
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
            <ThemeToggle />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar (Saved Queries & History) */}
          <div className="lg:col-span-3">
            <Sidebar />
          </div>

          {/* Builder and Preview */}
          <div className="lg:col-span-9 grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Column: Builder */}
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-medium text-foreground">Builder</h2>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <div className="flex flex-col gap-4">
                  <Group group={tree} isRoot />
                  <div className="flex justify-end mt-2">
                    <Button
                      onClick={() => pushHistory()}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                    >
                      <Play className="w-4 h-4 mr-2 fill-current" /> Run Query
                    </Button>
                  </div>
                </div>
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
        </div>

        <ResultsInspector />
      </main>
    </div>
  );
}
