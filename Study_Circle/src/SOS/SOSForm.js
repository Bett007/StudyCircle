import React, { useState } from "react";
import { createSOS } from "../api/sosAPI";

export default function SOSForm() {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    createSOS({ text, user: "Miguel" });
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        className="border p-2 flex-1"
        placeholder="Stuck on X — need 20 mins…"
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button className="bg-red-500 text-white px-4 rounded">
        Send SOS
      </button>
    </form>
  );
}
