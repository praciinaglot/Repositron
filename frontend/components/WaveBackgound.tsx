"use client";

export default function WaveBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,

        /* 🔥 MUCH MORE VISIBLE WAVES */
        backgroundImage: `
          radial-gradient(
            ellipse at bottom,
            rgba(255,255,255,0.35),
            rgba(255,255,255,0.08) 55%,
            rgba(0,0,0,0) 75%
          ),
          linear-gradient(
            120deg,
            rgba(255,255,255,0.40),
            rgba(255,255,255,0.08),
            rgba(255,255,255,0.40)
          )
        `,

        backgroundSize: "180% 180%",
        animation: "waveMove 8s ease-in-out infinite",
      }}
    />
  );
}



