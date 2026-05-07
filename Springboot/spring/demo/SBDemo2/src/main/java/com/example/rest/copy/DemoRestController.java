package com.example.rest.copy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.common.Coach;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

@RestController
@RequestMapping("/api")
public class DemoRestController {
	//@Autowired
//	@Qualifier("CircketCoach")
	Coach thecoach;
//	
//	public DemoRestController() {
//		System.out.println("In default RestConst");
//	}
//	
	@Autowired
	public DemoRestController(/* @Qualifier("SwinCoach") */   @Qualifier("TennisCoachBean") Coach thecoach) {
		super();
		System.out.println("In Parameterized RestConst");
		this.thecoach = thecoach;
	}

//	public Coach getThecoach() {
//		return thecoach;
//	}

//	//@Autowired
//	public void setThecoach( @Qualifier("TennisCoach")  Coach thecoach) {
//		System.out.println("In Setter");
//		this.thecoach = thecoach;
//	}
	
	//http://localhost:8080/api/workout
	@GetMapping("/workout")
	public String dailyworkout() {
		return thecoach.getDailyWorkout();
	}

	@PostConstruct
	public void initCalled()
	{
		System.out.println("In init method");
	}
	
	@PreDestroy
	public void destroyCalled() {
		System.out.println("In Destroy method");
	}
	
	
	
}



