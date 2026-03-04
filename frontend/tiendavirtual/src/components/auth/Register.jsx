// src/components/Auth/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmar: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Genera un userId único simple (ej: "USR-1234567890")
  const generarUserId = () => `USR-${Date.now()}`;

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (form.password !== form.confirmar) {
      return setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
    }
    if (form.password.length < 6) {
      return setMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres' });
    }

    setLoading(true);
    try {
      // POST /api/users — el backend espera: { userId, nombre, email, password }
      await axios.post('http://localhost:8081/api/users', {
        userId: generarUserId(),
        nombre: form.nombre,
        email: form.email,
        password: form.password,
      });

      setMessage({ type: 'success', text: '¡Usuario registrado con éxito! Redirigiendo al login...' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      if (error.response) {
        setMessage({ type: 'error', text: error.response.data.message || 'Error al registrar usuario' });
      } else {
        setMessage({ type: 'error', text: 'No se pudo conectar con el servidor' });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Cabecera */}
      <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-3 py-2 rounded-lg mr-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-extrabold">
                <Link to="/"><span className="text-red-500">Tienda</span> <span className="text-orange-500">AXT</span></Link>
              </h1>
            </div>
            <div className="hidden md:flex space-x-6 text-sm">
              <Link to="/" className="text-white hover:text-orange-500 transition-colors duration-200">Inicio</Link>
              <Link to="/login" className="text-white hover:text-orange-500 transition-colors duration-200">Iniciar sesión</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Contenido */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 px-10 py-10">

          {/* Icono */}
          <div className="flex justify-center mb-5">
            <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 10h-6M6 16c0-1.794 1.343-3.25 3-3.25s3 1.456 3 3.25M14 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16h-3M19.5 14.5v3" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">Crea tu cuenta</h1>
          <p className="text-sm text-center text-gray-500 mb-6">Regístrate para acceder a los mejores productos de tecnología.</p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tucorreo@email.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Mínimo 6 caracteres"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12 text-gray-900 text-sm"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword
                      ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                    }
                  </svg>
                </button>
              </div>
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label htmlFor="confirmar" className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmar"
                name="confirmar"
                placeholder="Repite tu contraseña"
                value={form.confirmar}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>

            {/* Mensaje */}
            {message.text && (
              <div className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm ${
                message.type === 'error'
                  ? 'bg-red-50 border border-red-200 text-red-800'
                  : 'bg-green-50 border border-green-200 text-green-800'
              }`}>
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {message.type === 'error'
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  }
                </svg>
                <span>{message.text}</span>
              </div>
            )}

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Registrando...
                </span>
              ) : 'Crear cuenta'}
            </button>

            <div className="text-center text-sm text-gray-500 mt-2">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">Inicia sesión aquí</Link>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-gray-900 text-center text-gray-500 text-sm py-4">
        © 2025 Tienda AXT. Todos los derechos reservados.
      </footer>
    </div>
  );
}
