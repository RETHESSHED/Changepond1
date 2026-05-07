package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.EmpDAO;
import com.example.demo.entity.Employee;
import com.example.demo.exception.ResourceNotFoundException;

@Service
public class EmpServiceImpl implements EmpService{

	
	@Autowired
	private EmpDAO employeeDAO;
	
	@Override
	public List<Employee> findByAll() {
		// TODO Auto-generated method stub
		return employeeDAO.findAll();
	}


	@Override
	public Employee save(Employee emp) {
		// TODO Auto-generated method stub
		return employeeDAO.save(emp);
	}

	@Override
	public List<Employee> getByDept(String dept) {
		// TODO Auto-generated method stub
		return employeeDAO.findByDepartment(dept);
	}

	@Override
	public List<Employee> getHighSalary(double salry) {
		// TODO Auto-generated method stub
		return employeeDAO.findBySalaryGreaterThan(salry);
	}

	@Override
	public void updateSalary(int id, double salary) {
		// TODO Auto-generated method stub
		int e = employeeDAO.updateEmployeeSalary(id, salary);
		if(e==0) {
		throw new ResourceNotFoundException("Employee not found id - " + id);}
	}


	@Override
	public Employee findById(int theId) {
		// TODO Auto-generated method stub
		return employeeDAO.findById(theId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found - " + theId));
	}


	@Override
	public void deleteByid(int theId) {
		// TODO Auto-generated method stub
	    if (!employeeDAO.existsById(theId)) {
	        throw new ResourceNotFoundException("Cannot delete. Employee not found - " + theId);
	    }
	    employeeDAO.deleteById(theId);
	}

}
