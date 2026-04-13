package com.nandish.ecommerce.exception;
import org.springframework.web.bind.annotation.*;
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public String handleException(ResourceNotFoundException ex ){
        return ex.getMessage();
    }
    @ExceptionHandler(UserNotFoundException.class)
    public String handleUserNotFound(UserNotFoundException ex ){
        return ex.getMessage();
    }
    @ExceptionHandler(InvalidCredentialsException.class)
    public String InvalidCredential(InvalidCredentialsException ex ){
        return ex.getMessage();
    }
}
//@RestControllerAdvice = global interceptor for exceptions

//👉 It catches exceptions from:

//Controllers
  //      Services
//Entire app
