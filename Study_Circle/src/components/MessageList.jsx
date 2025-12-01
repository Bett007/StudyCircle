import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  if (messages.length === 0) {
    return <p className="empty">No updates yet. Be the first!</p>;
  }

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id} className="post-card">
          <img src={msg.avatar} alt="avatar" className="avatar" />
          <div className="post-content">
            <div className="post-header">
              
              <span className="username">Anonymous</span>

              <span className="timestamp">
                {msg.createdAt
                  ? new Date(msg.createdAt.toDate()).toLocaleString()
                  : "Just now"}
              </span>

            </div>
            <p className="post-text">{msg.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;