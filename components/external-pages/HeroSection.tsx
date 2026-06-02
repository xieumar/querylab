import Link from "next/link";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { ShaderGridBackground } from "./ShaderGridBackground";

export function HeroSection() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center px-6 py-8 lg:h-[550px] lg:py-0 overflow-hidden bg-white dark:bg-zinc-950">
      {/* WebGL Shader Background */}
      <ShaderGridBackground />

      {/* Static Grid Clusters */}
      <div className="absolute inset-0 overflow-hidden flex justify-center pointer-events-none">
        <div className="relative w-full max-w-[1400px] h-full">
          <div className="absolute top-[4rem] left-[8rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute top-[4rem] left-[12rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute top-[4rem] left-[16rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute top-[8rem] left-[12rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute top-[8rem] left-[16rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute top-[8rem] left-[24rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute top-[8rem] right-[12rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute top-[12rem] right-[12rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute top-[12rem] right-[16rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute top-[12rem] right-[20rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute top-[12rem] right-[24rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute bottom-[12rem] left-[16rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute bottom-[4rem] left-[20rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute bottom-[4rem] left-[24rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute bottom-[16rem] right-[8rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute bottom-[16rem] right-[12rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute bottom-[20rem] right-[8rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute bottom-[20rem] right-[12rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute bottom-[8rem] right-[16rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
          <div className="absolute bottom-[12rem] right-[16rem] w-[4rem] h-[4rem] bg-blue-50 dark:bg-blue-900/20" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto pointer-events-none">
        <div className="inline-flex items-center rounded-lg border border-primary bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 shadow-sm pointer-events-auto">
          <Sparkles className="w-4 h-4 mr-2" />
          Version 1.0
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 text-zinc-950 dark:text-white leading-[1.1] pointer-events-auto">
          Advanced Query Building
          <br className="hidden md:block" />
          Made Simple
        </h1>

        <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed pointer-events-auto">
          Our visual engine helps you craft complex SQL and MongoDB queries
          effortlessly.
        </p>

        <div className="relative z-50 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-4 pointer-events-auto">
          <Button
            nativeButton={false}
            render={<Link href="/docs" />}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-8 h-12 text-base rounded-lg border-primary text-primary font-semibold transition-all hover:bg-primary hover:text-white hover:scale-105 cursor-pointer"
          >
            Learn More
          </Button>

          <Button
            nativeButton={false}
            render={<Link href="/builder" />}
            size="lg"
            className="w-full sm:w-auto px-8 h-12 text-base rounded-lg font-semibold shadow-lg shadow-primary/20 transition-all hover:bg-transparent hover:border-primary hover:text-primary cursor-pointer"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
