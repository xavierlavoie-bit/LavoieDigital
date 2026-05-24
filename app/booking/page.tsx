import type { Metadata } from "next";
import Booking from "../_components/Booking";
import PageNav from "../_components/PageNav";

const DESCRIPTION =
  "Quelques questions pour cadrer votre projet web ou application. Réponse sous 24 heures avec un appel découverte gratuit. Lavoie Digital — studio code & web à Québec.";

export const metadata: Metadata = {
  title: "Réserver un appel — Consultation gratuite",
  description: DESCRIPTION,
  alternates: { canonical: "/booking" },
  keywords: [
    "réserver appel agence web Québec",
    "consultation projet web gratuite",
    "devis site web Québec",
    "contacter développeur web Québec",
    "appel découverte agence web",
  ],
  openGraph: {
    title: "Réserver un appel — Lavoie Digital",
    description: DESCRIPTION,
    url: "/booking",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Réserver un appel — Lavoie Digital",
    description: DESCRIPTION,
  },
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
