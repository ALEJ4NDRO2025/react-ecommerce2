// importar el modelo de productos
import Producto from "../models/productos.js";

// crear un nuevo producto
export const registrarProductos = async (req, res) => {
    try {
        const { productId, nombre, descripcion, precio, imagen } = req.body;

        const nuevoProducto = new Producto({
            productId,
            nombre,
            descripcion,
            precio,
            imagen
        });

        await nuevoProducto.save();
        res.status(201).json({ message: "Producto guardado con éxito" });
    } catch (error) {
        console.error("Error al guardar el producto:", error);
        res.status(400).json({ message: "Error al ingresar el producto" });
    }
};

// traer los datos de la base de datos
export const obtenerProductos = async (req, res) => {
    try {
        const listaProductos = await Producto.find();
        res.json(listaProductos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ message: "Error al obtener los productos" });
    }
};

// Actualizar un producto
export const actualizarProducto = async (req, res) => {
    try {
        // Obtenemos el ID del producto desde los parámetros de la URL
        const { productId } = req.params;
        // Obtenemos los nuevos datos desde el cuerpo de la petición
        const { nombre, descripcion, precio, imagen } = req.body;

        // Buscamos por tu campo personalizado 'productId' y actualizamos
        const productoActualizado = await Producto.findOneAndUpdate(
            { productId: productId }, // Filtro: buscamos por tu ID personalizado
            { nombre, descripcion, precio, imagen }, // Datos a actualizar
            { new: true } // Opción: devuelve el dato ya actualizado
        );

        if (!productoActualizado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto actualizado con éxito", producto: productoActualizado });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
};

// Eliminar un producto
export const eliminarProducto = async (req, res) => {
    try {
        // Obtenemos el ID del producto desde los parámetros de la URL
        const { productId } = req.params;

        // Buscamos por 'productId' y eliminamos
        const productoEliminado = await Producto.findOneAndDelete({ productId: productId });

        if (!productoEliminado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
};