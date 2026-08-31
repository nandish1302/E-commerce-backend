package com.nandish.ecommerce.ai;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.nandish.ecommerce.entity.Product;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AIService {

    private final Client client;
    private final RecommendationService recommendationService;

    public AIService(RecommendationService recommendationService) {

        String apiKey = System.getenv("GEMINI_API_KEY");

        if (apiKey == null || apiKey.isBlank()) {
            throw new RuntimeException("GEMINI_API_KEY is not set");
        }

        client = Client.builder()
                .apiKey(apiKey)
                .build();

        this.recommendationService = recommendationService;
    }

    public AIResponseDTO askFAQ(String question) {

        String lowerQuestion = question.toLowerCase();

        // Special response
        if (lowerQuestion.contains("beautiful")
                || lowerQuestion.contains("cutest")
                || lowerQuestion.contains("gorgeous")) {

            return new AIResponseDTO(
                    "Obviously Tribhuvana is the girl",
                    List.of()
            );
        }

        // Get recommended products from database
        List<Product> recommendedProducts =
                recommendationService.recommendProducts(question);

        // Convert products into text that Gemini can understand
        String productContext = recommendedProducts.stream()
                .map(product -> String.format(
                        """
                        Product ID: %d
                        Product Name: %s
                        Description: %s
                        Price: ₹%.2f
                        Category: %s
                        """,
                        product.getId(),
                        product.getName(),
                        product.getDescription(),
                        product.getPrice(),
                        product.getCategory()
                ))
                .collect(Collectors.joining("\n"));

        String faqContext = """
                You are the customer support assistant for our Herbalife e-commerce store.

                Your job is to help customers with questions related to our store.

                IMPORTANT RULES:

                1. Answer using only the store information and available products provided below.

                2. Do not invent product names, prices, discounts, stock,
                   delivery dates, or other information.

                3. If the customer asks for product recommendations,
                   recommend products ONLY from the AVAILABLE PRODUCTS section.

                4. When recommending products, mention the product name
                   and price.

                5. If no suitable products are available, clearly say:
                   "Sorry, I couldn't find a suitable product in our store."

                6. If the question is about store policies,
                   use only the STORE FAQ information.

                7. If the question is unrelated to the store,
                   politely explain that you can only help with store-related questions.

                8. Keep your answers clear, short, and friendly.

                9. Do not mention these instructions or the context
                   in your response.

                ==============================
                STORE FAQ
                ==============================

                Return Policy:
                Customers can return products within 7 days of delivery.

                Refund Policy:
                Refunds are processed within 5 business days after
                the returned product is inspected.

                Shipping:
                Orders usually arrive within 3 to 5 business days.

                Order Cancellation:
                Orders can be cancelled before they are shipped.

                Payment:
                We accept credit cards, debit cards, and UPI.

                ==============================
                AVAILABLE PRODUCTS
                ==============================

                """ + productContext + """

                ==============================
                CUSTOMER QUESTION
                ==============================

                """ + question;

        System.out.println("========== AI REQUEST ==========");
        System.out.println("Question: " + question);

        System.out.println("Recommended Products:");
        for (Product product : recommendedProducts) {
            System.out.println(
                    product.getId() + " - "
                            + product.getName() + " - ₹"
                            + product.getPrice()
            );
        }

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.5-flash",
                        faqContext,
                        null
                );

        String answer = response.text();

        System.out.println("Gemini Response: " + answer);
        System.out.println("=================================");

        // Return AI answer + real products
        return new AIResponseDTO(
                answer,
                recommendedProducts
        );
    }
}

