"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "./Services";

const STEPS = [
  {
    n: "01",
    title: "Découverte",
    desc: "On comprend votre PME, vos clients, vos objectifs et vos contraintes. Audit, atelier et cadrage du projet.",
    duration: "1 semaine",
  },
  {
    n: "02",
    title: "Design",
    desc: "Wireframes, design système, prototypes haute-fidélité. Itérations jusqu'à ce que ce soit parfait.",
    duration: "1 semaine",
  },
  {
    n: "03",
    title: "Développement",
    desc: "Code production, performances optimales, animations soignées. Vous suivez chaque étape en temps réel.",
    duration: "1-2 semaines",
  },
  {
    n: "04",
    title: "Lancement & suivi",
    desc: "Mise en ligne, formation, monitoring. Puis suivi mensuel : analytics, optimisations, nouvelles fonctions.",
    duration: "En continu",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative z-10 px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Approche"
          title="Un processus clair, des résultats prévisibles."
          sub="Chaque projet suit la même rigueur. Pas de surprises, pas de zones grises — juste du livrable de qualité."
        />

        <div ref={ref} className="relative mt-20">
          {/* Vertical progress rail (desktop) */}
          <div className="pointer-events-none absolute left-[27px] top-0 hidden h-full w-px bg-white/8 md:block">
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: "top" }}
              className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-white via-white/40 to-transparent"
            />
          </div>

          <ol className="space-y-6 md:space-y-3">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative grid grid-cols-[auto_1fr] items-start gap-6 rounded-3xl border border-transparent p-6 transition-colors duration-500 hover:border-white/8 hover:bg-white/[0.02] md:gap-8"
              >
                {/* Step badge */}
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-black text-white">
                  <span
                    className="font-mono text-sm tracking-wide text-white/85"
                    aria-hidden
                  >
                    {step.n}
                  </span>
                  <div className="absolute inset-0 rounded-2xl bg-white/0 transition-colors duration-500 group-hover:bg-white/[0.04]" />
                </div>

                <div className="flex flex-1 flex-col gap-2 pt-2 md:flex-row md:items-baseline md:justify-between md:gap-10">
                  <div className="max-w-2xl">
                    <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.7rem]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/55">
                      {step.desc}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">
                    {step.duration}
                  </span>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
