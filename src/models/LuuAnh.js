import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const LuuAnh = sequelize.define(
  "luu_anh",
  {
    nguoi_dung_id: { type: DataTypes.INTEGER, primaryKey: true },
    hinh_id: { type: DataTypes.INTEGER, primaryKey: true },
    ngay_luu: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: "luu_anh", timestamps: false }
);
