// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Páginas
import Login    from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home     from './components/Pages/Home';
import Products from './components/Pages/Products';
import Admin    from './components/Pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/"         element={<Home />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Ruta protegida — solo rol "user" */}
          <Route
            path="/productos"
            element={
              <PrivateRoute rolRequerido="user">
                <Products />
              </PrivateRoute>
            }
          />

          {/* Ruta protegida — solo rol "admin" */}
          <Route
            path="/admin"
            element={
              <PrivateRoute rolRequerido="admin">
                <Admin />
              </PrivateRoute>
            }
          />

          {/* Cualquier ruta desconocida → inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
