package com.example.common;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
//@Lazy
public class SwinCoach implements Coach{
	
	public SwinCoach() {
		System.out.println("In default of swin coach");
	}
	
	
	@Override
	public String getDailyWorkout() {
		return "KickBoard Drills";
	}

}
