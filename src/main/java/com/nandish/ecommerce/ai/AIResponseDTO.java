package com.nandish.ecommerce.ai;

import com.nandish.ecommerce.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class AIResponseDTO {

    private String answer;
    private List<Product> products;
}