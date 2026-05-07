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
public interface EmpDAO extends JpaRepository<Employee, Integer>{
	
	@Query("select e from Employee e where e.dept  = :dept")
	List<Employee> findByDepartment(@Param("dept") String department);
	
	@Query("select e from Employee e where e.salary > :sal")
	List<Employee> findBySalaryGreaterThan(@Param("sal") Double salary);
	
	@Transactional
	@Modifying
	@Query("UPDATE Employee e SET e.salary = :newsal where e.id = :empId")
	int updateEmployeeSalary(@Param("empId") int id, @Param("newsal") double newsal);
	

}
