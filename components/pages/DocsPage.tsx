import { CheckCircle2 } from "lucide-react";

export function DocsPage() {
  return (
    <div className="w-full bg-white dark:bg-zinc-950 py-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-16 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Documentation
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know to build powerful queries with QueryLab.
          </p>
        </div>

        <div className="space-y-16">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Core Concepts</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
              QueryLab is built around a recursive tree architecture. Every
              query starts with a <strong>Root Group</strong>. A group can
              contain multiple <strong>Rules</strong> or even other{" "}
              <strong>Groups</strong> (nested groups).
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <strong className="block text-foreground mb-1">
                    Rule Group
                  </strong>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    A container that holds rules and determines how they are
                    combined logically (using either &quot;AND&quot; or
                    &quot;OR&quot;).
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <strong className="block text-foreground mb-1">Rule</strong>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    A single condition consisting of a <strong>Field</strong>{" "}
                    (e.g., &quot;age&quot;), an <strong>Operator</strong> (e.g.,
                    &quot;&gt;&quot;), and a <strong>Value</strong> (e.g.,
                    &quot;18&quot;).
                  </span>
                </div>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              2. Schema-Driven Architecture
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
              Unlike basic query builders, QueryLab strictly adheres to a
              predefined JSON schema. This means:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400 mb-6">
              <li>
                Fields are automatically populated from your schema definitions.
              </li>
              <li>
                Operators dynamically change based on the field&apos;s data type
                (e.g., only &quot;string&quot; fields get the
                &quot;contains&quot; operator).
              </li>
              <li>
                Input components adapt intelligently (e.g., date pickers for
                &quot;date&quot; fields, dropdowns for &quot;enum&quot; fields).
              </li>
            </ul>
            <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg font-mono text-sm text-zinc-800 dark:text-zinc-300 overflow-x-auto">
              {`// Example Schema Definition
const userSchema = [
  { name: "age", type: "number" },
  { name: "role", type: "enum", options: ["admin", "user"] }
];`}
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Exporting Queries</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
              Once you have built your query tree visually, QueryLab parses it
              instantly into multiple formats.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-white dark:bg-zinc-950">
                <h3 className="font-bold text-lg mb-2">SQL Output</h3>
                <p className="text-sm text-zinc-500 mb-4">
                  Generates standard ANSI SQL &quot;WHERE&quot; clauses,
                  wrapping nested groups in parentheses automatically to
                  preserve logical order of operations.
                </p>
              </div>
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-white dark:bg-zinc-950">
                <h3 className="font-bold text-lg mb-2">MongoDB Output</h3>
                <p className="text-sm text-zinc-500 mb-4">
                  Outputs valid MongoDB JSON filter objects using standard query
                  operators like &quot;$and&quot;, &quot;$or&quot;,
                  &quot;$eq&quot;, &quot;$gt&quot;, etc.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
