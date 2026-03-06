import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Products from "./components/Pages/Products";
import Admin from "./components/Pages/Admin";
import Contact from "./components/Pages/Contact";
import ForgotPassword from "./components/Pages/ForgotPassword";
import VerifyCode from "./components/Pages/VerifyCode";
import Profile from "./components/Pages/Profile";
import Cart from "./components/Layout/Cart";
import Pedidos from "./components/Pages/Pedidos";

export default function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      {/* Usuario */}
      <Route path="/productos" element={<PrivateRoute rolRequerido="user"><Products /></PrivateRoute>} />
      <Route path="/carrito" element={<PrivateRoute rolRequerido="user"><Cart /></PrivateRoute>} />
      <Route path="/pedidos" element={<PrivateRoute rolRequerido="user"><Pedidos /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute rolRequerido="user"><Profile /></PrivateRoute>} />
      <Route path="/contact" element={<PrivateRoute rolRequerido="user"><Contact /></PrivateRoute>} />
      {/* Admin */}
      <Route path="/admin" element={<PrivateRoute rolRequerido="admin"><Admin /></PrivateRoute>} />
    </Routes>
  );
}
