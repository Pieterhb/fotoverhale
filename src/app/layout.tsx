import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://fotoverhale.softcoverbooks.co.za"),
  title: {
    default: "Die Suid-Afrikaanse Fotoverhaal Argief | fotoverhale.softcoverbooks.co.za",
    template: "%s | Fotoverhaal Argief",
  },
  description: "’n Digitale bewaarplek vir die kyk-en-lees pulp-fenomeen van die 1960’s tot 1980’s in Suid-Afrika. 462 boekvoorblaaie, 111 reekse, historiese artikels en bibliografiese inligting.",
  keywords: [
    "fotoverhale", "kyk-en-lees", "Mark Condor", "Ruiter in Swart", "Grensvegter", 
    "Kid Colt", "Tessa", "Die Wit Tier", "Dr Conrad Brand", "Saal 10", 
    "Suid-Afrikaanse geskiedenis", "softcoverbooks.co.za", "Pieter Haasbroek", "Koos Papenfus",
    "Afrikaanse strokiesprente", "pulp comics South Africa", "photo comics archive"
  ],
  authors: [{ name: "Pieter Haasbroek" }, { name: "Koos Papenfus" }],
  creator: "Pieter Haasbroek",
  publisher: "Softcoverbooks.co.za",
  alternates: {
    canonical: "https://fotoverhale.softcoverbooks.co.za",
  },
  openGraph: {
    title: "Die Suid-Afrikaanse Fotoverhaal Argief",
    description: "’n Digitale bewaarplek vir die kyk-en-lees pulp-fenomeen van die 1960’s tot 1980’s in Suid-Afrika. 462 voorblaaie oor 111 reekse.",
    url: "https://fotoverhale.softcoverbooks.co.za",
    siteName: "Suid-Afrikaanse Fotoverhaal Argief",
    images: [
      {
        url: "https://fotoverhale.softcoverbooks.co.za/icon-512.png",
        width: 512,
        height: 512,
        alt: "Die Suid-Afrikaanse Fotoverhaal Argief Embleem",
      },
    ],
    locale: "af_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Die Suid-Afrikaanse Fotoverhaal Argief",
    description: "’n Digitale bewaarplek vir die kyk-en-lees pulp-fenomeen van die 1960’s tot 1980’s in Suid-Afrika.",
    images: ["https://fotoverhale.softcoverbooks.co.za/icon-512.png"],
    creator: "@PieterHaasbroe2",
    site: "@PieterHaasbroe2",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://fotoverhale.softcoverbooks.co.za/#website",
      "url": "https://fotoverhale.softcoverbooks.co.za",
      "name": "Die Suid-Afrikaanse Fotoverhaal Argief",
      "description": "Digitale bewaarplek en navorsingsargief vir die Suid-Afrikaanse fotoverhaal-era (1960–1985).",
      "inLanguage": "af",
      "creator": {
        "@id": "https://pulpbooksarchive.co.za/p-d-haasbroek/#person"
      },
      "publisher": {
        "@id": "https://fotoverhale.softcoverbooks.co.za/#organization"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://fotoverhale.softcoverbooks.co.za/#organization",
      "name": "Suid-Afrikaanse Fotoverhaal Argief",
      "url": "https://fotoverhale.softcoverbooks.co.za",
      "logo": "https://fotoverhale.softcoverbooks.co.za/icon-512.png",
      "founder": {
        "@id": "https://pulpbooksarchive.co.za/p-d-haasbroek/#person"
      },
      "sameAs": [
        "https://www.softcoverbooks.co.za",
        "https://www.pulpbooksarchive.co.za",
        "https://www.youtube.com/@BookswithHooks",
        "https://www.facebook.com/profile.php?id=61579044552820",
        "https://www.instagram.com/ebookswithhooks/",
        "https://x.com/PieterHaasbroe2",
        "https://za.pinterest.com/BlackLeopardPulp/"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://pulpbooksarchive.co.za/p-d-haasbroek/#person",
      "name": "Pieter Daniel Haasbroek",
      "alternateName": ["P.D. Haasbroek", "Pieter Haasbroek"],
      "url": "https://fotoverhale.softcoverbooks.co.za/p-d-haasbroek",
      "sameAs": [
        "https://www.pulpbooksarchive.co.za/",
        "https://pulpbooksarchive.co.za/p-d-haasbroek/",
        "https://softcoverbooks.co.za/",
        "https://www.flickfuture.com/",
        "https://www.teepublic.com/user/theblackpanther",
        "https://www.amazon.com/stores/Pieter-Haasbroek/author/B0FQ44RRLQ"
      ]
    }
  ]
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
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FK83ZPEFDE"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FK83ZPEFDE');
            `,
          }}
        />
        {/* Schema.org WebSite & Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebsite),
          }}
        />
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

