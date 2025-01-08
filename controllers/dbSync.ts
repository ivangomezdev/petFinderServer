import { sequelize } from "../model/db.js"

export const sequelizesync = async () =>{
    await sequelize.sync({ alter: true });

}