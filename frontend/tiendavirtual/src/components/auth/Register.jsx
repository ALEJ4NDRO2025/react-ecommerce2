import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", email: "", password: "", confirm: "" });
  const [status, setStatus] = useState({ msg: "", type: "" });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ msg: "", type: "" });
    if (!form.nombre || !form.email || !form.password || !form.confirm) {
      setStatus({ msg: "Por favor complete todos los campos ❌", type: "error" }); return;
    }
    if (form.password !== form.confirm) {
      setStatus({ msg: "Las contraseñas no coinciden ❌", type: "error" }); return;
    }
    setLoading(true);
    try {
      await register({ nombre: form.nombre, email: form.email, password: form.password });
      setStatus({ msg: "Registro exitoso ✅ Redirigiendo...", type: "success" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setStatus({ msg: err.response?.data?.message || "Error al registrar. Intenta nuevamente.", type: "error" });
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 10h-6M6 16c0-1.794 1.343-3.25 3-3.25s3 1.456 3 3.25M14 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16h-3M19.5 14.5v3"/>
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">Crea tu cuenta TechStore</h1>
          <p className="text-sm text-center text-gray-500 mb-6">Regístrate para acceder a los mejores productos de tecnología.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input type="text" value={form.nombre} onChange={set("nombre")} placeholder="Juan Pérez"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input type="email" value={form.email} onChange={set("email")} placeholder="tucorreo@email.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input type="password" value={form.password} onChange={set("password")} placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
              <input type="password" value={form.confirm} onChange={set("confirm")} placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"/>
            </div>

            {status.msg && (
              <div className={`px-4 py-3 rounded-lg text-sm font-medium border text-center ${status.type === "success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"}`}>
                {status.msg}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 transition-all">
              {loading ? "Registrando..." : "Regístrate"}
            </button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
              <div className="relative flex justify-center text-xs"><span className="px-3 bg-white text-gray-500">O usa tus redes</span></div>
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
              ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">Inicia sesión aquí</Link>
            </div>
          </form>
          <p className="mt-5 text-xs text-center text-gray-400">Tus datos están protegidos con encriptación de nivel empresarial.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
