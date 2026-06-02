import Link from "next/link";
import { Database } from "lucide-react";
import { Button } from "../ui/button";
import { ShaderGridBackground } from "./ShaderGridBackground";

export function Footer() {
  return (
    <footer className="w-full flex flex-col">
      <div className="relative w-full bg-zinc-950 py-24 overflow-hidden border-t border-zinc-900">
        <ShaderGridBackground forceTheme="dark" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Start Building Complex Queries Today!
          </h2>
          <p className="text-zinc-400 max-w-lg text-lg">
            Say goodbye to syntax errors. Build, simulate, and export queries
            visually. Fast & hassle-free.
          </p>
          <Link href="/builder">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 mt-4 rounded-lg px-8 h-12 font-semibold"
            >
              Create my Query Now
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-4 w-full md:max-w-xs">
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <Database className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">QueryLab</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Build smart queries with ease.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 md:gap-24">
            {/* Links 1 */}
            <div className="flex flex-col gap-3 sm:items-end items-start">
              <h4 className="font-semibold text-sm">Product</h4>
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-x-1 inline-block"
              >
                Home
              </Link>
              <Link
                href="/templates"
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-x-1 inline-block"
              >
                Templates
              </Link>
              <Link
                href="/docs"
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-x-1 inline-block"
              >
                Documentation
              </Link>
            </div>

            {/* Links 2 */}
            <div className="flex flex-col gap-3 sm:items-end items-start">
              <h4 className="font-semibold text-sm">Company</h4>
              <Link
                href="/faq"
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-x-1 inline-block"
              >
                FAQ
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-x-1 inline-block"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-x-1 inline-block"
              >
                Terms of Service
              </Link>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-3 sm:items-end items-start">
              <h4 className="font-semibold text-sm">Connect</h4>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-x-1 inline-block"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-x-1 inline-block"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-x-1 inline-block"
              >
                Discord
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-900">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} QueryLab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
