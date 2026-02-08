import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const NguoiDung = sequelize.define(
  "nguoi_dung",
  {
    nguoi_dung_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    mat_khau: { type: DataTypes.STRING(255), allowNull: false },
    ho_ten: { type: DataTypes.STRING(255), allowNull: false },
    tuoi: { type: DataTypes.INTEGER, allowNull: true },
    anh_dai_dien: { type: DataTypes.STRING(500), allowNull: true },
  },
  { tableName: "nguoi_dung", timestamps: false }
);
