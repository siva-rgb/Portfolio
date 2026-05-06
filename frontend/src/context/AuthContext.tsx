import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { setAuthToken } from "../lib/api";

type AuthCtx = {
  token: string | null;
  login: (t: string) => void;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const STORAGE_KEY = "portfolio_admin_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));

  useEffect(() => {
    setAuthToken(token);
    if (token) localStorage.setItem(STORAGE_KEY, token);
    else localStorage.removeItem(STORAGE_KEY);
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      login: (t: string) => setToken(t),
      logout: () => setToken(null),
    }),
    [token],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth outside AuthProvider");
  return v;
}
