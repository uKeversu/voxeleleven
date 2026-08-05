// src/app/layout.tsx

import type { Metadata } from "next";

import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { SnackbarProvider } from "@/context/SnackbarContext";

import ThemeRegistry from "@/providers/ThemeRegistry";

export const metadata: Metadata = {
  title: "Voxel Eleven",
  description:
    "Camisas premium inspiradas no futebol mundial.",
};

type Props = {
  children: React.ReactNode;
};

<meta name="viewport" content="width=device-width, initial-scale=1" />

export default function RootLayout({
  children,
}: Props) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeRegistry>
          <CartProvider>
            <SnackbarProvider>
              <TopBar />
              <Navbar />

              {children}

              <Footer />
            </SnackbarProvider>
          </CartProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}