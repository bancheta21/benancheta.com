import Link from "next/link";

export default function Component() {
  return (
    <div className="min-h-screen bg-white text-black flex items-center">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-2xl font-normal mb-2">Ben Ancheta</h1>
        </header>

        {/* Main Content */}
        <main className="space-y-12">
          {/* About */}
          <section>
            <p className="text-base leading-relaxed mb-4">
              Currently providing liquidity to the job market @Sorce. Prev
              software @Google and consulting @BCG
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-lg font-normal mb-4">Contact</h2>
            <div className="space-y-1">
              <p>
                <Link
                  href="https://benanchetaiii.substack.com"
                  className="underline"
                >
                  Substack
                </Link>
              </p>
              <p>
                <Link href="https://x.com/benanchetaiii" className="underline">
                  X
                </Link>
              </p>
              <p>
                <Link
                  href="https://linkedin.com/in/bancheta21"
                  className="underline"
                >
                  LinkedIn
                </Link>
              </p>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-black">
          <p className="text-sm">© 2025</p>
        </footer>
      </div>
    </div>
  );
}
