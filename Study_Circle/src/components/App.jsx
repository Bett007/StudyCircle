import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { computeStatusFromDates } from "../utils.js";
import Home from "./Home.jsx";
import SprintRoom from "./Sprint_room.jsx";

// ---------- Mock DB ----------
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

// ---------- App ----------
export default function App() {
  const [sprints, setSprints] = useState(() => {
    const raw = localStorage.getItem("sprints_v1");
    const loaded = raw ? JSON.parse(raw) : initialSprints;
    return loaded.map((s) => ({ ...s, status: computeStatusFromDates(s) }));
  });

  useEffect(() => {
    localStorage.setItem("sprints_v1", JSON.stringify(sprints));
  }, [sprints]);

  const updateSprint = (id, patch) => {
    setSprints((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
    );
  };

  return (
    <BrowserRouter basename="/StudyCircle">
      <div className="container">
        <header className="header">...</header>

        <main className="main">
          <Routes>
            <Route
              path="/"
              element={<Home sprints={sprints} setSprints={setSprints} />}
            />
            <Route
              path="/room/:id"
              element={
                <SprintRoom sprints={sprints} updateSprint={updateSprint} />
              }
            />
          </Routes>
        </main>

        <footer className="footer">...</footer>
      </div>
    </BrowserRouter>
  );
}
