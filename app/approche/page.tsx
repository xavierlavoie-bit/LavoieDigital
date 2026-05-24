import type { Metadata } from "next";
import PageNav from "../_components/PageNav";
import Process from "../_components/Process";

const DESCRIPTION =
  "Découverte, design, développement, suivi : notre processus en 4 étapes pour livrer des projets prévisibles et de qualité. Méthodologie claire, échéancier transparent, suivi mensuel après le lancement.";

export const metadata: Metadata = {
  title: "Approche — Notre processus en 4 étapes",
  description: DESCRIPTION,
  alternates: { canonical: "/approche" },
  keywords: [
    "processus développement web",
    "méthodologie agence web",
    "étapes projet web Québec",
    "approche développement application",
    "gestion projet web PME",
  ],
  openGraph: {
    title: "Approche — Lavoie Digital",
    description: DESCRIPTION,
    url: "/approche",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Approche — Lavoie Digital",
    description: DESCRIPTION,
  },
};

export default function ApprochePage() {
  return (
    <>
      <div className="h-24" />
      <Process />
      <PageNav
        prev={{ href: "/services", label: "Services", eyebrow: "Précédent — 01" }}
        next={{
          href: "/difference",
          label: "Différence",
          eyebrow: "Suivant — 03",
        }}
      />
    </>
  );
}
