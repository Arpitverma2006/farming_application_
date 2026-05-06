import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";
import API from "../api";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Language State
  const [language, setLanguage] = useState("en");

  const chatEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  // ✅ Fullscreen Toggle
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // ✅ Language Toggle
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  // ✅ Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const sendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    setMessage("");

    const userMsg = {
      sender: "user",
      text: trimmedMessage
    };

    setChat((prev) => [...prev, userMsg]);

    setLoading(true);

    try {
      const res = await API.post("chat/", {
        message: trimmedMessage,
        language: language
      });

      console.log("API Response:", res.data);

      const botReply =
        res?.data?.reply ||
        (language === "hi"
          ? "⚠️ AI से कोई उत्तर नहीं मिला"
          : "⚠️ No response from AI");

      const botMsg = {
        sender: "bot",
        text: botReply
      };

      setChat((prev) => [...prev, botMsg]);

    } catch (err) {
      console.error("Error:", err);

      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            language === "hi"
              ? "⚠️ सर्वर त्रुटि। कृपया पुनः प्रयास करें।"
              : "⚠️ Server error. Please try again."
        }
      ]);
    }

    setLoading(false);
  };

  // ✅ Enter key support
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="chat-toggle" onClick={toggleChat}>
        💬
        <span className="pulse"></span>
      </div>

      {/* Chat Window */}
      <div
        className={`chat-container ${isOpen ? "open" : ""} ${
          isFullscreen ? "fullscreen" : ""
        }`}
      >
        <div className="chat-header">
          🌾 {language === "hi" ? "कृषि AI" : "Krishi AI"}

          <div className="chat-actions">

            {/* Language Button */}
            <button
              className="lang-btn"
              onClick={toggleLanguage}
            >
              {language === "en" ? "हिंदी" : "English"}
            </button>

            {/* Fullscreen Button */}
            <span onClick={toggleFullscreen}>
              {isFullscreen ? "🗗" : "🗖"}
            </span>

            {/* Close Button */}
            <span onClick={toggleChat}>✖</span>
          </div>
        </div>

        <div className="chat-box">
          {chat.length === 0 && (
            <div className="msg bot welcome">
              {language === "hi"
                ? "👋 फसलों, मौसम और खेती के सुझाव पूछें!"
                : "👋 Ask me about crops, weather, farming tips!"}
            </div>
          )}

          {chat.map((msg, i) => (
            <div key={i} className={`msg ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="msg bot typing">
              {language === "hi"
                ? "टाइप किया जा रहा है..."
                : "Typing..."}
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        <div className="input-box">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              language === "hi"
                ? "कुछ पूछें..."
                : "Ask something..."
            }
          />

          <button onClick={sendMessage}>
            {language === "hi" ? "भेजें" : "➤"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatBot;