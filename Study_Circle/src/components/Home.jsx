// ---------- Home Component (wireframe 1) ----------
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { computeStatusFromDates } from "../utils.js";
import { styles } from "../styles.js";
import { CreateModal } from "./Form.jsx";

function Home({ sprints, setSprints }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
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
    return matchesQuery && filters[status];
  });

  return (
    <div>
      <div style={styles.controlsRow}>
        <input
          placeholder="🔍 Search for sprint room..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.search}
        />

        <div style={styles.filterBox}>
          <label style={styles.filterLabel}>
            <input
              type="checkbox"
              checked={filters.scheduled}
              onChange={(e) =>
                setFilters((f) => ({ ...f, scheduled: e.target.checked }))
              }
            />{" "}
            Scheduled
          </label>
          <label style={styles.filterLabel}>
            <input
              type="checkbox"
              checked={filters.running}
              onChange={(e) =>
                setFilters((f) => ({ ...f, running: e.target.checked }))
              }
            />{" "}
            Ongoing
          </label>
          <label style={styles.filterLabel}>
            <input
              type="checkbox"
              checked={filters.paused}
              onChange={(e) =>
                setFilters((f) => ({ ...f, paused: e.target.checked }))
              }
            />{" "}
            Paused
          </label>
          <label style={styles.filterLabel}>
            <input
              type="checkbox"
              checked={filters.completed}
              onChange={(e) =>
                setFilters((f) => ({ ...f, completed: e.target.checked }))
              }
            />{" "}
            Completed
          </label>
        </div>
      </div>

      <section style={{ marginTop: 16 }}>
        <h3>Rooms</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Room</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Closing Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, idx) => {
              const status = computeStatusFromDates(s);
              return (
                <tr key={s.id}>
                  <td>{idx + 1}</td>
                  <td>
                    <Link to={`/room/${s.id}`} style={styles.link}>
                      {s.name}
                    </Link>
                  </td>
                  <td>{s.owner}</td>
                  <td>{status}</td>
                  <td>{s.endDate || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 20 }}>
        <h4>Create sprint:</h4>
        <div style={{ display: "flex", gap: 8 }}>
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
      </section>

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
  );
}

export default Home;
