package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.example.demo", "com.example.common", "com.example.rest.copy"})
public class SbDemo2Application {

	public static void main(String[] args) {
		SpringApplication.run(SbDemo2Application.class, args);
	}

}
