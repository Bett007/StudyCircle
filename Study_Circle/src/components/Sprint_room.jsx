import React, { useState, useEffect, useRef } from "react";
import { computeStatusFromDates, todayIso } from "../utils.js";
import { styles } from "../styles.js";
import PomodoroModal from "./Pomodoro.jsx"; // Pomodoro component

function Sprint_room({ sprint, updateSprint, onClose }) {
  const [secondsElapsed, setSecondsElapsed] = useState(
    sprint?.secondsElapsed || 0
  );
  const [running, setRunning] = useState(sprint?.status === "running");
  const timerRef = useRef(null);

  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [showPomodoro, setShowPomodoro] = useState(false); // Pomodoro modal toggle

  const status = computeStatusFromDates(sprint);

  // ---------- TIMER LOGIC ----------
  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(
        () => setSecondsElapsed((prev) => prev + 1),
        1000
      );
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  const pauseSprint = () => {
    setRunning(false);
    updateSprint(sprint.id, { status: "paused", secondsElapsed });
  };

  const resumeSprint = () => {
    setRunning(true);
    updateSprint(sprint.id, { status: "running" });
  };

  const confirmClose = () => {
    if (window.confirm("Close this sprint? This will mark it as completed.")) {
      setRunning(false);
      updateSprint(sprint.id, { status: "completed", endDate: todayIso() });
      onClose();
    }
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages((prev) => [
        ...prev,
        { text: chatInput, timestamp: new Date(), senderId: "You" },
      ]);
      setChatInput("");
    }
  };

  const mm = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
  const ss = String(secondsElapsed % 60).padStart(2, "0");

  return (
    <>
      {/* -------- MODAL OVERLAY -------- */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 20,
            background: "#f5f7fa",
            padding: 20,
            borderRadius: 12,
            width: "90%",
            maxWidth: 1100,
            maxHeight: "90vh",
            overflow: "hidden",
          }}
        >
          {/* ---------- MAIN CONTENT ---------- */}
          <div style={{ ...styles.card, padding: 24, overflowY: "auto" }}>
            <h2>{sprint.name}</h2>
            <div>
              <strong>Owner:</strong> {sprint.owner}
            </div>
            <div>
              <strong>Period:</strong> {sprint.startDate} →{" "}
              {sprint.endDate || "—"}
            </div>

            <section>
              <h4>Description</h4>
              <p>{sprint.description}</p>
            </section>

            <section>
              <h4>Tasks</h4>
              <ol>
                {sprint.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ol>
            </section>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button onClick={confirmClose} style={styles.dangerBtn}>
                Close Sprint
              </button>

              {/* Resume/Pause Button */}
              {running ? (
                <button onClick={pauseSprint} style={styles.btn}>
                  Pause
                </button>
              ) : (
                <button onClick={resumeSprint} style={styles.btn}>
                  Resume
                </button>
              )}

              {/* Pomodoro Button */}
              <button onClick={() => setShowPomodoro(true)} style={styles.btn}>
                Pomodoro
              </button>
            </div>
          </div>

          {/* ---------- SIDEBAR ---------- */}
          <aside
            className="card"
            style={{
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              overflowY: "auto",
            }}
          >
            {/* SESSION TIMER */}
            <div>
              <h4>Session Timer</h4>
              <div style={{ fontSize: 28, textAlign: "center", marginTop: 6 }}>
                {mm}:{ss}
              </div>
            </div>

            {/* MEMBERS */}
            <div>
              <h5>Members</h5>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginTop: 6,
                }}
              >
                {sprint.members?.map((name, idx) => (
                  <div
                    key={idx}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <img
                      src={`https://via.placeholder.com/36.png?text=${name.charAt(
                        0
                      )}`}
                      alt={name}
                      style={{
                        width: 36,
                        height: 36,
                        minWidth: 36,
                        minHeight: 36,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK INFO */}
            <div>
              <h5>Quick Info</h5>
              <div>Status: {status}</div>
              <div>Closing Date: {sprint.endDate || "—"}</div>
            </div>

            {/* CHAT BOX */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <h5>Chat</h5>
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  padding: 8,
                  background: "#fff",
                }}
              >
                {chatMessages.length === 0 && (
                  <div style={{ fontStyle: "italic", color: "#888" }}>
                    No messages yet
                  </div>
                )}
                {chatMessages.map((msg, idx) => (
                  <div key={idx} style={{ marginBottom: 6 }}>
                    <strong>{msg.senderId}:</strong> {msg.text}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  style={{
                    flex: 1,
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                  }}
                />
                <button onClick={handleSendMessage} style={styles.btn}>
                  Send
                </button>
              </div>
            </div>

            {/* BACK BUTTON */}
            <div>
              <button
                onClick={onClose}
                className="link"
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                ← Back to Home
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* ---------- POMODORO MODAL ---------- */}
      {showPomodoro && <PomodoroModal onClose={() => setShowPomodoro(false)} />}
    </>
  );
}

export default Sprint_room;
