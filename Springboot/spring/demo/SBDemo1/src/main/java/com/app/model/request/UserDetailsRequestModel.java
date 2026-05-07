package com.app.model.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public class UserDetailsRequestModel {
	
	@NotNull(message = "First name cannot be null")
	private String firstName;
	@NotNull(message = "Last name cannot be null")
	private String lastName;
	@NotNull(message = "Email cannot be null")
	@Email
	private String email;
	
	private String password;
	
	public UserDetailsRequestModel() {
		
	}

	public UserDetailsRequestModel(String firstName, String lastName, String email, String password) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	

}
