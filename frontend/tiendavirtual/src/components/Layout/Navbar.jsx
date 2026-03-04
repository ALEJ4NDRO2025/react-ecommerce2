// src/components/Layout/Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-3 py-2 rounded-lg mr-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold">
              <Link to="/">
                <span className="text-red-500">Tienda</span>{' '}
                <span className="text-orange-500">AXT</span>
              </Link>
            </h1>
          </div>

          {/* Links de navegación escritorio */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link to="/" className="text-white hover:text-orange-500 font-light transition-colors duration-200 relative group">
                Inicio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              {usuario && (
                <Link to="/productos" className="text-white hover:text-orange-500 font-light transition-colors duration-200 relative group">
                  Productos
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              )}
              {usuario?.role === 'admin' && (
                <Link to="/admin" className="text-white hover:text-orange-500 font-light transition-colors duration-200 relative group">
                  Panel Admin
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              )}
            </div>

            {/* Botones de sesión */}
            <div className="flex items-center space-x-3">
              {usuario ? (
                <div className="flex items-center space-x-3">
                  {/* Avatar del usuario */}
                  <div className="flex items-center space-x-2 bg-gray-800 rounded-xl px-3 py-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {usuario.nombre?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm">
                      <p className="text-white font-medium leading-none">{usuario.nombre}</p>
                      <p className="text-gray-400 text-xs">{usuario.role === 'admin' ? '👑 Admin' : '👤 Usuario'}</p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Botón menú móvil */}
          <button
            className="md:hidden text-white hover:text-orange-500"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              }
            </svg>
          </button>
        </div>

        {/* Menú móvil desplegable */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4 space-y-3">
            <Link to="/" className="block text-white hover:text-orange-500 py-1" onClick={() => setMenuOpen(false)}>Inicio</Link>
            {usuario && (
              <Link to="/productos" className="block text-white hover:text-orange-500 py-1" onClick={() => setMenuOpen(false)}>Productos</Link>
            )}
            {usuario?.role === 'admin' && (
              <Link to="/admin" className="block text-white hover:text-orange-500 py-1" onClick={() => setMenuOpen(false)}>Panel Admin</Link>
            )}
            {usuario ? (
              <button onClick={() => { logout(); setMenuOpen(false); }} className="block text-red-400 hover:text-red-300 py-1">
                Cerrar sesión
              </button>
            ) : (
              <>
                <Link to="/login" className="block text-white hover:text-orange-500 py-1" onClick={() => setMenuOpen(false)}>Iniciar sesión</Link>
                <Link to="/register" className="block text-white hover:text-orange-500 py-1" onClick={() => setMenuOpen(false)}>Registrarse</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
