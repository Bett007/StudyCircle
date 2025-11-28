// ---------- Utilities ----------
export const uid = () => Math.random().toString(36).slice(2, 9);
export const todayIso = () => new Date().toISOString().slice(0, 10);

export function computeStatusFromDates(sprint) {
  const now = new Date();
  const start = sprint.startDate ? new Date(sprint.startDate) : null;
  const end = sprint.endDate ? new Date(sprint.endDate) : null;
  if (sprint.status === "paused" || sprint.status === "completed")
    return sprint.status;
  if (start && now < start) return "scheduled";
  if (start && end && now >= start && now <= end) return "running";
  if (end && now > end) return "completed";
  return sprint.status || "scheduled";
}
