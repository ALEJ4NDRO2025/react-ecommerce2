import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:8081/api/login", {
                email,
                password
            });

            const data = response.data;

            setUsuario({
                ...data.user,
                token: data.token
            });

            if (data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/productos");
            }

        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || "Error al iniciar sesión");
            } else {
                throw new Error("No se pudo conectar con el servidor");
            }
        }
    };

    const logout = () => {
        setUsuario(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};