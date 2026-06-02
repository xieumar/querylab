import { Database, Copy } from "lucide-react";

export function StepsSection() {
  return (
    <section className="w-full py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Build Your Query in Minutes
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Create standout visual queries in just a few simple steps—quick,
            easy, and robust.
          </p>
        </div>

        <div className="flex flex-col gap-24">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-full max-w-sm aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-inner flex items-center justify-center relative">
                <div className="absolute top-4 left-4 bg-white dark:bg-zinc-950 p-3 rounded-lg shadow border border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                  <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs font-mono">schema.json loaded</span>
                </div>
                <Database className="w-32 h-32 text-zinc-300 dark:text-zinc-700" />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl font-bold text-xl mb-2">
                1
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">
                Define Your Schema
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Start by providing the fields, types, and acceptable values for
                your dataset. Our engine automatically tailors the operator
                dropdowns and input fields to match your strict types.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-full max-w-sm aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-inner flex items-center justify-center relative">
                <div className="w-full flex flex-col gap-3">
                  <div className="h-10 w-full bg-white dark:bg-zinc-950 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center px-4">
                    <span className="w-16 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
                  </div>
                  <div className="h-10 w-5/6 bg-white dark:bg-zinc-950 rounded-lg shadow-sm border border-primary/50 flex items-center px-4 translate-x-4 border-l-4 border-l-primary">
                    <span className="w-24 h-2 bg-primary/40 rounded-full" />
                  </div>
                  <div className="h-10 w-full bg-white dark:bg-zinc-950 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center px-4">
                    <span className="w-12 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl font-bold text-xl mb-2">
                2
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">
                Drag, Drop & Nest
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Build advanced logic structures visually. Reorder rules
                instantly with drag-and-drop, and toggle between AND/OR group
                logic with a single click.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-full max-w-sm aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-inner flex items-center justify-center relative">
                <div className="absolute inset-8 bg-zinc-950 rounded-xl shadow-2xl p-6 font-mono text-sm text-green-400 overflow-hidden flex flex-col gap-2">
                  <div className="flex justify-between items-center mb-2 border-b border-zinc-800 pb-2">
                    <span className="text-zinc-400">output.sql</span>
                    <Copy className="w-4 h-4 text-zinc-500" />
                  </div>
                  <p>SELECT * FROM table</p>
                  <p>WHERE (</p>
                  <p className="pl-4">status = &apos;active&apos;</p>
                  <p className="pl-4">AND age &gt; 18</p>
                  <p>)</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl font-bold text-xl mb-2">
                3
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">Export & Share</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Download your query state as JSON, copy the generated SQL string
                directly to your clipboard, or save it to your local history to
                resume later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
