import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { computeStatusFromDates } from "../utils.js";
import Home from "./Home.jsx";
import Sprint_room from "./Sprint_room.jsx";

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
    members: ["1", "2"], // IDs from JSONBin members
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
    members: ["3"],
    tasks: ["Read docs", "Build small app"],
  },
  {
    id: "3",
    name: "JavaS",
    owner: "Migz",
    description: "Learn Vanilla Js from basics.",
    startDate: "2024-12-25",
    endDate: "2024-12-26",
    status: "scheduled",
    members: ["3"],
    tasks: ["Read docs", "Build small app"],
  },
  {
    id: "4",
    name: "Reacting",
    owner: "Taran",
    description: "Learn React Js from basics.",
    startDate: "2024-12-25",
    endDate: "2024-12-26",
    status: "scheduled",
    members: ["4"],
    tasks: ["Read docs", "Build small app"],
  },
  {
    id: "5",
    name: "Deployment",
    owner: "Martin",
    description: "Learn how to deploy with vercel.",
    startDate: "2024-12-25",
    endDate: "2024-12-26",
    status: "paused",
    members: ["5"],
    tasks: ["Read docs", "Build small app"],
  },
];

// ---------- App ----------
export default function App() {
  const [sprints, setSprints] = useState(() => {
    const raw = localStorage.getItem("sprints_v1");
    const loaded = raw ? JSON.parse(raw) : initialSprints;
    return loaded.map((s) => ({
      ...s,
      status: computeStatusFromDates(s),
      secondsElapsed: 0,
    }));
  });

  const [members, setMembers] = useState([]);

  // Fetch members from JSONBin
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(
          "https://api.jsonbin.io/v3/b/YOUR_BIN_ID/latest",
          {
            headers: {
              // "X-Master-Key": "YOUR_JSONBIN_KEY", // if private
            },
          }
        );
        const data = await res.json();
        setMembers(data.record.members || []);
      } catch (err) {
        console.error("Failed to fetch members:", err);
        setMembers([]);
      }
    };
    fetchMembers();
  }, []);

  // Save sprints to localStorage
  useEffect(() => {
    localStorage.setItem("sprints_v1", JSON.stringify(sprints));
  }, [sprints]);

  const updateSprint = (id, patch) => {
    setSprints((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
    );
  };

  return (
    <BrowserRouter>
      <div className="container">
        <header className="header">
          <h1>Moringa School</h1>
        </header>

        <main className="main">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  sprints={sprints}
                  setSprints={setSprints}
                  members={members}
                />
              }
            />
            <Route
              path="/room/:id"
              element={
                <Sprint_room
                  sprints={sprints}
                  updateSprint={updateSprint}
                  members={members}
                />
              }
            />
            <Route path="/progress" element={<ProgressFeed />} />
          </Routes>
        </main>

        <footer className="footer">Learning Collaboration Platform</footer>
      </div>
    </BrowserRouter>
  );
}
