// "use client";

// import { motion } from "framer-motion";

// export default function SetupPage() {
//   return (
//     <main className="min-h-screen flex items-center justify-center px-6">
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, ease: "easeOut" }}
//         className="w-full max-w-xl bg-gradient-to-b from-[#12182F] to-[#0E1325] border border-white/10 rounded-xl p-6"
//       >
//         <h1 className="text-2xl font-semibold mb-6">
//           Project Setup Guide
//         </h1>

//         <div className="space-y-4 text-sm text-gray-300">
//           <p>
//             <span className="text-white font-medium">
//               Install Dependencies:
//             </span>{" "}
//             Use the package manager detected by Cline (npm / yarn / pnpm).
//           </p>

//           <p>
//             <span className="text-white font-medium">
//               Configure Environment Variables:
//             </span>{" "}
//             Create a <code className="text-gray-200">.env</code> file using{" "}
//             <code className="text-gray-200">.env.example</code>.
//           </p>

//           <p>
//             <span className="text-white font-medium">
//               Run Setup Scripts:
//             </span>{" "}
//             Execute the setup scripts generated during onboarding.
//           </p>

//           <p>
//             <span className="text-white font-medium">
//               Start Development Server:
//             </span>{" "}
//             Run the development server to verify the setup.
//           </p>
//         </div>
//       </motion.div>
//     </main>
//   );
// }

"use client";

import { motion } from "framer-motion";

export default function SetupPage() {
  return (
    <main className="min-h-screen text-white
      bg-gradient-to-br from-[#0B1020] via-[#0E1325] to-[#090C1A] px-10 py-12">

      {/* BRAND */}
      <div className="text-xl font-semibold tracking-wide mb-16">
        REPOSITRON
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl"
      >
        <h1 className="text-4xl font-bold mb-4">
          Project Setup Guide
        </h1>

        <p className="text-gray-400 mb-10 max-w-2xl">
          Follow these steps to get the project running locally.
          Generated automatically based on repository analysis.
        </p>

        {/* SETUP CARD */}
        <div className="
          p-8 rounded-2xl
          bg-white/5 backdrop-blur
          border border-white/10
          space-y-6
        ">
          <div>
            <h3 className="font-semibold text-lg">
              1. Install Dependencies
            </h3>
            <p className="text-gray-400 mt-1">
              Run the detected package manager command (npm / yarn / pnpm).
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              2. Configure Environment Variables
            </h3>
            <p className="text-gray-400 mt-1">
              Create a <code>.env</code> file using <code>.env.example</code>.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              3. Run Setup Scripts
            </h3>
            <p className="text-gray-400 mt-1">
              Execute scripts generated during onboarding.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              4. Start Development Server
            </h3>
            <p className="text-gray-400 mt-1">
              Launch the app locally to verify setup.
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}



