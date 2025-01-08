import { Pet } from "../../model/models";
import { index } from "../../model/db.js";

export const createPet = async (req) => {
  const user = req.user;
  const { name, src, lat, lng } = req.body;
  const newPet = await Pet.build({
    name,
    src,
    _geoloc: {
      lat,
      lng,
    },
    UserId: user.id,
  });

  await newPet.save();
  try {
    const algoliaNewPet = await index.saveObject(
      {
        name,
        src,
        _geoloc: {
          lat,
          lng,
        },
      },
      { autoGenerateObjectIDIfNotExist: true } // Opción para generar automáticamente el objectID
    );

    console.log("Objeto guardado en Algolia:", algoliaNewPet);
  } catch (error) {
    console.error("Error al guardar el objeto en Algolia:", error);
  }
};

export const editPet = async (req) => {
  const params = req.params.id

  
  const { name, src, lat, lng } = req.body;
  console.log(name);
  
  const user = req.user;
  const data = await Pet.update(
    {
      name,
      _geoloc: {
        lat,
        lng,
      },
    },
    {
      where: { id: params }, // Usa params para identificar la mascota que se va a actualizar
    }
  );


  try {
    const updatePet = await index.partialUpdateObject({
      objectID: params, // El ID del objeto a editar
        name,
        _geoloc: {
          lat,
          lng,
        },
      
    });

    if (data[0] === 0) {
      console.error("No se encontró la mascota con el ID proporcionado o el usuario no tiene permiso.");
      return;
    }
    
    console.log("Mascota actualizada correctamente:", updatePet);
    console.log("Campo actualizado:", data);
    console.log("Datos a actualizar:", {
      name,
      _geoloc: {
        lat,
        lng,
      },
    });
    
  } catch (error) {
    console.error("Error al actualizar el campo:", error);
  }
};

export const deletePet = async (req) => {
  const user = req.params.id;
  console.log(user);
  

  await Pet.destroy({
    where: {
      id: user,
    },
  });

 await index.deleteObject('idClickeado')

};
