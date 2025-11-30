import React, { useState, useEffect } from "react";
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

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showCreate ? "hidden" : "auto";
  }, [showCreate]);

  const filtered = sprints.filter((s) => {
    const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
    const status = computeStatusFromDates(s);
    if (filters.all) return matchesQuery;
    return matchesQuery && filters[status];
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        padding: 20,
        background: "#f7f8fa",
        minHeight: "100vh",
      }}
    >
      {/* LEFT PANEL */}
      <div
        style={{
          width: 520,
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
            style={{
              ...styles.search,
              fontSize: 15,
              padding: "8px 10px",
              flex: 1,
            }}
          />

          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              fontSize: 13,
            }}
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
            maxHeight: "auto",
            overflowY: "auto",
            border: "1px solid #e0e0e0",
            borderRadius: 10,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 15,
            }}
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
              {filtered.map((s, idx) => {
                const status = computeStatusFromDates(s);
                return (
                  <tr
                    key={s.id}
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      height: 42,
                    }}
                  >
                    <td style={{ padding: "10px 8px" }}>{idx + 1}</td>
                    <td style={{ padding: "10px 8px" }}>
                      <Link to={`/room/${s.id}`} style={styles.link}>
                        {s.name}
                      </Link>
                    </td>
                    <td style={{ padding: "10px 8px" }}>{s.owner}</td>
                    <td
                      style={{
                        padding: "10px 8px",
                        textTransform: "capitalize",
                      }}
                    >
                      {status}
                    </td>
                    <td style={{ padding: "10px 8px" }}>{s.endDate || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* CREATE BUTTONS */}
        <div style={{ display: "flex", gap: 16, justifyContent: "flex-start" }}>
          <button
            onClick={() => {
              setCreateType("personal");
              setShowCreate(true);
            }}
            style={{
              ...styles.btn,
              padding: "10px 16px",
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
              padding: "10px 16px",
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
    </div>
  );
}

export default Home;
