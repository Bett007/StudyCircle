import React from "react";

export default function ReactionButton({ emoji, onClick, count = 0 }) {
  return (
    <button className="reaction" onClick={onClick} aria-label={`react ${emoji}`}>
      <span>{emoji}</span>
      <small className="reaction-count">{count}</small>
    </button>
  );
}
