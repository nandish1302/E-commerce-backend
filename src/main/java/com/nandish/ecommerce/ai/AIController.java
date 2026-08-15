package com.nandish.ecommerce.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ai")
public class AIController {

    private final AIService aiService;

    @PostMapping("/faq")
    public String askFAQ(@RequestBody AIRequestDTO request) {
        return aiService.askFAQ(request.getQuestion());
    }
}