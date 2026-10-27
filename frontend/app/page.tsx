
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PipelineOverlay from "../components/PipelineOverlay";

type PipelineState = "idle" | "running" | "completed";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [pipelineState, setPipelineState] =
    useState<PipelineState>("idle");

  const router = useRouter();

  // 🔹 RESTORE STATE WHEN COMING BACK FROM SUMMARY / SETUP
  useEffect(() => {
  const savedPipelineState = localStorage.getItem("pipelineState");

  if (savedPipelineState === "completed") {
    const savedRepoUrl = localStorage.getItem("repoUrl");
    if (savedRepoUrl) {
      setRepoUrl(savedRepoUrl);
    }
    setPipelineState("completed");
  }
}, []);


  // 🔹 START PIPELINE
  const startPipeline = async () => {
    if (!repoUrl) return;

    setPipelineState("running");

    localStorage.setItem("repoUrl", repoUrl);
    localStorage.setItem("pipelineState", "running");

    try {
      await fetch("https://repositron.onrender.com/api/pipeline/start", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    repoUrl,
    mode: "analyze-setup"
  })
});
    } catch (err) {
      console.error("Pipeline start failed", err);
    }
  };

  // 🔹 PIPELINE COMPLETED
  const onPipelineComplete = () => {
    setPipelineState("completed");
    localStorage.setItem("pipelineState", "completed");
  };

  // 🔹 RESET FOR NEW ANALYSIS
  const resetAll = () => {
    localStorage.removeItem("pipelineState");
    localStorage.removeItem("repoUrl");
    setRepoUrl("");
    setPipelineState("idle");
  };

  return (
    <main
      className="
        relative min-h-screen overflow-hidden text-white
        bg-gradient-to-br from-[#0B1020] via-[#0E1325] to-[#070A14]
      "
    >
      {/* BACKGROUND */}
      <div className="grid-bg" />
      <div className="grid-glow" />

      {/* BRAND */}
      <div className="absolute top-6 left-8 z-20 text-2xl font-semibold">
        REPOSITRON
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

          {/* LEFT SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              One-click onboarding for <br />
              <span className="text-purple-400">
                any GitHub repository
              </span>
            </h1>

            <p className="text-gray-400 text-lg mb-8 max-w-xl">
              Repositron clones your repository, analyzes its architecture,
              and generates a complete setup guide — automatically.
            </p>

            <ul className="text-gray-300 space-y-2 mb-10">
              <li>✓ Automatic repository analysis</li>
              <li>✓ Architecture & dependency detection</li>
              <li>✓ Instant setup & environment guide</li>
              <li>✓ Zero manual configuration</li>
            </ul>

            {/* URL INPUT */}
            <div className="max-w-xl mb-6">
              <input
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="Paste GitHub repository URL"
                className="
                  w-full px-5 py-4 rounded-xl
                  bg-zinc-900/80
                  border border-zinc-700
                  text-white placeholder:text-zinc-400
                  focus:outline-none focus:ring-2
                  focus:ring-purple-500/60
                  transition
                "
              />
            </div>

            {/* GO BUTTON */}
            {pipelineState === "idle" && (
              <button
                onClick={startPipeline}
                className="
                  px-12 py-4 rounded-xl
                  bg-purple-500
                  text-black font-semibold text-lg
                  border border-purple-400/60
                  shadow-[0_10px_40px_rgba(168,85,247,0.45)]
                  hover:bg-purple-400
                  hover:shadow-[0_16px_60px_rgba(168,85,247,0.6)]
                  hover:-translate-y-1
                  active:translate-y-0
                  active:shadow-[0_6px_24px_rgba(168,85,247,0.35)]
                  transition-all duration-200
                "
              >
                GO
              </button>
            )}

            {/* AFTER COMPLETION BUTTONS */}
            {pipelineState === "completed" && (
              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => router.push("/summary")}
                  className="px-5 py-2.5 rounded-lg bg-gray-800 border border-gray-600"
                >
                  Repo Summary
                </button>

                <button
                  onClick={() => router.push("/setup")}
                  className="px-5 py-2.5 rounded-lg bg-gray-800 border border-gray-600"
                >
                  Setup Guide
                </button>

                <button
                  onClick={resetAll}
                  className="px-5 py-2.5 rounded-lg text-red-400 border border-red-400/30"
                >
                  New Analysis
                </button>
              </div>
            )}
          </motion.div>

          {/* RIGHT FLASHCARDS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 gap-6"
          >
            {[
              {
                title: "Repository Intelligence",
                desc:
                  "Automatically understands project structure, entry points, dependencies, and architecture.",
              },
              {
                title: "Zero-Click Setup",
                desc:
                  "Generates environment variables, install steps, and run commands.",
              },
              {
                title: "Developer-First UX",
                desc:
                  "Clean pipeline view, instant summaries, and actionable setup guides.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="
                  p-6 rounded-2xl
                  bg-white/5 backdrop-blur
                  border border-white/10
                  hover:border-purple-400/40
                  hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]
                  transition-all duration-300
                "
              >
                <h3 className="text-lg font-semibold mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* PIPELINE MODAL OVERLAY */}
      {pipelineState !== "idle" && (
  <PipelineOverlay
    state={pipelineState}
    onComplete={() => setPipelineState("completed")}
    onReset={() => {
  setPipelineState("idle");
  setRepoUrl("");
  localStorage.removeItem("repoUrl");      // 🔥 IMPORTANT
  localStorage.removeItem("pipelineState");
}}

  />
)}



    </main>
  );
}
