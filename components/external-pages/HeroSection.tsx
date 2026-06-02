import Link from "next/link";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center px-6 py-32 md:py-48 overflow-hidden bg-white dark:bg-zinc-950">
      {/* Strict Grid Background */}
      <div className="absolute inset-0 border-zinc-200 dark:border-zinc-800 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Grid Blocks (Snapped to 4rem / 64px grid) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center">
        <div className="relative w-full max-w-[1400px] h-full">
          {/* Top Left Cluster */}
          <div className="absolute top-[4rem] left-[8rem] w-[12rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute top-[8rem] left-[12rem] w-[8rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute top-[8rem] left-[24rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />

          {/* Top Right Cluster */}
          <div className="absolute top-[8rem] right-[12rem] w-[4rem] h-[8rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute top-[12rem] right-[16rem] w-[12rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />

          {/* Bottom Left Cluster */}
          <div className="absolute bottom-[12rem] left-[16rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute bottom-[4rem] left-[20rem] w-[8rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />

          {/* Bottom Right Cluster */}
          <div className="absolute bottom-[16rem] right-[8rem] w-[8rem] h-[8rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute bottom-[8rem] right-[16rem] w-[4rem] h-[8rem] bg-blue-50 dark:bg-blue-900/20" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-8">
        <div className="w-16 h-16 bg-zinc-950 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-zinc-950 dark:text-white leading-[1.1]">
          Build Complex Queries <br className="hidden md:block" />
          in Minutes Visually
        </h1>

        <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Our visual engine helps you craft complex SQL and MongoDB queries
          effortlessly.
        </p>

        <Link href="/builder">
          <Button
            size="lg"
            className="px-8 h-12 text-base rounded-lg bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all w-full sm:w-auto font-semibold"
          >
            Start Building for Free
          </Button>
        </Link>
      </div>
    </section>
  );
}
