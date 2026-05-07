package com.example.common;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

//@Component
//@Lazy
public class TennisCoach implements Coach{

	public TennisCoach() {
		//System.out.println("In default constructor of tennis coach");
		System.out.println("Circket Coach "+getClass().getSimpleName());
		
	}
	
	@Override
	public String getDailyWorkout() {
		return "Run 5K";
	}
	
}
