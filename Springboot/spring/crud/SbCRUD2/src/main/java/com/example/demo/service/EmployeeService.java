package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Employee;

@Service

public interface EmployeeService {
	
	public List<Employee> findAll();
	
	public Employee findById(int theId);
	
	public void save(Employee theEmployee);
	
	public void deleteById(int theId);
	
	public long getEmployeeCount();
	
	List<Employee> findByFirstName(String name);
	
	//List<Employee> findByFirstNameAndEmail(String name, String email);
	
	public String updateFirstNameById(int id, String fname);

}