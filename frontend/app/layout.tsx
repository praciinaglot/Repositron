import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen relative overflow-hidden text-white">
  {/* PERMANENT TEST BACKGROUND */}
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "repeating-linear-gradient(45deg, #ffffff22, #ffffff22 20px, #00000000 20px, #00000000 40px)",
      zIndex: 0,
    }}
  />

  <div style={{ position: "relative", zIndex: 1 }}>
    {children}
  </div>
</body>

    </html>
  );
}

