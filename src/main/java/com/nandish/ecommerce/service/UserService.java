package com.nandish.ecommerce.service;


import com.nandish.ecommerce.entity.User;
import com.nandish.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register
    public User register(User user) {
        return userRepository.save(user);
    }

    // Login
    public User login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);


        if (user.isEmpty()) {
           // throw new RuntimeException("User not found");
            return null;
        }

        if (password == null || !user.get().getPassword().equals(password)) {
          //   throw new RuntimeException("Wrong password");
            return null;
        }

        return user.get();

    }
}