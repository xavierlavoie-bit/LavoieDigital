import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AmbientBackdrop from "./_components/AmbientBackdrop";
import Footer from "./_components/Footer";
import Nav from "./_components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lavoie Digital — Studio code & web · Québec",
  description:
    "Studio de développement full-stack basé au Québec. Applications, sites et plateformes sur mesure pour les PME — esthétique haut de gamme, suivi client illimité.",
  metadataBase: new URL("https://lavoiedigital.ca"),
  openGraph: {
    title: "Lavoie Digital — Studio code & web",
    description:
      "Applications full-stack et sites web premium pour PME du Québec.",
    type: "website",
    locale: "fr_CA",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr-CA"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-[var(--fg)] flex flex-col grain">
        <AmbientBackdrop />
        <Nav />
        <main id="top" className="relative z-10 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
