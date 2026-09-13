import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://fotoverhale.softcoverbooks.co.za"),
  title: "Die Suid-Afrikaanse Fotoverhaal Argief | fotoverhale.softcoverbooks.co.za",
  description: "’n Digitale bewaarplek vir die kyk-en-lees pulp-fenomeen van die 1960’s tot 1980’s in Suid-Afrika. Boekvoorblaaie, historiese artikels en reeksinligting.",
  keywords: [
    "fotoverhale", "kyk-en-lees", "Mark Condor", "Ruiter in Swart", "Grensvegter", 
    "Kid Colt", "Tessa", "Die Wit Tier", "Dr Conrad Brand", "Saal 10", 
    "Suid-Afrikaanse geskiedenis", "softcoverbooks.co.za", "Pieter Haasbroek", "Koos Papenfus"
  ],
  authors: [{ name: "Pieter Haasbroek & Koos Papenfus" }],
  openGraph: {
    title: "Die Suid-Afrikaanse Fotoverhaal Argief",
    description: "’n Digitale bewaarplek vir die kyk-en-lees pulp-fenomeen van die 1960’s tot 1980’s in Suid-Afrika.",
    url: "https://fotoverhale.softcoverbooks.co.za",
    siteName: "Suid-Afrikaanse Fotoverhaal Argief",
    locale: "af_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="af" className="dark">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FK83ZPEFDE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FK83ZPEFDE');
          `}
        </Script>
      </head>
      <body className="bg-graphite text-paper min-h-screen flex flex-col selection:bg-pulp-amber selection:text-graphite antialiased">
        <Navbar />
        <main className="flex-1 bg-halftone">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

