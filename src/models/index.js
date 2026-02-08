import { NguoiDung } from "./NguoiDung.js";
import { HinhAnh } from "./HinhAnh.js";
import { BinhLuan } from "./BinhLuan.js";
import { LuuAnh } from "./LuuAnh.js";

// 1 user - many images
NguoiDung.hasMany(HinhAnh, { foreignKey: "nguoi_dung_id" });
HinhAnh.belongsTo(NguoiDung, { foreignKey: "nguoi_dung_id" });

// comments
NguoiDung.hasMany(BinhLuan, { foreignKey: "nguoi_dung_id" });
HinhAnh.hasMany(BinhLuan, { foreignKey: "hinh_id" });
BinhLuan.belongsTo(NguoiDung, { foreignKey: "nguoi_dung_id" });
BinhLuan.belongsTo(HinhAnh, { foreignKey: "hinh_id" });

// save image (many-to-many)
NguoiDung.belongsToMany(HinhAnh, {
  through: LuuAnh,
  foreignKey: "nguoi_dung_id",
  otherKey: "hinh_id",
  as: "savedImages",
});

HinhAnh.belongsToMany(NguoiDung, {
  through: LuuAnh,
  foreignKey: "hinh_id",
  otherKey: "nguoi_dung_id",
  as: "savedUsers",
});


export { NguoiDung, HinhAnh, BinhLuan, LuuAnh };
