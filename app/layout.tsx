import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://lavoiedigital.ca";
const SITE_NAME = "Lavoie Digital";
const SITE_DESCRIPTION =
  "Studio de développement full-stack à Québec. Conception d'applications, sites web premium et plateformes SaaS sur mesure pour les PME du Québec. Code production, design haut de gamme, suivi client illimité.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Studio code & web · Québec`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Xavier Lavoie", url: SITE_URL }],
  creator: "Xavier Lavoie",
  publisher: SITE_NAME,
  category: "Web Development Studio",
  keywords: [
    "agence web Québec",
    "studio développement web",
    "développement application full-stack",
    "création site web Québec",
    "agence digitale Québec",
    "développeur web Québec",
    "PME Québec site web",
    "application sur mesure Québec",
    "site web premium",
    "branding digital Québec",
    "Next.js Québec",
    "React Québec",
    "SaaS Québec",
    "design web haut de gamme",
    "Lavoie Digital",
    "Xavier Lavoie",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "fr-CA": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Studio code & web · Québec`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Lavoie Digital — Studio code & web · Québec",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Studio code & web · Québec`,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}#studio`,
      name: SITE_NAME,
      legalName: "Lavoie Digital",
      alternateName: ["Studio Lavoie Digital", "Lavoie Digital Studio"],
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/opengraph-image`,
      description: SITE_DESCRIPTION,
      slogan: "On code, vous grandissez.",
      foundingDate: "2026",
      founder: {
        "@type": "Person",
        name: "Xavier Lavoie",
        url: SITE_URL,
      },
      areaServed: [
        {
          "@type": "AdministrativeArea",
          name: "Québec",
        },
        {
          "@type": "Country",
          name: "Canada",
        },
      ],
      knowsLanguage: ["fr-CA", "en-CA"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Québec",
        addressRegion: "QC",
        addressCountry: "CA",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "info@lavoiedigital.ca",
        telephone: "+1-514-290-1648",
        areaServed: "CA",
        availableLanguage: ["French", "English"],
      },
      sameAs: [
        "https://www.linkedin.com/company/lavoie-digital/",
        "https://www.instagram.com/lavoie_digital/",
        "https://www.facebook.com/profile.php?id=61590179200262",
      ],
      priceRange: "$$-$$$$",
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Applications full-stack",
            description:
              "Plateformes SaaS, dashboards, outils internes et systèmes sur mesure pour PME.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sites web premium",
            description:
              "Sites vitrines, e-commerce et pages de vente avec animations soignées.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Branding digital",
            description:
              "Identité visuelle, design system et refonte UX/UI.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Suivi et croissance",
            description:
              "Itérations continues, A/B testing, analytics et accompagnement stratégique.",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "fr-CA",
      publisher: { "@id": `${SITE_URL}#studio` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      sameAs: [
        "https://www.linkedin.com/company/lavoie-digital/",
        "https://www.instagram.com/lavoie_digital/",
        "https://www.facebook.com/profile.php?id=61590179200262",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr-CA"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
