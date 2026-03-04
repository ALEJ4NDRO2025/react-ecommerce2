// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// rolRequerido: 'user' | 'admin' | undefined (solo requiere estar logueado)
const PrivateRoute = ({ children, rolRequerido }) => {
  const { usuario } = useAuth();

  // Si NO está logueado → manda al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si hay rol requerido y no coincide → manda al inicio
  if (rolRequerido && usuario.role !== rolRequerido) {
    // Admin intenta entrar a /productos → manda al panel admin
    if (usuario.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    // User intenta entrar a /admin → manda a productos
    return <Navigate to="/productos" replace />;
  }

  return children;
};

export default PrivateRoute;
