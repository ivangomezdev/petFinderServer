import { User } from "../../model/auth/user";

export const profileData = async (id) =>{
    const project = await User.findOne({ where: { id: id } });
    return project
}

