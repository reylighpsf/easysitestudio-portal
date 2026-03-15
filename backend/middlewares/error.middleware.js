import { HttpError } from "../utils/http-error.js";

export const errorHandler = (error, _req, res, next) => {
  if (error instanceof SyntaxError && "body" in error) {
    res.status(400).json({ error: "Format JSON tidak valid." });
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.status).json({ error: error.message });
    return;
  }

  if (error?.message === "CORS origin tidak diizinkan.") {
    res.status(403).json({ error: error.message });
    return;
  }

  next(error);
};

export const fallbackErrorHandler = (error, _req, res, _next) => {
  console.error("[UNHANDLED_ERROR]", error);
  res.status(500).json({ error: "Terjadi kesalahan pada server." });
};
