package com.nandish.ecommerce.repository;


import com.nandish.ecommerce.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long  > {

}
