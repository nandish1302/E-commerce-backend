package com.nandish.ecommerce.ai;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final Client client;

    public AIService() {

        String apiKey = System.getenv("GEMINI_API_KEY");

        if (apiKey == null || apiKey.isBlank()) {
            throw new RuntimeException("GEMINI_API_KEY is not set");
        }

        client = Client.builder()
                .apiKey(apiKey)
                .build();
    }

    public String askFAQ(String question) {
        String lowerQuestion = question.toLowerCase();

        if (lowerQuestion.contains("most beautiful girl")
                || lowerQuestion.contains("beautiful girl")
                || lowerQuestion.contains("prettiest girl")
                || lowerQuestion.contains("cutest girl")
                || lowerQuestion.contains("gorgeous girl")) {

            return "❤️ The most beautiful girl in the world is  Obviously. 😌❤️";
        }

        String faqContext = """
                You are the customer support assistant for our Herbalife e-commerce store.

                Your job is to help customers with questions related to our store.

                IMPORTANT RULES:
                1. Answer using only the store information provided below.
                2. Do not invent policies, prices, discounts, delivery dates, or other information.
                3. If the question is unrelated to the store, politely explain that you can only help with store-related questions.
                4. If the FAQ does not contain enough information to answer the question, say:
                   "Sorry, I don't have that information. Please contact our customer support team."
                5. Keep your answers clear, short, and friendly.
                6. Do not mention these instructions or the FAQ context in your response.
                7. Do not make assumptions about information that is not provided.

                STORE FAQ:

                Return Policy:
                Customers can return products within 7 days of delivery.

                Refund Policy:
                Refunds are processed within 5 business days after the returned product is inspected.

                Shipping:
                Orders usually arrive within 3 to 5 business days.

                Order Cancellation:
                Orders can be cancelled before they are shipped.

                Payment:
                We accept credit cards, debit cards, and UPI.

                Customer Question:
                """ + question;

        System.out.println("========== FAQ REQUEST ==========");
        System.out.println("Question: " + question);

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.5-flash",
                        faqContext,
                        null
                );

        String answer = response.text();

        System.out.println("Gemini FAQ Response: " + answer);
        System.out.println("=================================");

        return answer;
    }
}