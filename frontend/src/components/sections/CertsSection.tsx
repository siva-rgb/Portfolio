import { Award } from "lucide-react";
import { motion } from "framer-motion";

import type { Certification } from "../../types";

export function CertsSection({ items }: { items: Certification[] }) {
  return (
    <section id="certs" className="scroll-mt-28 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-cyan">Certifications</h2>
        <p className="mt-3 max-w-2xl text-3xl font-semibold text-white md:text-4xl">Credentials & training</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i }}
              className="glass flex gap-4 rounded-2xl p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-violet/15 text-accent-violet">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{c.name}</p>
                <p className="text-sm text-slate-400">{c.issuer}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                  {c.credential_id && <span>ID: {c.credential_id}</span>}
                  {c.date && <span>{c.date}</span>}
                </div>
                {c.url && (
                  <a href={c.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-accent-cyan hover:underline">
                    Verify
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
