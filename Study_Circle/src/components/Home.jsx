import React, { useState } from "react";
import { styles } from "../styles.js";
import CreateModal from "./Form.jsx";
import Sprint_room from "./Sprint_room.jsx";
import ProgressFeed from "./ProgressFeed.jsx";

function Home({ sprints, setSprints }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    all: true,
    scheduled: true,
    running: true,
    paused: true,
    completed: true,
  });
  const [showCreate, setShowCreate] = useState(false);
  const [createType, setCreateType] = useState("personal");
  const [activeSprint, setActiveSprint] = useState(null);

  // ---------- FILTERED SPRINTS ----------
  const filtered = sprints.filter((s) => {
    const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
    const status = s.status || "scheduled";
    if (filters.all) return matchesQuery;
    return matchesQuery && filters[status];
  });

  // ---------- UPDATE SPRINT ----------
  const updateSprint = (id, updates) => {
    setSprints((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  return (
    <div
      className="home-container"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        height: "80vh",
        overflowY: "auto",
        padding: 20,
        background: "#f7f8fa",
        position: "relative",
      }}
    >
      {/* LEFT PANEL */}
      <div
        className="sprint-room-panel"
        style={{
          width: 800, // wider panel toward center
          background: "#fff",
          padding: 20,
          borderRadius: 14,
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* SEARCH + FILTERS */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            placeholder="🔍 Search for sprint room..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search"
            style={{ fontSize: 15, padding: "8px 10px", flex: 1 }}
          />
          <div
            style={{ display: "flex", gap: 6, flexWrap: "wrap", fontSize: 13 }}
          >
            {["all", "scheduled", "running", "paused", "completed"].map((f) => (
              <label key={f} style={{ fontSize: 13, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={filters[f]}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, [f]: e.target.checked }))
                  }
                />{" "}
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div
          style={{
            maxHeight: 400, // scrollable table
            overflowY: "auto",
            border: "1px solid #e0e0e0",
            borderRadius: 10,
          }}
        >
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}
          >
            <thead>
              <tr
                style={{
                  background: "#e8f1ff",
                  fontSize: 16,
                  position: "sticky",
                  top: 0,
                  zIndex: 2,
                }}
              >
                <th style={{ padding: 10, textAlign: "left" }}>#</th>
                <th style={{ padding: 10, textAlign: "left" }}>Room</th>
                <th style={{ padding: 10, textAlign: "left" }}>Owner</th>
                <th style={{ padding: 10, textAlign: "left" }}>Status</th>
                <th style={{ padding: 10, textAlign: "left" }}>Closing Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, idx) => (
                <tr
                  key={s.id}
                  style={{
                    borderBottom: "1px solid #f0f0f0",
                    height: 42,
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveSprint(s)}
                >
                  <td style={{ padding: "10px 8px" }}>{idx + 1}</td>
                  <td style={{ padding: "10px 8px" }}>{s.name}</td>
                  <td style={{ padding: "10px 8px" }}>{s.owner}</td>
                  <td
                    style={{ padding: "10px 8px", textTransform: "capitalize" }}
                  >
                    {s.status}
                  </td>
                  <td style={{ padding: "10px 8px" }}>{s.endDate || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CREATE BUTTONS */}
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button
            onClick={() => {
              setCreateType("personal");
              setShowCreate(true);
            }}
            style={{
              ...styles.btn,
              padding: "8px 14px",
              fontSize: 14,
              width: 140,
            }}
          >
            Personal
          </button>
          <button
            onClick={() => {
              setCreateType("group");
              setShowCreate(true);
            }}
            style={{
              ...styles.btn,
              padding: "8px 14px",
              fontSize: 14,
              width: 140,
            }}
          >
            Group Sprint
          </button>
        </div>
      </div>

      {/* CREATE MODAL */}
      {showCreate && (
        <CreateModal
          type={createType}
          onClose={() => setShowCreate(false)}
          onCreate={(newSprint) => {
            setSprints((prev) => [newSprint, ...prev]);
            setShowCreate(false);
          }}
        />
      )}

      {/* RIGHT PANEL - PROGRESS FEED */}
      <div
        className="progress-feed-panel"
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 14,
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ProgressFeed />
      </div>

      {/* SPRINTROOM MODAL */}
      {activeSprint && (
        <Sprint_room
          sprint={activeSprint}
          members={[]}
          updateSprint={updateSprint}
          onClose={() => setActiveSprint(null)}
        />
      )}
    </div>
  );
}

export default Home;
