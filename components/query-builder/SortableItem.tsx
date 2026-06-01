"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

export function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-2 animate-in fade-in slide-in-from-left-4 duration-300"
    >
      <div
        {...attributes}
        {...listeners}
        className="mt-3 cursor-grab opacity-40 hover:opacity-100 transition-opacity flex-shrink-0"
      >
        <GripVertical className="h-5 w-5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200" />
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
