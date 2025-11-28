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
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h3>Create {type} sprint</h3>
        <div style={styles.field}>
          <label>Sprint name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={styles.field}>
          <label>Start date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label>End date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label>Description (max 300)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
        <div style={styles.field}>
          <label>Members (comma separated emails/usernames)</label>
          <input
            value={membersText}
            onChange={(e) => setMembersText(e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label>
            Tasks (one per line){type === "group" ? " — at least 2" : ""}
          </label>
          <textarea
            value={tasksText}
            onChange={(e) => setTasksText(e.target.value)}
            rows={4}
          />
        </div>

        {error && <div style={{ color: "crimson" }}>{error}</div>}

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button onClick={validateAndCreate} style={styles.btn}>
            Create
          </button>
          <button onClick={onClose} style={styles.btnSecondary}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
