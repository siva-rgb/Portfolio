import axios from "axios";

import { API_BASE_URL } from "./env";

/** Avoid duplicate POST from React StrictMode double-mount for the same path. */
let lastTrackedPath = "";

export async function trackPageView(path: string) {
  const normalized = path || "/";
  if (normalized === lastTrackedPath) return;
  lastTrackedPath = normalized;

  try {
    await axios.post(`${API_BASE_URL}/api/track`, {
      page: normalized,
      referrer: document.referrer || "",
      user_agent: navigator.userAgent || "",
    });
  } catch {
    /* non-blocking */
  }
}
