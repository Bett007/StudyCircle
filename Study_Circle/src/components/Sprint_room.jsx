import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { computeStatusFromDates, todayIso } from "../utils.js";
import { styles } from "../styles.js";
import PomodoroModal from "./Pomodoro.jsx";

function Sprint_room({ sprints, updateSprint }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const sprint = sprints.find((s) => s.id === id);

  const [showPomodoro, setShowPomodoro] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  if (!sprint) return <div style={{ padding: 20 }}>Sprint not found</div>;

  // Initialize local timer state from sprint data
  useEffect(() => {
    setSecondsElapsed(sprint.secondsElapsed || 0);
    setRunning(sprint.status === "running");
  }, [sprint]);

  // Timer counts up
  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setSecondsElapsed((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  const pauseSprint = () => {
    setRunning(false);
    // Save status and elapsed time only when paused
    updateSprint(sprint.id, { status: "paused", secondsElapsed });
  };

  const resumeSprint = () => {
    setRunning(true);
    updateSprint(sprint.id, { status: "running" });
  };

  const confirmClose = () => {
    if (window.confirm("Close this sprint? This will mark it as completed.")) {
      setRunning(false);
      updateSprint(sprint.id, {
        status: "completed",
        endDate: todayIso(),
        secondsElapsed,
      });
      navigate("/");
    }
  };

  const openPomodoro = () => setShowPomodoro(true);

  const mm = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
  const ss = String(secondsElapsed % 60).padStart(2, "0");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16 }}>
      <div style={styles.card}>
        <h2>{sprint.name}</h2>
        <div><strong>By:</strong> {sprint.owner}</div>
        <div style={{ marginTop: 8 }}>
          <strong>Period:</strong> {sprint.startDate} → {sprint.endDate || "—"}
        </div>

        <section style={{ marginTop: 12 }}>
          <h4>Description</h4>
          <p>{sprint.description}</p>
        </section>

        <section style={{ marginTop: 12 }}>
          <h4>Members</h4>
          <div style={{ display: "flex", gap: 8 }}>
            {sprint.members.map((m) => (
              <span key={m} style={styles.pill}>{m}</span>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 12 }}>
          <h4>Tasks</h4>
          <ol>
            {sprint.tasks.map((t, i) => <li key={i}>{t}</li>)}
          </ol>
        </section>

        <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
          <button onClick={confirmClose} style={styles.dangerBtn}>Close Sprint</button>

          {running ? (
            <button onClick={pauseSprint} style={styles.btn}>Pause</button>
          ) : (
            <button onClick={resumeSprint} style={styles.btn}>Resume</button>
          )}

          <button onClick={openPomodoro} style={styles.btn}>Pomodoro</button>
        </div>
      </div>

      <aside style={styles.card}>
        <h4>Session Timer</h4>
        <div style={{ fontSize: 28, textAlign: "center" }}>{mm}:{ss}</div>
        <div style={{ marginTop: 12 }}>
          <h5>Quick Info</h5>
          <div>Status: {sprint.status}</div>
          <div>Closing Date: {sprint.endDate || "—"}</div>
        </div>
        <div style={{ marginTop: 12 }}>
          <h5>Actions</h5>
          <Link to="/" style={styles.link}>Back to home</Link>
        </div>
      </aside>

      {showPomodoro && (
        <PomodoroModal
          onClose={() => setShowPomodoro(false)}
          secondsLeft={secondsElapsed}
          setSecondsLeft={setSecondsElapsed}
          running={running}
          setRunning={setRunning}
        />
      )}
    </div>
  );
}

export default Sprint_room;
