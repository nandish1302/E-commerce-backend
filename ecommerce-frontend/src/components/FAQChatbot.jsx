import { useState } from "react";
import { askFAQ } from "../api/aiApi";
import "../styles/FAQChatbot.css";

function FAQChatbot() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async (selectedQuestion = "") => {
    const finalQuestion = selectedQuestion || question;

    if (!finalQuestion.trim() || loading) {
      return;
    }

    // Add user's message
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        sender: "user",
        text: finalQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const answer = await askFAQ(finalQuestion);

      // Add AI response
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          sender: "ai",
          text: answer,
        },
      ]);
    } catch (error) {
      console.error("FAQ error:", error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          sender: "ai",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      askQuestion();
    }
  };

  return (
    <div className="faq-page">

      {/* =========================
          HEADER
      ========================== */}

      <div className="faq-header">

        <div>
          <h2>🌿 Customer Support</h2>

          <p>
            AI-powered store assistant
          </p>
        </div>

        <div className="faq-status">
          <span></span>
          Online
        </div>

      </div>


      {/* =========================
          CHAT MESSAGES
      ========================== */}

      <div className="faq-messages">

        {/* Welcome message */}

        <div className="faq-message faq-ai-message">

          <strong>AI</strong>

          <p>
            Hi! 👋 How can I help you today?
          </p>

        </div>


        {/* User + AI messages */}

        {messages.map((message, index) => (

          <div
            key={index}
            className={`faq-message ${
              message.sender === "user"
                ? "faq-user-message"
                : "faq-ai-message"
            }`}
          >

            <strong>
              {message.sender === "user"
                ? "You"
                : "AI"}
            </strong>

            <p>
              {message.text}
            </p>

          </div>

        ))}


        {/* Loading animation */}

        {loading && (

          <div className="faq-message faq-ai-message">

            <strong>AI</strong>

            <div className="faq-loading">

              <span></span>
              <span></span>
              <span></span>

            </div>

          </div>

        )}

      </div>


      {/* =========================
          QUICK QUESTIONS
      ========================== */}

      <div className="faq-options">

        <button
          className="faq-option"
          onClick={() =>
            askQuestion("What is your return policy?")
          }
          disabled={loading}
        >
          ↩️ Return Policy
        </button>


        <button
          className="faq-option"
          onClick={() =>
            askQuestion("How long does shipping take?")
          }
          disabled={loading}
        >
          🚚 Shipping
        </button>


        <button
          className="faq-option"
          onClick={() =>
            askQuestion("What is your refund policy?")
          }
          disabled={loading}
        >
          💰 Refunds
        </button>


        <button
          className="faq-option"
          onClick={() =>
            askQuestion("Can I cancel my order?")
          }
          disabled={loading}
        >
          ❌ Cancellation
        </button>

      </div>


      {/* =========================
          INPUT
      ========================== */}

      <div className="faq-input-area">

        <input
          type="text"
          className="faq-input"
          placeholder="Ask something..."
          value={question}
          onChange={(event) =>
            setQuestion(event.target.value)
          }
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <button
          className="faq-send"
          onClick={() => askQuestion()}
          disabled={loading || !question.trim()}
        >
          ➤
        </button>

      </div>

    </div>
  );
}

export default FAQChatbot;