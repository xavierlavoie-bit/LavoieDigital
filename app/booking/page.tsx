import type { Metadata } from "next";
import Booking from "../_components/Booking";
import PageNav from "../_components/PageNav";

export const metadata: Metadata = {
  title: "Réserver un appel — Lavoie Digital",
  description:
    "Quelques questions pour cadrer votre projet. Réponse sous 24 heures avec un appel découverte.",
};

export default function BookingPage() {
  return (
    <>
      <div className="h-24" />
      <Booking />
      <PageNav
        prev={{ href: "/travaux", label: "Travaux", eyebrow: "Retour — 04" }}
        next={{ href: "/", label: "Accueil", eyebrow: "Revenir au début" }}
      />
    </>
  );
}
