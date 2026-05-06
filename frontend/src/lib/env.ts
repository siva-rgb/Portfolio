/**
 * Production (Netlify, etc.): set at build time — VITE_API_URL=https://your-api.example.com
 * Local dev: leave unset; Vite proxies /api to the backend.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ?? "";
