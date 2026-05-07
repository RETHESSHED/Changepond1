package com.example.demo.entity;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "employees")
public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@NotNull(message = "Firstname is required")
	private String firstName;
	
	@NotNull(message = "lastName is required")
	private String lastName;
	
	@NotNull(message = "Department is required")
	@Column(name = "department") 
	private String dept;
	
	@NotNull(message = "salary is required")
	private double salary;
	
	public Employee() {}
	
	public Employee(String firstName,String lirstName, String dept, double salary) {
		this.firstName=firstName;
		this.lastName=lastName;
		this.dept=dept;
		this.salary=salary;
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

	public String getDepartment() {
		return dept;
	}

	public void setDepartment(String dept) {
		this.dept = dept;
	}

	public double getSalary() {
		return salary;
	}

	public void setSalary(double salary) {
		this.salary = salary;
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", Department="
				+ dept + ", salary=" + salary + "]";
	}
	
	

}
