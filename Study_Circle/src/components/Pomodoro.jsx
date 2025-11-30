// ---------- Pomodoro Modal (wireframe 3) ----------
import React, { useState, useEffect, useRef } from "react";
import { styles } from "../styles.js";

function PomodoroModal({ onClose }) {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

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

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running]);

  const start = () => {
    if (secondsLeft > 0) setRunning(true);
  };
  const pause = () => setRunning(false);
  const stop = () => {
    setRunning(false);
    setSecondsLeft(25 * 60);
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.modal, width: 760, display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <h3>Pomodoro</h3>
          <div style={{ fontSize: 48, textAlign: "center" }}>
            {mm}:{ss}
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            <button onClick={start} style={styles.btn}>
              Start
            </button>
            <button onClick={pause} style={styles.btnSecondary}>
              Pause
            </button>
            <button onClick={stop} style={styles.dangerBtn}>
              Stop
            </button>
            <button onClick={onClose} style={styles.btn}>
              Close
            </button>
          </div>
        </div>

        <div style={{ width: 320 }}>
          <h4>Spotify</h4>
          {/* Replace the src with a valid Spotify embed url or your own player. */}
          <div style={{ border: "1px solid #ddd", height: 200 }}>
            <iframe
              title="spotify-player"
              style={{ width: "100%", height: "100%", border: 0 }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
              allow="encrypted-media"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PomodoroModal;
