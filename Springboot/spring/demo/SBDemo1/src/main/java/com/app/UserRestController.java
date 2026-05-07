package com.app;


import java.time.LocalTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.request.UserDetailsRequestModel;
import com.app.model.response.UserRest;

@RestController
@RequestMapping("users")
public class UserRestController {
		
	@GetMapping(path = "/{userId}")
	public String getUser(@PathVariable String userId) {
		return "Get Users was called with userId : " + userId;
	}
	
	
	//Reading Query String from Request Parameters
	
//	@GetMapping
//	public String getUser(@RequestParam(value="page") int page,
//			@RequestParam int limit) {
//			return "Get users was called with page :"+page+" Limit :"+limit;
//	}
	
	
	@GetMapping
	public String getUser(@RequestParam(defaultValue = "12") int page,
			@RequestParam(required = false) String limit) {
			return "Get users was called with page :"+page+" Limit :"+limit;
	}
	
	
	//Returning Object as JSON
	
//	@GetMapping(path ="/user/{userId}", produces = {MediaType.APPLICATION_XML_VALUE,
//			MediaType.APPLICATION_JSON_VALUE})
//	public UserRest getUser1 (@PathVariable String userId ) {
//		UserRest returnValue = new UserRest();
//		returnValue.setFirstName("Kaushik");
//		returnValue.setLastName("Kumar");
//		returnValue.setEmail("kaushik@gmail.com");
//		returnValue.setUserId(userId);
//		return returnValue;
//		
//	}
	
	// SET Response Status code
	@GetMapping(path ="/user/{userId}", produces = {MediaType.APPLICATION_XML_VALUE,
			MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<UserRest> getUser1 (@PathVariable String userId ) {
		UserRest returnValue = new UserRest();
		returnValue.setFirstName("Kaushik");
		returnValue.setLastName("Kumar");
		returnValue.setEmail("kaushik@gmail.com");
		returnValue.setUserId(userId);
		return new ResponseEntity<UserRest>(returnValue, HttpStatus.CREATED);
		
	}
	
	
	//Reading Http Post request Body - @RequestBody
	//POST - http:localhost:8081/users
	
	@PostMapping(consumes = {MediaType.APPLICATION_XML_VALUE,
			MediaType.APPLICATION_JSON_VALUE},produces = 
		{MediaType.APPLICATION_XML_VALUE,
				MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<UserRest> createUser(@RequestBody UserDetailsRequestModel 
			userDetails){
		UserRest returnValue = new UserRest();
		returnValue.setFirstName(userDetails.getFirstName());
		returnValue.setLastName(userDetails.getLastName());
		returnValue.setEmail(userDetails.getEmail());
		return new ResponseEntity<UserRest>(returnValue, HttpStatus.CREATED);
		
	
	}
	
	
	
	
	
	
	
	
}
