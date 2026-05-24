import type { Metadata } from "next";
import PageNav from "../_components/PageNav";
import Services from "../_components/Services";

export const metadata: Metadata = {
  title: "Services — Lavoie Digital",
  description:
    "Applications full-stack, sites web premium, branding digital et suivi continu pour PME du Québec.",
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
