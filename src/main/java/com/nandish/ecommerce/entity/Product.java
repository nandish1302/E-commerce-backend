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
    @NotBlank
    private String name ;
    @NotBlank
    private String description ;
    @Min(1)
    private double price ;
    @Min(0)
    private int stock ;
    @NotBlank
    private String category ;

    private String imageUrl ;



}
