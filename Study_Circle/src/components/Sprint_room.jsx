import React, { useState, useEffect, useRef } from "react";
import { styles } from "../styles.js";
import PomodoroModal from "./Pomodoro.jsx";

function Sprint_room({ sprint, members, updateSprint, onClose }) {
  const [secondsElapsed, setSecondsElapsed] = useState(sprint.secondsElapsed || 0);
  const [running, setRunning] = useState(sprint.status === "running");
  const timerRef = useRef(null);

  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [showPomodoro, setShowPomodoro] = useState(false);

  // Timer effect
  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => setSecondsElapsed(prev => prev + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  const pauseSprint = () => {
    setRunning(false);
    updateSprint({ status: "paused", secondsElapsed });
  };

  const resumeSprint = () => {
    setRunning(true);
    updateSprint({ status: "running" });
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages(prev => [
        ...prev,
        {
          text: chatInput,
          timestamp: new Date(),
          memberId: sprint.members[0], // default for now
        },
      ]);
      setChatInput("");
    }
  };

  const mm = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
  const ss = String(secondsElapsed % 60).padStart(2, "0");

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        zIndex: 999,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 20,
          width: "100%",
          maxWidth: 1000,
        }}
      >
        {/* MAIN CONTENT */}
        <div style={{ ...styles.card, padding: 24 }}>
          <h2 style={{ marginBottom: 6 }}>{sprint.name}</h2>
          <div style={{ marginBottom: 6 }}>
            <strong>Owner:</strong> {sprint.owner}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>Period:</strong> {sprint.startDate} → {sprint.endDate || "—"}
          </div>

          <section style={{ marginBottom: 12 }}>
            <h4>Description</h4>
            <p>{sprint.description}</p>
          </section>

          <section style={{ marginBottom: 12 }}>
            <h4>Tasks</h4>
            <ol>
              {sprint.tasks.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ol>
          </section>

          {/* MAIN ACTION BUTTONS */}
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button
              onClick={() =>
                updateSprint({ status: "completed", endDate: new Date().toISOString() })
              }
              style={styles.dangerBtn}
            >
              Close Sprint
            </button>
            {running ? (
              <button onClick={pauseSprint} style={styles.btn}>
                Pause
              </button>
            ) : (
              <button onClick={resumeSprint} style={styles.btn}>
                Resume
              </button>
            )}
            <button onClick={() => setShowPomodoro(true)} style={styles.btn}>
              Pomodoro
            </button>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside
          style={{
            ...styles.card,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div>
            <h4>Session Timer</h4>
            <div style={{ fontSize: 28, textAlign: "center", marginTop: 6 }}>
              {mm}:{ss}
            </div>
          </div>

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
              {sprint.members.map((mId) => {
                const member =
                  members.find((m) => m.id === mId) || {
                    name: mId,
                    avatar: `https://i.pravatar.cc/150?u=${mId}`,
                  };
                return (
                  <div
                    key={mId}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      style={{ width: 36, height: 36, borderRadius: "50%" }}
                    />
                    <span>{member.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CHAT */}
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
              {chatMessages.map((msg, idx) => {
                const member =
                  members.find((m) => m.id === msg.memberId) || {
                    name: msg.memberId,
                    avatar: "",
                  };
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <img
                      src={member.avatar || "https://i.pravatar.cc/150?u=blank"}
                      alt={member.name}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        marginRight: 6,
                      }}
                    />
                    <strong>{member.name}:</strong> {msg.text}
                  </div>
                );
              })}
            </div>

            {/* CHAT INPUT */}
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

          {/* BACK TO HOME BUTTON */}
          <div>
            <button onClick={onClose} style={{ ...styles.btn, width: "100%" }}>
              ← Back to Home
            </button>
          </div>
        </aside>

        {showPomodoro && <PomodoroModal onClose={() => setShowPomodoro(false)} />}
      </div>
    </div>
  );
}

export default Sprint_room;
