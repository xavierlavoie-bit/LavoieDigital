import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lavoie Digital — Studio code & web",
    short_name: "Lavoie Digital",
    description:
      "Studio de développement full-stack à Québec. Applications, sites web et plateformes sur mesure pour les PME.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "fr-CA",
    orientation: "portrait",
    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
