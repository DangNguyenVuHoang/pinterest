import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const HinhAnh = sequelize.define(
  "hinh_anh",
  {
    hinh_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ten_hinh: { type: DataTypes.STRING(255), allowNull: false },
    duong_dan: { type: DataTypes.STRING(500), allowNull: false },
    mo_ta: { type: DataTypes.STRING(500), allowNull: true },
    nguoi_dung_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "hinh_anh", timestamps: false }
);
