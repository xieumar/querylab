import { Database, Filter, Code2, Download } from "lucide-react";
import Image from "next/image";

export function FeaturesSection() {
  return (
    <section className="relative w-full bg-zinc-50 dark:bg-zinc-900/50 py-32 px-4 sm:px-6 lg:px-8 border-y border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto max-w-7xl flex flex-col items-center">
        <div className="text-center mb-5 md:mb-15">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Why Choose QueryLab?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Smart Features to Elevate Your Data Workflow
          </p>
        </div>

        <div className="relative w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
          <div className="hidden lg:flex w-full aspect-[16/10] bg-zinc-200 dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-300 dark:border-zinc-700 overflow-hidden relative z-10 flex-col">
            <div className="w-full h-10 bg-zinc-300 dark:bg-zinc-900 flex items-center px-4 gap-2 border-b border-zinc-400 dark:border-zinc-700 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="relative flex-1 w-full bg-white dark:bg-black">
              <Image
                src="/querybuilder-light.png"
                alt="QueryLab Visual Builder Interface Light"
                fill
                className="object-cover object-top dark:hidden"
                priority
              />
              <Image
                src="/querybuilder.png"
                alt="QueryLab Visual Builder Interface Dark"
                fill
                className="object-cover object-top hidden dark:block"
                priority
              />
            </div>
          </div>

          {/* Floating Cards (Outside the window, flowing out a bit) */}

          {/* Top Left */}
          <div className="hidden lg:flex absolute lg:-left-12 xl:-left-20 top-[10%] z-20 w-64 backdrop-blur-md bg-white/90 dark:bg-zinc-900/90 p-5 rounded-xl shadow-xl border border-zinc-200/50 dark:border-zinc-700/50 flex-col gap-3 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1">Schema-Driven</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connect your JSON schema and instantly get strict type checking
                and auto-completing dropdowns.
              </p>
            </div>
          </div>

          {/* Bottom Left */}
          <div className="hidden lg:flex absolute lg:-left-8 xl:-left-10 bottom-[10%] z-20 w-64 backdrop-blur-md bg-white/90 dark:bg-zinc-900/90 p-5 rounded-xl shadow-xl border border-zinc-200/50 dark:border-zinc-700/50 flex-col gap-3 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
              <Filter className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1">Infinite Nesting</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Drag and drop to create deeply nested AND/OR logical groupings
                effortlessly.
              </p>
            </div>
          </div>

          {/* Top Right */}
          <div className="hidden lg:flex absolute lg:-right-12 xl:-right-24 top-[20%] z-20 w-64 backdrop-blur-md bg-white/90 dark:bg-zinc-900/90 p-5 rounded-xl shadow-xl border border-zinc-200/50 dark:border-zinc-700/50 flex-col gap-3 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1">Easy Export</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Download your configurations in multiple formats or save to
                history to resume later.
              </p>
            </div>
          </div>

          {/* Bottom Right */}
          <div className="hidden lg:flex absolute lg:-right-8 xl:-right-16 bottom-[5%] z-20 w-64 backdrop-blur-md bg-white/90 dark:bg-zinc-900/90 p-5 rounded-xl shadow-xl border border-zinc-200/50 dark:border-zinc-700/50 flex-col gap-3 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1">Instant Output</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                View real-time syntax highlighting for SQL, MongoDB, and JSON
                configs as you build.
              </p>
            </div>
          </div>

          {/* Mobile Fallback layout for cards */}
          <div className="lg:hidden mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm mb-1">Schema-Driven</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Connect your JSON schema and instantly get strict type
                  checking and auto-completing dropdowns.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col gap-3">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
                <Filter className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm mb-1">Infinite Nesting</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Drag and drop to create deeply nested AND/OR logical groupings
                  effortlessly.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col gap-3">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm mb-1">Easy Export</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Download your configurations in multiple formats or save to
                  history to resume later.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col gap-3">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm mb-1">Instant Output</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  View real-time syntax highlighting for SQL, MongoDB, and JSON
                  configs as you build.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
