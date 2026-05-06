import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { AnimatedBackground } from "../components/ui/AnimatedBackground";
import { Footer } from "../components/ui/Footer";
import { Navbar } from "../components/ui/Navbar";
import { About } from "../components/sections/About";
import { CertsSection } from "../components/sections/CertsSection";
import { ContactSection } from "../components/sections/ContactSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { Hero } from "../components/sections/Hero";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { PublicationsSection } from "../components/sections/PublicationsSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import {
  fetchCertifications,
  fetchEducation,
  fetchExperience,
  fetchProfile,
  fetchProjects,
  fetchPublications,
  fetchSkills,
} from "../lib/api";
import { trackPageView } from "../lib/tracking";
import type {
  Certification,
  Education,
  Experience,
  Profile,
  Project,
  Publication,
  Skill,
} from "../types";

export function PortfolioPage() {
  const location = useLocation();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certs, setCerts] = useState<Certification[]>([]);
  const [pubs, setPubs] = useState<Publication[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackPageView(location.pathname || "/");
  }, [location.pathname]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [p, e, x, pr, sk, ce, pu] = await Promise.all([
          fetchProfile(),
          fetchEducation(),
          fetchExperience(),
          fetchProjects(),
          fetchSkills(),
          fetchCertifications(),
          fetchPublications(),
        ]);
        if (!cancelled) {
          setProfile(p);
          setEducation(e);
          setExperience(x);
          setProjects(pr);
          setSkills(sk);
          setCerts(ce);
          setPubs(pu);
        }
      } catch {
        if (!cancelled) setError("Could not load portfolio. Is the API running on :8000?");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <AnimatedBackground />
        <p className="max-w-md text-lg text-slate-200">{error}</p>
        <code className="rounded-lg bg-black/40 px-4 py-2 text-sm text-accent-cyan">
          cd backend &amp;&amp; uvicorn app.main:app --reload
        </code>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar profile={profile} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} education={education} />
        <ExperienceSection items={experience} />
        <ProjectsSection items={projects} />
        <SkillsSection items={skills} />
        <CertsSection items={certs} />
        <PublicationsSection items={pubs} />
        <ContactSection profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
