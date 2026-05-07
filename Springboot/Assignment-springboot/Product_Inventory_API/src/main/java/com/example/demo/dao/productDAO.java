package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.product;

@Repository
public interface productDAO extends JpaRepository<product, Integer> {

	List<product> findByName(String name);
	
	List<product> findByPriceGreaterThan(double price);
}
