import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does QueryLab handle nested rules?",
    answer:
      "QueryLab uses a recursive tree architecture. You can nest groups indefinitely. Each group can have its own logical combinator (AND/OR), allowing you to build highly complex boolean logic like (A AND B) OR (C AND (D OR E)).",
  },
  {
    question: "Do I need to know SQL to use QueryLab?",
    answer:
      "Not at all! The visual drag-and-drop interface abstracts away syntax complexities. However, if you are familiar with SQL, you can view the live generated syntax to verify exactly what is being produced.",
  },
  {
    question: "How is my JSON Schema used?",
    answer:
      "Your JSON Schema is the source of truth for the builder. When you load a schema, QueryLab reads the field types (string, number, date, enum) and automatically restricts the available operators and input components to prevent invalid queries. For example, a 'number' field will not allow a 'contains' operator.",
  },
  {
    question: "Can I save my queries and come back later?",
    answer:
      "Yes! QueryLab saves your active query state directly to your browser's LocalStorage. When you reload the page, your exact rule tree will be restored automatically.",
  },
  {
    question: "What output formats are supported?",
    answer:
      "Currently, QueryLab natively generates ANSI SQL `WHERE` clauses and valid MongoDB JSON filter objects. You can also export the raw rule tree state as JSON.",
  },
  {
    question: "Is QueryLab open source?",
    answer:
      "QueryLab is an open-source project. We encourage community contributions, bug reports, and feature requests on our GitHub repository.",
  },
  {
    question: "Can I use my own UI components?",
    answer:
      "Absolutely! The core logic and state management are separated from the presentation layer. You can easily swap out the default Tailwind UI components with your own design system.",
  },
  {
    question: "Does it support dark mode?",
    answer:
      "Yes, QueryLab comes with built-in dark mode support. It automatically detects your system preferences and allows manual toggling for a seamless experience.",
  },
  {
    question: "How does the schema validation work?",
    answer:
      "Validation happens in real-time as you build the query. If a rule violates the schema (for example, entering a string into a number field), QueryLab highlights the error and prevents exporting invalid queries.",
  },
];

export function FAQPage() {
  return (
    <div className="w-full bg-white dark:bg-zinc-950 py-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-16 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Get clarity on how QueryLab works under the hood.
          </p>
        </div>

        <div className="w-full">
          <Accordion className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="py-2">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
