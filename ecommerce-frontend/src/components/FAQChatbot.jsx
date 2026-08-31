import { useState } from "react";
import axios from "axios";
import { askFAQ } from "../api/aiApi";
import ProductCard from "./ProductCard";
import "../styles/FAQChatbot.css";

function FAQChatbot() {

  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // ADD PRODUCT TO CART
  // =========================

  const addToCart = async (product) => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/cart",
        null,
        {
          params: {
            productId: product.id,
            quantity: 1,
          },

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`${product.name} added to cart!`);

    } catch (error) {

      console.error(
        "Error adding product to cart:",
        error
      );

      alert("Failed to add product to cart.");

    }
  };


  // =========================
  // ASK AI
  // =========================

  const askQuestion = async (selectedQuestion = "") => {

    const finalQuestion =
      selectedQuestion || question;

    if (!finalQuestion.trim() || loading) {
      return;
    }


    // =========================
    // ADD USER MESSAGE
    // =========================

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

      // =========================
      // CALL BACKEND
      // =========================

      const response = await askFAQ(finalQuestion);


      // response now contains:
      //
      // {
      //   answer: "...",
      //   products: [...]
      // }


      // =========================
      // ADD AI MESSAGE
      // =========================

      setMessages((previousMessages) => [

        ...previousMessages,

        {
          sender: "ai",
          text: response.answer,
          products: response.products || [],
        },

      ]);

    } catch (error) {

      console.error(
        "FAQ error:",
        error
      );


      setMessages((previousMessages) => [

        ...previousMessages,

        {
          sender: "ai",
          text: "Sorry, something went wrong. Please try again.",
          products: [],
        },

      ]);

    } finally {

      setLoading(false);

    }
  };


  // =========================
  // ENTER KEY
  // =========================

  const handleKeyDown = (event) => {

    if (event.key === "Enter") {
      askQuestion();
    }

  };


  // =========================
  // UI
  // =========================

  return (

    <div className="faq-page">


      {/* =========================
          HEADER
      ========================== */}

      <div className="faq-header">

        <div>

          <h2>
            🌿 Customer Support
          </h2>

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


        {/* =========================
            WELCOME MESSAGE
        ========================== */}

        <div className="faq-message faq-ai-message">

          <strong>
            AI
          </strong>

          <p>
            Hi! 👋 How can I help you today?
          </p>

        </div>


        {/* =========================
            USER + AI MESSAGES
        ========================== */}

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


            {/* =========================
                RECOMMENDED PRODUCTS
            ========================== */}

            {message.sender === "ai" &&
              message.products &&
              message.products.length > 0 && (

                <div className="faq-recommended-products">

                  {message.products.map((product) => (

                    <ProductCard
                      key={product.id}
                      product={product}
                      addToCart={addToCart}
                    />

                  ))}

                </div>

              )}

          </div>

        ))}


        {/* =========================
            LOADING
        ========================== */}

        {loading && (

          <div className="faq-message faq-ai-message">

            <strong>
              AI
            </strong>

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
            askQuestion(
              "What is your return policy?"
            )
          }
          disabled={loading}
        >
          ↩️ Return Policy
        </button>


        <button
          className="faq-option"
          onClick={() =>
            askQuestion(
              "How long does shipping take?"
            )
          }
          disabled={loading}
        >
          🚚 Shipping
        </button>


        <button
          className="faq-option"
          onClick={() =>
            askQuestion(
              "What is your refund policy?"
            )
          }
          disabled={loading}
        >
          💰 Refunds
        </button>


        <button
          className="faq-option"
          onClick={() =>
            askQuestion(
              "Can I cancel my order?"
            )
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
          onClick={() =>
            askQuestion()
          }
          disabled={
            loading ||
            !question.trim()
          }
        >
          ➤
        </button>

      </div>

    </div>

  );
}

export default FAQChatbot;

