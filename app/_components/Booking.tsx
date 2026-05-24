"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SectionHeader } from "./Services";

type FormData = {
  projectType: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
};

const INITIAL: FormData = {
  projectType: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  company: "",
  phone: "",
  message: "",
};

const PROJECT_TYPES = [
  { value: "app", label: "Application full-stack", desc: "SaaS, dashboard, outil interne" },
  { value: "site", label: "Site web premium", desc: "Vitrine, e-commerce, landing" },
  { value: "branding", label: "Branding digital", desc: "Identité, design system" },
  { value: "autre", label: "Autre projet", desc: "Parlons-en directement" },
];

const BUDGETS = [
  { value: "5k", label: "Moins de 5 000 $" },
  { value: "5-15k", label: "5 000 — 15 000 $" },
  { value: "15-40k", label: "15 000 — 40 000 $" },
  { value: "40k+", label: "Plus de 40 000 $" },
];

const TIMELINES = [
  { value: "asap", label: "Dès que possible" },
  { value: "1-3", label: "Dans 1 à 3 mois" },
  { value: "3-6", label: "Dans 3 à 6 mois" },
  { value: "flex", label: "Flexible" },
];

const TOTAL_STEPS = 4;

export default function Booking() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const next = () => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const canNext = () => {
    if (step === 0) return !!data.projectType;
    if (step === 1) return !!data.budget;
    if (step === 2) return !!data.timeline;
    if (step === 3) return data.name.length > 1 && /.+@.+\..+/.test(data.email);
    return false;
  };

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erreur lors de l'envoi");
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="relative z-10 px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Réserver"
          title="Parlons de votre projet."
          sub="Quelques questions pour cadrer le projet. On revient vers vous sous 24 heures avec un appel et une première piste."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/12 p-6 sm:p-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
            backdropFilter: "blur(28px) saturate(180%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.1), 0 50px 120px -30px rgba(0,0,0,0.7)",
          }}
        >
          {/* Glow */}
          <div
            className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60%] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse, rgba(180,200,255,0.18), transparent 70%)",
            }}
          />

          {done ? (
            <SuccessView data={data} onReset={() => { setDone(false); setStep(0); setData(INITIAL); }} />
          ) : (
            <>
              <ProgressBar step={step} total={TOTAL_STEPS} />

              <div className="relative mt-10 min-h-[340px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {step === 0 && (
                      <StepRadioGrid
                        title="Quel type de projet ?"
                        sub="Choisissez la catégorie qui se rapproche le plus de votre besoin."
                        value={data.projectType}
                        onChange={(v) => update("projectType", v)}
                        options={PROJECT_TYPES}
                      />
                    )}
                    {step === 1 && (
                      <StepRadioGrid
                        title="Quel est votre budget ?"
                        sub="Aucun jugement — ça nous aide à proposer la meilleure approche."
                        value={data.budget}
                        onChange={(v) => update("budget", v)}
                        options={BUDGETS}
                        columns={2}
                      />
                    )}
                    {step === 2 && (
                      <StepRadioGrid
                        title="Quand voulez-vous démarrer ?"
                        sub="Pour qu'on puisse vous placer dans notre échéancier."
                        value={data.timeline}
                        onChange={(v) => update("timeline", v)}
                        options={TIMELINES}
                        columns={2}
                      />
                    )}
                    {step === 3 && (
                      <ContactStep data={data} onChange={update} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {error && (
                <p className="mt-6 text-sm text-red-300/90">{error}</p>
              )}

              <div className="mt-10 flex items-center justify-between gap-3">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/65 transition-all hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ← Retour
                </button>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">
                  Étape {step + 1} / {TOTAL_STEPS}
                </span>
                {step < TOTAL_STEPS - 1 ? (
                  <button
                    onClick={next}
                    disabled={!canNext()}
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-all hover:gap-3 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Suivant
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7h12m0 0L7 1m6 6l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={submit}
                    disabled={!canNext() || submitting}
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-all hover:gap-3 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? "Envoi…" : "Envoyer la demande"}
                    {!submitting && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h12m0 0L7 1m6 6l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </motion.div>

        {/* Direct contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-5 text-center backdrop-blur-md sm:flex-row sm:text-left"
        >
          <div>
            <p className="text-sm text-white/80">Préfère écrire directement ?</p>
            <p className="text-[13px] text-white/50">
              Email, téléphone — on est joignables.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[13px]">
            <a
              href="mailto:info@lavoiedigital.ca"
              className="link-underline text-white/90"
            >
              info@lavoiedigital.ca
            </a>
            <span className="hidden text-white/15 sm:inline">·</span>
            <a href="tel:+15142901648" className="link-underline text-white/90">
              +1 (514) 290-1648
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/8"
        >
          <motion.div
            initial={false}
            animate={{ scaleX: i <= step ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="absolute inset-0 bg-white"
          />
        </div>
      ))}
    </div>
  );
}

function StepRadioGrid({
  title,
  sub,
  value,
  onChange,
  options,
  columns = 2,
}: {
  title: string;
  sub: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; desc?: string }[];
  columns?: 1 | 2;
}) {
  return (
    <div>
      <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
        {title}
      </h3>
      <p className="mt-2 text-[15px] text-white/55">{sub}</p>
      <div
        className={`mt-8 grid gap-3 ${
          columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-1"
        }`}
      >
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`group relative flex flex-col items-start gap-1 rounded-2xl border p-5 text-left transition-all duration-300 ${
                selected
                  ? "border-white/30 bg-white/[0.08]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <span className="text-[15px] font-medium text-white">
                {opt.label}
              </span>
              {opt.desc && (
                <span className="text-[13px] text-white/50">{opt.desc}</span>
              )}
              <span
                className={`absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                  selected
                    ? "border-white bg-white"
                    : "border-white/20 bg-transparent"
                }`}
              >
                {selected && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ContactStep({
  data,
  onChange,
}: {
  data: FormData;
  onChange: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
}) {
  return (
    <div>
      <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
        Vos coordonnées
      </h3>
      <p className="mt-2 text-[15px] text-white/55">
        On vous revient sous 24 heures avec un appel découverte.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Nom complet *"
          value={data.name}
          onChange={(v) => onChange("name", v)}
          placeholder="Marie Tremblay"
        />
        <Field
          label="Courriel *"
          type="email"
          value={data.email}
          onChange={(v) => onChange("email", v)}
          placeholder="marie@entreprise.ca"
        />
        <Field
          label="Entreprise"
          value={data.company}
          onChange={(v) => onChange("company", v)}
          placeholder="Boulangerie du Quartier"
        />
        <Field
          label="Téléphone"
          type="tel"
          value={data.phone}
          onChange={(v) => onChange("phone", v)}
          placeholder="(514) 555-0123"
        />
      </div>
      <div className="mt-4">
        <Field
          label="Parlez-nous de votre projet"
          value={data.message}
          onChange={(v) => onChange("message", v)}
          placeholder="Ce qu'on veut accomplir, ce qui vous tient à cœur, contraintes connues…"
          multiline
        />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
}) {
  const cls =
    "peer w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-[15px] text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-white/30 focus:bg-white/[0.05]";
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={cls + " resize-none"}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}

function SuccessView({
  data,
  onReset,
}: {
  data: FormData;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center py-8 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 180, damping: 14 }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M6 14l5 5 11-11"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <h3 className="mt-8 text-[clamp(1.8rem,3vw,2.4rem)] font-semibold tracking-tight text-white">
        Merci, {data.name.split(" ")[0]}.
      </h3>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/55">
        On a bien reçu votre demande. Vous recevrez un courriel de notre part à{" "}
        <span className="text-white/85">{data.email}</span> sous 24&nbsp;heures
        pour planifier un appel découverte.
      </p>
      <button
        onClick={onReset}
        className="mt-8 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
      >
        Soumettre une autre demande
      </button>
    </motion.div>
  );
}
