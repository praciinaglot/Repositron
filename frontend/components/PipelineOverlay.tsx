// "use client";

// import { motion } from "framer-motion";
// import PipelineStatus from "./PipelineStatus";
// import { useRouter } from "next/navigation";

// interface PipelineOverlayProps {
//   state: "running" | "completed";
//   onComplete: () => void;
//   onReset: () => void;
// }

// export default function PipelineOverlay({
//   state,
//   onComplete,
//   onReset,
// }: PipelineOverlayProps) {
//   const router = useRouter();

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* 🔹 BACKDROP */}
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

//       {/* 🔹 MODAL */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.96 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.25, ease: "easeOut" }}
//         className="
//           relative z-10
//           w-full max-w-md
//           p-6 rounded-2xl
//           bg-[#0B1020]/90
//           border border-white/10
//           shadow-[0_0_60px_rgba(0,0,0,0.6)]
//         "
//       >
//         {/* 🔹 PIPELINE RUNNING */}
//         {state === "running" && (
//           <PipelineStatus
//             mode="analyze-setup"
//             onComplete={onComplete}
//           />
//         )}

//         {/* 🔹 PIPELINE COMPLETED */}
//         {state === "completed" && (
//           <div className="text-center space-y-6">
//             <h2 className="text-lg font-semibold text-green-400">
//               ✔ Pipeline completed
//             </h2>

//             {/* ACTION BUTTONS */}
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => router.push("/summary")}
//                 className="
//                   px-5 py-2.5 rounded-lg
//                   bg-gray-800 border border-gray-600
//                   hover:bg-gray-700 transition
//                 "
//               >
//                 Repo Summary
//               </button>

//               <button
//                 onClick={() => router.push("/setup")}
//                 className="
//                   px-5 py-2.5 rounded-lg
//                   bg-gray-800 border border-gray-600
//                   hover:bg-gray-700 transition
//                 "
//               >
//                 Setup Guide
//               </button>
//             </div>

//             {/* 🔴 NEW ANALYSIS */}
//             <button
//               onClick={onReset}
//               className="
//                 text-sm text-red-400 underline
//                 hover:text-red-300 transition
//               "
//             >
//               New Analysis
//             </button>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }
"use client";

import { motion } from "framer-motion";
import PipelineStatus from "./PipelineStatus";
import { useRouter } from "next/navigation";

export default function PipelineOverlay({
  state,
  onComplete,
  onReset,
}: {
  state: "running" | "completed";
  onComplete: () => void;
  onReset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* MODAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="
          relative z-10
          w-full max-w-md
          p-6 rounded-2xl
          bg-[#0B1020]/90
          border border-white/10
          shadow-xl
        "
      >
        {state === "running" && (
          <PipelineStatus onComplete={onComplete} />
        )}

        {state === "completed" && (
          <div className="text-center space-y-6">
            <h2 className="text-lg font-semibold text-green-400">
              ✔ Pipeline completed
            </h2>

            <button
              onClick={() => router.push("/summary")}
              className="
                px-6 py-3 rounded-xl
                bg-purple-500
                text-black font-semibold
                hover:bg-purple-400 transition
              "
            >
              Repo Summary
            </button>

            <div>
              <button
                onClick={onReset}
                className="text-sm text-red-400 underline"
              >
                New Analysis
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
