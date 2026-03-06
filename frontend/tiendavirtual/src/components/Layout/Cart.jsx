import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

function getCarrito() { return JSON.parse(localStorage.getItem("carrito") || "[]"); }
function saveCarrito(c) { localStorage.setItem("carrito", JSON.stringify(c)); }

function toast(msg, ok = true) {
  const el = document.createElement("div");
  el.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 text-white ${ok ? "bg-green-500" : "bg-red-500"}`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

export default function Cart() {
  const { usuario, BASE_URL } = useAuth();
  const [carrito, setCarrito] = useState(getCarrito());
  const [form, setForm] = useState({ direccion: "", ciudad: "", codigoPostal: "", metodoPago: "efectivo" });
  const [loading, setLoading] = useState(false);

  const refresh = () => setCarrito(getCarrito());

  const eliminar = (id) => {
    let c = getCarrito().filter(i => i.productId !== id);
    saveCarrito(c); refresh();
  };

  const actualizar = (id, qty) => {
    if (qty <= 0) { eliminar(id); return; }
    let c = getCarrito().map(i => i.productId === id ? { ...i, cantidad: qty } : i);
    saveCarrito(c); refresh();
  };

  const subtotal = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const total = subtotal;

  const finalizar = async () => {
    if (!form.direccion || !form.ciudad || !form.codigoPostal) {
      toast("Por favor completa todos los campos de envío", false); return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/pedidos`, {
        userId: usuario.userId,
        email: usuario.email,
        nombreCliente: usuario.nombre,
        productos: carrito,
        direccionEnvio: { direccion: form.direccion, ciudad: form.ciudad, codigoPostal: form.codigoPostal },
        metodoPago: form.metodoPago,
      });
      toast(`¡Compra realizada! Pedido #${res.data.pedido?.pedidoId || "OK"}`);
      localStorage.removeItem("carrito");
      setCarrito([]);
    } catch (err) {
      toast(err.response?.data?.message || "Error al crear el pedido", false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-3">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.1 5M7 13l-1.1 5h1.1m0-5v5h10m-10 0a2 2 0 104 0m6 0a2 2 0 100 4"/>
          </svg>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tu Carrito</h1>
            <p className="text-gray-600">Revisa tus productos antes de finalizar la compra</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Productos */}
          <div className="lg:col-span-2">
            {carrito.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.1 5M7 13l-1.1 5h1.1m0-5v5h10m-10 0a2 2 0 104 0m6 0a2 2 0 100 4"/>
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h3>
                <p className="text-gray-600 mb-6">¡Agrega productos para comenzar a comprar!</p>
                <Link to="/productos" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all">
                  Ver Productos
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {carrito.map(item => (
                  <div key={item.productId} className="bg-white rounded-2xl shadow-lg p-6 flex gap-6">
                    {item.imagen ? (
                      <img src={item.imagen} alt={item.nombre} className="w-28 h-28 object-cover rounded-lg flex-shrink-0"/>
                    ) : (
                      <div className="w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">📦</div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{item.nombre}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{item.descripcion}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button onClick={() => actualizar(item.productId, item.cantidad - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/></svg>
                          </button>
                          <span className="text-lg font-semibold">{item.cantidad}</span>
                          <button onClick={() => actualizar(item.productId, item.cantidad + 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">${(item.precio * item.cantidad).toLocaleString("es-CO")}</p>
                          <p className="text-sm text-gray-500">${item.precio.toLocaleString("es-CO")} c/u</p>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => eliminar(item.productId)} className="text-red-500 hover:text-red-700 p-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>
              <div className="flex justify-between py-3 border-b"><span className="text-gray-600">Subtotal</span><span className="font-semibold">${subtotal.toLocaleString("es-CO")}</span></div>
              <div className="flex justify-between py-3 border-b"><span className="text-gray-600">Envío</span><span className="text-green-600 font-semibold">Gratis</span></div>
              <div className="flex justify-between py-4 mb-6"><span className="text-lg font-bold">Total</span><span className="text-2xl font-bold text-blue-600">${total.toLocaleString("es-CO")}</span></div>

              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-900">Información de Envío</h3>
                <input placeholder="Dirección completa" value={form.direccion} onChange={e => setForm({...form, direccion: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"/>
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Ciudad" value={form.ciudad} onChange={e => setForm({...form, ciudad: e.target.value})}
                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"/>
                  <input placeholder="Cód. Postal" value={form.codigoPostal} onChange={e => setForm({...form, codigoPostal: e.target.value})}
                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"/>
                </div>
                <select value={form.metodoPago} onChange={e => setForm({...form, metodoPago: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500">
                  <option value="efectivo">💵 Efectivo contra entrega</option>
                  <option value="tarjeta">💳 Tarjeta de crédito</option>
                  <option value="transferencia">🏦 Transferencia bancaria</option>
                </select>
              </div>

              <button onClick={finalizar} disabled={loading || carrito.length === 0}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? "Procesando..." : (
                  <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Finalizar Compra</>
                )}
              </button>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  Compra segura y protegida
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/></svg>
                  Envío gratis en compras +$100,000
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
