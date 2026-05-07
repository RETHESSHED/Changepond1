package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Employee;


@Service
public interface EmpService {

	public List<Employee> findByAll();
	public Employee findById(int theId);
	public Employee save(Employee emp);
	public void deleteByid(int theId);
	public List<Employee> getByDept(String dept);
	public List<Employee> getHighSalary(double salry);
	public void updateSalary(int id, double salary);
	
}
