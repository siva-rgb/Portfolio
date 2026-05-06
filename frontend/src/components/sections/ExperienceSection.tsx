import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";

import type { Experience } from "../../types";

export function ExperienceSection({ items }: { items: Experience[] }) {
  return (
    <section id="experience" className="scroll-mt-28 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-violet">Experience</h2>
        <p className="mt-3 max-w-2xl text-3xl font-semibold text-white md:text-4xl">Where I&apos;ve built impact</p>

        <div className="relative mt-12 space-y-10 border-l border-white/10 pl-8 md:pl-10">
          {items.map((x, i) => (
            <motion.article
              key={x.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i }}
              className="relative"
            >
              <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full border border-accent-cyan/40 bg-ink-900 text-accent-cyan md:-left-[49px]">
                <Briefcase className="h-4 w-4" />
              </span>
              <div className="glass rounded-2xl p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{x.role}</h3>
                    <p className="text-slate-300">
                      {x.company}
                      {x.location ? ` · ${x.location}` : ""}
                    </p>
                  </div>
                  <p className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {x.start_date} — {x.end_date}
                  </p>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
                  {(x.bullets ?? []).map((b, bi) => (
                    <li key={`${x.id}-${bi}`}>{b}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
