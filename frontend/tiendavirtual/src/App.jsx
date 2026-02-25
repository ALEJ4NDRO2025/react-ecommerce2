import { BrowserRouter,Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider} from './context/AuthContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.js';
import AdminPanel from './pages/Admin';
import Home from './components/Pages/Home';
import Layout from './components/Layout/Layout';

function App() {
    return(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route
                    path = "/productos"
                    element={
                        <PrivateRoute rolRequerido="user">
                            <Layout />
                            <div>Pagina de productos</div>
                        </PrivateRoute>
                    }
                    />

                    <Route
                    path="/admin"
                    element={
                        <PrivateRoute rolRequerido="admin">
                            <AdminPanel /> {/* Aquí iría el contenido específico del panel de administrador */}
                        </PrivateRoute>
                    }
                     />
                    
                <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
                
    );
}

export default App;