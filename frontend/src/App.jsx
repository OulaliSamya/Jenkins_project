import { useEffect, useState } from "react";

function App() {
  const [pipelines, setPipelines] = useState([]);
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:4000/api/pipelines";

  const fetchPipelines = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setPipelines(data);
      setError("");
    } catch (e) {
      setError("Erreur lors du chargement des pipelines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPipelines();
  }, []);

  const handleAddPipeline = async (e) => {
    e.preventDefault();
    if (!name || !branch) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, branch }),
      });

      const newPipeline = await res.json();
      if (!res.ok) {
        setError(newPipeline.message || "Erreur lors de l'ajout");
        return;
      }

      setPipelines((prev) => [...prev, newPipeline]);
      setName("");
      setBranch("");
      setError("");
    } catch (e) {
      setError("Erreur lors de l'ajout du pipeline");
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#0f172a", color: "#e5e7eb", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>CI/CD Dashboard - Jenkins Project</h1>
      <p style={{ marginBottom: "1.5rem", color: "#9ca3af" }}>
        Mini application pour le TP : gestion simple de pipelines (nom, branche, statut).
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "2rem" }}>
        {/* Liste des pipelines */}
        <div style={{ background: "#020617", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 10px 25px rgba(0,0,0,0.4)" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Pipelines Jenkins</h2>
          {loading && <p>Chargement...</p>}
          {error && <p style={{ color: "#f97373" }}>{error}</p>}

          {pipelines.length === 0 && !loading && (
            <p style={{ color: "#9ca3af" }}>Aucun pipeline pour l’instant.</p>
          )}

          <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
            {pipelines.map((p) => (
              <li
                key={p.id}
                style={{
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  marginBottom: "0.75rem",
                  background: "#020617",
                  border: "1px solid #1e293b",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                  <span style={{ fontWeight: "600" }}>{p.name}</span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "999px",
                      background:
                        p.status === "SUCCESS"
                          ? "#16a34a33"
                          : p.status === "FAILED"
                          ? "#dc262633"
                          : "#eab30833",
                      color:
                        p.status === "SUCCESS"
                          ? "#4ade80"
                          : p.status === "FAILED"
                          ? "#fca5a5"
                          : "#facc15",
                    }}
                  >
                    {p.status}
                  </span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#9ca3af" }}>Branche : <strong>{p.branch}</strong></p>
                <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>Dernier run : {p.lastRun}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Formulaire d'ajout */}
        <div style={{ background: "#020617", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 10px 25px rgba(0,0,0,0.4)" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Ajouter un pipeline</h2>
          <form onSubmit={handleAddPipeline} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div>
              <label>Nom du pipeline</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex : Build frontend"
                style={{
                  width: "100%",
                  padding: "0.6rem",
                  marginTop: "0.25rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #1e293b",
                  background: "#020617",
                  color: "#e5e7eb",
                }}
              />
            </div>
            <div>
              <label>Branche Git</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Ex : main, develop"
                style={{
                  width: "100%",
                  padding: "0.6rem",
                  marginTop: "0.25rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #1e293b",
                  background: "#020617",
                  color: "#e5e7eb",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                marginTop: "0.5rem",
                padding: "0.7rem",
                borderRadius: "999px",
                border: "none",
                background: "linear-gradient(135deg,#4f46e5,#9333ea)",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Ajouter le pipeline
            </button>
          </form>
          <p style={{ fontSize: "0.8rem", marginTop: "1rem", color: "#9ca3af" }}>
            
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
