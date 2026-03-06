import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, rolRequerido }) {
  const { usuario } = useAuth();
  if (!usuario) return <Navigate to="/login" />;
  if (rolRequerido && usuario.role !== rolRequerido) {
    return <Navigate to={usuario.role === "admin" ? "/admin" : "/productos"} />;
  }
  return children;
}
