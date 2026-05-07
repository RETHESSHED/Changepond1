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

import com.example.demo.entity.product;
import com.example.demo.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/product")
public class ProductRestController {

	private ProductService productService;
	
	@Autowired
	public ProductRestController(ProductService productService) {
		this.productService=productService;
	}
	
	
	@GetMapping
	public List<product> getProduct(){
		return productService.findAll();
	}
	
	@GetMapping("/{productId}")
	public ResponseEntity<product> getById(@PathVariable int productId) {
		product p = productService.findById(productId);
		if(p==null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		else
			return new ResponseEntity<product>(p, HttpStatus.OK);
	}
	
	@PostMapping
	public product save(@Valid @RequestBody product product) {
		return productService.save(product);
	}
	
	@PutMapping("/{productId}")
	public product update(@PathVariable int productId, @Valid @RequestBody product product) {
		product.setId(productId);
		return productService.save(product);
	}
	
	@DeleteMapping("/{productId}")
	public String deleteById(@PathVariable int productId) {
		productService.deleteByid(productId);
		return "deleted " +productId;
	}
	
	@GetMapping("/name/{name}")
	public List<product> getByName(@PathVariable String name){
		return productService.findByName(name);
	}
	
	@GetMapping("/price/{price}")
	public List<product> getByPrice(@PathVariable double price){
		return productService.findByPriceGreaterThan(price);
	}
}
