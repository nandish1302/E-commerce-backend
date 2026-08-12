package com.nandish.ecommerce.ai;

import com.google.genai.Client;
import com.google.genai.types.Model;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ModelTestRunner implements CommandLineRunner {

    @Override
    public void run(String... args) {
        System.out.println("==========================================");
        System.out.println("FETCHING AVAILABLE GEMINI MODELS FOR YOUR KEY...");
        System.out.println("==========================================");

        try {
            String apiKey = System.getenv("GEMINI_API_KEY");
            Client client = Client.builder().apiKey(apiKey).build();

            // Iterate over the models accessible by your API key
            for (Model model : client.models.list(null)) {
                System.out.println("AVAILABLE MODEL: " + model.name());
            }

        } catch (Exception e) {
            System.err.println("Error listing models: " + e.getMessage());
            e.printStackTrace();
        }

        System.out.println("==========================================");
    }
}