import type { Metadata } from "next";
import PageNav from "../_components/PageNav";
import Work from "../_components/Work";

const DESCRIPTION =
  "Plateformes B2B, sites web haut de gamme, applications mobiles : aperçu de nos domaines d'expertise. Projets full-stack en Next.js, React, TypeScript et PostgreSQL pour PME du Québec.";

export const metadata: Metadata = {
  title: "Travaux — Domaines d'expertise et types de projets",
  description: DESCRIPTION,
  alternates: { canonical: "/travaux" },
  keywords: [
    "portfolio agence web Québec",
    "réalisations développement web",
    "projets Next.js Québec",
    "plateforme B2B Québec",
    "site e-commerce Québec",
    "application mobile Québec",
  ],
  openGraph: {
    title: "Travaux — Lavoie Digital",
    description: DESCRIPTION,
    url: "/travaux",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travaux — Lavoie Digital",
    description: DESCRIPTION,
  },
};

export default function TravauxPage() {
  return (
    <>
      <div className="h-24" />
      <Work />
      <PageNav
        prev={{
          href: "/services",
          label: "Services",
          eyebrow: "Précédent — 01",
        }}
        next={{
          href: "/approche",
          label: "Approche",
          eyebrow: "Suivant — 03",
        }}
      />
    </>
  );
}
