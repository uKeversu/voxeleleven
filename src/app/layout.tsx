// src/app/layout.tsx

import type { Metadata } from "next";

import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { CartProvider } from "@/context/CartContext";
import { SnackbarProvider } from "@/context/SnackbarContext";
import { AuthProvider } from "@/context/AuthContext";

import ThemeRegistry from "@/providers/ThemeRegistry";

import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Voxel Eleven",
  description:
    "Camisas premium inspiradas no futebol mundial.",
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({
  children,
}: Props) {
  const products = await getProducts();

  return (
    <html lang="pt-BR">
      <body>
        <ThemeRegistry>
          <SnackbarProvider>
            <AuthProvider>
              <CartProvider>

                <TopBar />

                <Navbar
                  products={products}
                />

                {children}

                <Footer />

              </CartProvider>
            </AuthProvider>
          </SnackbarProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}