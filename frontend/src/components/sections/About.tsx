import { motion } from "framer-motion";

import type { Education, Profile } from "../../types";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.05 * i } }),
};

export function About({ profile, education }: { profile: Profile | null; education: Education[] }) {
  if (!profile) return null;

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
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fade}
          custom={1}
          className="mt-3 max-w-3xl text-3xl font-semibold text-white md:text-4xl"
        >
          Turning messy data into trusted systems — with observability and intelligent automation.
        </motion.p>
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fade}
          custom={2}
          className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300"
        >
          {profile.bio}
        </motion.p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {education.map((e, i) => (
            <motion.div
              key={e.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fade}
              custom={i + 3}
              className="glass rounded-2xl p-6"
            >
              <p className="text-xs uppercase tracking-wider text-slate-400">Education</p>
              <p className="mt-2 text-xl font-semibold text-white">{e.institution}</p>
              <p className="mt-1 text-slate-300">{e.degree}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-400">
                {e.location && <span>{e.location}</span>}
                {e.gpa && <span>GPA: {e.gpa}</span>}
                {e.end_date && <span>Graduated: {e.end_date}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
