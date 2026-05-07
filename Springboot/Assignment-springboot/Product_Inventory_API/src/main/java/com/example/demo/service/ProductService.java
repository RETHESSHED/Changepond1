package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.product;

@Service
public interface ProductService {

	public List<product> findAll();
	
	public product findById(int theId);
	
	public product save(product theProduct);
	
	public void deleteByid(int theId);
	
	public List<product> findByName(String name);
	
	public List<product> findByPriceGreaterThan(double price);
}
