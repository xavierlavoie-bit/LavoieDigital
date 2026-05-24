"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.6 });

  // Rotate logo & shapes off the mouse
  const rotateY = useTransform(smx, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(smy, [-0.5, 0.5], [10, -10]);
  const orb1X = useTransform(smx, [-0.5, 0.5], [-40, 40]);
  const orb1Y = useTransform(smy, [-0.5, 0.5], [-20, 20]);
  const orb2X = useTransform(smx, [-0.5, 0.5], [30, -30]);
  const orb2Y = useTransform(smy, [-0.5, 0.5], [20, -20]);

  // Scroll-driven zoom-out on the logo card
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Mouse spotlight overlay */}
      <div className="spotlight pointer-events-none absolute inset-0 z-[1]" />

      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col items-center justify-center px-6 pt-28 pb-20 text-center sm:px-10"
      >
        {/* Eyebrow chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass mb-10 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-[11px] tracking-[0.18em] uppercase text-white/70"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          Studio code &amp; web · Québec · Est. 2026
        </motion.div>

        {/* 3D Floating logo */}
        <div
          className="relative mb-12 [perspective:1400px]"
          aria-hidden="true"
        >
          {/* Orbiting glass shapes */}
          <motion.div
            style={{ x: orb1X, y: orb1Y }}
            className="pointer-events-none absolute -top-10 -left-24 hidden h-40 w-40 sm:block"
          >
            <div
              className="h-full w-full rounded-[28px] border border-white/15 bg-gradient-to-br from-white/15 to-white/[0.02] backdrop-blur-xl"
              style={{
                transform: "rotateZ(-12deg)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.18), 0 30px 80px -20px rgba(0,0,0,0.7)",
              }}
            />
          </motion.div>

          <motion.div
            style={{ x: orb2X, y: orb2Y }}
            className="pointer-events-none absolute -bottom-12 -right-28 hidden h-44 w-44 sm:block"
          >
            <div
              className="h-full w-full rounded-full border border-white/15 bg-gradient-to-br from-white/15 to-white/[0.02] backdrop-blur-xl"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.18), 0 30px 80px -20px rgba(0,0,0,0.7)",
              }}
            />
          </motion.div>

          {/* Logo plate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateX: -20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative inline-block will-change-transform"
          >
            <div
              className="relative rounded-3xl border border-white/10 p-6 sm:p-8"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(24px) saturate(180%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(255,255,255,0.04), 0 40px 100px -20px rgba(0,0,0,0.8), 0 0 60px -10px rgba(232,240,255,0.15)",
              }}
            >
              <Image
                src="/logo.png"
                alt="Lavoie Digital"
                width={420}
                height={420}
                priority
                className="h-32 w-32 object-contain sm:h-44 sm:w-44"
                style={{ transform: "translateZ(40px)" }}
              />
              {/* Glossy reflection */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.08) 50%, transparent 65%)",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="display text-balance text-[clamp(2.8rem,8vw,7rem)] text-white"
        >
          On code,{" "}
          <span className="shine inline-block">vous grandissez.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-pretty mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
        >
          Applications full-stack et expériences web haut de gamme pour les
          PME du Québec. Code production, esthétique hors du commun, suivi
          client&nbsp;illimité.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton href="/booking">
            Réserver un appel
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
            >
              <path
                d="M1 7h12m0 0L7 1m6 6l-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MagneticButton>
          <MagneticButton href="/services" variant="ghost">
            Voir nos services
          </MagneticButton>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/35"
        >
          <div className="flex flex-col items-center gap-2">
            <span>Défilez</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-6 w-px bg-gradient-to-b from-white/40 to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
