// src/components/Pages/Home.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Layout from '../Layout/Layout';

export default function Home() {
  const { usuario } = useAuth();

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wider uppercase">
            🔥 Tecnología al mejor precio
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Bienvenido a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Tienda AXT
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Encuentra los mejores productos de tecnología con garantía, envío rápido y los mejores precios del mercado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {usuario ? (
              <Link
                to="/productos"
                className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg"
              >
                Ver Productos
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg"
                >
                  Crear cuenta gratis
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3.5 border border-gray-500 hover:border-gray-300 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-200"
                >
                  Iniciar sesión
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-md transition-shadow duration-200">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Productos garantizados</h3>
              <p className="text-gray-500 text-sm">Todos nuestros productos cuentan con garantía oficial del fabricante.</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-md transition-shadow duration-200">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Envío rápido</h3>
              <p className="text-gray-500 text-sm">Entrega en 24-48 horas a todo el país con seguimiento en tiempo real.</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-md transition-shadow duration-200">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Compra segura</h3>
              <p className="text-gray-500 text-sm">Tus datos y pagos están protegidos con encriptación de nivel empresarial.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {!usuario && (
        <section className="py-14 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">¡Únete a miles de clientes satisfechos!</h2>
          <p className="text-blue-100 mb-6">Crea tu cuenta gratis y empieza a disfrutar de todos nuestros beneficios.</p>
          <Link
            to="/register"
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200"
          >
            Registrarme gratis
          </Link>
        </section>
      )}
    </Layout>
  );
}
