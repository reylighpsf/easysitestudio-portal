import { ALLOWED_ORIGINS } from "./env.js";

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("CORS origin tidak diizinkan."));
  },
};
