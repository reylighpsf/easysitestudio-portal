import bcrypt from "bcryptjs";
import { HttpError } from "../utils/http-error.js";

class AdminAuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async login(payload) {
    const adminId = typeof payload?.id === "string" ? payload.id.trim() : "";
    const password = typeof payload?.password === "string" ? payload.password : "";

    if (!adminId || !password) {
      throw new HttpError(400, "ID admin dan password wajib diisi.");
    }

    const user = await this.userRepository.findByLoginId(adminId);
    if (!user) {
      throw new HttpError(401, "ID admin atau password tidak sesuai.");
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new HttpError(401, "ID admin atau password tidak sesuai.");
    }

    return {
      id: user.id,
      loginId: user.loginId,
      name: user.name,
      role: user.role,
    };
  }
}

export { AdminAuthService };
