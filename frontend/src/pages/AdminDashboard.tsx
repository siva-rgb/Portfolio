import { LogOut, Plus, Pencil, Trash2 } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { AnalyticsPanel } from "../components/admin/AnalyticsPanel";
import { useAuth } from "../context/AuthContext";
import {
  changePassword,
  crudCert,
  crudEducation,
  crudExperience,
  crudProject,
  crudPublication,
  crudSkill,
  fetchCertifications,
  fetchEducation,
  fetchExperience,
  fetchProfile,
  fetchProjects,
  fetchPublications,
  fetchSkills,
  updateProfile,
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

type Tab =
  | "profile"
  | "education"
  | "experience"
  | "projects"
  | "skills"
  | "certifications"
  | "publications"
  | "analytics";

export function AdminDashboardPage() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("profile");

  const [profile, setProfile] = useState<Profile | null>(null);
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certs, setCerts] = useState<Certification[]>([]);
  const [pubs, setPubs] = useState<Publication[]>([]);

  const [pwdCurrent, setPwdCurrent] = useState("");
  const [pwdNew, setPwdNew] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }
    trackPageView("/admin");
  }, [token, navigate]);

  async function reload() {
    const [p, e, x, pr, sk, ce, pu] = await Promise.all([
      fetchProfile(),
      fetchEducation(),
      fetchExperience(),
      fetchProjects(),
      fetchSkills(),
      fetchCertifications(),
      fetchPublications(),
    ]);
    setProfile(p);
    setEducation(e);
    setExperience(x);
    setProjects(pr);
    setSkills(sk);
    setCerts(ce);
    setPubs(pu);
  }

  useEffect(() => {
    if (!token) return;
    reload().catch(() => toast.error("Failed to load data"));
  }, [token]);

  async function saveProfile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!profile) return;
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;
    try {
      const updated = await updateProfile(payload);
      setProfile(updated);
      toast.success("Profile saved");
    } catch {
      toast.error("Save failed");
    }
  }

  async function onChangePassword(e: FormEvent) {
    e.preventDefault();
    try {
      await changePassword(pwdCurrent, pwdNew);
      toast.success("Password updated");
      setPwdCurrent("");
      setPwdNew("");
    } catch {
      toast.error("Could not change password");
    }
  }

  function signOut() {
    logout();
    navigate("/admin/login");
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "profile", label: "Profile" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "certifications", label: "Certs" },
    { id: "publications", label: "Publications" },
    { id: "analytics", label: "Analytics" },
  ];

  return (
    <div className="flex min-h-screen bg-ink-950 text-slate-100">
      <aside className="hidden w-56 shrink-0 border-r border-white/10 bg-ink-900/50 p-4 md:block">
        <p className="text-xs uppercase tracking-wider text-slate-500">Admin</p>
        <nav className="mt-4 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                tab === t.id ? "bg-accent-cyan/15 text-accent-cyan" : "text-slate-300 hover:bg-white/5"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div className="mt-8 space-y-2 border-t border-white/10 pt-4">
          <Link to="/" className="block text-sm text-slate-400 hover:text-white">
            View site
          </Link>
          <button type="button" onClick={signOut} className="flex items-center gap-2 text-sm text-rose-300 hover:text-rose-200">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-4 md:p-8">
        <div className="mb-6 flex flex-wrap gap-2 md:hidden">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-full px-3 py-1 text-xs ${
                tab === t.id ? "bg-accent-cyan/20 text-accent-cyan" : "bg-white/5"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "profile" && profile && (
          <div className="mx-auto max-w-3xl space-y-10">
            <h1 className="text-2xl font-semibold text-white">Profile</h1>
            <form onSubmit={saveProfile} className="glass space-y-4 rounded-2xl p-6">
              {(
                [
                  ["name", profile.name],
                  ["title", profile.title],
                  ["tagline", profile.tagline],
                  ["bio", profile.bio],
                  ["location", profile.location],
                  ["phone", profile.phone],
                  ["email", profile.email],
                  ["linkedin", profile.linkedin],
                  ["github", profile.github],
                  ["resume_url", profile.resume_url],
                  ["photo_url", profile.photo_url],
                ] as const
              ).map(([key, val]) => (
                <label key={key} className="block text-sm">
                  <span className="text-slate-400">{key}</span>
                  {key === "bio" ? (
                    <textarea
                      name={key}
                      defaultValue={val}
                      rows={4}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
                    />
                  ) : (
                    <input
                      name={key}
                      defaultValue={val}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
                    />
                  )}
                </label>
              ))}
              <button type="submit" className="rounded-lg bg-accent-cyan px-4 py-2 text-sm font-semibold text-ink-950">
                Save profile
              </button>
            </form>

            <form onSubmit={onChangePassword} className="glass space-y-4 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white">Change password</h2>
              <input
                type="password"
                placeholder="Current"
                value={pwdCurrent}
                onChange={(e) => setPwdCurrent(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
              />
              <input
                type="password"
                placeholder="New (min 6 chars)"
                value={pwdNew}
                onChange={(e) => setPwdNew(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
              />
              <button type="submit" className="rounded-lg bg-accent-violet px-4 py-2 text-sm font-semibold text-white">
                Update password
              </button>
            </form>
          </div>
        )}

        {tab === "education" && (
          <EducationAdmin items={education} onChanged={reload} />
        )}
        {tab === "experience" && (
          <ExperienceAdmin items={experience} onChanged={reload} />
        )}
        {tab === "projects" && <ProjectsAdmin items={projects} onChanged={reload} />}
        {tab === "skills" && <SkillsAdmin items={skills} onChanged={reload} />}
        {tab === "certifications" && <CertsAdmin items={certs} onChanged={reload} />}
        {tab === "publications" && <PubsAdmin items={pubs} onChanged={reload} />}
        {tab === "analytics" && (
          <div className="mx-auto max-w-6xl">
            <h1 className="mb-6 text-2xl font-semibold text-white">Analytics</h1>
            <AnalyticsPanel />
          </div>
        )}
      </main>
    </div>
  );
}

function EducationAdmin({ items, onChanged }: { items: Education[]; onChanged: () => Promise<void> }) {
  const [editing, setEditing] = useState<Education | null>(null);

  async function save(form: Education) {
    try {
      const { id, ...rest } = form;
      if (id && id > 0) await crudEducation("PUT", rest, id);
      else await crudEducation("POST", rest);
      toast.success("Saved");
      setEditing(null);
      await onChanged();
    } catch {
      toast.error("Save failed");
    }
  }

  async function del(id: number) {
    if (!confirm("Delete?")) return;
    await crudEducation("DELETE", undefined, id);
    toast.success("Deleted");
    await onChanged();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Education</h1>
        <button
          type="button"
          onClick={() => setEditing({ id: 0, institution: "", degree: "", location: "", gpa: "", start_date: "", end_date: "" })}
          className="inline-flex items-center gap-2 rounded-lg bg-accent-cyan/20 px-3 py-2 text-sm text-accent-cyan"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
      {items.map((e) => (
        <div key={e.id} className="glass flex flex-wrap items-center justify-between gap-4 rounded-xl p-4">
          <div>
            <p className="font-medium text-white">{e.institution}</p>
            <p className="text-sm text-slate-400">{e.degree}</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setEditing(e)} className="rounded-lg bg-white/10 p-2 hover:bg-white/20">
              <Pencil className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => del(e.id)} className="rounded-lg bg-rose-500/20 p-2 text-rose-300">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
      {editing && (
        <Modal title={editing.id ? "Edit education" : "Add education"} onClose={() => setEditing(null)}>
          <EducationForm initial={editing} onSave={save} />
        </Modal>
      )}
    </div>
  );
}

function EducationForm({
  initial,
  onSave,
}: {
  initial: Education;
  onSave: (x: Education) => Promise<void>;
}) {
  const [form, setForm] = useState(initial);
  useEffect(() => setForm(initial), [initial]);
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        void onSave(form);
      }}
    >
      {(["institution", "degree", "location", "gpa", "start_date", "end_date"] as const).map((k) => (
        <label key={k} className="block text-sm">
          <span className="text-slate-400">{k}</span>
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white"
            value={(form as never)[k]}
            onChange={(e) => setForm({ ...form, [k]: e.target.value })}
          />
        </label>
      ))}
      <button type="submit" className="w-full rounded-lg bg-accent-cyan py-2 text-sm font-semibold text-ink-950">
        Save
      </button>
    </form>
  );
}

function ExperienceAdmin({ items, onChanged }: { items: Experience[]; onChanged: () => Promise<void> }) {
  const [editing, setEditing] = useState<Experience | null>(null);

  async function save(payload: Experience & { bulletsText?: string }) {
    const bullets = (payload.bulletsText ?? "").split("\n").map((s) => s.trim()).filter(Boolean);
    const body = {
      company: payload.company,
      role: payload.role,
      location: payload.location,
      start_date: payload.start_date,
      end_date: payload.end_date,
      is_current: payload.is_current,
      sort_order: payload.sort_order,
      bullets,
    };
    try {
      if (payload.id && payload.id > 0) await crudExperience("PUT", body, payload.id);
      else await crudExperience("POST", body);
      toast.success("Saved");
      setEditing(null);
      await onChanged();
    } catch {
      toast.error("Save failed");
    }
  }

  async function del(id: number) {
    if (!confirm("Delete?")) return;
    await crudExperience("DELETE", undefined, id);
    toast.success("Deleted");
    await onChanged();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Experience</h1>
        <button
          type="button"
          onClick={() =>
            setEditing({
              id: 0,
              company: "",
              role: "",
              location: "",
              start_date: "",
              end_date: "",
              is_current: false,
              sort_order: 0,
              bullets: [],
              bulletsText: "",
            } as Experience & { bulletsText: string })
          }
          className="inline-flex items-center gap-2 rounded-lg bg-accent-cyan/20 px-3 py-2 text-sm text-accent-cyan"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
      {items.map((x) => (
        <div key={x.id} className="glass flex flex-wrap items-center justify-between gap-4 rounded-xl p-4">
          <div>
            <p className="font-medium text-white">
              {x.role} @ {x.company}
            </p>
            <p className="text-sm text-slate-400">
              {x.start_date} — {x.end_date}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setEditing({ ...x, bulletsText: (x.bullets ?? []).join("\n") } as Experience & { bulletsText: string })}
              className="rounded-lg bg-white/10 p-2 hover:bg-white/20"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => del(x.id)} className="rounded-lg bg-rose-500/20 p-2 text-rose-300">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
      {editing && (
        <Modal title={editing.id ? "Edit experience" : "Add experience"} onClose={() => setEditing(null)}>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              save({
                ...editing,
                company: String(fd.get("company") ?? ""),
                role: String(fd.get("role") ?? ""),
                location: String(fd.get("location") ?? ""),
                start_date: String(fd.get("start_date") ?? ""),
                end_date: String(fd.get("end_date") ?? ""),
                is_current: fd.get("is_current") === "on",
                sort_order: Number(fd.get("sort_order") ?? 0),
                bulletsText: String(fd.get("bullets") ?? ""),
              });
            }}
          >
            {(["company", "role", "location", "start_date", "end_date"] as const).map((k) => (
              <label key={k} className="block text-sm capitalize">
                <span className="text-slate-400">{k.replace("_", " ")}</span>
                <input
                  name={k}
                  defaultValue={(editing as never)[k] as string}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white"
                />
              </label>
            ))}
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" name="is_current" defaultChecked={editing.is_current} /> Current role
            </label>
            <label className="block text-sm">
              <span className="text-slate-400">sort_order</span>
              <input
                name="sort_order"
                type="number"
                defaultValue={editing.sort_order}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white"
              />
            </label>
            <label className="block text-sm">
              <span className="text-slate-400">Bullets (one per line)</span>
              <textarea
                name="bullets"
                defaultValue={(editing as Experience & { bulletsText?: string }).bulletsText ?? ""}
                rows={6}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white"
              />
            </label>
            <button type="submit" className="w-full rounded-lg bg-accent-cyan py-2 text-sm font-semibold text-ink-950">
              Save
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function ProjectsAdmin({ items, onChanged }: { items: Project[]; onChanged: () => Promise<void> }) {
  const [editing, setEditing] = useState<Project | null>(null);

  async function save(fd: FormData) {
    const tech = String(fd.get("tech_stack") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const body = {
      title: String(fd.get("title") ?? ""),
      description: String(fd.get("description") ?? ""),
      tech_stack: tech,
      github_url: String(fd.get("github_url") ?? ""),
      live_url: String(fd.get("live_url") ?? ""),
      image_url: String(fd.get("image_url") ?? ""),
      featured: fd.get("featured") === "on",
      sort_order: Number(fd.get("sort_order") ?? 0),
    };
    try {
      if (editing?.id) await crudProject("PUT", body, editing.id);
      else await crudProject("POST", body);
      toast.success("Saved");
      setEditing(null);
      await onChanged();
    } catch {
      toast.error("Save failed");
    }
  }

  async function del(id: number) {
    if (!confirm("Delete?")) return;
    await crudProject("DELETE", undefined, id);
    toast.success("Deleted");
    await onChanged();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Projects</h1>
        <button
          type="button"
          onClick={() =>
            setEditing({
              id: 0,
              title: "",
              description: "",
              tech_stack: [],
              github_url: "",
              live_url: "",
              image_url: "",
              featured: true,
              sort_order: 0,
            })
          }
          className="inline-flex items-center gap-2 rounded-lg bg-accent-cyan/20 px-3 py-2 text-sm text-accent-cyan"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
      {items.map((p) => (
        <div key={p.id} className="glass flex flex-wrap items-center justify-between gap-4 rounded-xl p-4">
          <div>
            <p className="font-medium text-white">{p.title}</p>
            <p className="text-sm text-slate-400 line-clamp-2">{p.description}</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setEditing(p)} className="rounded-lg bg-white/10 p-2 hover:bg-white/20">
              <Pencil className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => del(p.id)} className="rounded-lg bg-rose-500/20 p-2 text-rose-300">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
      {editing && (
        <Modal title={editing.id ? "Edit project" : "Add project"} onClose={() => setEditing(null)}>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              save(new FormData(e.currentTarget));
            }}
          >
            <Field name="title" label="title" defaultValue={editing.title} />
            <label className="block text-sm">
              <span className="text-slate-400">description</span>
              <textarea
                name="description"
                defaultValue={editing.description}
                rows={4}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white"
              />
            </label>
            <label className="block text-sm">
              <span className="text-slate-400">tech_stack (comma separated)</span>
              <input
                name="tech_stack"
                defaultValue={(editing.tech_stack ?? []).join(", ")}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white"
              />
            </label>
            <Field name="github_url" label="github_url" defaultValue={editing.github_url} />
            <Field name="live_url" label="live_url" defaultValue={editing.live_url} />
            <Field name="image_url" label="image_url" defaultValue={editing.image_url} />
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" name="featured" defaultChecked={editing.featured} /> Featured
            </label>
            <label className="block text-sm">
              <span className="text-slate-400">sort_order</span>
              <input
                name="sort_order"
                type="number"
                defaultValue={editing.sort_order}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white"
              />
            </label>
            <button type="submit" className="w-full rounded-lg bg-accent-cyan py-2 text-sm font-semibold text-ink-950">
              Save
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Field({ name, label, defaultValue }: { name: string; label: string; defaultValue: string }) {
  return (
    <label className="block text-sm">
      <span className="text-slate-400">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white"
      />
    </label>
  );
}

function SkillsAdmin({ items, onChanged }: { items: Skill[]; onChanged: () => Promise<void> }) {
  const [editing, setEditing] = useState<Skill | null>(null);

  async function save(fd: FormData) {
    const body = {
      category: String(fd.get("category") ?? ""),
      name: String(fd.get("name") ?? ""),
      proficiency: Number(fd.get("proficiency") ?? 3),
      sort_order: Number(fd.get("sort_order") ?? 0),
    };
    try {
      if (editing?.id) await crudSkill("PUT", body, editing.id);
      else await crudSkill("POST", body);
      toast.success("Saved");
      setEditing(null);
      await onChanged();
    } catch {
      toast.error("Save failed");
    }
  }

  async function del(id: number) {
    if (!confirm("Delete?")) return;
    await crudSkill("DELETE", undefined, id);
    toast.success("Deleted");
    await onChanged();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Skills</h1>
        <button
          type="button"
          onClick={() => setEditing({ id: 0, category: "", name: "", proficiency: 3, sort_order: 0 })}
          className="inline-flex items-center gap-2 rounded-lg bg-accent-cyan/20 px-3 py-2 text-sm text-accent-cyan"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
      {items.map((s) => (
        <div key={s.id} className="glass flex flex-wrap items-center justify-between gap-4 rounded-xl p-4">
          <div>
            <p className="font-medium text-white">{s.name}</p>
            <p className="text-sm text-slate-400">
              {s.category} · {s.proficiency}/5
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setEditing(s)} className="rounded-lg bg-white/10 p-2 hover:bg-white/20">
              <Pencil className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => del(s.id)} className="rounded-lg bg-rose-500/20 p-2 text-rose-300">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
      {editing && (
        <Modal title={editing.id ? "Edit skill" : "Add skill"} onClose={() => setEditing(null)}>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              save(new FormData(e.currentTarget));
            }}
          >
            <Field name="category" label="category" defaultValue={editing.category} />
            <Field name="name" label="name" defaultValue={editing.name} />
            <label className="block text-sm">
              <span className="text-slate-400">proficiency (1-5)</span>
              <input
                name="proficiency"
                type="number"
                min={1}
                max={5}
                defaultValue={editing.proficiency}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white"
              />
            </label>
            <label className="block text-sm">
              <span className="text-slate-400">sort_order</span>
              <input
                name="sort_order"
                type="number"
                defaultValue={editing.sort_order}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white"
              />
            </label>
            <button type="submit" className="w-full rounded-lg bg-accent-cyan py-2 text-sm font-semibold text-ink-950">
              Save
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function CertsAdmin({ items, onChanged }: { items: Certification[]; onChanged: () => Promise<void> }) {
  const [editing, setEditing] = useState<Certification | null>(null);

  async function save(fd: FormData) {
    const body = {
      name: String(fd.get("name") ?? ""),
      issuer: String(fd.get("issuer") ?? ""),
      date: String(fd.get("date") ?? ""),
      credential_id: String(fd.get("credential_id") ?? ""),
      url: String(fd.get("url") ?? ""),
    };
    try {
      if (editing?.id) await crudCert("PUT", body, editing.id);
      else await crudCert("POST", body);
      toast.success("Saved");
      setEditing(null);
      await onChanged();
    } catch {
      toast.error("Save failed");
    }
  }

  async function del(id: number) {
    if (!confirm("Delete?")) return;
    await crudCert("DELETE", undefined, id);
    toast.success("Deleted");
    await onChanged();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Certifications</h1>
        <button
          type="button"
          onClick={() => setEditing({ id: 0, name: "", issuer: "", date: "", credential_id: "", url: "" })}
          className="inline-flex items-center gap-2 rounded-lg bg-accent-cyan/20 px-3 py-2 text-sm text-accent-cyan"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
      {items.map((c) => (
        <div key={c.id} className="glass flex flex-wrap items-center justify-between gap-4 rounded-xl p-4">
          <div>
            <p className="font-medium text-white">{c.name}</p>
            <p className="text-sm text-slate-400">{c.issuer}</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setEditing(c)} className="rounded-lg bg-white/10 p-2 hover:bg-white/20">
              <Pencil className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => del(c.id)} className="rounded-lg bg-rose-500/20 p-2 text-rose-300">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
      {editing && (
        <Modal title={editing.id ? "Edit certification" : "Add certification"} onClose={() => setEditing(null)}>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              save(new FormData(e.currentTarget));
            }}
          >
            <Field name="name" label="name" defaultValue={editing.name} />
            <Field name="issuer" label="issuer" defaultValue={editing.issuer} />
            <Field name="date" label="date" defaultValue={editing.date} />
            <Field name="credential_id" label="credential_id" defaultValue={editing.credential_id} />
            <Field name="url" label="url" defaultValue={editing.url} />
            <button type="submit" className="w-full rounded-lg bg-accent-cyan py-2 text-sm font-semibold text-ink-950">
              Save
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function PubsAdmin({ items, onChanged }: { items: Publication[]; onChanged: () => Promise<void> }) {
  const [editing, setEditing] = useState<Publication | null>(null);

  async function save(fd: FormData) {
    const body = {
      title: String(fd.get("title") ?? ""),
      publisher: String(fd.get("publisher") ?? ""),
      date: String(fd.get("date") ?? ""),
      url: String(fd.get("url") ?? ""),
    };
    try {
      if (editing?.id) await crudPublication("PUT", body, editing.id);
      else await crudPublication("POST", body);
      toast.success("Saved");
      setEditing(null);
      await onChanged();
    } catch {
      toast.error("Save failed");
    }
  }

  async function del(id: number) {
    if (!confirm("Delete?")) return;
    await crudPublication("DELETE", undefined, id);
    toast.success("Deleted");
    await onChanged();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Publications</h1>
        <button
          type="button"
          onClick={() => setEditing({ id: 0, title: "", publisher: "", date: "", url: "" })}
          className="inline-flex items-center gap-2 rounded-lg bg-accent-cyan/20 px-3 py-2 text-sm text-accent-cyan"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
      {items.map((p) => (
        <div key={p.id} className="glass flex flex-wrap items-center justify-between gap-4 rounded-xl p-4">
          <div>
            <p className="font-medium text-white line-clamp-2">{p.title}</p>
            <p className="text-sm text-slate-400">{p.publisher}</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setEditing(p)} className="rounded-lg bg-white/10 p-2 hover:bg-white/20">
              <Pencil className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => del(p.id)} className="rounded-lg bg-rose-500/20 p-2 text-rose-300">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
      {editing && (
        <Modal title={editing.id ? "Edit publication" : "Add publication"} onClose={() => setEditing(null)}>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              save(new FormData(e.currentTarget));
            }}
          >
            <label className="block text-sm">
              <span className="text-slate-400">title</span>
              <textarea
                name="title"
                defaultValue={editing.title}
                rows={3}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white"
              />
            </label>
            <Field name="publisher" label="publisher" defaultValue={editing.publisher} />
            <Field name="date" label="date" defaultValue={editing.date} />
            <Field name="url" label="url" defaultValue={editing.url} />
            <button type="submit" className="w-full rounded-lg bg-accent-cyan py-2 text-sm font-semibold text-ink-950">
              Save
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="glass max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
