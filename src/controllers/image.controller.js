import { Op } from "sequelize";
import { HinhAnh, NguoiDung, LuuAnh } from "../models/index.js";

// HOME: list ảnh (kèm creator)
export async function getImages(req, res) {
  const images = await HinhAnh.findAll({
    include: [{ model: NguoiDung, attributes: ["nguoi_dung_id", "ho_ten", "anh_dai_dien"] }],
    order: [["hinh_id", "DESC"]],
  });
  res.json({ message: "OK", data: images });
}

// SEARCH: theo ten_hinh
export async function searchImages(req, res) {
  const keyword = (req.query.keyword || "").trim();
  const images = await HinhAnh.findAll({
    where: { ten_hinh: { [Op.like]: `%${keyword}%` } },
    order: [["hinh_id", "DESC"]],
  });
  res.json({ message: "OK", data: images });
}

// DETAIL: ảnh + creator
export async function getImageDetail(req, res) {
  const { hinh_id } = req.params;

  const image = await HinhAnh.findByPk(hinh_id, {
    include: [{ model: NguoiDung, attributes: ["nguoi_dung_id", "email", "ho_ten", "anh_dai_dien"] }],
  });

  if (!image) return res.status(404).json({ message: "Image not found" });
  res.json({ message: "OK", data: image });
}

// CHECK SAVED (needs JWT)
export async function checkSaved(req, res) {
  const { hinh_id } = req.params;
  const userId = req.user.userId;

  const saved = await LuuAnh.findOne({ where: { nguoi_dung_id: userId, hinh_id } });
  res.json({ message: "OK", data: { saved: !!saved } });
}

// TOGGLE SAVE (needs JWT) => Save / Unsave
export async function toggleSave(req, res) {
  const { hinh_id } = req.params;
  const userId = req.user.userId;

  const existed = await LuuAnh.findOne({ where: { nguoi_dung_id: userId, hinh_id } });

  if (existed) {
    await LuuAnh.destroy({ where: { nguoi_dung_id: userId, hinh_id } });
    return res.json({ message: "OK", data: { saved: false } });
  }

  await LuuAnh.create({ nguoi_dung_id: userId, hinh_id });
  return res.json({ message: "OK", data: { saved: true } });
}

// CREATE IMAGE (needs JWT)
export async function createImage(req, res) {
  const userId = req.user.userId;
  const { ten_hinh, duong_dan, mo_ta } = req.body;

  if (!ten_hinh || !duong_dan) {
    return res.status(400).json({ message: "Missing ten_hinh/duong_dan" });
  }

  const image = await HinhAnh.create({
    ten_hinh,
    duong_dan,
    mo_ta: mo_ta ?? null,
    nguoi_dung_id: userId,
  });

  res.status(201).json({ message: "Created", data: image });
}

// DELETE IMAGE (needs JWT, only owner)
export async function deleteImage(req, res) {
  const { hinh_id } = req.params;
  const userId = req.user.userId;

  const image = await HinhAnh.findByPk(hinh_id);
  if (!image) return res.status(404).json({ message: "Image not found" });

  if (image.nguoi_dung_id !== userId) {
    return res.status(403).json({ message: "Forbidden: not owner" });
  }

  await image.destroy();
  res.json({ message: "Deleted", data: { hinh_id: Number(hinh_id) } });
}

