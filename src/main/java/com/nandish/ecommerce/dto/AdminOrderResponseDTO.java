package com.nandish.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class AdminOrderResponseDTO {

    private Long orderId;

    private String customerName;

    private String customerEmail;

    private List<OrderItemDTO> items;

    private double totalAmount;

    private String status;

    private LocalDateTime createdAt;
}