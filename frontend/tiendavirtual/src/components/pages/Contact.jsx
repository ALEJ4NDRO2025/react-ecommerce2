import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Navbar />
      <main>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Formulario */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Envíanos Un Mensaje</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1 text-gray-700">Nombre Completo <span className="text-red-600">*</span></label>
                    <input type="text" placeholder="Tu Nombre Completo" className="w-full bg-gray-50 border-gray-400 border-2 rounded-md h-9 px-2 mb-2"/>
                    <label className="block mb-1 text-gray-700">Teléfono <span className="text-red-600">*</span></label>
                    <input type="number" placeholder="300 123 4567" className="w-full bg-gray-50 border-gray-400 border-2 rounded-md h-9 px-2 mb-2"/>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700">Correo electrónico <span className="text-red-600">*</span></label>
                    <input type="text" placeholder="ejemplo@correo.com" className="w-full bg-gray-50 border-gray-400 border-2 rounded-md h-9 px-2 mb-2"/>
                    <label className="block mb-1 text-gray-700">Tipo de consulta <span className="text-red-600">*</span></label>
                    <select className="w-full p-1 border-2 bg-gray-50 border-gray-400 rounded-md h-9 mb-2">
                      <option>Bugs</option>
                      <option>Soporte</option>
                      <option>Solicitud</option>
                      <option>Reporte General</option>
                    </select>
                  </div>
                </div>
                <label className="block mb-1 text-gray-700">Mensajes <span className="text-red-600">*</span></label>
                <textarea className="w-full bg-gray-50 border-gray-400 border-2 rounded-md mb-4 p-2 h-28"></textarea>
                <div className="mb-4">
                  <input type="checkbox" id="privacy" className="mr-2"/>
                  <label htmlFor="privacy" className="text-sm">He leído y acepto la <span className="text-blue-600 cursor-pointer">política de privacidad</span> y el tratado de mis datos personales <span className="text-red-600">*</span></label>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 rounded-lg transition-all duration-200 transform hover:scale-105">
                  Enviar Mensaje
                </button>
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Información De Contacto</h3>
                  <div className="space-y-4">
                    {[
                      { bg: "bg-blue-100", color: "text-blue-800", icon: "📍", title: "Oficina Principal", lines: ["Carrera 11 #93-07, Oficina 501", "Bogotá D.C., Colombia"] },
                      { bg: "bg-green-100", color: "text-green-800", icon: "📞", title: "Teléfonos", lines: ["Fija: +57 (1) 234-5678", "Cel: +57 300 312 4567"] },
                      { bg: "bg-purple-100", color: "text-purple-800", icon: "✉️", title: "Correos", lines: ["info@techstore.co", "ventas@techstore.co"] },
                      { bg: "bg-orange-100", color: "text-orange-800", icon: "🕐", title: "Horarios", lines: ["Lun–Vie: 8:00 AM – 6:00 PM", "Sáb: 9:00 AM – 3:00 PM"] },
                    ].map(item => (
                      <div key={item.title} className="flex gap-3">
                        <div className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <span className="text-lg">{item.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                          {item.lines.map(l => <p key={l} className="text-gray-500 text-sm">{l}</p>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-bold mb-4 text-gray-900">Síguenos en Redes Sociales</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["Facebook", "Twitter / X", "Instagram", "WhatsApp", "YouTube", "LinkedIn"].map(r => (
                      <div key={r} className="flex gap-2 border-2 rounded-lg border-gray-100 items-center p-2 cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="text-blue-600 font-bold text-sm">@</div>
                        <div>
                          <p className="font-bold text-sm text-gray-800">{r}</p>
                          <p className="text-gray-500 text-xs">@tiendaaxt</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-bold mb-4 text-gray-900">¿Por qué elegirnos?</h3>
                  {["Atención personalizada y especializada", "Soporte técnico post-venta incluido", "Garantía extendida en todos nuestros productos", "Envío gratis en compras superiores a $500.000"].map(r => (
                    <p key={r} className="text-gray-600 mb-2 text-sm"><span className="text-blue-600 mr-2">✓</span>{r}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
