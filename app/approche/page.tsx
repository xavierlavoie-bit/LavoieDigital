import type { Metadata } from "next";
import PageNav from "../_components/PageNav";
import Process from "../_components/Process";

export const metadata: Metadata = {
  title: "Approche — Lavoie Digital",
  description:
    "Découverte, design, développement, suivi. Notre processus en 4 étapes pour livrer des projets prévisibles et de qualité.",
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
