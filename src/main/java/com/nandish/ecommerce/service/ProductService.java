package com.nandish.ecommerce.service;
import com.nandish.ecommerce.entity.Product;
import com.nandish.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
   public Product addProduct(Product product){
       return productRepository.save(product);
   }
   public List<Product> getAllProduct(){
       return productRepository.findAll();
   }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
}
