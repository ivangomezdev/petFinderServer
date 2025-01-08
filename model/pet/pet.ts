import { DataTypes, Model } from "sequelize";
import {sequelize} from "../db.js";

export class Pet extends Model {}

Pet.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    src: {
      type: DataTypes.STRING,
    },
    _geoloc: {
        type: DataTypes.JSONB
      },
  },
  { sequelize, tableName: "Pet" }
);
