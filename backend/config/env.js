import "dotenv/config";

const parseAllowedOrigins = () => {
  const fallback = "http://localhost:5173,http://localhost:3000";
  const source = process.env.CORS_ORIGIN || process.env.CLIENT_ORIGIN || fallback;

  return source
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const parseNumber = (value, fallback) => {
  const parsedValue = Number.parseInt(value ?? "", 10);
  return Number.isNaN(parsedValue) ? fallback : parsedValue;
};

export const PORT = parseNumber(process.env.BACKEND_PORT ?? process.env.PORT, 3001);
export const ALLOWED_ORIGINS = parseAllowedOrigins();
export const ADMIN_AUTH_JWT_SECRET =
  process.env.ADMIN_AUTH_JWT_SECRET ?? process.env.ADMIN_API_KEY ?? "dev-only-change-this-secret";
export const ADMIN_AUTH_COOKIE_NAME = process.env.ADMIN_AUTH_COOKIE_NAME ?? "berkah_admin_token";
export const ADMIN_AUTH_TTL_HOURS = parseNumber(process.env.ADMIN_AUTH_TTL_HOURS, 24);
export const ADMIN_AUTH_TTL_MS = ADMIN_AUTH_TTL_HOURS * 60 * 60 * 1000;
export const ADMIN_AUTH_JWT_EXPIRES_IN = `${ADMIN_AUTH_TTL_HOURS}h`;
export const NODE_ENV = process.env.NODE_ENV ?? "development";
