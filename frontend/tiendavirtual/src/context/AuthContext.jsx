import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const BASE_URL = "http://localhost:8081";

// ✅ Instancia de axios que agrega el token automáticamente
export const authAxios = axios.create();
authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sesion = localStorage.getItem("SesionActiva");
    const datos = localStorage.getItem("usuario");
    if (sesion && datos) {
      setUsuario(JSON.parse(datos));
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${BASE_URL}/api/login`, { email, password });
    const u = res.data.user;
    const token = res.data.token; // ✅ Guardar el token JWT
    localStorage.setItem("SesionActiva", "true");
    localStorage.setItem("usuario", JSON.stringify(u));
    localStorage.setItem("token", token);
    setUsuario(u);
    if (u.role === "admin") navigate("/admin");
    else navigate("/productos");
  };

  const register = async ({ nombre, email, password }) => {
    const userId = (crypto && crypto.randomUUID) ? crypto.randomUUID() : `u-${Date.now()}`;
    await axios.post(`${BASE_URL}/api/users`, { userId, nombre, email, password });
  };

  const logout = () => {
    localStorage.removeItem("SesionActiva");
    localStorage.removeItem("usuario");
    localStorage.removeItem("carrito");
    localStorage.removeItem("token"); // ✅ Limpiar token
    setUsuario(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, register, BASE_URL }}>
      {children}
    </AuthContext.Provider>
  );
}
