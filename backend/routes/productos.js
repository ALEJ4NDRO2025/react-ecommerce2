import express from "express";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js";
import { registrarProductos, obtenerProductos, actualizarProducto, eliminarProducto } from "../controllers/productoscontroles.js";

const router = express.Router();

// 👤 Ver productos (user y admin)
router.get("/", verificarToken, obtenerProductos);

// 👑 Crear
router.post("/", verificarToken, soloAdmin, registrarProductos);

// 👑 Actualizar
router.put("/:id", verificarToken, soloAdmin, actualizarProducto);

// 👑 Eliminar
router.delete("/:id", verificarToken, soloAdmin, eliminarProducto);

export default router;


//PUEDE QUE HAYA ERORES ACA