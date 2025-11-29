import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function MessageForm() {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: input.trim(),
        avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${Date.now()}`,
        createdAt: serverTimestamp(),
      });
      setInput("");
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to post. Check console.");
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your progress"
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default MessageForm;