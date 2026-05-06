import { ExternalLink, Github } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import type { Project } from "../../types";

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bg = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(34,211,238,0.12), transparent 55%)`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.07 * i }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-850/60 p-6"
    >
      <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ backgroundImage: bg }} />
      <div className="relative">
        <h3 className="text-xl font-semibold text-white">{p.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(p.tech_stack ?? []).map((t) => (
            <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs text-accent-cyan">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          {p.github_url && (
            <a
              href={p.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white"
            >
              <Github className="h-4 w-4" /> Code
            </a>
          )}
          {p.live_url && (
            <a
              href={p.live_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent-violet hover:text-white"
            >
              <ExternalLink className="h-4 w-4" /> Live
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection({ items }: { items: Project[] }) {
  return (
    <section id="projects" className="scroll-mt-28 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-cyan">Projects</h2>
        <p className="mt-3 max-w-2xl text-3xl font-semibold text-white md:text-4xl">Selected work & research builds</p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {items.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
