import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Por favor complete todos los campos ❌"); return; }
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión. Verifique sus credenciales ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 px-10 py-10">
          <div className="flex justify-center mb-5">
            <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a7.5 7.5 0 0 1 15 0"/>
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">¡Bienvenido de vuelta!</h1>
          <p className="text-sm text-center text-gray-500 mb-6">Inicia sesión en tu cuenta de <span className="font-medium">Tienda AXT</span></p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="tucorreo@email.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-12 text-gray-900"/>
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600"/>
                <span className="text-gray-700">Recordarme</span>
              </label>
              <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">¿Olvidaste tu contraseña?</Link>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 transition-all">
              {loading ? "Iniciando sesión... 🔥" : "Iniciar sesión"}
            </button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
              <div className="relative flex justify-center text-xs"><span className="px-3 bg-white text-gray-500">O continúa con</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <button type="button" className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50">
                <span className="font-bold text-blue-600">G</span><span>Google</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50">
                <span className="font-extrabold text-blue-800">f</span><span>Facebook</span>
              </button>
            </div>

            <div className="text-center text-xs text-gray-500">
              ¿No tienes cuenta? <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">Regístrate aquí</Link>
            </div>
          </form>
          <p className="mt-5 text-xs text-center text-gray-400">Tus datos están protegidos con encriptación de nivel empresarial.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
