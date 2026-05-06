import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import type { Skill } from "../../types";

export function SkillsSection({ items }: { items: Skill[] }) {
  const cats = useMemo(() => [...new Set(items.map((s) => s.category))], [items]);
  const [tab, setTab] = useState(cats[0] ?? "");

  useEffect(() => {
    if (!tab && cats.length) setTab(cats[0]);
  }, [cats, tab]);

  const filtered = items.filter((s) => s.category === tab);

  return (
    <section id="skills" className="scroll-mt-28 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-rose">Skills</h2>
        <p className="mt-3 max-w-2xl text-3xl font-semibold text-white md:text-4xl">Tools I ship with</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setTab(c)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                tab === c
                  ? "bg-gradient-to-r from-accent-cyan/90 to-accent-violet/90 text-ink-950"
                  : "glass text-slate-200 hover:border-accent-cyan/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.04 * i }}
              className="glass rounded-xl p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium text-white">{s.name}</p>
                <span className="text-xs text-slate-400">{s.proficiency}/5</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.proficiency * 20}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
