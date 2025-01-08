var jwt = require("jsonwebtoken");
export const authMiddleWare = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  

  try {
    // Verificar el token
    const decoded = jwt.verify(token, "shhhhh");
    req.user = decoded; // Guardar los datos del usuario en el request
    next(); // Pasar al siguiente middleware o ruta
  } catch (error) {
    res.status(401).json({ error: "Token inválido o expirado." });
  }
};