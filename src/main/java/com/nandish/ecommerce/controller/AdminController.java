package com.nandish.ecommerce.controller;

import com.nandish.ecommerce.dto.AdminOrderResponseDTO;
import com.nandish.ecommerce.dto.DashboardResponseDTO;
import com.nandish.ecommerce.entity.OrderStatus;
import com.nandish.ecommerce.service.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;


    // ==========================================
    // ADMIN DASHBOARD
    // ==========================================

    @GetMapping("/dashboard")
    public DashboardResponseDTO getDashboard() {

        return adminService.getDashboard();
    }


    // ==========================================
    // GET ALL ORDERS
    // ==========================================

    @GetMapping("/orders")
    public List<AdminOrderResponseDTO> getAllOrders() {

        return adminService.getAllOrders();
    }


    // ==========================================
    // UPDATE ORDER STATUS
    // ==========================================

    @PutMapping("/orders/{id}/status")
    public AdminOrderResponseDTO updateOrderStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status) {

        return adminService.updateOrderStatus(id, status);
    }
}