package com.example.demo.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Employee;
import com.example.demo.service.EmpService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/employee")
public class EmployeeRestController {
	
	@Autowired
	private EmpService employeeService;
	
	@GetMapping
	public List<Employee> getByAll(){
		return employeeService.findByAll();
	}
	
	@PostMapping
	public Employee save(@Valid @RequestBody Employee emp) {
		return employeeService.save(emp);
	}
	
    @GetMapping("/dept/{deptName}")
    public List<Employee> getByDept(@PathVariable String deptName) {
        return employeeService.getByDept(deptName);
    }

    @GetMapping("/salary/{sal}")
    public List<Employee> getHighSalary(@PathVariable Double sal) {
        return employeeService.getHighSalary(sal);
    }

    @PatchMapping("/salary/{id}/{amount}") 
    public String updateSalary(@PathVariable int id, @PathVariable Double amount) { 
        employeeService.updateSalary(id, amount);
        return "Salary updated";
    }

	@GetMapping("/{emptId}")
	public ResponseEntity<Employee> getById(@PathVariable int empId) {
		Employee p = employeeService.findById(empId);
		if(p==null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		else
			return new ResponseEntity<Employee>(p, HttpStatus.OK);
	}
	
	
	@DeleteMapping("/{id}")
	public String deleteEmployee(@PathVariable int id) {
	    employeeService.deleteByid(id);
	    return "Deleted employee id - " + id;
	}
    
}
