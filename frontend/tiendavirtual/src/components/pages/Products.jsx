// src/components/Pages/Products.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Layout from '../Layout/Layout';

export default function Products() {
  const { usuario } = useAuth();
  const [productos, setProductos]   = useState([]);
  const [filtrados, setFiltrados]   = useState([]);
  const [busqueda, setBusqueda]     = useState('');
  const [ordenar, setOrdenar]       = useState('relevance');
  const [precioFiltro, setPrecioFiltro] = useState('');
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');

  // Cargar productos desde el backend de Alejandro
  // GET /api/productos — requiere token en Authorization: Bearer <token>
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/productos', {
          headers: {
            Authorization: `Bearer ${usuario.token}`,
          },
        });
        setProductos(response.data);
        setFiltrados(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Tu sesión expiró. Por favor vuelve a iniciar sesión.');
        } else {
          setError('No se pudieron cargar los productos. Verifica que el servidor esté activo.');
        }
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, [usuario.token]);

  // Filtros y búsqueda
  useEffect(() => {
    let resultado = [...productos];

    // Búsqueda por nombre o descripción
    if (busqueda.trim()) {
      resultado = resultado.filter(p =>
        p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtro de precio
    if (precioFiltro) {
      const max = parseInt(precioFiltro);
      if (max === 3000001) {
        resultado = resultado.filter(p => p.precio > 3000000);
      } else {
        // Rangos: 500000 → 0-500k, 1500000 → 500k-1.5M, 3000000 → 1.5M-3M
        const rangos = { 500000: [0, 500000], 1500000: [500000, 1500000], 3000000: [1500000, 3000000] };
        const [min, maxR] = rangos[max] || [0, Infinity];
        resultado = resultado.filter(p => p.precio >= min && p.precio <= maxR);
      }
    }

    // Ordenar
    if (ordenar === 'price-asc') resultado.sort((a, b) => a.precio - b.precio);
    if (ordenar === 'price-desc') resultado.sort((a, b) => b.precio - a.precio);

    setFiltrados(resultado);
  }, [busqueda, precioFiltro, ordenar, productos]);

  const formatearPrecio = (precio) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(precio);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">

        {/* Título */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Catálogo de Productos</h1>
          <p className="text-gray-500 mt-1">Los mejores productos de tecnología para ti</p>
        </div>

        {/* Buscador y filtros */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {/* Barra de búsqueda */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rango de precio</label>
              <select
                value={precioFiltro}
                onChange={(e) => setPrecioFiltro(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Cualquier precio</option>
                <option value="500000">$0 – $500.000</option>
                <option value="1500000">$500.000 – $1.500.000</option>
                <option value="3000000">$1.500.000 – $3.000.000</option>
                <option value="3000001">Más de $3.000.000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
              <select
                value={ordenar}
                onChange={(e) => setOrdenar(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Estados de carga / error */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-3">
              <svg className="animate-spin h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <p className="text-gray-500">Cargando productos...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl flex items-center gap-3">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{error}</p>
          </div>
        )}

        {/* Grilla de productos */}
        {!loading && !error && (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600 text-sm">
                {filtrados.length === 0
                  ? 'No se encontraron productos'
                  : `Mostrando ${filtrados.length} producto${filtrados.length !== 1 ? 's' : ''}`}
              </p>
            </div>

            {filtrados.length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-gray-500 text-lg font-medium">No hay productos disponibles</p>
                <p className="text-gray-400 text-sm mt-1">Prueba con otros filtros de búsqueda</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtrados.map((producto) => (
                  <div
                    key={producto._id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Imagen */}
                    <div className="relative overflow-hidden bg-gray-100 h-48">
                      {producto.imagen ? (
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Sin+imagen'; }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
                        {producto.productId}
                      </p>
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 line-clamp-2">
                        {producto.nombre}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
                        {producto.descripcion}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-lg font-bold text-blue-600">
                          {formatearPrecio(producto.precio)}
                        </span>
                        <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200">
                          Añadir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
