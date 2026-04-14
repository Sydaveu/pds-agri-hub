import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "👋 Hello! Ask me anything about farming." }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");

    const res = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    const aiMsg = { role: "ai", text: data.reply };
    setMessages((prev) => [...prev, aiMsg]);
  };

  return (
    <div style={{
      position: "fixed",
      bottom: 20,
      right: 20,
      width: 300,
      background: "#0c1b35",
      borderRadius: 10,
      padding: 10,
      color: "white"
    }}>
      <div style={{ maxHeight: 200, overflowY: "auto", marginBottom: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            textAlign: m.role === "user" ? "right" : "left",
            margin: "5px 0"
          }}>
            <span style={{
              background: m.role === "user" ? "#5aa650" : "#1e315f",
              padding: "6px 10px",
              borderRadius: 8,
              display: "inline-block"
            }}>
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask farming question..."
        style={{
          width: "100%",
          padding: 8,
          borderRadius: 6,
          border: "none"
        }}
      />

      <button onClick={sendMessage} style={{
        marginTop: 5,
        width: "100%",
        padding: 8,
        background: "#79c26b",
        border: "none",
        borderRadius: 6
      }}>
        Send
      </button>
    </div>
  );
}
