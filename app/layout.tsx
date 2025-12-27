// app/layout.tsx
import "./globals.css";
import { Providers } from "@/components/Providers";
import type { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}