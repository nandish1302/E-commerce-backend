package com.nandish.ecommerce.service;
import com.nandish.ecommerce.repository.*;
import com.nandish.ecommerce.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class CartService {
   @Autowired
    private CartRepository cartRepository ;

   @Autowired
   private ProductRepository productRepository ;

   @Autowired
    private UserRepository userRepository ;

    public Cart  addToCart (Long userId , Long productId , int quantity  ){
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found "));
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found "));

        List<Cart> existingItems = cartRepository.findByUser_IdAndProduct_Id(userId,productId);
        if(!existingItems.isEmpty()){
            Cart existingCart = existingItems.get(0);
            existingCart.setQuantity(existingCart.getQuantity()+quantity);
            return cartRepository.save(existingCart);
        }
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(quantity);
        return cartRepository.save(cart);
    }
    public List<Cart> getCartByUser(Long userId) {
        return cartRepository.findByUserId(userId); // column name
    }
    public void deleteFromCart (Long cartId ){
        cartRepository.deleteById(cartId);
    }
    public Cart updateQuantity(Long cartId, int quantity) {

        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("no item present in cart "));


        cart.setQuantity(quantity);

        return cartRepository.save(cart);
    }
}
