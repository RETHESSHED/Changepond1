package com.example.demo.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class DemoSecurityConfig {

	@Bean
	UserDetailsManager userDetailsManager(DataSource dataSource)
	{
		return new JdbcUserDetailsManager(dataSource);
	
//	@Bean
//	InMemoryUserDetailsManager userDetailsManager() {
//		UserDetails user1 = User.builder()
//				.username("rethu")
//				.password("{noop}123")
//				.roles("Employee")
//				.build();
//		
//		UserDetails user2 = User.builder()
//				.username("rethessh")
//				.password("{noop}123")
//				.roles("Employee","Manager")
//				.build();
//		
//		UserDetails user3 = User.builder()
//				.username("jaff")
//				.password("{noop}123")
//				.roles("Employee","Manager","Admin")
//				.build();
//		
//		return new InMemoryUserDetailsManager(user1,user2,user3);
	}
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		http.authorizeHttpRequests(c -> 
		c
		.requestMatchers("/").hasRole("Employee")
		.requestMatchers("/info/**").hasRole("Manager")
		.requestMatchers("/sys/**").hasRole("Admin")
		.anyRequest().authenticated())	
		
		.formLogin(form -> form.loginPage("/showMyLoginPage")
				.loginProcessingUrl("/authenticateTheUser")
				.permitAll()
				)
		.logout(logout -> logout.permitAll())
		.exceptionHandling(e -> e.accessDeniedPage("/access-denied"));
		
		return http.build();
		
	}
	
}

//SecurityFilterChain
//Request Flow:
//	Client Request
//	
//	Security Filter Chain
//	
//	Authenticatoin
//	
//	Authoriation
