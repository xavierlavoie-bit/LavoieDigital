"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";

type Section = {
  num: string;
  href: string;
  title: string;
  tagline: string;
  bullets: string[];
  Visual: () => React.ReactNode;
  Icon: () => React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    num: "01",
    href: "/services",
    title: "Services",
    tagline: "Du concept à la mise en marché.",
    bullets: [
      "Applications full-stack",
      "Sites web premium",
      "Branding digital",
    ],
    Visual: GridVisual,
    Icon: ServicesIcon,
  },
  {
    num: "02",
    href: "/approche",
    title: "Approche",
    tagline: "Un processus clair, des résultats prévisibles.",
    bullets: ["Découverte", "Design & développement", "Lancement & suivi"],
    Visual: StepsVisual,
    Icon: ApprocheIcon,
  },
  {
    num: "03",
    href: "/difference",
    title: "Différence",
    tagline: "Ce qu'on apporte que les autres n'apportent pas.",
    bullets: [
      "Suivi client illimité",
      "Esthétique hors du commun",
      "Code production",
    ],
    Visual: SparkVisual,
    Icon: DifferenceIcon,
  },
  {
    num: "04",
    href: "/travaux",
    title: "Travaux",
    tagline: "Des projets pensés pour durer.",
    bullets: ["Plateformes B2B", "Sites haut de gamme", "Apps mobiles"],
    Visual: DeviceVisual,
    Icon: TravauxIcon,
  },
];

export default function ExplorePanels() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative z-10 px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/55 backdrop-blur"
            >
              <span className="h-1 w-1 rounded-full bg-white/70" />
              Explorer
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="display mt-6 max-w-3xl text-[clamp(2rem,5vw,3.6rem)] text-white"
            >
              Quatre portes,
              <br />
              <span className="text-white/40">un même studio.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden max-w-xs text-[14px] leading-relaxed text-white/45 sm:block"
          >
            Survolez une icône. Cliquez pour entrer.
          </motion.p>
        </div>

        {/* Desktop: floating icons (no boxes) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-20 hidden md:block"
          onMouseLeave={() => setActive(null)}
        >
          {/* Soft ambient wash so the icons feel anchored without a frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-[260px] w-[80%] -z-10 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse, rgba(180,200,255,0.18), transparent 65%)",
            }}
          />

          <div className="grid grid-cols-4 items-end gap-8 px-4">
            {SECTIONS.map((s, i) => (
              <IconCard
                key={s.num}
                section={s}
                index={i}
                isActive={active === i}
                isOther={active !== null && active !== i}
                onEnter={() => setActive(i)}
              />
            ))}
          </div>

          {/* Single morphing content area below the icons */}
          <ActiveContent section={active !== null ? SECTIONS[active] : null} />
        </motion.div>

        {/* Mobile stack */}
        <div className="mt-12 flex flex-col gap-3 md:hidden">
          {SECTIONS.map((s, i) => (
            <MobilePanel key={s.num} section={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------- Panel (desktop) ----------------- */

function IconCard({
  section,
  index,
  isActive,
  isOther,
  onEnter,
}: {
  section: Section;
  index: number;
  isActive: boolean;
  isOther: boolean;
  onEnter: () => void;
}) {
  const tileRef = useRef<HTMLAnchorElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 200, damping: 18, mass: 0.5 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  // 3D tilt
  const rotateY = useTransform(sx, [0, 1], [-14, 14]);
  const rotateX = useTransform(sy, [0, 1], [12, -12]);

  // Shimmer follows cursor across the tile
  const shimmerX = useTransform(sx, [0, 1], [0, 100]);
  const shimmerY = useTransform(sy, [0, 1], [0, 100]);
  const shimmer = useMotionTemplate`radial-gradient(220px circle at ${shimmerX}% ${shimmerY}%, rgba(255,255,255,0.35), transparent 60%)`;

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = tileRef.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  // Constant subtle float — slightly desynced per icon
  const floatDuration = 5 + index * 0.4;
  const floatDelay = index * 0.6;

  return (
    <motion.div
      onMouseEnter={onEnter}
      animate={{
        scale: isActive ? 1.08 : isOther ? 0.92 : 1,
        opacity: isOther ? 0.4 : 1,
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-7"
    >
      {/* Float wrapper */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {/* Active halo */}
        <motion.div
          aria-hidden
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -inset-10 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(200,220,255,0.35) 0%, rgba(255,255,255,0.1) 35%, transparent 70%)",
          }}
        />

        {/* Soft drop shadow under tile */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-full mt-4 h-6 w-32 -translate-x-1/2 rounded-full opacity-50 blur-xl"
          style={{ background: "rgba(0,0,0,0.6)" }}
        />

        <Link
          ref={tileRef}
          href={section.href}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          aria-label={`${section.title} — ${section.tagline}`}
          className="group relative block"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative will-change-transform"
          >
            <GlassTile size={172}>
              <section.Icon />
            </GlassTile>

            {/* Shimmer overlay — follows the cursor over the tile */}
            <motion.div
              aria-hidden
              style={{
                background: shimmer,
                mixBlendMode: "overlay",
              }}
              className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            {/* Iridescent edge that brightens on active */}
            <motion.div
              aria-hidden
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none absolute -inset-px rounded-[29px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.5), transparent 35%, transparent 65%, rgba(255,255,255,0.4))",
                WebkitMask:
                  "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "1px",
              }}
            />
          </motion.div>
        </Link>
      </motion.div>

      {/* Label below tile */}
      <Link
        href={section.href}
        className="relative flex flex-col items-center gap-2 text-center"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">
          / {section.num}
        </span>
        <motion.h3
          animate={{
            color: isActive ? "rgb(255,255,255)" : "rgba(255,255,255,0.78)",
          }}
          transition={{ duration: 0.4 }}
          className="display text-[clamp(1.5rem,2.2vw,2rem)]"
        >
          {section.title}
        </motion.h3>
      </Link>
    </motion.div>
  );
}

function ActiveContent({ section }: { section: Section | null }) {
  return (
    <div className="relative mt-20 flex min-h-[160px] items-start justify-center">
      <AnimatePresence mode="wait">
        {section ? (
          <motion.div
            key={section.num}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full max-w-3xl flex-col items-center gap-7 text-center"
          >
            <p className="max-w-xl text-[17px] leading-relaxed text-white/65">
              {section.tagline}
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
              {section.bullets.map((b, k) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.08 + k * 0.06,
                  }}
                  className="flex items-center gap-2.5 text-[13px] text-white/55"
                >
                  <span className="h-1 w-1 rounded-full bg-white/45" />
                  {b}
                </motion.li>
              ))}
            </ul>
            <Link
              href={section.href}
              className="group mt-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-[13px] text-white/85 backdrop-blur-xl transition-all duration-300 hover:gap-3 hover:bg-white/[0.1] hover:text-white"
            >
              Découvrir {section.title}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h12m0 0L7 1m6 6l-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3 text-white/35"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
              Survolez une icône
            </span>
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-5 w-px bg-gradient-to-b from-transparent to-white/40"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------- Mobile panel ----------------- */

function MobilePanel({
  section,
  index,
}: {
  section: Section;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link
        href={section.href}
        className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/10 p-6"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.012) 100%)",
          backdropFilter: "blur(24px) saturate(160%)",
        }}
      >
        <div className="relative flex shrink-0 items-center" style={{ zIndex: 2 }}>
          <GlassTile size={72}>
            <section.Icon />
          </GlassTile>
        </div>
        <div className="relative flex-1" style={{ zIndex: 2 }}>
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">
            / {section.num}
          </span>
          <h3 className="display mt-1 text-3xl text-white">{section.title}</h3>
          <p className="mt-1 text-[13px] text-white/50">{section.tagline}</p>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 14 14"
          fill="none"
          className="relative shrink-0 text-white/60 transition-transform duration-300 group-hover:translate-x-1"
          style={{ zIndex: 2 }}
        >
          <path
            d="M1 7h12m0 0L7 1m6 6l-6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <section.Visual />
        </div>
      </Link>
    </motion.div>
  );
}

/* ----------------- Visuals (decorative SVG/CSS) ----------------- */

function GridVisual() {
  return (
    <svg
      viewBox="0 0 400 600"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="g1" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M0 0H40V40"
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="0.8"
          />
        </pattern>
        <radialGradient id="r1" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="rgba(180,200,255,0.3)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g1)" />
      <rect width="100%" height="100%" fill="url(#r1)" />
    </svg>
  );
}

function StepsVisual() {
  return (
    <svg
      viewBox="0 0 400 600"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="line1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <line
        x1="60"
        y1="50"
        x2="60"
        y2="550"
        stroke="url(#line1)"
        strokeWidth="1"
      />
      {[100, 220, 340, 460].map((y, i) => (
        <g key={y}>
          <circle
            cx="60"
            cy={y}
            r="6"
            fill="black"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1"
          />
          <line
            x1="80"
            y1={y}
            x2="320"
            y2={y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
        </g>
      ))}
    </svg>
  );
}

function SparkVisual() {
  return (
    <svg
      viewBox="0 0 400 600"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="r2" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <g transform="translate(200 300)">
        <g opacity="0.8">
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="0"
              x2="0"
              y2="-220"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              transform={`rotate(${i * 30})`}
            />
          ))}
        </g>
        <circle r="120" fill="url(#r2)" />
        <circle
          r="60"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.7"
        />
        <circle
          r="100"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.7"
        />
      </g>
    </svg>
  );
}

function DeviceVisual() {
  return (
    <svg
      viewBox="0 0 400 600"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="dev" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
        </linearGradient>
      </defs>
      <rect
        x="50"
        y="120"
        width="220"
        height="160"
        rx="14"
        fill="url(#dev)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="0.7"
      />
      <rect
        x="140"
        y="200"
        width="180"
        height="280"
        rx="22"
        fill="url(#dev)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="0.7"
      />
      <line
        x1="80"
        y1="150"
        x2="240"
        y2="150"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />
      <line
        x1="80"
        y1="170"
        x2="200"
        y2="170"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="1"
      />
      <line
        x1="80"
        y1="190"
        x2="220"
        y2="190"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="1"
      />
    </svg>
  );
}

/* ----------------- Glass tile + icons ----------------- */

function GlassTile({
  children,
  size = 152,
}: {
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-[28px]"
      style={{
        width: size,
        height: size,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 55%, rgba(255,255,255,0.12) 100%)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.22)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(255,255,255,0.05), 0 30px 60px -20px rgba(0,0,0,0.7), 0 0 40px -12px rgba(255,255,255,0.2)",
      }}
    >
      {/* Top gloss */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
      {/* Top-left specular highlight */}
      <div
        className="pointer-events-none absolute -top-px -left-px h-2/5 w-2/5 rounded-tl-[28px]"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.5), transparent 65%)",
        }}
      />
      {/* Bottom subtle highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        }}
      />
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

function ServicesIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <linearGradient id="svc1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.55)" />
        </linearGradient>
        <linearGradient id="svc2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.35)" />
        </linearGradient>
      </defs>
      <rect
        x="8"
        y="14"
        width="40"
        height="28"
        rx="6"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1"
      />
      <rect
        x="12"
        y="18"
        width="40"
        height="28"
        rx="6"
        fill="rgba(255,255,255,0.18)"
        stroke="url(#svc2)"
        strokeWidth="1"
      />
      <rect
        x="16"
        y="22"
        width="40"
        height="28"
        rx="6"
        fill="url(#svc1)"
        fillOpacity="0.85"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.2"
      />
      <line
        x1="22"
        y1="32"
        x2="44"
        y2="32"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="38"
        x2="38"
        y2="38"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ApprocheIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <linearGradient id="app1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.35)" />
        </linearGradient>
      </defs>
      <circle
        cx="32"
        cy="32"
        r="24"
        fill="none"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="1"
      />
      <circle
        cx="32"
        cy="32"
        r="16"
        fill="none"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <path
        d="M32 10 L38 18 L32 14 L26 18 Z"
        fill="url(#app1)"
        stroke="rgba(255,255,255,0.8)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path
        d="M32 14 L32 32"
        stroke="url(#app1)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="3.5" fill="white" />
      <circle
        cx="32"
        cy="32"
        r="6"
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="0.8"
      />
    </svg>
  );
}

function DifferenceIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <radialGradient id="diff1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,1)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.25)" />
        </radialGradient>
      </defs>
      {/* 4-point sparkle */}
      <path
        d="M32 4
           C 33 20 35 27 60 32
           C 35 37 33 44 32 60
           C 31 44 29 37 4 32
           C 29 27 31 20 32 4 Z"
        fill="url(#diff1)"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* tiny secondary sparkles */}
      <path
        d="M12 14 L13.5 17.5 L17 19 L13.5 20.5 L12 24 L10.5 20.5 L7 19 L10.5 17.5 Z"
        fill="rgba(255,255,255,0.7)"
      />
      <path
        d="M50 42 L51 44.5 L53.5 45.5 L51 46.5 L50 49 L49 46.5 L46.5 45.5 L49 44.5 Z"
        fill="rgba(255,255,255,0.55)"
      />
    </svg>
  );
}

function TravauxIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <linearGradient id="tv1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
        </linearGradient>
      </defs>
      {/* Window */}
      <rect
        x="6"
        y="10"
        width="44"
        height="32"
        rx="4"
        fill="rgba(255,255,255,0.14)"
        stroke="url(#tv1)"
        strokeWidth="1.2"
      />
      <line
        x1="6"
        y1="18"
        x2="50"
        y2="18"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
      />
      <circle cx="11" cy="14" r="1.2" fill="rgba(255,255,255,0.8)" />
      <circle cx="15" cy="14" r="1.2" fill="rgba(255,255,255,0.6)" />
      <circle cx="19" cy="14" r="1.2" fill="rgba(255,255,255,0.45)" />
      <rect
        x="11"
        y="23"
        width="20"
        height="3"
        rx="1.5"
        fill="rgba(255,255,255,0.5)"
      />
      <rect
        x="11"
        y="29"
        width="14"
        height="3"
        rx="1.5"
        fill="rgba(255,255,255,0.3)"
      />
      <rect
        x="11"
        y="35"
        width="18"
        height="3"
        rx="1.5"
        fill="rgba(255,255,255,0.22)"
      />
      {/* Phone overlap */}
      <rect
        x="36"
        y="26"
        width="22"
        height="32"
        rx="4"
        fill="rgba(255,255,255,0.88)"
        stroke="rgba(255,255,255,0.95)"
        strokeWidth="1"
      />
      <rect
        x="43"
        y="29"
        width="8"
        height="1.6"
        rx="0.8"
        fill="rgba(0,0,0,0.35)"
      />
      <rect
        x="40"
        y="34"
        width="14"
        height="3"
        rx="1.5"
        fill="rgba(0,0,0,0.18)"
      />
      <rect
        x="40"
        y="40"
        width="14"
        height="14"
        rx="3"
        fill="rgba(0,0,0,0.12)"
      />
    </svg>
  );
}
