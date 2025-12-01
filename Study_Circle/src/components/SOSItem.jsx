import React, { useState } from "react";
import { useSOS } from "../hooks/useSOS";
import ReactionButton from "./ReationButton";

export default function SOSItem({ sos }) {
  const { claimSOS, resolveSOS, reactSOS } = useSOS();
  const [feedbackInput, setFeedbackInput] = useState("");

  const canClaim = sos.status === "open";
  const isOwner = sos.postedBy === "You"; // demo assumption; replace with real user check

  return (
    <article className="sos-card" role="article" aria-labelledby={`sos-${sos.id}-title`}>
      <div className="sos-header">
        <span className="sos-badge">{sos.estimatedTime}m</span>
      </div>

      <p id={`sos-${sos.id}-title`}><strong>Problem:</strong> {sos.problem}</p>

      <p>
        <strong>Tags:</strong>{" "}
        {sos.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </p>

      <p>
        <strong>Priority:</strong>{" "}
        <span className={`priority ${sos.priority.toLowerCase()}`}>{sos.priority}</span>
      </p>

      <p><strong>Status:</strong> <span className="status">{sos.status}</span></p>

      <p><strong>Posted by:</strong> {sos.postedBy}</p>

      <div className="reactions">
        <ReactionButton emoji="🔥" onClick={() => reactSOS(sos.id, "fire")} count={sos.reactions.fire} />
        <ReactionButton emoji="👍" onClick={() => reactSOS(sos.id, "thumbsUp")} count={sos.reactions.thumbsUp} />
        <ReactionButton emoji="❤️" onClick={() => reactSOS(sos.id, "heart")} count={sos.reactions.heart} />
      </div>

      <div className="sos-actions">
        {canClaim && <button className="btn" onClick={() => claimSOS(sos.id)}>Claim</button>}
        {isOwner && sos.status !== "resolved" && (
          <button className="btn-outline" onClick={() => resolveSOS(sos.id)}>Mark as Resolved</button>
        )}
      </div>

      {sos.feedback && (
        <div className="feedback-section">
          <hr />
          <strong>Feedback:</strong>
          <p>{sos.feedback}</p>
        </div>
      )}

      {/* allow owner to append additional feedback */}
      {isOwner && sos.status === "resolved" && (
        <div className="feedback-section">
          <hr />
          <strong>Add feedback</strong>
          <div style={{display:"flex", gap:8, marginTop:8}}>
            <input value={feedbackInput} onChange={(e) => setFeedbackInput(e.target.value)} placeholder="Nice help!" />
            <button
              className="btn"
              onClick={() => {
                if (!feedbackInput.trim()) return;
                resolveSOS(sos.id, (sos.feedback ? `${sos.feedback} — ${feedbackInput.trim()}` : feedbackInput.trim()));
                setFeedbackInput("");
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
