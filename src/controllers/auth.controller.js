import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { NguoiDung } from "../models/index.js";

export async function register(req, res) {
  const { email, mat_khau, ho_ten, tuoi } = req.body;

  if (!email || !mat_khau || !ho_ten) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const existed = await NguoiDung.findOne({ where: { email } });
  if (existed) return res.status(409).json({ message: "Email already exists" });

  const hash = await bcrypt.hash(mat_khau, 10);

  const user = await NguoiDung.create({
    email,
    mat_khau: hash,
    ho_ten,
    tuoi: tuoi ?? null,
    anh_dai_dien: null,
  });

  return res.status(201).json({
    message: "Register success",
    data: { nguoi_dung_id: user.nguoi_dung_id, email: user.email, ho_ten: user.ho_ten },
  });
}

export async function login(req, res) {
  const { email, mat_khau } = req.body;

  if (!email || !mat_khau) return res.status(400).json({ message: "Missing email/password" });

  const user = await NguoiDung.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(mat_khau, user.mat_khau);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user.nguoi_dung_id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({
    message: "Login success",
    data: {
      token,
      user: {
        nguoi_dung_id: user.nguoi_dung_id,
        email: user.email,
        ho_ten: user.ho_ten,
        tuoi: user.tuoi,
        anh_dai_dien: user.anh_dai_dien,
      },
    },
  });
}
