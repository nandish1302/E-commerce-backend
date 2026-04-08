package com.nandish.ecommerce.repository;
import com.nandish.ecommerce.entity.Cart;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository  extends JpaRepository<Cart , Long>{
    // get all cart item for a user
    List<Cart> findByUserId(Long userID);
    List<Cart> findByUser_IdAndProduct_Id(Long userId, Long productId);
}
