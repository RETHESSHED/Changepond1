package com.app;

import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DemoRestController {
	
	@Value("${trainer.name}")
	private String trainerName;
	
	@Value("${trainer.course}")
	private String trainerCourse;
	
	//http:://localhost:8081/api/time
	@GetMapping("/time")
	public String getTime() {
		return LocalTime.now().toString();
	}
	
	@GetMapping("/info")
	public String getInfo() {
		return "Trainer Name : " + trainerName+ "Trainer Course : " +trainerCourse;
	}
	
	
	
	
	
}
