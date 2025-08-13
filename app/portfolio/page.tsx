import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="space-y-8">
          {/* Header */}
          <h1 className="text-2xl font-normal text-gray-900">Investments</h1>

          {/* Portfolio Companies */}
          <div className="space-y-6 text-gray-700">
            <div>
              <p className="font-medium">Sorce</p>
              <p className="text-sm">Stage: Pre-seed</p>
              <p className="text-sm">Building liquidity to the job market</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <div>
              <Link
                href="/"
                className="text-gray-700 underline hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 pt-8 mt-16">
            <p className="text-gray-600 text-sm">© 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
