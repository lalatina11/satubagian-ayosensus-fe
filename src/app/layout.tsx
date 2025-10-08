import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import QueryClientProvider from "@/components/providers/QueryClientProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Ayo Sensus",
  description: "Ayo Sensus by Satu Bagian Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased scroll-smooth">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider>{children}</QueryClientProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
