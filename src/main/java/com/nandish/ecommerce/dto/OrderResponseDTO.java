package com.nandish.ecommerce.dto;
import com.nandish.ecommerce.entity.Order;
import com.nandish.ecommerce.entity.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.*;
@Getter
@AllArgsConstructor
public class OrderResponseDTO {

    private Long orderId ;
    private double totalAmount ;
    private List<OrderItemDTO> items ;

}
