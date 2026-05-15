import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import WhatsAppLinkComponent from "../components/Icon/WhatsAppLink";

// Only load Geist Sans — Geist Mono is unused (saves ~180ms render-blocking)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vasudev Precast - Precast Boundary Walls | RCC Folding Walls",
  description:
    "Vasudev Precast: Premium RCC Boundary Walls & Folding Walls in Surat.",
  keywords: [
    "Precast Boundary Walls",
    "RCC Folding Walls",
    "Prestressed Walls",
    "Compound Walls",
    "Shade Walls",
    "Precast Concrete",
    "Industrial Boundary Walls",
    "Vasudev Precast",
    "Surat",
    "Navsari",
    "Ankleshwar",
    "Bardoli",
    "Valsad",
  ],
  openGraph: {
    title: "Vasudev Precast - Precast Boundary Walls | RCC Folding Walls",
    description:
      "Leading manufacturer of RCC Precast Boundary Walls and Folding Walls in Surat, Navsari, Ankleshwar, Bardoli, and Valsad.",
    url: "https://vasudevprecast.com",
    siteName: "Vasudev Precast",
    images: [
      {
        url: "/photiGallery/photo1.webp",
        width: 1200,
        height: 630,
        alt: "Vasudev Precast - Precast Boundary Walls",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Next.js Image optimization origin for LCP */}
        <link rel="preconnect" href="/_next/image" />
        {/* DNS prefetch for Google Maps iframe (Contact section) */}
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      </head>
      <body
        className={`${geistSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <Header />
        {children}
        <WhatsAppLinkComponent />
        <Footer />
      </body>
    </html>
  );
}
