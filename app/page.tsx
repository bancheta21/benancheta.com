import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="space-y-8">
          {/* Name */}
          <h1 className="text-2xl font-normal text-gray-900">Ben Ancheta</h1>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed max-w-lg">
            Currently providing liquidity to the job market @Sorce. Prev
            software @Google and consulting @BCG
          </p>

          {/* Contact Section */}
          <div className="space-y-4">
            <h2 className="text-gray-900 font-normal">Contact</h2>
            <div className="space-y-2">
              <div>
                <Link
                  href="https://benanchetaiii.substack.com/"
                  className="text-gray-700 underline hover:text-gray-900 transition-colors"
                >
                  Substack
                </Link>
              </div>
              <div>
                <Link
                  href="https://x.com/benanchetaiii"
                  className="text-gray-700 underline hover:text-gray-900 transition-colors"
                >
                  X
                </Link>
              </div>
              <div>
                <Link
                  href="https://www.linkedin.com/in/bancheta21/"
                  className="text-gray-700 underline hover:text-gray-900 transition-colors"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 pt-8 mt-16">
            <p className="text-gray-600 text-sm">© 2025</p>
          </div>
        </div>
      </div>

      {/* Logo in bottom left */}
      <div className="fixed bottom-6 left-6">
        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">N</span>
        </div>
      </div>
    </div>
  );
}
