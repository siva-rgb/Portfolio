import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

import type { Publication } from "../../types";

export function PublicationsSection({ items }: { items: Publication[] }) {
  return (
    <section id="publications" className="scroll-mt-28 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-violet">Research</h2>
        <p className="mt-3 max-w-2xl text-3xl font-semibold text-white md:text-4xl">Publications</p>

        <div className="mt-12 space-y-6">
          {items.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i }}
              className="glass flex gap-4 rounded-2xl p-6 md:gap-6"
            >
              <BookOpen className="mt-1 h-6 w-6 shrink-0 text-accent-cyan" />
              <div>
                <h3 className="text-lg font-semibold text-white md:text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-400">
                  {p.publisher}
                  {p.date ? ` · ${p.date}` : ""}
                </p>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-accent-cyan hover:underline">
                    View publication
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
