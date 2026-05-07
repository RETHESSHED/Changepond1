package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.dao.productDAO;
import com.example.demo.entity.product;
import com.example.demo.exception.ResourceNotFoundException;

@Service
public class ProdServiceImpl implements ProductService{

	private productDAO productDAO;
	

	@Autowired
	public ProdServiceImpl(productDAO productDAO) {
		this.productDAO=productDAO;
	}
	
	@Override
	public List<product> findAll() {
		// TODO Auto-generated method stub
		return productDAO.findAll();
	}

	@Override
	public product findById(int theId) {
		// TODO Auto-generated method stub
		return productDAO.findById(theId)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found - " + theId));
	}

	@Override
	public product save(product theProduct) {
		// TODO Auto-generated method stub
		return productDAO.save(theProduct);
	}

	@Override
	public void deleteByid(int theId) {
		// TODO Auto-generated method stub
		if(!productDAO.existsById(theId)) {
		
			 throw new ResourceNotFoundException("Cannot delete. Product not found - " + theId);
		}
		productDAO.deleteById(theId);
		
	}

	@Override
	public List<product> findByName(String name) {
		// TODO Auto-generated method stub
		return productDAO.findByName(name);
	}

	@Override
	public List<product> findByPriceGreaterThan(double price) {
		// TODO Auto-generated method stub
		return productDAO.findByPriceGreaterThan(price);
	}
	
	

}
