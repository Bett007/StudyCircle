// ---------- Home Component ----------
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
    return (
      matchesQuery && (filters.all || filters[status])
    );
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 24,
        padding: 16,
      }}
    >
      {/* Left-side Container */}
      <div
        style={{
          width: 500,
          background: "#fff",
          padding: 16,
          borderRadius: 12,
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Search and Filters */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <input
            placeholder="🔍 Search for sprint room..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: 8,
              flex: 1,
              minWidth: 180,
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 12,
            }}
          />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["all", "scheduled", "running", "paused", "completed"].map((f) => (
              <label key={f} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
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

        {/* Rooms Table */}
        <div style={{ maxHeight: 300, overflowY: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 12,
            }}
          >
            <thead style={{ position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
              <tr>
                {["#", "Room", "Owner", "Status", "Closing Date"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "8px 12px",
                      borderBottom: "1px solid #e0e0e0",
                      verticalAlign: "middle",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, idx) => {
                const status = computeStatusFromDates(s);
                return (
                  <tr key={s.id}>
                    <td style={{ padding: "8px 12px", verticalAlign: "middle" }}>{idx + 1}</td>
                    <td style={{ padding: "8px 12px", verticalAlign: "middle" }}>
                      <Link to={`/room/${s.id}`} style={styles.link}>
                        {s.name}
                      </Link>
                    </td>
                    <td style={{ padding: "8px 12px", verticalAlign: "middle" }}>{s.owner}</td>
                    <td style={{ padding: "8px 12px", verticalAlign: "middle" }}>{status}</td>
                    <td style={{ padding: "8px 12px", verticalAlign: "middle" }}>{s.endDate || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Create Sprint Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => {
              setCreateType("personal");
              setShowCreate(true);
            }}
            style={{
              flex: 1,
              padding: "10px 0",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
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
              flex: 1,
              padding: "10px 0",
              backgroundColor: "#17a2b8",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Group Sprint
          </button>
        </div>

        {showCreate && (
          <CreateModal
            type={createType}
            onClose={() => setShowCreate(false)}
            onCreate={(newSprint) => {
              setSprints((p) => [newSprint, ...p]);
              setShowCreate(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
