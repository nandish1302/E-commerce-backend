package com.nandish.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DashboardResponseDTO {

    private long totalProducts;
    private long totalOrders;
    private long totalUsers;
    private double totalRevenue;

    private long placedOrders;
    private long processingOrders;
    private long shippedOrders;
    private long deliveredOrders;
    private long cancelledOrders;
}