import { DataTypes, Model } from "sequelize";
import {sequelize} from "../db.js"

export class Auth extends Model {}

Auth.init(
    {
      password: {
        type: DataTypes.STRING,

      },
      username: {
        type: DataTypes.STRING,

      },
    },
    { sequelize,
        tableName:"Auth"
     },
  );