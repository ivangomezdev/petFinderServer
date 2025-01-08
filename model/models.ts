import { User } from "./auth/user";
import { Pet } from "./pet/pet";

Pet.belongsTo(User)
User.hasMany(Pet)

export {Pet,User}