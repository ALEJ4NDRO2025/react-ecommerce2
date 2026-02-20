import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import User from "../models/user.js";

// Configuración mejorada de nodemailer
const transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'alejandromejia2007l@gmail.com',
        pass: 'jybrwzotynlvmswy'
    },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 60000,
    greetingTimeout: 30000,
    socketTimeout: 60000
});

const generarCodigo = () => Math.floor(100000 + Math.random() * 900000).toString();

export const solicitarCodigo = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "El correo electrónico es obligatorio" });
        }

        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(400).json({ message: "Correo electrónico no encontrado" });
        }

        const codigo = generarCodigo();

        usuario.codigoRecuperacion = codigo;
        usuario.codigoExpiracion = Date.now() + 900000;
        await usuario.save();

        const mailOptions = {
            from: '"Tienda AXT" <alejandromejia2007l@gmail.com>',
            to: email,
            subject: 'Código de recuperación - Tienda AXT',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #4F46E5;">Tienda AXT</h2>
                <h3>Recuperación de Contraseña</h3>
                <p>Hola <strong>${usuario.nombre}</strong>,</p>
                <p>Tu código de verificación es:</p>
                <div style="background: #667eea; padding: 20px; border-radius: 10px; text-align: center; margin: 30px 0;">
                    <h1 style="color: white; font-size: 36px; letter-spacing: 8px; margin: 0; font-family: monospace;">${codigo}</h1>
                </div>
                <p style="color: #666;">🔒 Expira en 15 minutos.</p>
            </div>`
        };

        // Enviar email sin esperar (asíncrono)
        transport.sendMail(mailOptions).catch(err => {
            console.error('Error al enviar email:', err);
        });

        console.log(`Código generado: ${codigo}`);

        res.status(200).json({
            message: "Código enviado a tu correo",
            debug: `Código: ${codigo}` // QUITAR EN PRODUCCIÓN
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error al solicitar código", error: error.message });
    }
};

export const cambiarPassword = async (req, res) => {
    try {
        const { email, codigo, nuevaPassword } = req.body;

        if (!email || !codigo || !nuevaPassword) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        if (nuevaPassword.length < 6) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
        }

        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        if (usuario.codigoRecuperacion !== codigo) {
            return res.status(400).json({ message: "Código inválido" });
        }

        if (Date.now() > usuario.codigoExpiracion) {
            return res.status(400).json({ message: "El código ha expirado" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(nuevaPassword, salt);

        usuario.password = hashedPassword;
        usuario.codigoRecuperacion = undefined;
        usuario.codigoExpiracion = undefined;
        await usuario.save();

        res.status(200).json({ message: "Contraseña cambiada exitosamente" });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error al cambiar contraseña", error: error.message });
    }
}