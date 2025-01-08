import { createUser } from "./controllers/userController";
import { Request, Response } from "express";
import { getToken } from "./src/utils/token";
import { authMiddleWare } from "./src/utils/middlewareAuth";
import { profileData } from "./controllers/profile/profile";
import { sequelizesync } from "./controllers/dbSync";
import { authPassSetter } from "./controllers/auth/authPassSetter";
import { Pet } from "./model/models";
import { index, client } from "./model/db.js";
import { createPet, deletePet, editPet } from "./controllers/pet/petController";
const cors = require('cors');
const PORT = process.env.PORT || 3000
const express = require("express");
const app = express();
app.use(
  cors()
);
app.use(express.json());
sequelizesync();

//create user // instance
app.post("/auth", async (req: Request, res: Response) => {
  createUser(req.body);

  res.json("Usuario Creado");
});

//getUserToken
app.post("/auth/token", async (req: Request, res: Response) => {
  const token = await getToken(req.body);
  
  res.json(`${token}`);
});

//getUserData
app.get("/me", authMiddleWare, async (req: Request, res: Response) => {
  const id = req.user.id;
  const userData = await profileData(id);
  res.json(userData);
});

//SetUserData
app.put("/me", authMiddleWare, async (req: Request, res: Response) => {
  const id = req.user.id;
  const {  name, province } = req.body;
  const userData = await profileData(id);
  const changeData = await userData.update({  name, province });

  res.json("cambio OK");
});

//SetPass
app.put("/me/password", authMiddleWare, async (req: Request, res: Response) => {
  authPassSetter(req);
  res.json("password change succesfully");
});

//create pet
app.post("/pets", authMiddleWare, async (req: Request, res: Response) => {
  createPet(req);

  res.json("Pet en busqueda agregado correctamente!");
});

//show pet
app.get("/pets", async (req: Request, res: Response) => {
  const allPets = await Pet.findAll();
  res.json(allPets);
});



//edit pet // pasar param (id de la imagen)
app.put("/me/pets/:id", authMiddleWare, async (req: Request, res: Response) => {
  console.log(req.body,"desde params");
  
  editPet(req);
  res.json("Pet en busqueda editado correctamente");
});

//show myPets
app.get("/me/pets",authMiddleWare, async (req: Request, res: Response) => {
 const data = req.user.id
  
  
  const allPets = await Pet.findAll({
    where:{
      UserId: data
    }
  });
  res.json(allPets);
});

//delete pet
app.delete("/me/pets/:id", (req, res) => {

 deletePet(req);

  res.json("Pet eliminado");
});

app.listen(PORT, () => {
  console.log("escuchando servidor");
});
