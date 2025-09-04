import { useState } from "react";
import api, { setAuthToken } from "../api.js";
import { useNavigate } from "react-router-dom";

export default function Register({ onAuth }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Backend expects: name, email, password
      const res = await api.post("/user/register", form, { headers: { "Content-Type": "application/json" } });
      // If your backend returns token on register, set it. If not, navigate to login.
      const token = res.data?.token;
      if (token) {
        setAuthToken(token);
        onAuth?.();
        navigate("/");
      } else {
        // No token on register; go to login
        navigate("/login");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Registration failed";
      alert(msg);
      console.error("Register error:", err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 6px 24px rgba(0,0,0,0.08)" }}>
      <h2 style={{ marginTop: 0 }}>Create account</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input name="name" placeholder="Full name" value={form.name} onChange={onChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
        <button disabled={loading} style={{ padding: "10px 16px", borderRadius: 10, border: 0, background: "#16a34a", color: "#fff", cursor: "pointer" }}>
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
      <p style={{ marginTop: 8, opacity: 0.8 }}>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}
