import Link from "next/link";
import { Button } from "../components/ui/button";
import { ThemeToggle } from "../components/ThemeToggle";
import { Database } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">QueryFlow</h1>
        </div>
        <ThemeToggle />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Build Complex Queries <br />{" "}
          <span className="text-primary">Visually</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          The most powerful, schema-driven, drag-and-drop visual query builder.
          Convert your business logic into SQL or MongoDB instantly.
        </p>
        <Link href="/builder">
          <Button
            size="lg"
            className="px-10 h-14 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all"
          >
            Open Builder
          </Button>
        </Link>
      </main>
    </div>
  );
}
