export function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-white dark:bg-zinc-950 py-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-16 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            How we handle and protect your data at QueryLab.
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-4">
              1. Information Collection
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              QueryLab is a client-side tool. By default, your query schemas,
              rule structures, and application state are saved locally in your
              browser&apos;s LocalStorage. We do not transmit or store your data
              on our servers unless you explicitly choose to use a cloud-sync
              feature in the future.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Cookies and Tracking</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We may use essential cookies to maintain your session and
              preferences (such as dark mode). We use minimal, privacy-friendly
              analytics to understand basic usage patterns and improve the
              application. We do not sell your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Third-Party Services</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our application may link to or integrate with third-party
              services. Please note that these external sites have their own
              privacy policies. We do not accept any responsibility or liability
              for their policies or data processing.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
