package com.nandish.ecommerce.controller;

import com.nandish.ecommerce.entity.User;
import com.nandish.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // Register API
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    // Login API
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User    loggedUser = userService.login(user.getEmail() , user.getPassword());
        if(loggedUser==null){
            return "Invalid password or Username " ;
        }
        return "Login successfull" ;
    }
}