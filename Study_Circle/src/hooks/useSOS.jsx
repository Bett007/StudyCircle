import React, { createContext, useContext, useEffect, useState } from "react";

const SOSContext = createContext(null);

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

const initialSample = [
  {
    id: uid(),
    problem: "need help in calculus",
    tags: ["#integration"],
    priority: "Low",
    estimatedTime: 5,
    status: "resolved",
    postedBy: "You",
    claimedBy: null,
    feedback: "nice so easy",
    reactions: { fire: 1, thumbsUp: 0, heart: 0 }
  },
  {
    id: uid(),
    problem: "need help in coding",
    tags: ["#javascript", "#react"],
    priority: "High",
    estimatedTime: 20,
    status: "open",
    postedBy: "Alex",
    claimedBy: null,
    feedback: "",
    reactions: { fire: 0, thumbsUp: 0, heart: 0 }
  }
];

export function SOSProvider({ children }) {
  const [sosList, setSosList] = useState(() => {
    try {
      const raw = localStorage.getItem("sosList");
      return raw ? JSON.parse(raw) : initialSample;
    } catch {
      return initialSample;
    }
  });

  useEffect(() => {
    localStorage.setItem("sosList", JSON.stringify(sosList));
  }, [sosList]);

  function addSOS({ problem, tags = [], priority = "Low", estimatedTime = 10 }) {
    const newSOS = {
      id: uid(),
      problem,
      tags,
      priority,
      estimatedTime,
      status: "open",
      postedBy: "You", // demo; replace when you have auth
      claimedBy: null,
      feedback: "",
      reactions: { fire: 0, thumbsUp: 0, heart: 0 }
    };
    setSosList(s => [...s, newSOS]);
  }

  function claimSOS(id) {
    setSosList(s => s.map(item => item.id === id ? { ...item, status: "claimed", claimedBy: "Someone" } : item));
  }

  // resolveSOS optionally accepts feedback text as second param
  function resolveSOS(id, feedback = "") {
    setSosList(s => s.map(item => item.id === id ? { ...item, status: "resolved", feedback: feedback || item.feedback } : item));
  }

  function reactSOS(id, type) {
    setSosList(s => s.map(item => {
      if (item.id !== id) return item;
      const next = { ...item, reactions: { ...item.reactions } };
      next.reactions[type] = (next.reactions[type] || 0) + 1;
      return next;
    }));
  }

  return (
    <SOSContext.Provider value={{ sosList, addSOS, claimSOS, resolveSOS, reactSOS }}>
      {children}
    </SOSContext.Provider>
  );
}

export function useSOS() {
  const ctx = useContext(SOSContext);
  if (!ctx) throw new Error("useSOS must be used inside SOSProvider");
  return ctx;
}
