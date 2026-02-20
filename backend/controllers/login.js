import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

// Login de usuario
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar campos
        if (!email || !password) {
            return res.status(400).json({ message: "Por favor ingrese email y contraseña" });
        }

        // Buscar usuario en la BD
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Comparar contraseña encriptada
        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        //generar el token JWT con el rol incluido
        const token = jwt.sign(
            {
                userId: usuario.userId,
                role: usuario.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );


        //respondemos con el token y los datos del usuario

        res.status(200).json({
            message: "Login exitoso",
            token,
            user: {
                userId:usuario.userId,
                nombre:usuario.nombre,
                email:usuario.email,
                role:usuario.role
            }
        });


    
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};
