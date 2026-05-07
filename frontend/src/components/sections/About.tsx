import { motion } from "framer-motion";
import { BrainCircuit, GraduationCap, MapPin, Sparkles } from "lucide-react";

import type { Education, Profile } from "../../types";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.05 * i } }),
};

const highlightChips = [
  "Agentic AI",
  "Machine Learning",
  "Data Observability",
  "RAG",
  "ETL Pipelines",
  "MLOps",
  "Cloud Platformas(AWS, Azure)",
];

function formatBio(bio: string) {
  const parts = bio
    .split(/[.;]/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length <= 2) return [bio];
  return [parts.slice(0, 2).join(". ") + ".", parts.slice(2, 4).join(". ") + "."].filter((p) => p !== ".");
}

export function About({ profile, education }: { profile: Profile | null; education: Education[] }) {
  if (!profile) return null;
  const bioBlocks = formatBio(profile.bio);

  return (
    <section id="about" className="scroll-mt-28 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fade}
          custom={0}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-cyan"
        >
          About
        </motion.h2>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fade}
            custom={1}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-white/2 to-transparent p-7 backdrop-blur-xl light:border-slate-200 light:from-white light:via-white"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-accent-cyan/20 blur-3xl" />
            <p className="max-w-3xl text-3xl font-semibold leading-tight text-white light:text-slate-900 md:text-4xl">
              Creating production-ready AI solutions across backend engineering, machine learning, and cloud platforms
            </p>

            <div className="mt-6 space-y-4 text-[1.03rem] leading-relaxed text-slate-300 light:text-slate-700">
              {bioBlocks.map((block) => (
                <p key={block}>{block}</p>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {highlightChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium tracking-wide text-slate-200 light:border-slate-300 light:bg-slate-100 light:text-slate-700"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="space-y-5">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fade}
              custom={2}
              className="glass rounded-2xl p-5"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Quick Snapshot</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-lg bg-accent-cyan/20 p-2 text-accent-cyan">
                    <BrainCircuit className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white light:text-slate-900">Role Focus</p>
                    <p className="text-sm text-slate-400 light:text-slate-600">{profile.title}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-lg bg-accent-violet/20 p-2 text-accent-violet">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white light:text-slate-900">Location</p>
                    <p className="text-sm text-slate-400 light:text-slate-600">{profile.location || "India"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-lg bg-accent-rose/20 p-2 text-accent-rose">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white light:text-slate-900">Specialization</p>
                    <p className="text-sm text-slate-400 light:text-slate-600">
                      AI-driven data products and scalable cloud systems
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {education.map((e, i) => (
              <motion.div
                key={e.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fade}
                custom={i + 3}
                className="glass rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <GraduationCap className="h-4 w-4" /> Education
                </div>
                <p className="mt-3 text-lg font-semibold text-white light:text-slate-900">{e.institution}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300 light:text-slate-700">{e.degree}</p>
                <div className="mt-4 flex flex-wrap gap-2.5 text-xs text-slate-300 light:text-slate-600">
                  {e.location && (
                    <span className="rounded-full bg-white/5 px-2.5 py-1 light:bg-slate-100">{e.location}</span>
                  )}
                  {e.gpa && <span className="rounded-full bg-white/5 px-2.5 py-1 light:bg-slate-100">GPA {e.gpa}</span>}
                  {e.end_date && (
                    <span className="rounded-full bg-white/5 px-2.5 py-1 light:bg-slate-100">Graduated {e.end_date}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
