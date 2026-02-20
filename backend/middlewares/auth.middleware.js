import jwt from 'jsonwebtoken';
import User from '../models/user.js';

//verificar token y consultar el usuario actualizado
export const verificarToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token Requerido" });
        }

        const token = authHeader.split(" ")[1];

        //decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Consultar el usuario actualizado en la bd (por si cambio su rol o fue eliminado)
        const usuario = await User.findOne({ userId: decoded.userId}).select("-passwords"); ///PENDIENTE DE LOS PASSWORDS O PASSWORD

        if (!usuario) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        //guardamos el usuario compleyo en req para usuarlo en los controladores
        req.usuario = usuario; //PENDIENTE DE USERR O USER

        next(); //PENDIENTE

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({message: "Token expirado, inicie sesión nuevamente"});
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({message: "Token inválido"});
        }
        res.status(500).json({ message: "Error en la autenticación", error: error.message });
    }
};

//solo administradores
export const soloAdmin = (req, res,next) =>{
    if(req.usuario?.role !== "admin"){ ///pendiente de los roles que sean de acuerdo a los que se definan en el modelo de usuario
        return res.status(403).json({message:"acceso denegado: se requiere rol admin"});
    }
    next();
};

//solo usuarios
export const soloUser = (req, res, next)=> {
    if (req.usuario?.role !== "user") {
        return res.status(403).json({message:"acceso denegado: se requiere rol user"});
    }
    next();
};