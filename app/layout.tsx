import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GoToTopButton } from "@/components/GoToTopButton";
import BinaryBackground from "@/components/BinaryBackground";
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: "Huffmen Visualizer",
  description: "Explore the process of Huffman Coding step by step",
  icons: {
    icon: '/huffman_coding_visualizer_logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <BinaryBackground />
            {children}
          <Footer />
          <GoToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
