import jwt from "jsonwebtoken";
import { ADMIN_AUTH_JWT_EXPIRES_IN, ADMIN_AUTH_JWT_SECRET } from "../config/env.js";

const signAdminToken = (adminUser) =>
  jwt.sign(
    {
      sub: String(adminUser.id),
      loginId: adminUser.loginId,
      role: adminUser.role,
      name: adminUser.name,
    },
    ADMIN_AUTH_JWT_SECRET,
    {
      expiresIn: ADMIN_AUTH_JWT_EXPIRES_IN,
    },
  );

const verifyAdminToken = (token) => jwt.verify(token, ADMIN_AUTH_JWT_SECRET);

export { signAdminToken, verifyAdminToken };
