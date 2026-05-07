package com.example.demo.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class Emphandler {
	 @ExceptionHandler(ResourceNotFoundException.class)
	    public ResponseEntity<String> handleNotFound(ResourceNotFoundException exc) {
	        return new ResponseEntity<>(exc.getMessage(), HttpStatus.NOT_FOUND);
	    }

	    // Handles @Valid validation errors
	    @ExceptionHandler(MethodArgumentNotValidException.class)
	    public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException exc) {
	        Map<String, String> errors = new HashMap();
	        exc.getBindingResult().getFieldErrors().forEach(error -> 
	            errors.put(error.getField(), error.getDefaultMessage()));
	        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	    }

	    // Catches all other unexpected errors
	    @ExceptionHandler(Exception.class)
	    public ResponseEntity<String> handleGeneric(Exception exc) {
	        return new ResponseEntity<>("Error: " + exc.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
}
