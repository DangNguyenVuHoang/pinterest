import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const BinhLuan = sequelize.define(
  "binh_luan",
  {
    binh_luan_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nguoi_dung_id: { type: DataTypes.INTEGER, allowNull: false },
    hinh_id: { type: DataTypes.INTEGER, allowNull: false },
    ngay_binh_luan: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    noi_dung: { type: DataTypes.STRING(1000), allowNull: false },
  },
  { tableName: "binh_luan", timestamps: false }
);
