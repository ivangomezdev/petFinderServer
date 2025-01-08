import { createPassWordSha256 } from "./passwordGenerator";
import { Auth } from "../../model/auth/auth";
var jwt = require("jsonwebtoken");

export const getToken = async (req) => {
  //iniciar sesion
  const { username, password } = req;

  const project = await Auth.findOne({
    where: {
      username,
      password: createPassWordSha256(password),
    },
  });


  

  if (!project) {
    console.error("Usuario no encontrado o credenciales incorrectas.");
    return null; // Retorna null si no encuentra al usuario
  }else{
    var token = jwt.sign({ id: project.get("id") }, "shhhhh");
    return token;

  }


};
