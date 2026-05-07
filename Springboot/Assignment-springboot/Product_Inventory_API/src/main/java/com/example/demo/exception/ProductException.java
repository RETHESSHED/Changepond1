package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ProductException {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleNotFound(ResourceNotFoundException exc) {
        return new ResponseEntity<>(exc.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidation(MethodArgumentNotValidException exc) {
        String msg = exc.getBindingResult().getFieldError().getDefaultMessage();
        return new ResponseEntity<>(msg, HttpStatus.BAD_REQUEST);
    }

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<String> handleGeneric(Exception exc) {
//        return new ResponseEntity<>("An error occurred: Check your input.", HttpStatus.BAD_REQUEST);
//    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneric(Exception exc) {
        // This will tell you EXACTLY which field is failing in Postman
        return new ResponseEntity<>("DEBUG ERROR: " + exc.getMessage(), HttpStatus.BAD_REQUEST);
    }

}
