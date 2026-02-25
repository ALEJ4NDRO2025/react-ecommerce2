// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, rolRequerido }) => {
    const { usuario } = useAuth();

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (rolRequerido && usuario.role !== rolRequerido) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;