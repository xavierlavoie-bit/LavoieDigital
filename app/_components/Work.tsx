"use client";

import { motion } from "motion/react";
import { SectionHeader } from "./Services";

const PROJECTS = [
  {
    tag: "SaaS · Dashboard",
    title: "Plateformes B2B",
    body: "CRM, ERP, outils internes pour PME en croissance. Authentification, paiements, multi-rôles.",
    mock: <DashboardMock />,
  },
  {
    tag: "E-commerce · Vitrine",
    title: "Sites haut de gamme",
    body: "Storytelling, animations 3D, conversion. Du visiteur curieux au client qui revient.",
    mock: <SiteMock />,
  },
  {
    tag: "Mobile · iOS / Android",
    title: "Applications natives",
    body: "Expériences mobiles fluides en React Native ou natif. Sync hors-ligne, notifications, paiements.",
    mock: <MobileMock />,
  },
];

export default function Work() {
  return (
    <section id="work" className="relative z-10 px-6 py-16 sm:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Travaux"
          title="Des projets pensés pour durer."
          sub="On choisit nos clients avec soin — pour livrer un travail dont on est fiers et qui performe sur le long terme."
        />

        <div className="mt-16 space-y-6">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[2rem] border border-white/10 p-6 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 100%)",
                backdropFilter: "blur(24px) saturate(160%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 40px 100px -30px rgba(0,0,0,0.6)",
              }}
            >
              <div className="order-2 lg:order-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/55">
                  {p.tag}
                </span>
                <h3 className="mt-5 text-[clamp(1.8rem,3vw,2.4rem)] font-semibold tracking-tight text-white">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/55">
                  {p.body}
                </p>
                <div className="mt-7 flex items-center gap-3 text-[13px] text-white/60">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                    Stack typique
                  </span>
                  <span>Next.js · TypeScript · PostgreSQL</span>
                </div>
              </div>
              <div className="order-1 lg:order-2">{p.mock}</div>

              {/* hover glow */}
              <div
                className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                style={{
                  background:
                    "radial-gradient(circle, rgba(200,220,255,0.25), transparent 70%)",
                }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Visual mocks ---------- */

function DashboardMock() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 shadow-inner">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <div className="col-span-1 space-y-2">
          <div className="h-2 w-12 rounded-full bg-white/15" />
          <div className="h-7 rounded-md bg-white/[0.06]" />
          <div className="h-7 rounded-md bg-white/[0.06]" />
          <div className="h-7 rounded-md bg-white/15" />
          <div className="h-7 rounded-md bg-white/[0.06]" />
        </div>
        <div className="col-span-2 space-y-2.5">
          <div className="flex gap-2">
            <div className="h-12 flex-1 rounded-md bg-white/[0.06]" />
            <div className="h-12 flex-1 rounded-md bg-white/[0.06]" />
            <div className="h-12 flex-1 rounded-md bg-white/[0.06]" />
          </div>
          <ChartMock />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-10 rounded-md bg-white/[0.06]" />
            <div className="h-10 rounded-md bg-white/[0.06]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartMock() {
  return (
    <div className="relative h-24 overflow-hidden rounded-md bg-white/[0.04] p-3">
      <svg viewBox="0 0 200 80" className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <path
          d="M0 60 L20 50 L40 55 L60 30 L80 38 L100 20 L120 28 L140 15 L160 22 L180 8 L200 12 L200 80 L0 80 Z"
          fill="url(#grad)"
        />
        <path
          d="M0 60 L20 50 L40 55 L60 30 L80 38 L100 20 L120 28 L140 15 L160 22 L180 8 L200 12"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.4"
        />
      </svg>
    </div>
  );
}

function SiteMock() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 shadow-inner">
      <div className="flex items-center justify-between">
        <div className="h-2.5 w-16 rounded-full bg-white/30" />
        <div className="flex gap-2">
          <div className="h-2 w-6 rounded-full bg-white/15" />
          <div className="h-2 w-6 rounded-full bg-white/15" />
          <div className="h-2 w-6 rounded-full bg-white/15" />
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center gap-3 text-center">
        <div className="h-3 w-32 rounded-full bg-white/30" />
        <div className="h-7 w-56 rounded-md bg-white/85" />
        <div className="h-3 w-44 rounded-full bg-white/15" />
        <div className="mt-2 flex gap-2">
          <div className="h-6 w-20 rounded-full bg-white" />
          <div className="h-6 w-20 rounded-full border border-white/20" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2">
        <div className="h-14 rounded-md bg-white/[0.06]" />
        <div className="h-14 rounded-md bg-white/[0.06]" />
        <div className="h-14 rounded-md bg-white/[0.06]" />
      </div>
    </div>
  );
}

function MobileMock() {
  return (
    <div className="flex aspect-[16/10] w-full items-center justify-center">
      <div className="relative h-full max-h-[280px] w-[140px] rounded-[2rem] border border-white/15 bg-black p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
        <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
        <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
          <div className="absolute inset-x-3 top-8 space-y-2.5">
            <div className="h-3 w-16 rounded-full bg-white/30" />
            <div className="h-6 w-full rounded-md bg-white/15" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 rounded-md bg-white/[0.08]" />
              <div className="h-12 rounded-md bg-white/[0.08]" />
              <div className="h-12 rounded-md bg-white/[0.08]" />
              <div className="h-12 rounded-md bg-white/[0.08]" />
            </div>
            <div className="h-7 w-full rounded-full bg-white text-center" />
          </div>
        </div>
      </div>
    </div>
  );
}
