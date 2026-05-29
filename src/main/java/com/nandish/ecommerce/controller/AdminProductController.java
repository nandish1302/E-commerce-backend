package com.nandish.ecommerce.controller;
import java.util.*;
import com.nandish.ecommerce.entity.Product;
import com.nandish.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/admin/products")
public class AdminProductController {
          @Autowired
      private ProductService productService ;
          @PreAuthorize("hasRole('ADMIN')")
          @PostMapping
      public Product addProduct(@Valid @RequestBody Product product){
              return productService.addProduct(product);
          }
          @GetMapping
              public List<Product> getAllProduct (){
              return productService.getAllProduct();
          }
          @GetMapping("/{id}")
         public  Product getProductById(@PathVariable Long id ){
              return productService.getProductById(id);
          }
    @PreAuthorize("hasRole('ADMIN')")
          @DeleteMapping("/{id}")
         public  String deleteProduct(@PathVariable Long id ){
              productService.deleteProduct(id);
              return "Product deleted by ID ";
          }
    @PreAuthorize("hasRole('ADMIN')")
          @PutMapping("/{id}")
           public Product updateProduct(@Valid @PathVariable Long id , @RequestBody Product product){
              return productService.updateProduct(id , product);
          }

    }
