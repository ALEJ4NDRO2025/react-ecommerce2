// src/components/Pages/Admin.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Layout from '../Layout/Layout';

export default function Admin() {
  const { usuario } = useAuth();

  // Estados de productos
  const [productos, setProductos] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');

  // Formulario para crear/editar producto
  const formVacio = { nombre: '', descripcion: '', precio: '', imagen: '' };
  const [form, setForm]         = useState(formVacio);
  const [editandoId, setEditandoId] = useState(null); // null = creando, id = editando
  const [formLoading, setFormLoading] = useState(false);
  const [formMsg, setFormMsg]   = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);

  const headers = { Authorization: `Bearer ${usuario.token}` };

  // Cargar productos
  const cargarProductos = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:8081/api/productos', { headers });
      setProductos(res.data);
    } catch (err) {
      setError('Error al cargar los productos. Verifica la conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargarProductos(); }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Abrir formulario para crear
  const abrirCrear = () => {
    setForm(formVacio);
    setEditandoId(null);
    setFormMsg({ type: '', text: '' });
    setShowForm(true);
  };

  // Abrir formulario para editar
  const abrirEditar = (p) => {
    setForm({ nombre: p.nombre, descripcion: p.descripcion, precio: p.precio, imagen: p.imagen || '' });
    setEditandoId(p._id);
    setFormMsg({ type: '', text: '' });
    setShowForm(true);
  };

  // Crear o actualizar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormMsg({ type: '', text: '' });

    try {
      if (editandoId) {
        // PUT /api/productos/:id — requiere token + soloAdmin
        await axios.put(`http://localhost:8081/api/productos/${editandoId}`, form, { headers });
        setFormMsg({ type: 'success', text: 'Producto actualizado con éxito ✅' });
      } else {
        // POST /api/productos — requiere token + soloAdmin
        // El backend espera: { productId, nombre, descripcion, precio, imagen }
        const productId = `PROD-${Date.now()}`;
        await axios.post('http://localhost:8081/api/productos', { productId, ...form, precio: Number(form.precio) }, { headers });
        setFormMsg({ type: 'success', text: 'Producto creado con éxito ✅' });
      }
      await cargarProductos();
      setTimeout(() => { setShowForm(false); setForm(formVacio); setEditandoId(null); setFormMsg({ type: '', text: '' }); }, 1500);
    } catch (err) {
      setFormMsg({ type: 'error', text: err.response?.data?.message || 'Error al guardar el producto' });
    } finally {
      setFormLoading(false);
    }
  };

  // Eliminar producto
  const eliminarProducto = async (id, nombre) => {
    if (!confirm(`¿Seguro que deseas eliminar "${nombre}"?`)) return;
    try {
      await axios.delete(`http://localhost:8081/api/productos/${id}`, { headers });
      await cargarProductos();
    } catch (err) {
      alert('Error al eliminar el producto');
    }
  };

  const formatearPrecio = (precio) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(precio);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">

        {/* Encabezado del panel */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-yellow-400 text-xl">👑</span>
              <h1 className="text-2xl font-bold">Panel Administrativo</h1>
            </div>
            <p className="text-gray-300 text-sm">
              Bienvenido, <span className="text-orange-400 font-semibold">{usuario.nombre}</span> — Gestiona los productos de la tienda
            </p>
          </div>
          <button
            onClick={abrirCrear}
            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Nuevo producto
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{productos.length}</p>
              <p className="text-gray-500 text-sm">Total productos</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{productos.length}</p>
              <p className="text-gray-500 text-sm">Productos activos</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 border border-gray-100">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">👑</span>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{usuario.role?.toUpperCase()}</p>
              <p className="text-gray-500 text-sm">Tu rol</p>
            </div>
          </div>
        </div>

        {/* Modal / Formulario */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-gray-900">
                  {editandoId ? 'Editar producto' : 'Nuevo producto'}
                </h2>
                <button
                  onClick={() => { setShowForm(false); setForm(formVacio); setEditandoId(null); }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del producto</label>
                  <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Ej: Laptop Dell XPS 15"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required rows={3} placeholder="Descripción del producto..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio (COP)</label>
                  <input type="number" name="precio" value={form.precio} onChange={handleChange} required min="0" placeholder="Ej: 3500000"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL de imagen</label>
                  <input type="url" name="imagen" value={form.imagen} onChange={handleChange} required placeholder="https://..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>

                {formMsg.text && (
                  <div className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm ${
                    formMsg.type === 'error' ? 'bg-red-50 border border-red-200 text-red-800' : 'bg-green-50 border border-green-200 text-green-800'
                  }`}>
                    <span>{formMsg.text}</span>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={formLoading}
                    className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-60 text-sm">
                    {formLoading ? 'Guardando...' : (editandoId ? 'Actualizar' : 'Crear producto')}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}
                    className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabla de productos */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Lista de Productos</h2>
            <span className="text-sm text-gray-500">{productos.length} productos</span>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-16">
              <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            </div>
          )}

          {error && (
            <div className="m-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          {!loading && !error && productos.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg font-medium mb-1">No hay productos</p>
              <p className="text-sm">Crea el primero con el botón "Nuevo producto"</p>
            </div>
          )}

          {!loading && !error && productos.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Imagen</th>
                    <th className="px-6 py-3 text-left">Producto</th>
                    <th className="px-6 py-3 text-left">ID</th>
                    <th className="px-6 py-3 text-left">Precio</th>
                    <th className="px-6 py-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {productos.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <img
                          src={p.imagen}
                          alt={p.nombre}
                          className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/56?text=N/A'; }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900 line-clamp-1">{p.nombre}</p>
                        <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">{p.descripcion}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-mono text-xs">{p.productId}</td>
                      <td className="px-6 py-4 font-semibold text-blue-600">{formatearPrecio(p.precio)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => abrirEditar(p)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors text-xs font-medium"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarProducto(p._id, p.nombre)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-xs font-medium"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
