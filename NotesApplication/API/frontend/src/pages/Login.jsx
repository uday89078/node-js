import { useState } from "react";
import api, { setAuthToken } from "../api.js";
import { useNavigate } from "react-router-dom";

export default function Login({ onAuth }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/user/signIn", form, {
        headers: { "Content-Type": "application/json" },
      });

      const token = res.data?.token;
      if (token) {
        setAuthToken(token); // ✅ token set in localStorage + axios headers
        onAuth?.();
        navigate("/"); // redirect to dashboard
      } else {
        alert("Login successful but token not returned from backend.");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Login failed";
      alert(msg);
      console.error("Login error:", err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, borderRadius: 12, background: "#fff", boxShadow: "0 6px 24px rgba(0,0,0,0.08)" }}>
      <h2>Welcome back</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
        <button disabled={loading} style={{ padding: "10px 16px", borderRadius: 10, border: 0, background: "#2563eb", color: "#fff", cursor: "pointer" }}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
      <p style={{ marginTop: 8, opacity: 0.8 }}>
        New here? <a href="/register">Create an account</a>
      </p>
    </div>
  );
}
