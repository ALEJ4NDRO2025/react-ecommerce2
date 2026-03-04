// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // LOGIN — conecta con POST /api/login del backend de Alejandro
  // El backend espera: { email, password }
  // El backend responde: { message, token, user: { userId, nombre, email, role } }
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8081/api/login', {
        email,
        password,
      });

      const data = response.data;

      // Guardamos usuario + token en memoria (Context)
      setUsuario({
        ...data.user,
        token: data.token,
      });

      // Redirigir según el rol
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/productos');
      }
    } catch (error) {
      // Propagamos el error al componente Login para mostrarlo
      if (error.response) {
        throw new Error(error.response.data.message || 'Error al iniciar sesión');
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error('Error al procesar la solicitud');
      }
    }
  };

  // LOGOUT
  const logout = () => {
    setUsuario(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
