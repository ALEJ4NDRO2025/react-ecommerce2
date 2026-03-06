import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { authAxios } from "../../context/AuthContext";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

export default function Admin() {
  const { usuario, BASE_URL } = useAuth();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nombre: "", descripcion: "", precio: "", imagen: "", category: "" });
  const [tab, setTab] = useState("productos");

  const cargarProductos = () => {
    authAxios.get(`${BASE_URL}/api/productos`)
      .then(r => setProductos(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(cargarProductos, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const crearProducto = async (e) => {
    e.preventDefault();
    try {
      await authAxios.post(`${BASE_URL}/api/productos`, { ...form, precio: parseFloat(form.precio) });
      alert("Producto creado exitosamente");
      setForm({ nombre: "", descripcion: "", precio: "", imagen: "", category: "" });
      cargarProductos();
    } catch (err) {
      alert(err.response?.data?.message || "Error al crear producto");
    }
  };

  const eliminarProducto = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await authAxios.delete(`${BASE_URL}/api/productos/${id}`);
      cargarProductos();
    } catch (err) {
      alert("Error al eliminar");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600">Bienvenido, {usuario?.nombre} — <span className="text-blue-600 font-semibold uppercase">{usuario?.role}</span></p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {["productos", "agregar"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`pb-3 px-4 font-semibold transition-colors capitalize ${tab === t ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}>
              {t === "productos" ? "Productos" : "Agregar Producto"}
            </button>
          ))}
        </div>

        {tab === "productos" && (
          <div>
            {loading ? (
              <div className="text-center py-16 text-gray-500">Cargando productos...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productos.map(p => (
                  <div key={p._id || p.productId} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                      {p.imagen ? <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover"/> : <div className="text-4xl">📦</div>}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-1">{p.nombre}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{p.descripcion}</p>
                      <p className="text-xl font-bold text-blue-600 mb-3">${(p.precio || 0).toLocaleString("es-CO")}</p>
                      <button onClick={() => eliminarProducto(p._id || p.productId)}
                        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
                {productos.length === 0 && (
                  <div className="col-span-3 text-center py-16 text-gray-500">No hay productos registrados</div>
                )}
              </div>
            )}
          </div>
        )}

        {tab === "agregar" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Agregar Producto</h2>
              <form onSubmit={crearProducto} className="space-y-5">
                {[
                  { k: "nombre", label: "Nombre del Producto", type: "text", ph: "Ej: MacBook Pro M3" },
                  { k: "descripcion", label: "Descripción", type: "text", ph: "Descripción del producto" },
                  { k: "precio", label: "Precio (COP)", type: "number", ph: "Ej: 2499000" },
                  { k: "imagen", label: "URL de Imagen", type: "url", ph: "https://..." },
                ].map(f => (
                  <div key={f.k}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{f.label}</label>
                    <input type={f.type} value={form[f.k]} onChange={set(f.k)} placeholder={f.ph} required={f.k !== "imagen"}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <select value={form.category} onChange={set("category")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Seleccionar categoría</option>
                    <option value="laptops">Laptops</option>
                    <option value="celulares">Celulares</option>
                    <option value="componentes">Componentes PC</option>
                    <option value="accesorios">Accesorios</option>
                  </select>
                </div>
                <button type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all">
                  Crear Producto
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
