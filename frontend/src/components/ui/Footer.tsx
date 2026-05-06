import { Github, Linkedin, Mail, Phone } from "lucide-react";

import type { Profile } from "../../types";

export function Footer({ profile }: { profile: Profile | null }) {
  if (!profile) return null;
  return (
    <footer className="border-t border-white/10 bg-ink-900/40 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">{profile.name}</p>
          <p className="text-sm text-slate-400">{profile.location}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-slate-300">
          {profile.phone && (
            <a href={`tel:${profile.phone}`} className="flex items-center gap-2 hover:text-accent-cyan">
              <Phone className="h-4 w-4" /> {profile.phone}
            </a>
          )}
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-accent-cyan">
              <Mail className="h-4 w-4" /> {profile.email}
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-accent-cyan"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          )}
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-accent-cyan"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          )}
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-slate-500">Built with FastAPI · React · Tailwind</p>
    </footer>
  );
}
