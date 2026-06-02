import React, { useState } from "react";
import { useQueryStore } from "../../store/useQueryStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Trash2, Save, History, Bookmark, Play } from "lucide-react";

export function Sidebar() {
  const { savedQueries, history, saveQuery, deleteSavedQuery, importQuery } =
    useQueryStore();
  const [saveName, setSaveName] = useState("");

  const handleSave = () => {
    if (!saveName.trim()) return;
    saveQuery(saveName.trim());
    setSaveName("");
  };

  return (
    <div className="flex flex-col w-full h-full gap-6 p-4 bg-white dark:bg-zinc-950 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
      {/* Saved Queries Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Bookmark className="w-5 h-5" />
          <h2>Saved Queries</h2>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Query name..."
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="h-9"
          />
          <Button onClick={handleSave} size="sm" className="h-9 px-3">
            <Save className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-2 mt-2 max-h-[300px] overflow-y-auto pr-1">
          {Object.entries(savedQueries).length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              No saved queries yet.
            </p>
          ) : (
            Object.entries(savedQueries).map(([name, savedTree]) => (
              <div
                key={name}
                className="flex items-center justify-between p-2 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 group transition-all hover:border-primary/30"
              >
                <button
                  onClick={() => importQuery(savedTree)}
                  className="flex-1 text-left text-sm font-medium truncate pr-2 hover:text-primary transition-colors"
                >
                  {name}
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteSavedQuery(name)}
                  className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>

      <hr className="border-zinc-100 dark:border-zinc-800" />

      {/* History Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <History className="w-5 h-5" />
          <h2>Recent History</h2>
        </div>

        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              No recent history.
            </p>
          ) : (
            history.map((entry) => {
              const date = new Date(entry.timestamp);
              const timeString = `${date.getHours()}:${String(
                date.getMinutes()
              ).padStart(2, "0")} ${date.toLocaleDateString()}`;

              return (
                <div
                  key={entry.id}
                  className="flex flex-col p-2 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {timeString}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => importQuery(entry.tree)}
                      className="h-6 px-2 text-xs text-primary hover:bg-primary/10"
                    >
                      <Play className="w-3 h-3 mr-1" /> Restore
                    </Button>
                  </div>
                  <div className="text-xs font-mono truncate text-zinc-500 dark:text-zinc-400 mt-1">
                    {entry.tree.children.length} rule(s)
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
