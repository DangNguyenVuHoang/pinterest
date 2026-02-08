import { BinhLuan, NguoiDung } from "../models/index.js";

// list comments theo ảnh
export async function getCommentsByImage(req, res) {
  const { hinh_id } = req.params;

  const comments = await BinhLuan.findAll({
    where: { hinh_id },
    include: [{ model: NguoiDung, attributes: ["nguoi_dung_id", "ho_ten", "anh_dai_dien"] }],
    order: [["binh_luan_id", "DESC"]],
  });

  res.json({ message: "OK", data: comments });
}

// add comment (needs JWT)
export async function createComment(req, res) {
  const { hinh_id } = req.params;
  const userId = req.user.userId;
  const { noi_dung } = req.body;

  if (!noi_dung || !noi_dung.trim()) {
    return res.status(400).json({ message: "noi_dung is required" });
  }

  const comment = await BinhLuan.create({
    hinh_id,
    nguoi_dung_id: userId,
    noi_dung: noi_dung.trim(),
  });

  res.status(201).json({ message: "Created", data: comment });
}
