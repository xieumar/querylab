"use client";

import { useQueryStore } from "../../store/useQueryStore";
import {
  useSchemaStore,
  inferSchemaFromDataset,
} from "../../store/useSchemaStore";
import { useDataStore } from "../../store/useDataStore";
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

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Download, Upload, Database, X } from "lucide-react";
import { parseQueryTree } from "../../lib/schema";
import Link from "next/link";
import { toast } from "sonner";

const restrictToVerticalAxis: Modifier = ({ transform }) => {
  return {
    ...transform,
    x: 0,
  };
};

export function QueryBuilderPage() {
  const { tree, reorderNode, importQuery, pushHistory } = useQueryStore();
  const { setSchema } = useSchemaStore();
  const { setDataset } = useDataStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
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
        const parsedJson = JSON.parse(content);
        let extractedDataset: any[] | null = null;

        if (Array.isArray(parsedJson)) {
          extractedDataset = parsedJson;
        } else if (
          parsedJson &&
          typeof parsedJson === "object" &&
          parsedJson.type !== "group" &&
          !parsedJson.logic
        ) {
          const arrayValues = Object.values(parsedJson).filter((v) =>
            Array.isArray(v)
          );
          if (arrayValues.length > 0) {
            extractedDataset = arrayValues[0] as any[];
          }
        }

        if (extractedDataset) {
          // Uploaded a custom dataset
          const newSchema = inferSchemaFromDataset(extractedDataset);
          setSchema(newSchema);
          setDataset(extractedDataset);

          // Clear current query to reset for new schema
          importQuery({
            id: "root",
            type: "group",
            logic: "AND",
            children: [],
          });

          toast.success(`Dataset loaded with ${extractedDataset.length} rows.`);
        } else {
          // Uploaded a query tree
          const newTree = parseQueryTree(content);
          importQuery(newTree);
          toast.success("Query imported successfully");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(`Import failed: ${error.message}`);
        } else {
          toast.error("An invalid or corrupt file was uploaded.");
        }
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 font-sans p-4 md:p-8">
      <main className="w-full mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 gap-4">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80 w-fit"
            >
              <Database className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">QueryLab</span>
            </Link>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold tracking-tight">
                Visual Query Builder
              </h1>
              <p className="text-muted-foreground">
                Construct complex queries visually and preview the syntax in
                real-time.
              </p>
            </div>
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
              onClick={() => fileInputRef.current?.click()}
              className="h-10 bg-white dark:bg-zinc-950 shadow-sm border-zinc-200 dark:border-zinc-800"
            >
              <Upload className="w-4 h-4 mr-2" /> Import JSON
            </Button>
            <Button
              variant="outline"
              onClick={handleExport}
              className="h-10 bg-white dark:bg-zinc-950 shadow-sm border-zinc-200 dark:border-zinc-800"
            >
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
            <div className="flex flex-col gap-4 min-w-0">
              <h2 className="text-lg font-medium text-foreground">Builder</h2>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <div className="flex flex-col gap-4">
                  <Group
                    group={tree}
                    isRoot
                    onRunQuery={() => {
                      pushHistory();
                      setIsResultsOpen(true);
                    }}
                  />
                </div>
              </DndContext>
            </div>

            {/* Right Column: Live Preview */}
            <div className="flex flex-col gap-4 min-w-0">
              <h2 className="text-lg font-medium text-foreground">
                Live Syntax Preview
              </h2>
              <LivePreview />
            </div>

            {/* Results Panel */}
            {isResultsOpen && (
              <div className="fixed inset-x-0 bottom-0 z-50 h-[40vh] bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-[0_-12px_40px_rgb(0,0,0,0.12)] flex flex-col rounded-t-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 shrink-0 bg-zinc-50 dark:bg-zinc-900">
                  <span className="font-semibold text-sm">Query Results</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setIsResultsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 lg:px-8 pb-8">
                  <ResultsInspector />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
