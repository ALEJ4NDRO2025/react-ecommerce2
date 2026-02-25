import express from "express";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js";
import { registrarProductos, obtenerProductos, actualizarProducto, eliminarProducto } from "../controllers/productoscontroles.js";

const router = express.Router();


// 👑 Dashboard admin ← AGREGAR ESTO
router.get("/dashboard", verificarToken, soloAdmin, (req, res) => {
    res.status(200).json({
        message: "✅ Bienvenido al panel de administrador",
        admin: {
            nombre: req.usuario.nombre,
            email: req.usuario.email,
            rol: req.usuario.role
        }
    });
});


// 👤 Ver productos (user y admin)
router.get("/", verificarToken, obtenerProductos);

// 👑 Crear
router.post("/", verificarToken, soloAdmin, registrarProductos);

// 👑 Actualizar
router.put("/:id", verificarToken, soloAdmin, actualizarProducto);

// 👑 Eliminar
router.delete("/:id", verificarToken, soloAdmin, eliminarProducto);

export default router;