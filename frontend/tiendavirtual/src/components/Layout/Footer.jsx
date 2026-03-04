// src/components/Layout/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Marca */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-2 rounded-lg mr-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">
                <span className="text-red-500">Tienda</span>{' '}
                <span className="text-orange-500">AXT</span>
              </h3>
            </div>
            <p className="text-gray-400 text-sm">Tu tienda de tecnología de confianza con los mejores productos y precios.</p>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-white transition-colors duration-200">Inicio</a></li>
              <li><a href="/productos" className="hover:text-white transition-colors duration-200">Productos</a></li>
            </ul>
          </div>

          {/* Atención */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Atención</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Contacto</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Envíos</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Devoluciones</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Términos</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© 2025 Tienda AXT. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
