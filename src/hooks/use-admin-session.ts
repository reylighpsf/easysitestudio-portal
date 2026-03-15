import { useCallback, useEffect, useState } from "react";
import type { AdminUser } from "@/api/admin-api";

const ADMIN_SESSION_STORAGE = "easysitestudio_admin_session";

type StoredAdminSession = {
  token: string;
  admin: AdminUser;
};

function readStoredSession(): StoredAdminSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(ADMIN_SESSION_STORAGE);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as StoredAdminSession;
    if (!parsed?.token || !parsed?.admin) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function useAdminSession() {
  const [authToken, setAuthToken] = useState("");
  const [adminProfile, setAdminProfile] = useState<AdminUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const session = readStoredSession();
    setAuthToken(session?.token ?? "");
    setAdminProfile(session?.admin ?? null);
    setIsReady(true);
  }, []);

  const saveSession = useCallback((session: StoredAdminSession) => {
    const nextToken = session.token.trim();
    setAuthToken(nextToken);
    setAdminProfile(session.admin);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        ADMIN_SESSION_STORAGE,
        JSON.stringify({
          token: nextToken,
          admin: session.admin,
        }),
      );
    }
  }, []);

  const clearSession = useCallback(() => {
    setAuthToken("");
    setAdminProfile(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ADMIN_SESSION_STORAGE);
    }
  }, []);

  return {
    authToken,
    adminProfile,
    isReady,
    saveSession,
    clearSession,
  };
}
