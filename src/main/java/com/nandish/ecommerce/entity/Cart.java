package com.nandish.ecommerce.entity;
import com.nandish.ecommerce.entity.User;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.autoconfigure.web.WebProperties;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter

public class Cart {
  @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id ;
    // many cart items belong to one user
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user ;

    // Many cart item can have same product
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product ;
    private int quantity ;
}
