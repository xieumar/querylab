export function TermsOfServicePage() {
  return (
    <div className="w-full bg-white dark:bg-zinc-950 py-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-16 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground">
            The rules and guidelines for using QueryLab.
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              By accessing and using QueryLab, you agree to be bound by these
              Terms of Service. If you do not agree with any part of these
              terms, you are prohibited from using the tool.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              QueryLab is provided as an open-source project. You are granted a
              license to use, modify, and distribute the software in accordance
              with its open-source license. However, you may not use the service
              for any illegal or unauthorized purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              3. Disclaimer of Warranties
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The application is provided &quot;as is&quot;, without warranty of
              any kind, express or implied. In no event shall the authors or
              copyright holders be liable for any claim, damages, or other
              liability arising from, out of, or in connection with the software
              or the use of other dealings in the software.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
