import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Godik.ai — We build websites and automations",
  description:
    "Godik.ai builds sharp, modern websites and intelligent automations that help businesses move faster.",
  openGraph: {
    title: "Godik.ai — We build websites and automations",
    description:
      "Sharp websites and intelligent automations for modern businesses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-[#0a0a0a] text-white">
        {children}
      </body>
    </html>
  );
}
