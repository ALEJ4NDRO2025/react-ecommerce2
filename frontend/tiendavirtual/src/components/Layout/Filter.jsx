// Filter component - integrado directamente en Products.jsx
export default function Filter({ search, setSearch, categoria, setCategoria, precio, setPrecio, orden, setOrden }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="relative mb-6">
        <input type="text" placeholder="Buscar productos..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-blue-500"/>
        <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
          <select value={categoria} onChange={e => setCategoria(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="">Todas las categorías</option>
            <option value="laptops">Laptops</option>
            <option value="celulares">Celulares</option>
            <option value="componentes">Componentes PC</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
          <select value={precio} onChange={e => setPrecio(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="">Cualquier precio</option>
            <option value="500000">$0 – $500.000</option>
            <option value="1500000">$500.000 – $1.500.000</option>
            <option value="3000000">$1.500.000 – $3.000.000</option>
            <option value="3000001">Más de $3.000.000</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar</label>
          <select value={orden} onChange={e => setOrden(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="relevance">Relevancia</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>
    </div>
  );
}
