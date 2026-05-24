"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/approche", label: "Approche" },
  { href: "/difference", label: "Différence" },
  { href: "/travaux", label: "Travaux" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4"
    >
      <nav
        className={`relative flex w-full max-w-5xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 ${
          scrolled
            ? "border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.7)]"
            : "border-white/5 bg-white/[0.02] backdrop-blur-md"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 pl-2 pr-3 py-1"
          aria-label="Lavoie Digital — accueil"
        >
          <div className="relative h-7 w-7 overflow-hidden rounded-md">
            <Image
              src="/logo.png"
              alt=""
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="hidden text-sm font-semibold tracking-tight text-white sm:inline">
            Lavoie Digital
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className="relative">
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/[0.08]"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <Link
                  href={link.href}
                  className={`relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-300 ${
                    active
                      ? "text-white"
                      : "text-white/65 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/booking"
          className="group relative inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-black transition-all duration-300 hover:gap-2.5 hover:bg-white/90"
        >
          Réserver
          <svg
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
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
      </nav>
    </motion.header>
  );
}
