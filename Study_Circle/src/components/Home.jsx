// ---------- Home Component (wireframe 1) ----------
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { computeStatusFromDates } from "../utils.js";
import { styles } from "../styles.js";
import CreateModal from "./Form.jsx";

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

  const filtered = sprints.filter((s) => {
    const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
    const status = computeStatusFromDates(s);

    if (filters.all) return matchesQuery; // Show all if "All" selected
    return matchesQuery && filters[status];
  });

  return (
    <div style={{ display: "flex", justifyContent: "flex-start", padding: 24 }}>
      <div
        style={{
          backgroundColor: "white",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          minWidth: 480,
          minHeight: "100%",
        }}
      >
        {/* Search and Filters */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            placeholder="🔍 Search for sprint room..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: 16,
            }}
          />

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["all", "scheduled", "running", "paused", "completed"].map((f) => (
              <label
                key={f}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer",
                  fontWeight: f === "all" ? "bold" : "normal",
                  fontSize: 14,
                }}
              >
                <input
                  type="checkbox"
                  checked={filters[f]}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, [f]: e.target.checked }))
                  }
                />
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Rooms Table */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <h3 style={{ marginBottom: 12 }}>Rooms</h3>
          <table
            style={{
              ...styles.table,
              width: "100%",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
              fontSize: 13, // smaller font
            }}
          >
            <thead style={{ backgroundColor: "#f8f9fa", fontSize: 13 }}>
              <tr>
                <th style={{ padding: "6px 8px" }}>#</th>
                <th style={{ padding: "6px 8px" }}>Room</th>
                <th style={{ padding: "6px 8px" }}>Owner</th>
                <th style={{ padding: "6px 8px" }}>Status</th>
                <th style={{ padding: "6px 8px" }}>Closing Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, idx) => {
                const status = computeStatusFromDates(s);
                return (
                  <tr key={s.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "6px 8px" }}>{idx + 1}</td>
                    <td style={{ padding: "6px 8px" }}>
                      <Link to={`/room/${s.id}`} style={styles.link}>
                        {s.name}
                      </Link>
                    </td>
                    <td style={{ padding: "6px 8px" }}>{s.owner}</td>
                    <td style={{ padding: "6px 8px" }}>{status}</td>
                    <td style={{ padding: "6px 8px" }}>{s.endDate || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Create Sprint Buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button
              onClick={() => {
                setCreateType("personal");
                setShowCreate(true);
              }}
              style={styles.btn}
            >
              Personal
            </button>
            <button
              onClick={() => {
                setCreateType("group");
                setShowCreate(true);
              }}
              style={styles.btn}
            >
              Group sprint
            </button>
          </div>
        </div>

        {/* Modal */}
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
      </div>
    </div>
  );
}

export default Home;
