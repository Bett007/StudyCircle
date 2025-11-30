// ---------- Create Modal (form) ----------
import React, { useState } from "react";
import { uid, todayIso, computeStatusFromDates } from "../utils.js";
import { styles } from "../styles.js";

export default function CreateModal({ type = "personal", onClose, onCreate }) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(todayIso());
  const [endDate, setEndDate] = useState(todayIso());
  const [description, setDescription] = useState("");
  const [membersText, setMembersText] = useState("");
  const [tasksText, setTasksText] = useState("");
  const [error, setError] = useState("");

  const validateAndCreate = () => {
    if (!name.trim()) return setError("Sprint name is required");
    if (description.length > 300)
      return setError("Description must be under 300 characters");
    const members = membersText
      .split(",")
      .map((m) => m.trim())
      .filter(Boolean);
    if (members.length < 1)
      return setError("Provide at least one member username/email");
    const tasks = tasksText
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);
    if (type === "group" && tasks.length < 2)
      return setError("Group sprint requires at least two tasks");

    const newSprint = {
      id: uid(),
      name,
      owner: members[0] || "",
      description,
      startDate,
      endDate,
      members,
      tasks,
      status: computeStatusFromDates({
        startDate,
        endDate,
        status: "scheduled",
      }),
    };
    onCreate(newSprint);
  };

  return (
    <div
      style={{
        ...styles.modalOverlay,
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(0,0,0,0.25)",
      }}
    >
      <div
        style={{
          ...styles.modal,
          width: 480,
          maxWidth: "90%",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 8px 28px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          fontSize: 14,
        }}
      >
        <h3 style={{ margin: 0, fontSize: 20, color: "#222" }}>
          Create {type} sprint
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Sprint Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label>Sprint name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 14,
              }}
            />
          </div>

          {/* Dates */}
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <label>Start date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <label>End date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              />
            </div>
          </div>

          {/* Description */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label>Description (max 300)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
            />
          </div>

          {/* Members */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label>Members (comma separated emails/usernames)</label>
            <input
              value={membersText}
              onChange={(e) => setMembersText(e.target.value)}
              style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
            />
          </div>

          {/* Tasks */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label>Tasks (one per line){type === "group" ? " — at least 2" : ""}</label>
            <textarea
              value={tasksText}
              onChange={(e) => setTasksText(e.target.value)}
              rows={4}
              style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
            />
          </div>

          {/* Error */}
          {error && (
            <div style={{ color: "#d9534f", fontWeight: 500 }}>{error}</div>
          )}

          {/* Buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button
              onClick={validateAndCreate}
              style={{
                ...styles.btn,
                flex: 1,
                padding: "10px 16px",
                borderRadius: 8,
                fontWeight: 500,
              }}
            >
              Create
            </button>
            <button
              onClick={onClose}
              style={{
                ...styles.btnSecondary,
                flex: 1,
                padding: "10px 16px",
                borderRadius: 8,
                fontWeight: 500,
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
