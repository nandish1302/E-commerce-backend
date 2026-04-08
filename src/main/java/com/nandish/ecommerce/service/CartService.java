package com.nandish.ecommerce.service;
import com.nandish.ecommerce.repository.*;
import com.nandish.ecommerce.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class CartService {
   @Autowired
    private CartRepository cartRepository ;

   @Autowired
   private ProductRepository productRepository ;

   @Autowired
    private UserRepository userRepository ;

}
