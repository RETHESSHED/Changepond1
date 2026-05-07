package com.app.SBDemo;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserRestController {
	
	@GetMapping("/getUser")
	public String getUser() {
		return "Get User was Called";
	}
	@PutMapping()
	public String PutUser() {
		return "Put User was Called";
	}
	@PostMapping()
	public String PostUser() {
		return "Post User was Called";
	}
	@DeleteMapping()
	public String DeleteUser() {
		return "Delete User was Called";
	}
	
	
	

}
