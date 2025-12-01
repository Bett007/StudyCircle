import { useState } from "react";
import { useSOS } from "../hooks/useSOS";

export default function SOSForm() {
  const [problem, setProblem] = useState("");
  const [tags, setTags] = useState("");
  const [priority, setPriority] = useState("Low");
  const [estimatedTime, setEstimatedTime] = useState(10);

  const { addSOS } = useSOS();

  function handleSubmit(e) {
    e.preventDefault();
    const tagsArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag);
    addSOS({ problem, tags: tagsArray, priority, estimatedTime: Number(estimatedTime) });
    alert("SOS Posted!");
    setProblem("");
    setTags("");
    setPriority("Low");
    setEstimatedTime(10);
  }

  return (
    <form className="sos-form" onSubmit={handleSubmit}>
      <h2>Post an SOS</h2>

      <label>Problem</label>
      <input
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        required
      />

      <label>Tags (comma separated)</label>
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="#javascript, #react"
      />

      <label>Priority</label>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <label>Estimated Time (mins)</label>
      <input
        type="number"
        value={estimatedTime}
        onChange={(e) => setEstimatedTime(e.target.value)}
        required
      />

      <button type="submit">Send SOS</button>
    </form>
  );
}
