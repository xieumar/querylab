"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function StepsSection() {
  return (
    <section className="w-full py-32 px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-5 md:mb-15"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Build Your Query in Minutes
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Create standout visual queries in just a few simple steps. Quick,
            easy, and robust.
          </p>
        </motion.div>

        <div className="flex flex-col gap-24">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 overflow-hidden py-4">
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-full max-w-sm aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-inner overflow-hidden relative">
                <Image
                  src="/schema-light.png"
                  alt="Schema Definition Light"
                  fill
                  className="object-contain p-6 dark:hidden"
                />
                <Image
                  src="/schema.png"
                  alt="Schema Definition Dark"
                  fill
                  className="object-contain p-6 hidden dark:block"
                />
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
            >
              <div className="w-full max-w-sm flex flex-col gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl font-bold text-xl mb-2">
                  1
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Define Your Schema
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Start by providing the fields, types, and acceptable values
                  for your dataset. Our engine automatically tailors the
                  operator dropdowns and input fields to match your strict
                  types.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24 overflow-hidden py-4">
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-full max-w-sm aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-inner overflow-hidden relative">
                <Image
                  src="/nesting-light.png"
                  alt="Visual Nesting Light"
                  fill
                  className="object-contain p-6 dark:hidden"
                />
                <Image
                  src="/nesting.png"
                  alt="Visual Nesting Dark"
                  fill
                  className="object-contain p-6 hidden dark:block"
                />
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
            >
              <div className="w-full max-w-sm flex flex-col gap-4">
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
            </motion.div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 overflow-hidden py-4">
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-full max-w-sm aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-inner overflow-hidden relative">
                <Image
                  src="/syntax-light.png"
                  alt="SQL Export Light"
                  fill
                  className="object-contain p-6 dark:hidden"
                />
                <Image
                  src="/syntax.png"
                  alt="SQL Export Dark"
                  fill
                  className="object-contain p-6 hidden dark:block"
                />
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
            >
              <div className="w-full max-w-sm flex flex-col gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl font-bold text-xl mb-2">
                  3
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Export & Share
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Download your query state as JSON, copy the generated SQL
                  string directly to your clipboard, or save it to your local
                  history to resume later.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
