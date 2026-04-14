package com.nandish.ecommerce.exception;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
@Getter
@AllArgsConstructor

public class ErrorResponse {
     private LocalDateTime timestamp ;
     private int status ;
     private String error ;
     private String message ;
}
