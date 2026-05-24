import type { Metadata } from "next";
import PageNav from "../_components/PageNav";
import Work from "../_components/Work";

export const metadata: Metadata = {
  title: "Travaux — Lavoie Digital",
  description:
    "Plateformes B2B, sites web haut de gamme, applications mobiles. Aperçu de nos domaines d'expertise.",
};

export default function TravauxPage() {
  return (
    <>
      <div className="h-24" />
      <Work />
      <PageNav
        prev={{
          href: "/difference",
          label: "Différence",
          eyebrow: "Précédent — 03",
        }}
        next={{
          href: "/booking",
          label: "Réserver un appel",
          eyebrow: "Prêt à démarrer ?",
        }}
      />
    </>
  );
}
