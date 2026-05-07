package com.example.demo.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.entity.Student;
import com.example.demo.service.StudentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class StudentRestController {
	
	
	private StudentService studentService;
	
	@Autowired
	public StudentRestController(StudentService studentService) {
		this.studentService=studentService;
	}
	
	@GetMapping("/student")
	public List<Student> getAll(){
		return studentService.findByAll();
	}
	
	
	@GetMapping("/student/{studentId}")
	public ResponseEntity<Student> getStudentid(@PathVariable int studentId) {
		 Student s = studentService.findById(studentId);
			if(s==null)
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			else
				return new ResponseEntity<Student>(s, HttpStatus.OK);
	}
	
	@PostMapping("/student")
	public Student saveStudent(@Valid @RequestBody Student theStudent) {
		return studentService.save(theStudent);
	}
	
	@PutMapping("/student")
	public Student updateStudent(@Valid @RequestBody Student theStudent) {
		return studentService.save(theStudent);
	}
	
	@DeleteMapping("/student/{studentId}")
	public String deleteStudent(@PathVariable int studentId) {
		studentService.deleteById(studentId);
		return "Deleted student Id: "+ studentId;
	}
	
	

}
