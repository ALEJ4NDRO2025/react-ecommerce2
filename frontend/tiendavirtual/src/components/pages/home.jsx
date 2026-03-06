import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authAxios, BASE_URL } from "../../context/AuthContext";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    authAxios.get(`${BASE_URL}/api/productos`)
      .then(r => setProductos(r.data))
      .catch(() => setProductos([]))
      .finally(() => setLoading(false));
  }, []);

  const filtrados = productos.filter(p =>
    p.nombre?.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 6);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-red-400 via-orange-600 to-indigo-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">
            Encuentra la mejor <span className="text-yellow-300">tecnología</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Laptops, celulares y componentes PC al mejor precio del mercado</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
              Ver Productos
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
              Ofertas Especiales
            </button>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nuestras Categorías</h2>
            <p className="text-gray-600 text-lg">Descubre nuestra amplia gama de productos tecnológicos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "💻", title: "Laptops", desc: "Las mejores marcas y modelos para trabajo y gaming" },
              { icon: "📱", title: "Celulares", desc: "Última tecnología móvil de todas las marcas" },
              { icon: "⚙️", title: "Componentes PC", desc: "Arma tu PC ideal con los mejores componentes" },
            ].map(c => (
              <div key={c.title} className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="text-6xl mb-6">{c.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{c.title}</h3>
                <p className="text-gray-600 mb-6">{c.desc}</p>
                <Link to="/login" className="text-blue-600 font-semibold">Ver más →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Productos Destacados</h2>
            <p className="text-gray-600 text-lg">Los productos más populares de nuestra tienda</p>
          </div>

          {/* Buscador */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input type="text" placeholder="Buscar productos..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
              <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtrados.map(p => (
                <ProductCard key={p._id || p.productId} producto={p} />
              ))}
              {filtrados.length === 0 && (
                <div className="col-span-3 text-center py-16 text-gray-500">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-xl">No se encontraron productos</p>
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/login" className="bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105">
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Mantente al día con Tienda AXT</h2>
          <p className="text-lg mb-8 opacity-90">Recibe las últimas ofertas y novedades tecnológicas</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="Tu email" className="flex-1 px-4 py-3 bg-white rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"/>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">Suscribirse</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ProductCard({ producto }) {
  return (
    <div className="border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-64 flex items-center justify-center relative overflow-hidden">
        {producto.imagen ? (
          <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover"/>
        ) : (
          <div className="text-6xl">📦</div>
        )}
        <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">-15%</div>
      </div>
      <div className="p-6 bg-white">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{producto.nombre}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{producto.descripcion}</p>
        <div className="flex items-center mb-4">
          <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
          <span className="text-gray-500 text-sm ml-2">(128 reseñas)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-blue-600">
            ${(producto.precio || 0).toLocaleString("es-CO")}
          </span>
          <Link to="/login" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105">
            Comprar
          </Link>
        </div>
      </div>
    </div>
  );
}
