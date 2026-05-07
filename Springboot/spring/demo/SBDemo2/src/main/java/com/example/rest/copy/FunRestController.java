package com.example.rest.copy;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.common.Coach;

@RestController
@RequestMapping("/fun")
public class FunRestController {

	Coach theCoach;
	Coach alphaCoach;
	
	public FunRestController(@Qualifier("crk") Coach theCoach, 
            @Qualifier("crk") Coach alphaCoach) {
			this.theCoach = theCoach;
				this.alphaCoach = alphaCoach;
	}

	
	@GetMapping("/check")
	public String comparingBeans() {
		return "Comparing Beans: theCoach == theAlpha : "+(theCoach == alphaCoach);
	}
}
