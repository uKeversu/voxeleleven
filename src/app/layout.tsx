import type { Metadata } from "next";

import "./globals.css";

import ThemeRegistry from "@/providers/ThemeRegistry";

export const metadata: Metadata = {
  title: "VoxelEleven",
  description: "Football Culture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}