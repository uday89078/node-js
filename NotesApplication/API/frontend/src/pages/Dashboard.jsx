import { useEffect, useState } from "react";
import api, { setAuthToken } from "../api.js";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Create note form state
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [creating, setCreating] = useState(false);

  // Fetch notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (token) setAuthToken(token);

      const res = await api.get("/notes");
      setNotes(res.data || res.data.notes || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle form change
  const onChange = (e) => setNewNote({ ...newNote, [e.target.name]: e.target.value });

  // Create new note
  const onSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const token = localStorage.getItem("token");
      if (token) setAuthToken(token);

      const res = await api.post("/notes/create", newNote, {
        headers: { "Content-Type": "application/json" },
      });

      // Add newly created note to state
      setNotes([res.data.note, ...notes]);
      setNewNote({ title: "", content: "" });
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to create note");
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Your Notes</h2>

      {/* Create Note Form */}
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, marginBottom: 24 }}>
        <input
          name="title"
          placeholder="Title"
          value={newNote.title}
          onChange={onChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={newNote.content}
          onChange={onChange}
          required
        />
        <button type="submit" disabled={creating}>
          {creating ? "Creating..." : "Create Note"}
        </button>
      </form>

      {/* Notes List */}
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul style={{ display: "grid", gap: 8, paddingLeft: 16 }}>
          {notes.map((n, i) => (
            <li
              key={n._id || i}
              style={{ background: "#f1f5f9", padding: 12, borderRadius: 10 }}
            >
              <b>{n.title || "Untitled"}</b>
              <div style={{ opacity: 0.9 }}>{n.content || n.body || ""}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
