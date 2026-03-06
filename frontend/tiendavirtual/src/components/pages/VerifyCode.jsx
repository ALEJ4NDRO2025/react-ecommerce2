import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../context/AuthContext";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

export default function VerifyCode() {
  const [params] = useSearchParams();
  const correo = params.get("correo") || "";
  const navigate = useNavigate();
  const [form, setForm] = useState({ codigo: "", password: "", passwordver: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.codigo || form.codigo.length !== 6) { setError("El código debe tener 6 dígitos"); return; }
    if (!form.password || !form.passwordver) { setError("Por favor completa todos los campos"); return; }
    if (form.password.length < 6) { setError("La contraseña debe tener al menos 6 caracteres"); return; }
    if (form.password !== form.passwordver) { setError("Las contraseñas no coinciden"); return; }
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/Recuperar/cambiar-password`, {
        email: correo, codigo: form.codigo, nuevaPassword: form.password
      });
      alert("✅ Contraseña actualizada correctamente.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 px-10 py-10">
          <div className="flex justify-center mb-5">
            <div className="h-14 w-14 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center shadow-md">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2 L19 5 V11 C19 16 15.5 20.5 12 22 C8.5 20.5 5 16 5 11 V5 L12 2 Z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12 L11 14 L15 10"/>
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">Cambia Tu Contraseña</h1>
          <p className="text-sm text-center text-gray-500 mb-6">Ingresa el código enviado a <span className="font-medium">{correo}</span></p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Código de verificación</label>
              <input type="text" value={form.codigo} onChange={set("codigo")} maxLength={6} required
                placeholder="0 0 0 0 0 0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-2xl text-center focus:outline-none focus:ring-2 focus:ring-blue-600"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input type="password" value={form.password} onChange={set("password")} required placeholder="••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirma Tu Contraseña</label>
              <input type="password" value={form.passwordver} onChange={set("passwordver")} required placeholder="••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"/>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 disabled:opacity-60 transition-all">
              {loading ? "Cambiando..." : "Continuar"}
            </button>
          </form>
          <p className="mt-5 text-xs text-center text-gray-400">Tus datos están protegidos con encriptación de nivel empresarial.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
