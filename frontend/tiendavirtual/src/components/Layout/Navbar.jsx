import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function CartIcon() {
  const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
  const total = carrito.reduce((s, i) => s + i.cantidad, 0);
  return (
    <Link to="/carrito" className="relative group p-2.5 hover:bg-gray-700 rounded-xl transition-all duration-300 transform hover:scale-105">
      <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13l-1.1 5m0 0h1.1m0-5v5m0 0h10m-10 0a2 2 0 104 0m6 0a2 2 0 100 4"/>
      </svg>
      {total > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1 shadow-lg border-2 border-white">
          {total}
        </span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const iniciales = usuario?.nombre
    ? usuario.nombre.trim().split(" ").slice(0, 2).map(p => p[0].toUpperCase()).join("")
    : "?";

  const isAdmin = usuario?.role === "admin";

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-3 py-2 rounded-lg mr-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Tienda AXT
            </span>
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {!isAdmin && (
                <>
                  <NavLink to="/">Inicio</NavLink>
                  <NavLink to="/productos">Productos</NavLink>
                  <NavLink to="/pedidos">Mis Pedidos</NavLink>
                  <NavLink to="/contact">Contacto</NavLink>
                </>
              )}
              {isAdmin && <NavLink to="/admin">Panel Admin</NavLink>}
            </div>

            <div className="flex items-center space-x-3">
              {!isAdmin && <CartIcon />}

              {!usuario ? (
                <Link to="/login" className="relative group p-2.5 hover:bg-gray-700 rounded-xl transition-all duration-300 transform hover:scale-105">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </Link>
              ) : (
                <div className="relative" ref={dropRef}>
                  <button
                    onClick={() => setDropOpen(!dropOpen)}
                    className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-md hover:scale-105 transition-transform"
                  >
                    {iniciales}
                  </button>
                  {dropOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                        <p className="text-sm font-bold text-gray-900 truncate">{usuario.nombre}</p>
                        <p className="text-xs text-gray-500 truncate">{usuario.email}</p>
                        <p className="text-xs text-blue-600 font-semibold mt-1 uppercase">{usuario.role}</p>
                      </div>
                      {!isAdmin && (
                        <Link to="/profile" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                          Mi Perfil
                        </Link>
                      )}
                      <button onClick={logout} className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium border-t border-gray-100">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Hamburger */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"/>
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-gray-700 pt-4 space-y-2">
            {!isAdmin && (
              <>
                <MobileLink to="/" onClick={() => setMenuOpen(false)}>Inicio</MobileLink>
                <MobileLink to="/productos" onClick={() => setMenuOpen(false)}>Productos</MobileLink>
                <MobileLink to="/pedidos" onClick={() => setMenuOpen(false)}>Mis Pedidos</MobileLink>
                <MobileLink to="/contact" onClick={() => setMenuOpen(false)}>Contacto</MobileLink>
                <MobileLink to="/carrito" onClick={() => setMenuOpen(false)}>Carrito</MobileLink>
              </>
            )}
            {isAdmin && <MobileLink to="/admin" onClick={() => setMenuOpen(false)}>Panel Admin</MobileLink>}
            {usuario ? (
              <>
                {!isAdmin && <MobileLink to="/profile" onClick={() => setMenuOpen(false)}>Mi Perfil</MobileLink>}
                <button onClick={logout} className="block w-full text-left px-3 py-2 text-red-400 hover:text-red-300">Cerrar sesión</button>
              </>
            ) : (
              <>
                <MobileLink to="/login" onClick={() => setMenuOpen(false)}>Iniciar sesión</MobileLink>
                <MobileLink to="/register" onClick={() => setMenuOpen(false)}>Registrarse</MobileLink>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

function NavLink({ to, children }) {
  return (
    <Link to={to} className="text-white hover:text-orange-400 font-extralight transition-colors duration-200 relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-200 group-hover:w-full"></span>
    </Link>
  );
}

function MobileLink({ to, onClick, children }) {
  return (
    <Link to={to} onClick={onClick} className="block px-3 py-2 text-white hover:text-orange-400 transition-colors">
      {children}
    </Link>
  );
}
