package com.nandish.ecommerce.controller;

import com.nandish.ecommerce.entity.Cart;
import com.nandish.ecommerce.service.CartService;
import jdk.jfr.Registered;
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

            @RequestParam Long productId ,
            @RequestParam int quantity
    ){
        return cartService.addToCart( productId , quantity);
    }
    @GetMapping("/my-cart")
    public List<Cart> getCart(@PathVariable Long userId ){
        return cartService.getMyCart();
    }
    @DeleteMapping("/{cartID}")
    public String removeFromCart(@PathVariable Long cartID ){
        cartService.deleteFromCart(cartID);
        return "Item removed from cart";
    }
    @PutMapping("/{cartID}")
    public Cart updateQuantity(
            @PathVariable Long cartId,
            @RequestParam int quantity) {

        return cartService.updateQuantity(cartId, quantity);
    }

}
