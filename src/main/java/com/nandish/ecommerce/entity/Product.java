package com.nandish.ecommerce.entity;
import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    @NotBlank(message = "Product name is required ")
    private String name ;
    @NotBlank
    private String description ;
    @Min(value = 0 , message = "the price should be greater than Zero ")
    private double price ;
    @Min(value = 0 , message = "Stock should not be negative ")
    private int stock ;
    @NotBlank
    private String category ;

    private String imageUrl ;



}
