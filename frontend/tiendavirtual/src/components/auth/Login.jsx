// src/components/Auth/Login.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            await login(email, password);
            setMessage({ type: "success", text: "¡Inicio de sesión correcto!" });
        } catch (error) {
            setMessage({ type: "error", text: error.message || "Error al iniciar sesión" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>

                {message.text && (
                    <p className={`text-center mb-4 ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
                        {message.text}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Correo electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tucorreo@email.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {loading ? "Cargando..." : "Iniciar Sesión"}
                    </button>
                </form>
            </div>
        </main>
    );
}