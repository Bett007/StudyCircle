import React, { useState, useEffect } from "react";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";

function ProgressFeed() {
  const [dark, setDark] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Dark mode toggle
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  // Fetch 5 inspirational quotes once
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch(
          "https://api.quotable.io/quotes?limit=5&tags=motivational|inspirational|success|student"
        );
        const data = await res.json();
        setQuotes(data.results || []);
      } catch {
        // Fallback quotes if API fails
        setQuotes([
          { content: "Small progress is still progress.", author: "Unknown" },
          {
            content: "You've survived 100% of your hardest days.",
            author: "Unknown",
          },
          {
            content: "Discipline today → Freedom tomorrow.",
            author: "Unknown",
          },
          {
            content: "One hour of focus can change everything.",
            author: "Unknown",
          },
          {
            content: "Keep going. Someone out there is proud of you.",
            author: "Anonymous",
          },
        ]);
      }
    };
    fetchQuotes();
  }, []);

  // Rotate quote every 30 seconds
  useEffect(() => {
    if (quotes.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [quotes]);

  const currentQuote = quotes.length > 0 ? quotes[currentQuoteIndex] : null;

  return (
    <div className="App">
      {/* Main feed column */}
      <div className="feed-column">
        <h1>Progress Feed</h1>
        <hr className="title-divider" />
        <MessageForm />
        <MessageList />
      </div>

      {/* Inspirational sidebar – now far right, small, and rotating */}
      {currentQuote && (
        <aside className="inspiration-sidebar">
          <div className="quote-card">
            <p className="quote-text">"{currentQuote.content}"</p>
            <p className="quote-author">— {currentQuote.author}</p>
            <div className="quote-dots">
              {quotes.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === currentQuoteIndex ? "active" : ""}`}
                />
              ))}
            </div>
          </div>
        </aside>
      )}

      {/* Dark mode toggle */}
      <button className="dark-toggle" onClick={() => setDark(!dark)}>
        {dark ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

export default ProgressFeed;
