package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class StudentException {

    @ExceptionHandler(NullPointerException.class)
	public ResponseEntity<String> handleNullPointerException(NullPointerException e){
		
		return new ResponseEntity<String>("NULL VALUE NOT ALLOWED."+"PLEASE CHECK THE INPUT",HttpStatus.NOT_FOUND);
		
	}
    
    @ExceptionHandler(org.springframework.web.bind.MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationException(MethodArgumentNotValidException e) {
        return new ResponseEntity<>(
            "NULL VALUE NOT ALLOWED. PLEASE CHECK THE INPUT", 
            HttpStatus.BAD_REQUEST // 400 is more appropriate than 404 for validation
        );
    }

	
    @ExceptionHandler
    public ResponseEntity<String> handleNotFound(StudentNotFoundException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler
    public ResponseEntity<String> handleGeneric(Exception e) {
        return new ResponseEntity<>("Bad Request: Check your JSON or ID.", HttpStatus.BAD_REQUEST);
    }
    
}
