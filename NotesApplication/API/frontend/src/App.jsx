import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import api, { setAuthToken } from "./api.js";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div style={{ maxWidth: 720, margin: "24px auto", padding: "0 16px" }}>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register onAuth={() => setIsLoggedIn(true)} />} />
          <Route path="/login" element={<Login onAuth={() => setIsLoggedIn(true)} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}
