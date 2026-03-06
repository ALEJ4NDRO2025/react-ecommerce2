import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../context/AuthContext";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) { setError("Por favor ingresa tu correo electrónico"); return; }
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/Recuperar/solicitar-codigo`, { email });
      navigate(`/verify-code?correo=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err.response?.data?.message || "Error al enviar el código. El servidor puede tardar hasta 60 segundos.");
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
            <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M1,4 L1,20 L23,20 L23,4 L23,4 L1,4 L12,12 L23,4"/>
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">Recupera Tu Contraseña</h1>
          <p className="text-sm text-center text-gray-500 mb-6">Ingresa tu correo de <span className="font-medium">Tienda AXT</span> para recuperar tu contraseña</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="tucorreo@email.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"/>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 transition-all">
              {loading ? "Enviando código..." : "Continuar"}
            </button>
          </form>
          <p className="mt-5 text-xs text-center text-gray-400">Tus datos están protegidos con encriptación de nivel empresarial.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
