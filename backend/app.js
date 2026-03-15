import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { createApiRoutes } from "./api/index.js";
import { corsOptions } from "./config/cors.js";
import {
  adminController,
  contactController,
  healthController,
  portfolioProductController,
  pricePlanController,
  siteConfigController,
} from "./container.js";
import { errorHandler, fallbackErrorHandler } from "./middlewares/error.middleware.js";

const app = express();
const distPath = path.resolve(process.cwd(), "dist");
const uploadPath = path.resolve(process.cwd(), "public", "uploads");

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(uploadPath));

app.use(
  "/api",
  createApiRoutes({
    healthController,
    siteConfigController,
    portfolioProductController,
    pricePlanController,
    contactController,
    adminController,
  }),
);

if (fs.existsSync(path.join(distPath, "index.html"))) {
  app.use(express.static(distPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.use(errorHandler);
app.use(fallbackErrorHandler);

export { app };
