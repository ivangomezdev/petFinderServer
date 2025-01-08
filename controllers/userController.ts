import { Auth } from "../model/auth/auth";
import { User } from "../model/auth/user";
import { createPassWordSha256 } from "../src/utils/passwordGenerator";

let userRef;
let authRef 


export const createUser = async (req) => {
  const { username, password } = req;

  const [user, userCreated] = await User.findOrCreate({
    where: { username },
    defaults: {
      username,
    },
  });

  const [auth, authCreated] = await Auth.findOrCreate({
    where: { id: user.get("id") },
    defaults: {
      username,
      password: createPassWordSha256(password),
      user_id: user.get("id"),
    },
  });
 

};

/*/*/
