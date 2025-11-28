// src/components/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { computeStatusFromDates } from "../utils.js";
import { styles } from "../styles.js";
import Home from "./Home.jsx";
import SprintRoom from "./Sprint_room.jsx";

const initialSprints = [
  {
    id: "1",
    name: "React",
    owner: "Brian",
    description: "Intro to React components and state.",
    startDate: "2024-11-25",
    endDate: "2024-12-25",
    status: "running",
    members: ["Brian"],
    tasks: ["Setup project", "Create components"],
  },
  {
    id: "2",
    name: "Hooks",
    owner: "Taran",
    description: "Learn useState and useEffect.",
    startDate: "2024-12-25",
    endDate: "2024-12-26",
    status: "scheduled",
    members: ["Taran"],
    tasks: ["Read docs", "Build small app"],
  },
  {
    id: "3",
    name: "Components",
    owner: "Fidel",
    description: "Break down UI into reusable pieces.",
    startDate: "2024-10-01",
    endDate: "2024-10-10",
    status: "completed",
    members: ["Fidel"],
    tasks: ["Design UI", "Implement layout"],
  },
];

export default function App() {
  console.log("App: render start");

  // track if we detected a parsing/init error (set safely from an effect)
  const [initError, setInitError] = useState(null);

  // Initialize sprints from localStorage (or fallback to initialSprints).
  // Important: do NOT call state setters (like setInitError) while initializing state.
  const [sprints, setSprints] = useState(() => {
    try {
      const raw = localStorage.getItem("sprints_v1");
      const loaded = raw ? JSON.parse(raw) : initialSprints;

      const mapped = loaded.map((s) => {
        try {
          return { ...s, status: computeStatusFromDates(s) };
        } catch (e) {
          console.error("computeStatusFromDates error for sprint", s.id, e);
          return { ...s, status: s.status || "unknown" };
        }
      });

      console.log("App: initial sprints loaded", mapped);
      return mapped;
    } catch (e) {
      // Can't call setInitError here — return a safe fallback and set the error in an effect
      console.error("App: failed to parse sprints_v1 or init mapping", e);
      return initialSprints;
    }
  });

  // If localStorage had malformed JSON, detect it now and set initError safely.
  useEffect(() => {
    try {
      const raw = localStorage.getItem("sprints_v1");
      if (raw) JSON.parse(raw);
    } catch (e) {
      setInitError(e);
    }
  }, []);

  // persist sprints to localStorage on changes (defensive)
  useEffect(() => {
    try {
      localStorage.setItem("sprints_v1", JSON.stringify(sprints));
    } catch (e) {
      console.error("Failed to save sprints to localStorage", e);
    }
  }, [sprints]);

  const updateSprint = (id, patch) => {
    setSprints((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
    );
  };

  // Simple visual fallback if an init error occurred
  if (initError) {
    return (
      <div style={{ padding: 20 }}>
        <h2>App failed to initialize — check console</h2>
        <pre>{String(initError)}</pre>
      </div>
    );
  }

  console.log("App: render OK");

  return (
    <BrowserRouter>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={{ margin: 0 }}>Moringa School</h1>
        </header>

        <main style={styles.main}>
          <Routes>
            <Route
              path="/"
              element={<Home sprints={sprints} setSprints={setSprints} />}
            />
            <Route
              path="/room/:id"
              element={<SprintRoom sprints={sprints} updateSprint={updateSprint} />}
            />
          </Routes>
        </main>

        <footer style={styles.footer}>
          Built with ❤️ — learning collaboration platform
        </footer>
      </div>
    </BrowserRouter>
  );
}
