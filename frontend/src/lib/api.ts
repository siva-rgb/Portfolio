import axios from "axios";

import { API_BASE_URL } from "./env";
import type {
  AnalyticsSummary,
  Certification,
  DailyCount,
  DeviceRow,
  Education,
  Experience,
  GeoRow,
  NamedCount,
  Profile,
  Project,
  Publication,
  Skill,
} from "../types";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export async function fetchProfile(): Promise<Profile> {
  const { data } = await api.get<Profile>("/api/profile");
  return data;
}

export async function fetchEducation(): Promise<Education[]> {
  const { data } = await api.get<Education[]>("/api/education");
  return data;
}

export async function fetchExperience(): Promise<Experience[]> {
  const { data } = await api.get<Experience[]>("/api/experience");
  return data;
}

export async function fetchProjects(): Promise<Project[]> {
  const { data } = await api.get<Project[]>("/api/projects");
  return data;
}

export async function fetchSkills(): Promise<Skill[]> {
  const { data } = await api.get<Skill[]>("/api/skills");
  return data;
}

export async function fetchCertifications(): Promise<Certification[]> {
  const { data } = await api.get<Certification[]>("/api/certifications");
  return data;
}

export async function fetchPublications(): Promise<Publication[]> {
  const { data } = await api.get<Publication[]>("/api/publications");
  return data;
}

export async function login(username: string, password: string) {
  const { data } = await api.post<{ access_token: string }>("/api/auth/login", {
    username,
    password,
  });
  return data.access_token;
}

export async function changePassword(current_password: string, new_password: string) {
  await api.post("/api/auth/change-password", { current_password, new_password });
}

export async function updateProfile(payload: Partial<Profile>) {
  const { data } = await api.put<Profile>("/api/admin/profile", payload);
  return data;
}

export async function crudEducation(method: "POST" | "PUT" | "DELETE", body?: unknown, id?: number) {
  if (method === "POST") {
    const { data } = await api.post<Education>("/api/admin/education", body);
    return data;
  }
  if (method === "PUT" && id != null) {
    const { data } = await api.put<Education>(`/api/admin/education/${id}`, body);
    return data;
  }
  if (method === "DELETE" && id != null) {
    await api.delete(`/api/admin/education/${id}`);
  }
}

export async function crudExperience(method: "POST" | "PUT" | "DELETE", body?: unknown, id?: number) {
  if (method === "POST") {
    const { data } = await api.post<Experience>("/api/admin/experience", body);
    return data;
  }
  if (method === "PUT" && id != null) {
    const { data } = await api.put<Experience>(`/api/admin/experience/${id}`, body);
    return data;
  }
  if (method === "DELETE" && id != null) {
    await api.delete(`/api/admin/experience/${id}`);
  }
}

export async function crudProject(method: "POST" | "PUT" | "DELETE", body?: unknown, id?: number) {
  if (method === "POST") {
    const { data } = await api.post<Project>("/api/admin/projects", body);
    return data;
  }
  if (method === "PUT" && id != null) {
    const { data } = await api.put<Project>(`/api/admin/projects/${id}`, body);
    return data;
  }
  if (method === "DELETE" && id != null) {
    await api.delete(`/api/admin/projects/${id}`);
  }
}

export async function crudSkill(method: "POST" | "PUT" | "DELETE", body?: unknown, id?: number) {
  if (method === "POST") {
    const { data } = await api.post<Skill>("/api/admin/skills", body);
    return data;
  }
  if (method === "PUT" && id != null) {
    const { data } = await api.put<Skill>(`/api/admin/skills/${id}`, body);
    return data;
  }
  if (method === "DELETE" && id != null) {
    await api.delete(`/api/admin/skills/${id}`);
  }
}

export async function crudCert(method: "POST" | "PUT" | "DELETE", body?: unknown, id?: number) {
  if (method === "POST") {
    const { data } = await api.post<Certification>("/api/admin/certifications", body);
    return data;
  }
  if (method === "PUT" && id != null) {
    const { data } = await api.put<Certification>(`/api/admin/certifications/${id}`, body);
    return data;
  }
  if (method === "DELETE" && id != null) {
    await api.delete(`/api/admin/certifications/${id}`);
  }
}

export async function crudPublication(method: "POST" | "PUT" | "DELETE", body?: unknown, id?: number) {
  if (method === "POST") {
    const { data } = await api.post<Publication>("/api/admin/publications", body);
    return data;
  }
  if (method === "PUT" && id != null) {
    const { data } = await api.put<Publication>(`/api/admin/publications/${id}`, body);
    return data;
  }
  if (method === "DELETE" && id != null) {
    await api.delete(`/api/admin/publications/${id}`);
  }
}

export async function fetchAnalyticsSummary(days: number) {
  const { data } = await api.get<AnalyticsSummary>("/api/admin/analytics/summary", { params: { days } });
  return data;
}

export async function fetchAnalyticsDaily(days: number) {
  const { data } = await api.get<DailyCount[]>("/api/admin/analytics/daily", { params: { days } });
  return data;
}

export async function fetchAnalyticsGeo(days: number) {
  const { data } = await api.get<GeoRow[]>("/api/admin/analytics/geo", { params: { days } });
  return data;
}

export async function fetchAnalyticsDevices(days: number) {
  const { data } = await api.get<DeviceRow[]>("/api/admin/analytics/devices", { params: { days } });
  return data;
}

export async function fetchAnalyticsPages(days: number) {
  const { data } = await api.get<NamedCount[]>("/api/admin/analytics/pages", { params: { days } });
  return data;
}

export async function fetchAnalyticsReferrers(days: number) {
  const { data } = await api.get<NamedCount[]>("/api/admin/analytics/referrers", { params: { days } });
  return data;
}
