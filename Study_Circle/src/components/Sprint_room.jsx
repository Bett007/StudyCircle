// ---------- SprintRoom Component (wireframe 2) ----------
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { computeStatusFromDates, todayIso } from "../utils.js";
import { styles } from "../styles.js";
import PomodoroModal from "./Pomodoro.jsx";

function SprintRoom({ sprints, updateSprint }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const sprint = sprints.find((s) => s.id === id);
  const [showPomodoro, setShowPomodoro] = useState(false);

  if (!sprint)
    return (
      <div>
        Room not found — <a href="/">Go home</a>
      </div>
    );

  const status = computeStatusFromDates(sprint);

  const confirmClose = () => {
    if (
      window.confirm(
        "Are you sure you want to close this sprint? This will mark it as completed."
      )
    ) {
      updateSprint(sprint.id, { status: "completed", endDate: todayIso() });
      navigate("/");
    }
  };

  const pauseSprint = () => {
    updateSprint(sprint.id, { status: "paused" });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16 }}>
      <div style={styles.card}>
        <h2>{sprint.name}</h2>
        <div>
          <strong>By:</strong> {sprint.owner}
        </div>
        <div style={{ marginTop: 8 }}>
          <strong>Period:</strong> {sprint.startDate} → {sprint.endDate}
        </div>

        <section style={{ marginTop: 12 }}>
          <h4>Sprint description</h4>
          <p>{sprint.description}</p>
        </section>

        <section style={{ marginTop: 12 }}>
          <h4>Members</h4>
          <div style={{ display: "flex", gap: 8 }}>
            {sprint.members.map((m) => (
              <span key={m} style={styles.pill}>
                {m}
              </span>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 12 }}>
          <h4>Tasks</h4>
          <ol>
            {sprint.tasks.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ol>
        </section>

        <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
          <button onClick={confirmClose} style={styles.dangerBtn}>
            Close sprint
          </button>
          <button onClick={pauseSprint} style={styles.btn}>
            Pause
          </button>
          <button onClick={() => setShowPomodoro(true)} style={styles.btn}>
            Pomodoro
          </button>
        </div>
      </div>

      <aside style={styles.card}>
        <h4>Session timer</h4>
        <div style={{ fontSize: 28, textAlign: "center" }}>00:00</div>

        <div style={{ marginTop: 12 }}>
          <h5>Quick info</h5>
          <div>Status: {status}</div>
          <div>Closing date: {sprint.endDate || "—"}</div>
        </div>

        <div style={{ marginTop: 12 }}>
          <h5>Actions</h5>
          <Link to="/" style={styles.link}>
            Back to home
          </Link>
        </div>
      </aside>

      {showPomodoro && <PomodoroModal onClose={() => setShowPomodoro(false)} />}
    </div>
  );
}

export default SprintRoom;
