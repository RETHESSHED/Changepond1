package com.example.common;

import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component("crk")
//@Lazy
//@Primary
//@Scope("prototype")

//@Component
public class CircketCoach implements Coach {
	
	public CircketCoach() {
		//System.out.println("In default of Cricket Coach");
		System.out.println("Circket Coach "+getClass().getSimpleName());
	}
	
	@Override
	public String getDailyWorkout() {
		return "Practise Bowling for 10mins..";
	}
	
	

}



/*
 * //Life Cycle of Spring Bean: Container Started : Tomcat started -
 * configuration is loaded(xml/java config/ annotation)
 * 
 * Bean Instantiated - spring creates the bean object - construcor is called
 * 
 * Dependecies Injected - @ Autowired
 * 
 * Init Method Called -> runs once
 * 
 * Bean ready to use
 * 
 * 
 * Container is shutDown
 * 
 * Destroy method is called -> run once
 * 
 * //prototype - destroy method not called automatically //use annotation:
 * //@postConstruct //PreDestroy
 */