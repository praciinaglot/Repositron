

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface RepoSummary {
  files: Array<{
    path: string;
    language: string;
    dependencies: string[];
  }>;
  commands: {
    install: string | null;
    test: string | null;
    start: string | null;
  };
}

export default function SummaryPage() {
  const [repoSummary, setRepoSummary] = useState<RepoSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepoSummary = async () => {
      try {
        const response = await fetch("https://repositron.onrender.com/api/repo/summary");
        if (!response.ok) {
          throw new Error("Failed to fetch repository summary");
        }
        const data = await response.json();
        setRepoSummary(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRepoSummary();
  }, []);

  return (
    <main
      className="
        relative min-h-screen overflow-hidden text-white
        bg-gradient-to-br from-[#0B1020] via-[#0E1325] to-[#070A14]
      "
    >
      {/* Background (same as home) */}
      <div className="grid-bg" />
      <div className="grid-glow" />

      {/* Brand */}
      <div className="absolute top-6 left-8 z-20 text-2xl font-semibold">
        REPOSITRON
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-24">
        {/* Loading */}
        {loading && (
          <div className="text-gray-400 text-lg">
            Analyzing repository…
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-red-400">
            Error: {error}
          </div>
        )}

        {/* Content */}
        {repoSummary && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              Repository Summary
            </h1>

            <p className="text-gray-400 mb-12 max-w-3xl">
              Automatically generated overview of repository structure,
              technologies, and runnable commands.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              {/* LEFT COLUMN */}
              <div className="space-y-8">

                {/* Languages */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
                  <h2 className="text-lg font-semibold mb-4">
                    Programming Languages
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {[...new Set(repoSummary.files.map(f => f.language))].map(lang => (
                      <span
                        key={lang}
                        className="px-3 py-1 rounded-full text-xs
                          bg-purple-500/20 text-purple-300 border border-purple-400/20"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Commands */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
                  <h2 className="text-lg font-semibold mb-4">
                    Project Commands
                  </h2>
                  <div className="space-y-3 text-sm">
                    {repoSummary.commands.install && (
                      <div className="font-mono text-green-300">
                        $ {repoSummary.commands.install}
                      </div>
                    )}
                    {repoSummary.commands.test && (
                      <div className="font-mono text-yellow-300">
                        $ {repoSummary.commands.test}
                      </div>
                    )}
                    {repoSummary.commands.start && (
                      <div className="font-mono text-purple-300">
                        $ {repoSummary.commands.start}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
                <h2 className="text-lg font-semibold mb-4">
                  Files ({repoSummary.files.length})
                </h2>

                <div className="max-h-[420px] overflow-y-auto space-y-2 text-sm">
                  {repoSummary.files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center
                        px-3 py-2 rounded-lg bg-white/5"
                    >
                      <span className="text-gray-300 truncate">
                        {file.path}
                      </span>
                      <span className="text-xs text-gray-400 ml-4">
                        {file.language}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Back */}
            <div className="mt-12">
              <Link
                href="/"
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                ← Back to Home
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
