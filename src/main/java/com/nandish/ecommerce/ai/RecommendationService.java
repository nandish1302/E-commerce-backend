package com.nandish.ecommerce.ai;

import com.nandish.ecommerce.entity.Product;
import com.nandish.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final ProductRepository productRepository;

    public List<Product> recommendProducts(String question) {

        String lowerQuestion = question.toLowerCase();

        String category = extractCategory(lowerQuestion);

        Double maxPrice = extractMaxPrice(lowerQuestion);

        String search = extractSearchKeyword(lowerQuestion);

        System.out.println("========== RECOMMENDATION ==========");
        System.out.println("Question: " + question);
        System.out.println("Search: " + search);
        System.out.println("Category: " + category);
        System.out.println("Max Price: " + maxPrice);

        List<Product> products =
                productRepository.searchAndFilter(
                        search,
                        category,
                        maxPrice
                );

        System.out.println("Products Found: " + products.size());
        System.out.println("====================================");

        return products.stream()
                .limit(5)
                .toList();
    }

    private String extractCategory(String question) {

        if (question.contains("hair")
                || question.contains("haircare")
                || question.contains("hair care")
                || question.contains("shampoo")
                || question.contains("conditioner")
                || question.contains("hair oil")) {

            return "Hair Care";
        }

        if (question.contains("skin")
                || question.contains("skincare")
                || question.contains("skin care")
                || question.contains("face")
                || question.contains("moisturizer")) {

            return "Skin Care";
        }

        if (question.contains("protein")
                || question.contains("nutrition")
                || question.contains("shake")) {

            return "Protein";
        }

        return null;
    }

    private String extractSearchKeyword(String question) {

        if (question.contains("shampoo")) {
            return "shampoo";
        }

        if (question.contains("conditioner")) {
            return "conditioner";
        }

        if (question.contains("hair oil")) {
            return "hair oil";
        }

        if (question.contains("aloe")) {
            return "aloe";
        }

        if (question.contains("vitamin")) {
            return "vitamin";
        }

        return null;
    }

    private Double extractMaxPrice(String question) {

        // Example:
        // "under 500"
        // "below 300"
        // "less than 1000"

        String[] words = question.split("\\s+");

        for (int i = 0; i < words.length; i++) {

            String word = words[i]
                    .replace("₹", "")
                    .replace(",", "");

            if (word.matches("\\d+(\\.\\d+)?")) {

                if (i > 0) {

                    String previousWord = words[i - 1];

                    if (previousWord.equals("under")
                            || previousWord.equals("below")
                            || previousWord.equals("less")
                            || previousWord.equals("upto")
                            || previousWord.equals("up")
                            || previousWord.equals("within")) {

                        return Double.parseDouble(word);
                    }
                }
            }
        }

        return null;
    }
}

