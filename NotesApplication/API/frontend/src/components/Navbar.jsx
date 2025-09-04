import { Link, useLocation } from "react-router-dom";

export default function Navbar({ isLoggedIn, onLogout }) {
  const { pathname } = useLocation();
  const linkStyle = (path) => ({
    padding: "6px 10px",
    borderRadius: 8,
    textDecoration: "none",
    color: pathname === path ? "#fff" : "#e6f0ff",
    background: pathname === path ? "rgba(255,255,255,0.2)" : "transparent"
  });

  return (
    <nav style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:"#2563eb",color:"#fff"}}>
      <Link to="/" style={{ color: "#fff", textDecoration: "none", fontWeight: 700 }}>📒 My Notes</Link>
      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/" style={linkStyle("/")}>Home</Link>
        {!isLoggedIn && <Link to="/login" style={linkStyle("/login")}>Login</Link>}
        {!isLoggedIn && <Link to="/register" style={linkStyle("/register")}>Register</Link>}
        {isLoggedIn && (
          <button onClick={onLogout} style={{ padding: "6px 10px", borderRadius: 8, border: 0, background: "#ef4444", color: "#fff", cursor: "pointer" }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
