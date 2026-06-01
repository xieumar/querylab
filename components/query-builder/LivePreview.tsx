"use client";

import React, { useMemo } from "react";
import { useQueryStore } from "../../store/useQueryStore";
import { generateSQL, generateMongo } from "../../lib/generators";

import { useTheme } from "next-themes";
import { Highlight, themes } from "prism-react-renderer";

export function LivePreview() {
  const { tree } = useQueryStore();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const sqlQuery = useMemo(() => generateSQL(tree), [tree]);
  const mongoQuery = useMemo(() => generateMongo(tree), [tree]);

  const syntaxTheme =
    resolvedTheme === "dark" ? themes.vsDark : themes.github || themes.vsLight;

  if (!mounted) {
    return (
      <div className="animate-pulse h-[250px] w-full bg-zinc-100 dark:bg-zinc-900 rounded-xl" />
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2 p-4 bg-zinc-50 dark:bg-[#1E1E1E] text-zinc-900 dark:text-zinc-50 rounded-xl shadow-inner border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-2">
          <span className="text-xs font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
            SQL Syntax
          </span>
        </div>
        <Highlight
          theme={syntaxTheme}
          code={sqlQuery || "SELECT * FROM table WHERE..."}
          language="sql"
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className="text-sm font-mono whitespace-pre-wrap break-all min-h-[60px]"
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>

      <div className="flex flex-col gap-2 p-4 bg-zinc-50 dark:bg-[#1E1E1E] text-zinc-900 dark:text-zinc-50 rounded-xl shadow-inner border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-2">
          <span className="text-xs font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
            MongoDB Syntax
          </span>
        </div>
        <Highlight
          theme={syntaxTheme}
          code={mongoQuery ? JSON.stringify(mongoQuery, null, 2) : "{}"}
          language="json"
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className="text-sm font-mono whitespace-pre-wrap min-h-[60px]"
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
