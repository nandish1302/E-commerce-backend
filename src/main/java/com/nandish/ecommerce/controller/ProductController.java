package com.nandish.ecommerce.controller;
import java.util.*;
import com.nandish.ecommerce.entity.Product;
import com.nandish.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class ProductController {
          @Autowired
      private ProductService productService ;
          @PostMapping
      public Product addProduct(@RequestBody Product product){
              return productService.addProduct(product);
          }
          public List<Product> getAllProduct (){
              return productService.getAllProduct();
          }
          @GetMapping("/{id}")
         public  Product getProductById(@PathVariable long id ){
              return productService.getProductById(id);
          }
    }
