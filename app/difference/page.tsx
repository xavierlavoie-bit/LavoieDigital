import type { Metadata } from "next";
import Edge from "../_components/Edge";
import PageNav from "../_components/PageNav";

export const metadata: Metadata = {
  title: "Différence — Lavoie Digital",
  description:
    "Suivi client illimité, esthétique hors du commun, code production : ce qu'on apporte que les autres n'apportent pas.",
};

export default function DifferencePage() {
  return (
    <>
      <div className="h-24" />
      <Edge />
      <PageNav
        prev={{
          href: "/approche",
          label: "Approche",
          eyebrow: "Précédent — 02",
        }}
        next={{ href: "/travaux", label: "Travaux", eyebrow: "Suivant — 04" }}
      />
    </>
  );
}
