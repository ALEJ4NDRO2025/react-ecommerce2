import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { authAxios } from "../../context/AuthContext";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

function toast(msg, ok = true) {
  const el = document.createElement("div");
  el.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-[9999] text-white font-semibold transition-all duration-300 ${ok ? "bg-green-500" : "bg-red-500"}`;
  el.style.opacity = "0"; el.style.transform = "translateY(-20px)";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 10);
  setTimeout(() => { el.style.opacity = "0"; setTimeout(() => el.remove(), 300); }, 3000);
}

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
  const idx = carrito.findIndex(i => i.productId === producto.productId);
  if (idx !== -1) { carrito[idx].cantidad += 1; toast(`Cantidad actualizada: ${carrito[idx].cantidad}`); }
  else { carrito.push({ ...producto, cantidad: 1 }); toast("Producto agregado al carrito ✓"); }
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

export default function Products() {
  const { BASE_URL } = useAuth();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [orden, setOrden] = useState("relevance");

  useEffect(() => {
    authAxios.get(`${BASE_URL}/api/productos`)
      .then(r => setProductos(r.data))
      .catch(() => setProductos([]))
      .finally(() => setLoading(false));
  }, []);

  let filtrados = productos.filter(p => {
    const matchSearch = p.nombre?.toLowerCase().includes(search.toLowerCase());
    const matchCat = !categoria || p.category === categoria;
    let matchPrecio = true;
    if (precio === "500000") matchPrecio = p.precio <= 500000;
    else if (precio === "1500000") matchPrecio = p.precio > 500000 && p.precio <= 1500000;
    else if (precio === "3000000") matchPrecio = p.precio > 1500000 && p.precio <= 3000000;
    else if (precio === "3000001") matchPrecio = p.precio > 3000000;
    return matchSearch && matchCat && matchPrecio;
  });

  if (orden === "price-asc") filtrados.sort((a, b) => a.precio - b.precio);
  else if (orden === "price-desc") filtrados.sort((a, b) => b.precio - a.precio);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="relative mb-6">
            <input type="text" placeholder="Buscar productos..." value={search} onChange={e => setSearch(e.target.value)}
              id="search-input"
              className="w-full pl-12 pr-4 py-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select value={categoria} onChange={e => setCategoria(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                <option value="">Todas las categorías</option>
                <option value="laptops">Laptops</option>
                <option value="celulares">Celulares</option>
                <option value="componentes">Componentes PC</option>
                <option value="accesorios">Accesorios</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rango de Precio</label>
              <select value={precio} onChange={e => setPrecio(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Cualquier precio</option>
                <option value="500000">$0 – $500.000</option>
                <option value="1500000">$500.000 – $1.500.000</option>
                <option value="3000000">$1.500.000 – $3.000.000</option>
                <option value="3000001">Más de $3.000.000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
              <select value={orden} onChange={e => setOrden(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtrados.map(p => (
              <ProductCard key={p._id || p.productId} producto={p} />
            ))}
            {filtrados.length === 0 && (
              <div className="col-span-4 text-center py-16 text-gray-500">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-xl font-semibold">No se encontraron productos</p>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function ProductCard({ producto }) {
  const id = producto.productId || producto.ProductId || producto.id || producto._id;
  const handleAdd = () => {
    agregarAlCarrito({
      productId: id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen: producto.imagen,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="relative bg-gray-100 h-48 flex items-center justify-center overflow-hidden">
        {producto.imagen ? (
          <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy"/>
        ) : (
          <div className="text-5xl">📦</div>
        )}
        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">-15%</div>
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-1">{producto.nombre}</h3>
        <p className="text-gray-600 mb-3 text-sm line-clamp-2">{producto.descripcion}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-blue-600">${(producto.precio || 0).toLocaleString("es-CO")}</span>
          <span className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</span>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm transition-colors">
            Ver detalles
          </button>
          <button onClick={handleAdd} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
