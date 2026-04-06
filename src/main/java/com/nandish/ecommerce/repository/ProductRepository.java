    package com.nandish.ecommerce.repository;
  import com.nandish.ecommerce.entity.Product;
    import org.springframework.data.jpa.repository.JpaRepository;
    public interface ProductRepository extends JpaRepository<Product , Long > {

    }
