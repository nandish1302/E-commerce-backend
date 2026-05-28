package com.nandish.ecommerce.controller;

import com.nandish.ecommerce.entity.Order;
import com.nandish.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.nandish.ecommerce.dto.OrderResponseDTO;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order placeOrder() {
        return orderService.placeOrder();
    }
  /*  @GetMapping("/{userId}")
    public List<Order> getOrders(@PathVariable Long userId) {
        return orderService.getOrdersByUser(userId);
    }*/
  @GetMapping("/my-orders")
  public List<OrderResponseDTO> getOrders() {
      return orderService.getMyOrders();
  }
}
//GET http://localhost:8080/orders/my-orders