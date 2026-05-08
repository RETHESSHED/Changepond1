package com.example.demo.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "UserServiceApp")
public interface UserClient {

	@GetMapping("/user")
	String getUser();
}
