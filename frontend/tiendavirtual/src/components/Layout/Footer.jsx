import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-2 rounded-lg mr-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Tienda AXT</h3>
            </div>
            <p className="text-gray-400">Tu tienda de tecnología de confianza con los mejores productos y precios.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors duration-200">Inicio</Link></li>
              <li><Link to="/productos" className="hover:text-white transition-colors duration-200">Productos</Link></li>
              <li><Link to="/carrito" className="hover:text-white transition-colors duration-200">Carrito</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Atención</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors duration-200">Contacto</Link></li>
              <li><span className="hover:text-white cursor-pointer">Envíos</span></li>
              <li><span className="hover:text-white cursor-pointer">Devoluciones</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><span className="hover:text-white cursor-pointer">Términos</span></li>
              <li><span className="hover:text-white cursor-pointer">Privacidad</span></li>
              <li><span className="hover:text-white cursor-pointer">Cookies</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Tienda AXT. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
