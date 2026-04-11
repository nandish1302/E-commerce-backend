package com.nandish.ecommerce.service;
import java.util.*;

import com.nandish.ecommerce.entity.*;
import com.nandish.ecommerce.repository.*;
import com.nandish.ecommerce.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private  OrderItemRepository orderItemRepository;
    @Autowired
    private UserRepository userRepository ;
    @Autowired
    private ProductRepository productRepository ;
    @Autowired
    private CartRepository cartRepository ;
    public Order placeOrder(Long userId){
        // 1. get user
        User user = userRepository.findById(userId).orElse(null);
        if(user==null){
            return null;
        }
        // 2.   get cart items
        List<Cart> cartItems = cartRepository.findByUserId(userId);
        if(cartItems.isEmpty()){
            return null ;
        }
        // 3. create Order
        Order order = new Order();
        order.setUser(user);
        double total = 0 ;
        //save first to generate id
        Order savedOrder = orderRepository.save(order);
        //looping through items
        for(Cart cart : cartItems){

            Product product = cart.getProduct();
            if (product.getStock() < cart.getQuantity()) {
                throw new RuntimeException("Not enough stock");
            }
            product.setStock(product.getStock() - cart.getQuantity());
            // create order item
            OrderItem item = new OrderItem();
            item.setOrder(savedOrder);
            item.setProduct(product);
            item.setQuantity(cart.getQuantity());
            orderItemRepository.save(item);
            total+= product.getPrice() * item.getQuantity();

        }
        savedOrder.setAmount(total);
        orderRepository.save(savedOrder);
         // clear cart
        cartRepository.deleteAll(cartItems);

        return savedOrder;

    }
    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUser_Id(userId);
    }
}
// order , orderItem , user , product , cart ;
// 1. fetch cart and user ;
// 2. create order ;
// 3.for each Item
// * create order item
// * reduce stock
// 4 . calculate total
// 5 . and place order  and clear cart ;

