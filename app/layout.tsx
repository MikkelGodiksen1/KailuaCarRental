import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Godik.ai — Vi bygger hjemmesider og automatiseringer",
  description:
    "Godik.ai bygger skarpe hjemmesider og intelligente automatiseringer, der hjælper virksomheder med at vækste hurtigere.",
  openGraph: {
    title: "Godik.ai — Vi bygger hjemmesider og automatiseringer",
    description:
      "Skarpe hjemmesider og intelligente automatiseringer til moderne virksomheder.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-[#080814] text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
