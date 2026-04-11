package com.nandish.ecommerce.repository;

import java.util.*;

import com.nandish.ecommerce.entity.Order;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository <Order, Long> {
    List<Order> findByUser_Id(Long userId);
}
