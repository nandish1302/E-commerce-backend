package com.nandish.ecommerce.service;
import com.nandish.ecommerce.repository.*;
import com.nandish.ecommerce.entity.*;
import com.nandish.ecommerce.security.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.access.AccessDeniedException;

import java.util.*;
@Service
public class CartService {
   @Autowired
    private CartRepository cartRepository ;

   @Autowired
   private ProductRepository productRepository ;

   @Autowired
    private UserRepository userRepository ;

    public Cart  addToCart ( Long productId , int quantity  ){
       // User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found "));
        User user = SecurityUtil.getCurrentUser(userRepository);
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found "));

        List<Cart> existingItems = cartRepository.findByUser_IdAndProduct_Id(user.getId(), productId);
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
    public List<Cart> getMyCart(){
        User user = SecurityUtil.getCurrentUser(userRepository);
        return cartRepository.findByUserId(user.getId());
    }

    public List<Cart> getCartByUser(Long userId) {
        return cartRepository.findByUserId(userId); // column name
    }
    public void deleteFromCart (Long cartId ) {
        User user = SecurityUtil.getCurrentUser(userRepository);
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("cart not found "));
        if (!cart.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Access denied");
        }
        cartRepository.delete(cart);
    }
    public Cart updateQuantity(Long cartId, int quantity) {

       // Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("no item present in cart "));
        User currentUser =
                SecurityUtil.getCurrentUser(userRepository);

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() ->
                        new RuntimeException("No item present in cart"));

        if(!cart.getUser().getId().equals(currentUser.getId())){
            throw new AccessDeniedException("Access denied");
        }


        cart.setQuantity(quantity);

        return cartRepository.save(cart);
    }
}
