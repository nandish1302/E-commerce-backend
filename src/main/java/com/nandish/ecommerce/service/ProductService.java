package com.nandish.ecommerce.service;
import com.nandish.ecommerce.entity.Product;
import com.nandish.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

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
    public String deleteProduct(Long id ){
       productRepository.deleteById(id);
       return "Product deleted successfully ";
    }
    public Product updateProduct(Long id , Product updateProduct){
       Product existingProduct = productRepository.findById(id).orElse(null);
       if (existingProduct==null){
           return null ;
       }
       existingProduct.setName(updateProduct.getName());
       existingProduct.setPrice(updateProduct.getPrice());
       existingProduct.setCategory(updateProduct.getCategory());
       existingProduct.setStock(updateProduct.getStock());
       existingProduct.setDescription(updateProduct.getDescription());
       return productRepository.save(existingProduct);
    }
}
