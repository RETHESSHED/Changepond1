package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.common.TennisCoach;

@Configuration
public class DemoConfig {

	@Bean("TennisCoachBean")
	TennisCoach tennisCoach() {
		return new TennisCoach();
	}
	
}
