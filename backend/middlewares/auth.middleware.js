import { ADMIN_AUTH_JWT_SECRET } from "../config/env.js";
import { verifyAdminToken } from "../utils/jwt.js";
import { HttpError } from "../utils/http-error.js";

const readBearerToken = (req) => {
  const authorization = req.header("authorization");
  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice("Bearer ".length).trim();
  }

  return "";
};

const readLegacyAdminKey = (req) => {
  const headerKey = req.header("x-admin-key");
  return headerKey ? headerKey.trim() : "";
};

export const requireAdmin = (req, _res, next) => {
  const token = readBearerToken(req);
  if (token) {
    try {
      const payload = verifyAdminToken(token);
      req.admin = {
        id: payload.sub,
        loginId: payload.loginId,
        role: payload.role,
        name: payload.name,
      };
      next();
      return;
    } catch {
      next(new HttpError(401, "Sesi admin tidak valid atau sudah kedaluwarsa."));
      return;
    }
  }

  const providedAdminKey = readLegacyAdminKey(req);
  if (providedAdminKey && providedAdminKey === ADMIN_AUTH_JWT_SECRET) {
    req.admin = {
      id: "legacy-admin",
      loginId: "legacy-admin",
      role: "ADMIN",
      name: "Legacy Admin",
    };
    next();
    return;
  }

  next(new HttpError(401, "Sesi admin tidak ditemukan. Silakan login."));
};

export const optionalAdmin = (req, _res, next) => {
  const token = readBearerToken(req);
  if (!token) {
    next();
    return;
  }

  try {
    const payload = verifyAdminToken(token);
    req.admin = {
      id: payload.sub,
      loginId: payload.loginId,
      role: payload.role,
      name: payload.name,
    };
  } catch {
    // Intentionally ignore invalid token for optional auth context.
  }

  next();
};
