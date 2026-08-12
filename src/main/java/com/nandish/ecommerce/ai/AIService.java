package com.nandish.ecommerce.ai;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class AIService {
    private final Client client ;
    public AIService(){
        String apiKey = System.getenv("GEMINI_API_KEY");
        client = Client
                .builder()
                .apiKey(apiKey)
                .build();
    }

public String askFAQ (String question){
    GenerateContentResponse response = client.models.generateContent("gemini-3.5-flash" , question , null );
 return response.text();
}

}