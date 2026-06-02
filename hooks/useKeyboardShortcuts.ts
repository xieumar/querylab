"use client";

import { useEffect } from "react";
import { useQueryStore } from "../store/useQueryStore";

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo: Ctrl+Z or Cmd+Z
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const temporal = (useQueryStore as any).temporal?.getState();
        if (temporal && temporal.pastStates.length > 0) {
          temporal.undo();
        }
      }

      // Redo: Ctrl+Shift+Z or Cmd+Shift+Z
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const temporal = (useQueryStore as any).temporal?.getState();
        if (temporal && temporal.futureStates.length > 0) {
          temporal.redo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}
