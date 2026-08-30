package com.nandish.ecommerce.repository;

import com.nandish.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("""
            SELECT p FROM Product p
            WHERE
            (:search IS NULL OR
             LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR
             LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')))
            AND
            (:category IS NULL OR LOWER(p.category) = LOWER(:category))
            """)
    List<Product> searchAndFilter(
            @Param("search") String search,
            @Param("category") String category
    );
}