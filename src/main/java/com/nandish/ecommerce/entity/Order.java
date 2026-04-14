package com.nandish.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import  java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")  //@Table(name = "orders")
//👉 Forces table name
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id ;

    @ManyToOne //Many objects of THIS class → belong to ONE User

    @JoinColumn(name="user_id")     // join to user id table . IT acts as an Foreign key
    @JsonIgnore
    private User user ;

    private double totalAmount ;

    @OneToMany(mappedBy = "order")   // 👈 ADD HERE
    private List<OrderItem> orderItems;

}
