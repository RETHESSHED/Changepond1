package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Employee;

import jakarta.transaction.Transactional;



@Repository
public interface EmployeeDAO extends JpaRepository<Employee, Integer> {
	
	//List<Employee> findByFirstName(String name);
					//or
	//JPQL
	@Query("select e from Employee e where e.firstName = :name")
	List<Employee> findByFirstName(@Param("name") String name);
	
	
	
	//List<Employee> findByFirstNameAndEmail(String name,String email);
	//findByFirstNameIgnoreCase();
	
	//Update empATable 
	@Transactional
	@Modifying
	@Query("update Employee e set e.firstName =:fname where e.id = :id")
	public int updateFirstNameById(@Param("id") int id, @Param("fname") String fname);
	





}