import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

export default function Profile() {
  const { usuario, logout, BASE_URL } = useAuth();
  const [data, setData] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [modoEdit, setModoEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const iniciales = (nombre) => {
    if (!nombre) return "?";
    const p = nombre.trim().split(" ");
    return p.length >= 2 ? (p[0][0] + p[p.length - 1][0]).toUpperCase() : nombre[0].toUpperCase();
  };

  useEffect(() => {
    axios.post(`${BASE_URL}/api/perfil/obtener`, { email: usuario.email })
      .then(r => { setData(r.data.user); setEditNombre(r.data.user.nombre); })
      .catch(() => { setData(usuario); setEditNombre(usuario.nombre); })
      .finally(() => setLoading(false));
  }, []);

  const guardar = async () => {
    if (!editNombre.trim()) { alert("El nombre es obligatorio"); return; }
    try {
      await axios.put(`${BASE_URL}/api/perfil/actualizar`, { email: usuario.email, nombre: editNombre });
      setData({ ...data, nombre: editNombre });
      setModoEdit(false);
      alert("Perfil actualizado exitosamente");
    } catch (err) {
      alert(err.response?.data?.message || "Error al actualizar");
    }
  };

  const eliminar = async () => {
    if (!confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) return;
    try {
      await axios.delete(`${BASE_URL}/api/perfil/eliminar`, { data: { email: usuario.email } });
      alert("Cuenta eliminada exitosamente");
      logout();
    } catch (err) {
      alert(err.response?.data?.message || "Error al eliminar");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-500">Cargando perfil...</div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl flex-1">
        <div className="bg-white shadow-xl rounded-xl border border-gray-300 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-8 py-12 border-b border-gray-200">
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl">
                {iniciales(data?.nombre)}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{data?.nombre}</h2>
                <p className="text-gray-600 text-lg">{data?.email}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 py-10 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Nombre Completo</label>
              <input type="text" value={editNombre} onChange={e => setEditNombre(e.target.value)}
                readOnly={!modoEdit}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${modoEdit ? "bg-white border-gray-300" : "bg-gray-50 border-gray-300 cursor-not-allowed"}`}/>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Correo Electrónico</label>
              <input type="email" value={data?.email || ""} readOnly
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl cursor-not-allowed"/>
              <p className="text-xs text-gray-500 mt-1">El correo no se puede modificar</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Rol de Usuario</label>
              <input type="text" value={data?.role || "user"} readOnly
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl cursor-not-allowed"/>
              <p className="text-xs text-gray-500 mt-1">Tipo de cuenta en el sistema</p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-center gap-6 pt-6 pb-8 border-t border-gray-200">
            {!modoEdit ? (
              <>
                <button onClick={() => setModoEdit(true)}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all transform hover:scale-105">
                  Editar Perfil
                </button>
                <button onClick={eliminar}
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md transition-all transform hover:scale-105">
                  Eliminar Cuenta
                </button>
              </>
            ) : (
              <>
                <button onClick={guardar}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition-all transform hover:scale-105">
                  Guardar Cambios
                </button>
                <button onClick={() => { setModoEdit(false); setEditNombre(data?.nombre); }}
                  className="px-8 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-xl shadow-md transition-all transform hover:scale-105">
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
