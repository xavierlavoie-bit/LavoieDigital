"use client";

import { motion } from "motion/react";
import Link from "next/link";

type Item = { href: string; label: string; eyebrow?: string };

export default function PageNav({
  prev,
  next,
}: {
  prev?: Item;
  next?: Item;
}) {
  return (
    <section className="relative z-10 px-6 pb-16 sm:px-10 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <div
          className="grid grid-cols-1 gap-3 overflow-hidden rounded-3xl border border-white/10 md:grid-cols-2"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.008) 100%)",
            backdropFilter: "blur(24px) saturate(160%)",
          }}
        >
          {prev ? (
            <NavTile item={prev} direction="prev" />
          ) : (
            <div className="hidden md:block" />
          )}
          {next ? <NavTile item={next} direction="next" /> : null}
        </div>
      </div>
    </section>
  );
}

function NavTile({
  item,
  direction,
}: {
  item: Item;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
    >
      <Link
        href={item.href}
        className={`group relative flex h-full items-center justify-between gap-6 p-8 transition-colors duration-500 hover:bg-white/[0.03] sm:p-10 ${
          isNext ? "text-right md:flex-row-reverse" : ""
        }`}
      >
        <div className={`flex-1 ${isNext ? "md:text-right" : ""}`}>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
            {item.eyebrow ?? (isNext ? "Suivant" : "Précédent")}
          </span>
          <h4 className="display mt-3 text-[clamp(1.6rem,3vw,2.4rem)] text-white">
            {item.label}
          </h4>
        </div>
        <svg
          width="28"
          height="28"
          viewBox="0 0 14 14"
          fill="none"
          className={`shrink-0 text-white/70 transition-all duration-500 group-hover:text-white ${
            isNext
              ? "group-hover:translate-x-1"
              : "rotate-180 group-hover:-translate-x-1"
          }`}
        >
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
  );
}
