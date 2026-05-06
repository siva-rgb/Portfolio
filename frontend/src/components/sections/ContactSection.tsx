import { Phone, Send } from "lucide-react";
import { motion } from "framer-motion";

import type { Profile } from "../../types";

export function ContactSection({ profile }: { profile: Profile | null }) {
  if (!profile) return null;

  return (
    <section id="contact" className="scroll-mt-28 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass relative overflow-hidden rounded-3xl p-8 md:p-12"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-violet/10" />
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-cyan">Contact</h2>
              <p className="mt-4 text-3xl font-semibold text-white md:text-4xl">Let&apos;s build something reliable.</p>
              <p className="mt-4 text-slate-300">
                Reach out for collaborations on data quality, observability, or Agentic AI solutions.
              </p>
            </div>
            <div className="space-y-4 text-sm text-slate-200">
              {profile.phone && (
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-accent-cyan/40"
                >
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-slate-400">Phone</span>
                    <span className="mt-0.5 block font-medium text-white">{profile.phone}</span>
                  </span>
                  <Phone className="h-4 w-4 shrink-0 text-accent-cyan" />
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-accent-cyan/40"
                >
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-slate-400">Email</span>
                    <span className="mt-0.5 block font-medium text-white">{profile.email}</span>
                  </span>
                  <Send className="h-4 w-4 shrink-0 text-accent-cyan" />
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-accent-violet/40"
                >
                  LinkedIn
                </a>
              )}
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-accent-rose/40"
                >
                  GitHub
                </a>
              )}
              {!profile.phone && !profile.email && (
                <p className="text-slate-500">Add your phone and email in the admin panel.</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
