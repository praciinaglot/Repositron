// "use client";

// import { useEffect, useState } from "react";

// const steps = [
//   "Cloning repository",
//   "Analyzing architecture",
//   "Generating repository summary",
//   "Detecting project stack",
//   "Installing dependencies",
//   "Generating environment files",
//   "Creating setup guide",
// ];

// export default function PipelineStatus({
//   onComplete,
// }: {
//   onComplete: () => void;
// }) {
//   const [currentStep, setCurrentStep] = useState(0);

//   useEffect(() => {
//     if (currentStep >= steps.length) {
//       onComplete();
//       return;
//     }

//     const timer = setTimeout(() => {
//       setCurrentStep((prev) => prev + 1);
//     }, 1200); // step duration (adjust if you want)

//     return () => clearTimeout(timer);
//   }, [currentStep, onComplete]);

//   return (
//     <div className="mt-8 w-full max-w-md bg-gray-900 border border-gray-700 rounded-lg p-4">
//       <h2 className="text-lg font-semibold mb-3">
//         Pipeline Progress
//       </h2>

//       <ul className="space-y-3 text-sm">
//         {steps.map((step, index) => {
//           const isDone = index < currentStep;
//           const isActive = index === currentStep;

//           return (
//             <li
//               key={step}
//               className={`flex items-center gap-3 ${
//                 isDone
//                   ? "text-green-400"
//                   : isActive
//                   ? "text-blue-400 animate-pulse"
//                   : "text-gray-500"
//               }`}
//             >
//               <span className="text-lg">
//                 {isDone ? "✔" : isActive ? "⟳" : "○"}
//               </span>
//               <span>{step}</span>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";

// type Mode = "analyze-setup";

// interface PipelineStatusProps {
//   mode: Mode;
//   onComplete: () => void;
// }

// export default function PipelineStatus({
//   mode,
//   onComplete,
// }: PipelineStatusProps) {
//   // 🔹 UPDATED PIPELINE STEPS (UI ONLY)
// const steps = [
//   "Cloning repository",
//   "Analyzing architecture",
//   "Detecting project stack",
//   "Installing dependencies",
//   "Generating environment files",
//   "Creating repository summary",
// ];


//   const [currentStep, setCurrentStep] = useState(0);

//   useEffect(() => {
//     if (currentStep < steps.length) {
//       const timer = setTimeout(() => {
//         setCurrentStep((prev) => prev + 1);
//       }, 1200);

//       return () => clearTimeout(timer);
//     } else {
//       onComplete();
//     }
//   }, [currentStep, steps.length, onComplete]);

//   return (
//     <div className="mt-6 p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
//       <h3 className="font-semibold mb-4">
//         Running pipeline
//       </h3>

//       <ul className="space-y-3 text-sm">
//         {steps.map((step, index) => {
//           const isDone = index < currentStep;
//           const isActive = index === currentStep;

//           return (
//             <li
//               key={step}
//               className={`flex items-center gap-3 ${
//                 isDone
//                   ? "text-green-400"
//                   : isActive
//                   ? "text-purple-400 animate-pulse"
//                   : "text-gray-500"
//               }`}
//             >
//               <span>
//                 {isDone ? "✔" : isActive ? "⟳" : "○"}
//               </span>
//               {step}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

export default function PipelineStatus({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const steps = [
    "Cloning repository",
    "Analyzing architecture",
    "Detecting project stack",
    "Installing dependencies",
    "Generating environment files",
    "Creating repository summary",
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [currentStep, steps.length, onComplete]);

  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const isDone = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div
            key={step}
            className={`flex items-center gap-3 text-sm ${
              isDone
                ? "text-green-400"
                : isActive
                ? "text-purple-400 animate-pulse"
                : "text-gray-500"
            }`}
          >
            <span className="text-lg">
              {isDone ? "✔" : isActive ? "⟳" : "○"}
            </span>
            <span>{step}</span>
          </div>
        );
      })}
    </div>
  );
}
