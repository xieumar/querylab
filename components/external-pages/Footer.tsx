import Link from "next/link";
import { Database } from "lucide-react";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="w-full flex flex-col">
      {/* Dark CTA Section */}
      <div className="relative w-full bg-zinc-950 py-24 overflow-hidden border-t border-zinc-900">
        <div className="absolute inset-0 border-zinc-800 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center">
          <div className="relative w-full max-w-[1400px] h-full opacity-50">
            <div className="absolute top-[0rem] left-[8rem] w-[4rem] h-[8rem] bg-zinc-900" />
            <div className="absolute top-[4rem] left-[16rem] w-[12rem] h-[4rem] bg-zinc-900" />
            <div className="absolute bottom-[4rem] left-[12rem] w-[8rem] h-[8rem] bg-zinc-900" />

            <div className="absolute top-[0rem] right-[24rem] w-[8rem] h-[4rem] bg-zinc-900" />
            <div className="absolute top-[8rem] right-[8rem] w-[8rem] h-[8rem] bg-zinc-900" />
            <div className="absolute bottom-[0rem] right-[16rem] w-[4rem] h-[8rem] bg-zinc-900" />
          </div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Start Building Complex Queries Today!
          </h2>
          <p className="text-zinc-400 max-w-lg text-lg">
            Say goodbye to syntax errors. Build, simulate, and export queries
            visually—fast & hassle-free.
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

      {/* Light Links Section */}
      <div className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 md:col-span-1 lg:col-span-3">
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <Database className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">QueryLab</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              San Francisco, CA
              <br />
              hello@querylab.com
            </p>
          </div>

          {/* Links 1 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-sm">Product</h4>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/templates"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Templates
            </Link>
            <Link
              href="/docs"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Documentation
            </Link>
          </div>

          {/* Links 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-sm">Company</h4>
            <Link
              href="/faq"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              FAQ
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-sm">Connect</h4>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Discord
            </a>
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
