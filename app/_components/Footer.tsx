"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/8 bg-black/40 backdrop-blur-md">
      {/* Giant wordmark */}
      <div className="relative overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="display select-none px-6 pt-20 pb-10 text-center text-[clamp(3.5rem,16vw,14rem)] leading-[0.85] text-white sm:px-10"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.15) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          LAVOIE DIGITAL
        </motion.h2>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-12 sm:grid-cols-4 sm:px-10">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Lavoie Digital"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-white">Lavoie Digital</p>
              <p className="text-[12px] text-white/40">Studio code &amp; web · Québec</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-white/55">
            Applications full-stack et expériences web haut de gamme pour
            les PME du Québec. Conçus pour durer, optimisés pour convertir.
          </p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
            Navigation
          </p>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            <li><a href="/services" className="link-underline text-white/70 hover:text-white">Services</a></li>
            <li><a href="/approche" className="link-underline text-white/70 hover:text-white">Approche</a></li>
            <li><a href="/difference" className="link-underline text-white/70 hover:text-white">Différence</a></li>
            <li><a href="/travaux" className="link-underline text-white/70 hover:text-white">Travaux</a></li>
            <li><a href="/booking" className="link-underline text-white/70 hover:text-white">Réserver</a></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
            Contact
          </p>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            <li><a href="mailto:bonjour@lavoie.digital" className="link-underline text-white/70 hover:text-white">bonjour@lavoie.digital</a></li>
            <li><a href="tel:+14180000000" className="link-underline text-white/70 hover:text-white">+1 (418) 000-0000</a></li>
            <li><a href="#" className="link-underline text-white/70 hover:text-white">Instagram</a></li>
            <li><a href="#" className="link-underline text-white/70 hover:text-white">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-white/8 px-6 py-6 text-[12px] text-white/40 sm:flex-row sm:items-center sm:px-10">
        <p>© {new Date().getFullYear()} Lavoie Digital. Tous droits réservés.</p>
        <p className="font-mono uppercase tracking-[0.22em]">
          Conçu &amp; codé à Québec
        </p>
      </div>
    </footer>
  );
}
