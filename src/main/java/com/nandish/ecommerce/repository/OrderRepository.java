package com.nandish.ecommerce.repository;

import com.nandish.ecommerce.entity.Order;
import com.nandish.ecommerce.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser_Id(Long userId);

    long countByStatus(OrderStatus status);

    List<Order> findAllByOrderByCreatedAtDesc();
}