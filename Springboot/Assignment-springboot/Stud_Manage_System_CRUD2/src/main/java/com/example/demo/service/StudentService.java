package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Student;

@Service
public interface StudentService {

	public List<Student> findByAll();
	
	public Student findById(int theId);
	
	public Student save(Student theStudent);
	
	public void deleteById(int theId);
}
