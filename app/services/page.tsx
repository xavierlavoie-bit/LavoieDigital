import type { Metadata } from "next";
import PageNav from "../_components/PageNav";
import Services from "../_components/Services";

const DESCRIPTION =
  "Applications full-stack, sites web premium, branding digital et suivi continu pour PME du Québec. Plateformes SaaS, dashboards, e-commerce et outils internes sur mesure.";

export const metadata: Metadata = {
  title: "Services — Développement web et applications sur mesure",
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  keywords: [
    "services développement web Québec",
    "création application full-stack",
    "site web sur mesure PME",
    "agence web Québec services",
    "développement SaaS Québec",
    "branding digital Québec",
    "plateforme B2B Québec",
  ],
  openGraph: {
    title: "Services — Lavoie Digital",
    description: DESCRIPTION,
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Lavoie Digital",
    description: DESCRIPTION,
  },
};

export default function ServicesPage() {
  return (
    <>
      <div className="h-24" />
      <Services />
      <PageNav
        prev={{ href: "/", label: "Accueil", eyebrow: "Retour" }}
        next={{ href: "/approche", label: "Approche", eyebrow: "Suivant — 02" }}
      />
    </>
  );
}
