import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/features/auth/hooks/use-auth";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "STARS COLLECTION - Premium Cosmetics",
  description: "Premium cosmetics and beauty products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-dark text-white font-sans selection:bg-gold/30">
        <AuthProvider>{children}</AuthProvider>
        <WhatsAppWidget />
      </body>
    </html>
  );
}
