package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "products")
public class product {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@NotNull(message = "product name cannot be null")
	private String name;
	
	@NotNull(message = "price cannot be null")
	@Min(value = 0, message = "price must be greater than or equal to 0")
	private double price;
	
	@NotNull(message = "Quantity cannot be null")
	@Min(value=0, message = "quantity must be greater than 0")
	private Integer quantity;
	
	public product() {}
	
	public product(String name, double price, int quantity) {
		this.name=name;
		this.price=price;
		this.quantity=quantity;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	@Override
	public String toString() {
		return "product [id=" + id + ", name=" + name + ", price=" + price + ", quantity=" + quantity + "]";
	}
	
	

}
