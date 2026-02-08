import { NguoiDung, HinhAnh } from "../models/index.js";

export async function getMe(req, res) {
  const userId = req.user.userId;

  const user = await NguoiDung.findByPk(userId, {
    attributes: ["nguoi_dung_id", "email", "ho_ten", "tuoi", "anh_dai_dien"],
  });

  res.json({ message: "OK", data: user });
}

export async function updateMe(req, res) {
  const userId = req.user.userId;
  const { ho_ten, tuoi, anh_dai_dien } = req.body;

  const user = await NguoiDung.findByPk(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.ho_ten = ho_ten ?? user.ho_ten;
  user.tuoi = tuoi ?? user.tuoi;
  user.anh_dai_dien = anh_dai_dien ?? user.anh_dai_dien;

  await user.save();

  res.json({
    message: "Updated",
    data: {
      nguoi_dung_id: user.nguoi_dung_id,
      email: user.email,
      ho_ten: user.ho_ten,
      tuoi: user.tuoi,
      anh_dai_dien: user.anh_dai_dien,
    },
  });
}

// ảnh đã tạo
export async function getMyCreatedImages(req, res) {
  const userId = req.user.userId;

  const images = await HinhAnh.findAll({
    where: { nguoi_dung_id: userId },
    order: [["hinh_id", "DESC"]],
  });

  res.json({ message: "OK", data: images });
}

export async function getMySavedImages(req, res) {
  const userId = req.user.userId;

  const user = await NguoiDung.findByPk(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const saved = await user.getSavedImages({
    joinTableAttributes: ["ngay_luu"],
    order: [["hinh_id", "DESC"]],
  });

  res.json({ message: "OK", data: saved });
}

