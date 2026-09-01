package com.nandish.ecommerce.service;

import com.nandish.ecommerce.dto.AdminOrderResponseDTO;
import com.nandish.ecommerce.dto.DashboardResponseDTO;
import com.nandish.ecommerce.dto.OrderItemDTO;
import com.nandish.ecommerce.entity.Order;
import com.nandish.ecommerce.entity.OrderStatus;
import com.nandish.ecommerce.repository.OrderRepository;
import com.nandish.ecommerce.repository.ProductRepository;
import com.nandish.ecommerce.repository.UserRepository;
import com.nandish.ecommerce.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;


    // ==========================================
    // ADMIN DASHBOARD STATISTICS
    // ==========================================

    public DashboardResponseDTO getDashboard() {

        // Total products
        long totalProducts =
                productRepository.count();

        // Total orders
        long totalOrders =
                orderRepository.count();

        // Total users/customers
        long totalUsers =
                userRepository.count();

        // Total revenue
        double totalRevenue =
                orderRepository.findAll()
                        .stream()
                        .mapToDouble(Order::getTotalAmount)
                        .sum();


        // Order status counts

        long placedOrders =
                orderRepository.countByStatus(
                        OrderStatus.PLACED
                );

        long processingOrders =
                orderRepository.countByStatus(
                        OrderStatus.PROCESSING
                );

        long shippedOrders =
                orderRepository.countByStatus(
                        OrderStatus.SHIPPED
                );

        long deliveredOrders =
                orderRepository.countByStatus(
                        OrderStatus.DELIVERED
                );

        long cancelledOrders =
                orderRepository.countByStatus(
                        OrderStatus.CANCELLED
                );


        // Return dashboard data
        return new DashboardResponseDTO(
                totalProducts,
                totalOrders,
                totalUsers,
                totalRevenue,
                placedOrders,
                processingOrders,
                shippedOrders,
                deliveredOrders,
                cancelledOrders
        );
    }


    // ==========================================
    // GET ALL ORDERS FOR ADMIN
    // ==========================================

    public List<AdminOrderResponseDTO> getAllOrders() {

        List<Order> orders =
                orderRepository.findAllByOrderByCreatedAtDesc();

        return orders.stream()
                .map(this::convertToAdminOrderDTO)
                .toList();
    }


    // ==========================================
    // UPDATE ORDER STATUS
    // ==========================================

    public AdminOrderResponseDTO updateOrderStatus(
            Long orderId,
            OrderStatus status) {

        // Find order
        Order order =
                orderRepository.findById(orderId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order not found with id: "
                                                + orderId
                                )
                        );


        // Update status
        order.setStatus(status);


        // Save updated order
        Order updatedOrder =
                orderRepository.save(order);


        // Return updated order
        return convertToAdminOrderDTO(
                updatedOrder
        );
    }


    // ==========================================
    // CONVERT ORDER TO ADMIN DTO
    // ==========================================

    private AdminOrderResponseDTO convertToAdminOrderDTO(
            Order order) {


        // Get products inside this order
        List<OrderItemDTO> items =
                order.getOrderItems()
                        .stream()
                        .map(item ->
                                new OrderItemDTO(
                                        item.getProduct().getName(),
                                        item.getQuantity()
                                )
                        )
                        .toList();


        // Create admin order response
        return new AdminOrderResponseDTO(

                order.getId(),

                order.getUser().getName(),

                order.getUser().getEmail(),

                items,

                order.getTotalAmount(),

                order.getStatus().name(),

                order.getCreatedAt()
        );
    }
}

