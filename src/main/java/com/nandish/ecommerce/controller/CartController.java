package com.nandish.ecommerce.controller;

import com.nandish.ecommerce.entity.Cart;
import com.nandish.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public Cart addToCart(
            @RequestParam Long productId,
            @RequestParam int quantity
    ) {
        return cartService.addToCart(productId, quantity);
    }

    @GetMapping("/my-cart")
    public List<Cart> getCart() {
        return cartService.getMyCart();
    }

    @DeleteMapping("/{cartId}")
    public String removeFromCart(@PathVariable Long cartId) {
        cartService.deleteFromCart(cartId);
        return "Item removed from cart";
    }

    @PutMapping("/{cartId}")
    public Cart updateQuantity(
            @PathVariable Long cartId,
            @RequestParam int quantity
    ) {
        return cartService.updateQuantity(cartId, quantity);
    }
}