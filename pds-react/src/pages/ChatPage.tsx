import { useState } from "react";
import axios from "axios";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<any[]>([]);

  const sendMessage = async () => {
    if (!message) return;

    const newChat = [...chat, { sender: "user", text: message }];
    setChat(newChat);

    const res = await axios.post("http://localhost:5000/chat", {
      message
    });

    setChat([
      ...newChat,
      { sender: "bot", text: res.data.reply }
    ]);

    setMessage("");
  };

  return (
    <div style={{ padding: 20, background: "#0b1f3a", minHeight: "100vh", color: "white" }}>
      <h2>💬 Live Chat</h2>

      {chat.map((msg, i) => (
        <div key={i} style={{
          textAlign: msg.sender === "user" ? "right" : "left",
          margin: "10px 0"
        }}>
          <span style={{
            background: msg.sender === "user" ? "green" : "#2d3e70",
            padding: 10,
            borderRadius: 10,
            display: "inline-block"
          }}>
            {msg.text}
          </span>
        </div>
      ))}

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "80%", padding: 10 }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
