import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

export default function Pedidos() {
  const { usuario, BASE_URL } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargar = () => {
    const id = usuario?.userId || usuario?.id;
    axios.get(`${BASE_URL}/api/pedidos/usuario/${id}`)
      .then(r => setPedidos((r.data.pedidos || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))))
      .catch(() => setPedidos([]))
      .finally(() => setLoading(false));
  };

  useEffect(cargar, []);

  const completados = pedidos.filter(p => p.estado === "completado").length;
  const gastado = pedidos.reduce((s, p) => s + (p.total || 0), 0);

  const estadoStyle = (e) => {
    if (e === "completado") return "bg-green-100 text-green-700";
    if (e === "cancelado") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Pedidos</h1>
            <p className="text-gray-600">Historial de todas tus compras</p>
          </div>
          <button onClick={cargar} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            Actualizar
          </button>
        </div>

        {/* Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Total Pedidos", value: pedidos.length, color: "text-blue-600" },
            { label: "Completados", value: completados, color: "text-green-600" },
            { label: "Total Gastado", value: `$${gastado.toLocaleString("es-CO")}`, color: "text-purple-600" },
          ].map(c => (
            <div key={c.label} className="bg-white rounded-xl shadow p-6 text-center">
              <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
              <p className="text-gray-600 mt-1">{c.label}</p>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500">Cargando pedidos...</div>
        ) : pedidos.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-16 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aún no tienes pedidos</h3>
            <p className="text-gray-600">¡Empieza a comprar para ver tu historial aquí!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pedidos.map(p => (
              <div key={p._id || p.pedidoId} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Pedido #{(p._id || p.pedidoId || "").toString().slice(-8).toUpperCase()}</p>
                    <p className="text-sm text-gray-500">{p.createdAt ? new Date(p.createdAt).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" }) : "—"}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${estadoStyle(p.estado)}`}>
                      {p.estado || "pendiente"}
                    </span>
                    <p className="text-xl font-bold text-blue-600 mt-2">${(p.total || 0).toLocaleString("es-CO")}</p>
                  </div>
                </div>
                {p.productos && p.productos.length > 0 && (
                  <div className="border-t pt-4 space-y-3">
                    {p.productos.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        {item.imagen ? (
                          <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded-lg"/>
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">📦</div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{item.nombre}</p>
                          <p className="text-sm text-gray-500">${(item.precio || 0).toLocaleString("es-CO")} × {item.cantidad}</p>
                        </div>
                        <p className="font-bold text-gray-800">${((item.precio || 0) * (item.cantidad || 1)).toLocaleString("es-CO")}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
