package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.StudentDAO;
import com.example.demo.entity.Student;
import com.example.demo.exception.StudentNotFoundException;

@Service
public class StudServiceImpl implements StudentService{

	
	@Autowired
	private StudentDAO studentDAO;
	
	public StudServiceImpl(StudentDAO studentDAO) {
		this.studentDAO=studentDAO;
	}
	
	@Override
	public List<Student> findByAll() {
		// TODO Auto-generated method stub
		return studentDAO.findAll();
	}

//	@Override
//	public Student findById(int theId) {
//		// TODO Auto-generated method stub
//		//studentDAO.findById(theId);
//		Student s= studentDAO.findById(theId).get();
////				.orElseThrow(() -> new );
//		return s;
//	}
	
    @Override
    public Student findById(int theId) {
        return studentDAO.findById(theId)
                .orElseThrow(() -> new StudentNotFoundException("Student ID not found: " + theId));
    }

	@Override
	public Student save(Student theStudent) {
		// TODO Auto-generated method stub
		return studentDAO.save(theStudent);
	}

	@Override
	public void deleteById(int theId) {
		// TODO Auto-generated method stub
		//studentDAO.deleteById(theId);
		
        if (!studentDAO.existsById(theId)) {
            throw new StudentNotFoundException("Cannot delete. Student ID not found: " + theId);
        }
        studentDAO.deleteById(theId);
    }
	}
	
	


