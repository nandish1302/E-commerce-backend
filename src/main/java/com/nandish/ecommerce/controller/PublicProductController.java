package com.nandish.ecommerce.controller;

import com.nandish.ecommerce.entity.Product;
import com.nandish.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class PublicProductController {

    @Autowired
    private ProductService productService;

    // Get all products
    @GetMapping
    public List<Product> getAllProduct() {
        return productService.getAllProduct();
    }

    // Get product by ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // Search + Category filtering
    @GetMapping("/filter")
    public List<Product> getProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category
    ) {
        return productService.getProducts(search, category);
    }
}

