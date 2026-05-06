import { ArrowDownRight, Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import type { Profile } from "../../types";

const ROTATING = ["Data Platforms", "Agentic AI", "ML & Analytics", "Observability"];

export function Hero({ profile }: { profile: Profile | null }) {
  const [label, setLabel] = useState(ROTATING[0]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % ROTATING.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setLabel(ROTATING[idx]);
  }, [idx]);

  if (!profile) return null;

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-16 md:pb-32 md:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-6xl"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/25 bg-accent-cyan/10 px-4 py-1 text-xs font-medium text-accent-cyan">
          <Sparkles className="h-3.5 w-3.5" /> Open to impactful data & AI collaborations
        </div>

        <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl md:leading-[1.08]">
          Hi, I&apos;m{" "}
          <span className="gradient-text">{profile.name.split(" ")[0]}</span>
          <span className="text-white"> — {profile.title}</span>
        </h1>

        <motion.p
          key={label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 max-w-2xl font-mono text-sm text-accent-violet md:text-base"
        >
          Focused on{" "}
          <span className="text-accent-cyan">{label}</span>
        </motion.p>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">{profile.tagline}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet px-6 py-3 text-sm font-semibold text-ink-950 shadow-lg shadow-accent-cyan/20 transition hover:brightness-110"
          >
            Let&apos;s connect
            <ArrowDownRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </a>
          {profile.resume_url ? (
            <a
              href={profile.resume_url}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white hover:border-accent-violet/40"
            >
              <Download className="h-4 w-4" /> Résumé
            </a>
          ) : (
            <span className="glass inline-flex cursor-not-allowed items-center gap-2 rounded-full px-6 py-3 text-sm text-slate-500">
              <Download className="h-4 w-4" /> Add résumé URL in admin
            </span>
          )}
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-32 hidden h-72 w-72 rounded-full border border-white/10 md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      />
    </section>
  );
}
