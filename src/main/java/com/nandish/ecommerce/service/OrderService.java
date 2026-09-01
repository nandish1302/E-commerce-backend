package com.nandish.ecommerce.service;

import java.util.List;

import com.nandish.ecommerce.dto.OrderItemDTO;
import com.nandish.ecommerce.dto.OrderResponseDTO;
import com.nandish.ecommerce.entity.Cart;
import com.nandish.ecommerce.entity.Order;
import com.nandish.ecommerce.entity.OrderItem;
import com.nandish.ecommerce.entity.Product;
import com.nandish.ecommerce.entity.User;
import com.nandish.ecommerce.repository.CartRepository;
import com.nandish.ecommerce.repository.OrderItemRepository;
import com.nandish.ecommerce.repository.OrderRepository;
import com.nandish.ecommerce.repository.ProductRepository;
import com.nandish.ecommerce.repository.UserRepository;
import com.nandish.ecommerce.security.SecurityUtil;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;


    // ==============================
    // PLACE ORDER
    // ==============================

    @Transactional
    public Order placeOrder() {

        // 1. Get logged-in user
        User user = SecurityUtil.getCurrentUser(userRepository);

        // 2. Get user's cart items
        List<Cart> cartItems =
                cartRepository.findByUserId(user.getId());

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // 3. Create Order
        Order order = new Order();
        order.setUser(user);

        double total = 0;

        // Save first to generate Order ID
        Order savedOrder = orderRepository.save(order);

        // 4. Process cart items
        for (Cart cart : cartItems) {

            Product product = cart.getProduct();

            // Check stock
            if (product.getStock() < cart.getQuantity()) {
                throw new RuntimeException(
                        "Not enough stock for product: "
                                + product.getName()
                );
            }

            // Reduce stock
            product.setStock(
                    product.getStock() - cart.getQuantity()
            );

            // Save updated product
            productRepository.save(product);

            // Create OrderItem
            OrderItem item = new OrderItem();

            item.setOrder(savedOrder);
            item.setProduct(product);
            item.setQuantity(cart.getQuantity());

            orderItemRepository.save(item);

            // Calculate total
            total +=
                    product.getPrice()
                            * item.getQuantity();
        }

        // 5. Set total amount
        savedOrder.setTotalAmount(total);

        // Save order
        orderRepository.save(savedOrder);

        // 6. Clear cart
        cartRepository.deleteAll(cartItems);

        return savedOrder;
    }


    // ==============================
    // GET ORDERS BY USER
    // ==============================

    public List<OrderResponseDTO> getOrdersByUser(Long userId) {

        List<Order> orders =
                orderRepository.findByUser_Id(userId);

        return orders.stream()
                .map(this::convertToDTO)
                .toList();
    }


    // ==============================
    // GET CURRENT USER ORDERS
    // ==============================

    public List<OrderResponseDTO> getMyOrders() {

        User user =
                SecurityUtil.getCurrentUser(userRepository);

        List<Order> orders =
                orderRepository.findByUser_Id(user.getId());

        return orders.stream()
                .map(this::convertToDTO)
                .toList();
    }


    // ==============================
    // CONVERT ORDER TO DTO
    // ==============================

    private OrderResponseDTO convertToDTO(Order order) {

        List<OrderItemDTO> items =
                order.getOrderItems()
                        .stream()
                        .map(item -> new OrderItemDTO(
                                item.getProduct().getName(),
                                item.getQuantity()
                        ))
                        .toList();

        return new OrderResponseDTO(
                order.getId(),
                order.getTotalAmount(),
                order.getStatus().name(),
                order.getCreatedAt(),
                items
        );
    }
}
