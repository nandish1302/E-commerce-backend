package com.nandish.ecommerce.service;

import com.nandish.ecommerce.dto.UserResponseDTO;
import com.nandish.ecommerce.entity.User;
import com.nandish.ecommerce.exception.InvalidCredentialsException;
import com.nandish.ecommerce.exception.UserNotFoundException;
import com.nandish.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    //  @Autowired
    // private UserRepository userRepository;
  // constructor injection
  public UserService(UserRepository userRepository) {
      this.userRepository = userRepository;
  }
    // Register
  /*  public User register(User user) {
        return userRepository.save(user);
    }*/
    public UserResponseDTO register(User user) {

        User savedUser = userRepository.save(user);

        return new UserResponseDTO(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
    }

    // Login
    public User login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);


        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found");

        }

        if (password == null || !user.get().getPassword().equals(password)) {
             throw new InvalidCredentialsException("Wrong password");
        }

        return user.get();

    }
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles("USER")
                .build();
    }
}