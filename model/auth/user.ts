import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
    },
    name: {
    type: DataTypes.STRING,
    },
    province:{
      type:DataTypes.STRING
    }
  },
  { sequelize, tableName: "User" }
);
