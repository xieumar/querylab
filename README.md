# QueryLab

QueryLab is a highly interactive, visual query builder that allows users to construct complex database and API queries through a polished, graphical interface instead of writing raw query syntax manually.

Built with modern web technologies, it features a robust rules engine, schema-driven rendering, infinite nesting capabilities, and real-time SQL generation.

![QueryLab Preview](/public/querybuilder-light.png)

## Key Features

- **Visual Query Construction:** Create complex filters without writing a single line of SQL or JSON logic.
- **Infinite Logic Nesting:** Group rules with AND/OR logic and nest them infinitely to express advanced, multi-layered conditions.
- **Schema-Driven UI:** Upload a custom JSON dataset or define a schema, and the UI automatically adapts. Text fields, number fields, and booleans get their own tailored operators and inputs.
- **Real-Time SQL Preview:** See the generated SQL `WHERE` clause update in real-time as you construct your visual query.
- **Drag & Drop Reordering:** Easily move rules and logic groups around within your tree structure using buttery smooth drag-and-drop interactions.
- **Import/Export State:** Save your query trees locally, export them as JSON, or upload raw datasets to have QueryLab auto-infer the data schema.
- **Undo / Redo History:** Robust state management means you can always jump back and forth in your edit history without losing work.
- **Premium UI & Animations:** Built with Radix primitives, shadcn/ui components, and Framer Motion for a deeply satisfying, responsive user experience.

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) & [Zundo](https://github.com/charkour/zundo) (for time-travel debugging)
- **Drag and Drop:** [@dnd-kit/core](https://dndkit.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

You need [Node.js](https://nodejs.org/) installed on your machine. We recommend using `pnpm` as your package manager.

```bash
npm install -g pnpm
```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/querylab.git
   cd querylab
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `/app` - Next.js App Router pages and layout files.
  - `/(external)` - Landing page, templates, docs, etc.
  - `/builder` - The main Visual Query Builder application route.
- `/components` - React components.
  - `/external-pages` - Components for the landing page (Hero, Features, Footer).
  - `/query-builder` - Core query builder components (Group, Rule, Sidebar, LivePreview).
  - `/ui` - Reusable UI components powered by shadcn/ui.
- `/lib` - Core logic, schema inference, SQL generators, and mock data.
- `/store` - Zustand global state managers (`useQueryStore.ts`, `useSchemaStore.ts`, `useDataStore.ts`).

## Testing

This project uses [Vitest](https://vitest.dev/) and React Testing Library to ensure the query generation engine and UI interactions function properly.

To run the test suite:

```bash
pnpm test
```

## License

Distributed under the MIT License. See `LICENSE` for more information.
