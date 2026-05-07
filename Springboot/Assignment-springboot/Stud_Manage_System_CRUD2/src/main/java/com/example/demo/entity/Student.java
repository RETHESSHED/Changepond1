package com.example.demo.entity;


//import jakarta.validation.constraints.NotNull;
//import jakarta.validation.constraints.Email;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;


@Entity
@Table(name = "students")
public class Student {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@NotNull(message = "First name cannot be null")
	private String firstName;
	
	@NotNull(message = "Last name cannot be null")
	private String lastName;
	
	@NotNull(message = "Email cannot be null")
	@Email
	private String email;
	
	@NotNull(message = "Course cannot be null")
	private String course;

	public Student() {}
	
	
	public Student(String firstName, String LastName, String email, String course)
	{
		
		this.firstName=firstName;
		this.lastName=lastName;
		this.email=email;
		this.course=course;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
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


	public String getCourse() {
		return course;
	}


	public void setCourse(String course) {
		this.course = course;
	}


	@Override
	public String toString() {
		return "Student [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", course=" + course + "]";
	}
	
	
}
