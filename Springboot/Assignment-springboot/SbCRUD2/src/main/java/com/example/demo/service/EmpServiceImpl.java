package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.EmployeeDAO;
import com.example.demo.entity.Employee;

@Service

public class EmpServiceImpl implements EmployeeService{

	@Autowired
	private EmployeeDAO employeeDAO;
	private Object String;
	
	//http://localhost:8080/api/employees
	@Override
	public List<Employee> findAll() {
		// TODO Auto-generated method stub
		return employeeDAO.findAll();
	}

	@Override
	public Employee findById(int theId) {
		// TODO Auto-generated method stub
		Employee e;
		try {
			e= employeeDAO.findById(theId).get();
		}catch (Exception e1) {
			return null;
		}
		
		return e;
	}

	@Override
	public void save(Employee theEmployee) {
		// TODO Auto-generated method stub
		employeeDAO.save(theEmployee);
	}

	@Override
	public void deleteById(int theId) {
		// TODO Auto-generated method stub
		employeeDAO.deleteById(theId);
		
	}

	@Override
	public long getEmployeeCount() {
		// TODO Auto-generated method stub
		return employeeDAO.count();
	}

	@Override
	public List<Employee> findByFirstName(String name) {
		// TODO Auto-generated method stub
		return employeeDAO.findByFirstName(name);
	}

	@Override
	public String updateFirstNameById(int id, String fname) {
		// TODO Auto-generated method stub
		int i = employeeDAO.updateFirstNameById(id, fname);
		if(i>0)
			return "Employee Updated!!";
		else
			return "Employee Not Found";
		
	}


//	@Override
//	public List<Employee> findByFirstNameAndEmail(String name, String email) {
//		// TODO Auto-generated method stub
//		return employeeDAO.findByFirstNameAndEmail(name, email);
//	}



}
