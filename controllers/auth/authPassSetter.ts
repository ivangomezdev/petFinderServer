import { Auth } from "../../model/auth/auth";
import { createPassWordSha256 } from "../../src/utils/passwordGenerator";


export const authPassSetter = async (req) =>{
    const {password} = req.body

const data = Auth.update(
        { password:  createPassWordSha256(password)},
        {
          where: {id: req.user.id}
        },
      );

      console.log(data);
      
     
}