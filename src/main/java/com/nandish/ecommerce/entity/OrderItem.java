package com.nandish.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.AccessType;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// no table name so auto naming
//OrderItem → order_item (auto naming)

public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @ManyToOne
    @JoinColumn(name="order_id")
    @JsonIgnore
    private Order order ;

    @ManyToOne
    @JoinColumn(name="product_id")

    private Product product ;
    private int quantity ;

}
//@Entity = blueprint
  //      Hibernate = builder
//ddl-auto=update = permission to build
  //      Database = building
