package com.nandish.ecommerce.entity;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity        // tells Hibernate “this is a DB table”
@Table(name = "users")  // table name
public class User {

    @Id  // primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // auto increment
    private Long id;
    @NotBlank
    private String name;

    @Column(unique = true)
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String password;

    // Constructors
    public User() {}

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Getters & Setters
    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}