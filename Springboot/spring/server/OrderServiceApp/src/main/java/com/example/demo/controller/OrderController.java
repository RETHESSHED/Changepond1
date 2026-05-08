package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.client.UserClient;

@RestController
public class OrderController {

	@Autowired
	private UserClient userclient;
	
	@GetMapping("/order")
	public String getOrder() {
		return "Order Service -> " +userclient.getUser();
	}
	
	
}
