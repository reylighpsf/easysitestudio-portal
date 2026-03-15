import { app } from "./app.js";
import { ADMIN_AUTH_JWT_SECRET, PORT } from "./config/env.js";
import { prisma } from "./config/prisma.js";

const hasConfiguredAdminSecret = Boolean(
  process.env.ADMIN_AUTH_JWT_SECRET || process.env.ADMIN_API_KEY,
);

if (!hasConfiguredAdminSecret || !ADMIN_AUTH_JWT_SECRET) {
  console.warn(
    "ADMIN_AUTH_JWT_SECRET belum dikonfigurasi. Tambahkan nilainya di .env untuk keamanan endpoint admin.",
  );
}

const server = app.listen(PORT, () => {
  console.log(`[backend] API berjalan di http://localhost:${PORT}`);
});

const shutdown = (signal) => {
  console.log(`Received ${signal}. Shutting down...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on("SIGINT", () => {
  shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  shutdown("SIGTERM");
});
