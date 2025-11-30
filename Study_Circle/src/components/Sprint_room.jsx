import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { computeStatusFromDates, todayIso } from "../utils.js";
import { styles } from "../styles.js";
import PomodoroModal from "./Pomodoro.jsx";

function Sprint_room({ sprints, updateSprint }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const sprint = sprints.find((s) => s.id === id);

  const [showPomodoro, setShowPomodoro] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(true);
  const timerRef = useRef(null);

  if (!sprint) return <div style={{ padding: 20 }}>Sprint not found</div>;

  const status = computeStatusFromDates(sprint);

  // Timer auto-start
  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          const newS = s - 1;
          if (newS <= 0) {
            setRunning(false);
            return 0;
          }
          return newS;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  const pauseSprint = () => {
    setRunning(false);
    updateSprint(sprint.id, { status: "paused" });
  };

  const confirmClose = () => {
    if (window.confirm("Close this sprint? This will mark it as completed.")) {
      setRunning(false);
      updateSprint(sprint.id, { status: "completed", endDate: todayIso() });
      navigate("/");
    }
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

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
          <button onClick={pauseSprint} style={styles.btn}>Pause</button>
          <button onClick={() => setShowPomodoro(!showPomodoro)} style={styles.btn}>
            Pomodoro
          </button>
        </div>
      </div>

      <aside style={styles.card}>
        <h4>Session Timer</h4>
        <div style={{ fontSize: 28, textAlign: "center" }}>{mm}:{ss}</div>
        <div style={{ marginTop: 12 }}>
          <h5>Quick Info</h5>
          <div>Status: {status}</div>
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
          secondsLeft={secondsLeft}
          setSecondsLeft={setSecondsLeft}
          running={running}
          setRunning={setRunning}
        />
      )}
    </div>
  );
}

export default Sprint_room;
