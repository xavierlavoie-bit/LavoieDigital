"use client";

import { motion } from "motion/react";
import { SectionHeader } from "./Services";

const FEATURES = [
  {
    title: "Suivi client illimité",
    body: "Vous n'êtes jamais laissé seul après le livrable. Questions, ajustements, demandes — on répond, on agit.",
    span: "md:col-span-2",
  },
  {
    title: "Esthétique hors du commun",
    body: "Animations soignées, micro-interactions, 3D, glassmorphism. Vos visiteurs sentent la différence dès la première seconde.",
  },
  {
    title: "Code production",
    body: "TypeScript strict, tests, CI/CD, performances mesurées. Pas de dette technique.",
  },
  {
    title: "Local et accessible",
    body: "Studio basé au Québec. Rencontres en personne, appels rapides, communication en français comme en anglais.",
    span: "md:col-span-2",
  },
];

const STATS = [
  { value: "100%", label: "Code custom, zéro template" },
  { value: "<2s", label: "Temps de chargement moyen" },
  { value: "24h", label: "Délai de réponse maximum" },
  { value: "∞", label: "Itérations incluses" },
];

export default function Edge() {
  return (
    <section id="edge" className="relative z-10 px-6 py-16 sm:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="La différence"
          title="Ce qu'on apporte que les autres n'apportent pas."
          sub="Notre obsession : faire en sorte que votre produit fini surpasse ce que vous aviez en tête. Pas l'inverse."
        />

        {/* Bento grid */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 p-8 transition-colors duration-500 hover:border-white/20 ${
                f.span ?? ""
              }`}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 100%)",
                backdropFilter: "blur(24px) saturate(160%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 80px -30px rgba(0,0,0,0.6)",
              }}
            >
              <h3 className="text-2xl font-semibold tracking-tight text-white">
                {f.title}
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/55">
                {f.body}
              </p>

              {/* Hover glow */}
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                style={{
                  background:
                    "radial-gradient(circle, rgba(200,220,255,0.4), transparent 70%)",
                }}
              />
            </motion.article>
          ))}
        </div>

        {/* Stats */}
        <div
          className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 md:grid-cols-4"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            backdropFilter: "blur(24px) saturate(160%)",
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative flex flex-col items-start gap-2 bg-black/30 p-8 sm:p-10"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                / {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display text-[clamp(2.2rem,5vw,3.6rem)] text-white">
                {s.value}
              </span>
              <span className="text-[13px] leading-relaxed text-white/55">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
