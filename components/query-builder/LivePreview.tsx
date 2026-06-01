"use client";

import React, { useMemo } from "react";
import { useQueryStore } from "../../store/useQueryStore";
import { generateSQL, generateMongo } from "../../lib/generators";

export function LivePreview() {
  const { tree } = useQueryStore();

  const sqlQuery = useMemo(() => generateSQL(tree), [tree]);
  const mongoQuery = useMemo(() => generateMongo(tree), [tree]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2 p-4 bg-zinc-950 text-zinc-50 rounded-xl shadow-inner border border-zinc-800 overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
          <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
            SQL Syntax
          </span>
        </div>
        <pre className="text-sm font-mono whitespace-pre-wrap break-all min-h-[60px]">
          {sqlQuery ? (
            <span className="text-emerald-400">{sqlQuery}</span>
          ) : (
            <span className="text-zinc-600 italic">
              SELECT * FROM table WHERE...
            </span>
          )}
        </pre>
      </div>

      <div className="flex flex-col gap-2 p-4 bg-zinc-950 text-zinc-50 rounded-xl shadow-inner border border-zinc-800 overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
          <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
            MongoDB Syntax
          </span>
        </div>
        <pre className="text-sm font-mono whitespace-pre-wrap min-h-[60px]">
          {mongoQuery ? (
            <span className="text-sky-400">
              {JSON.stringify(mongoQuery, null, 2)}
            </span>
          ) : (
            <span className="text-zinc-600 italic">{"{}"}</span>
          )}
        </pre>
      </div>
    </div>
  );
}
