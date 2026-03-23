package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage {
	WebDriver dr;
	private By uid = By.name("username");
	private By pwd = By.name("password");
	
	public LoginPage(WebDriver dr) {
		this.dr = dr;
	}
	
	public void enterUserName(String username) {
		dr.findElement(uid).sendKeys(username);
		
	}
	public void enterPassword(String password) {
		dr.findElement(pwd).sendKeys(password);
		
	}
	
	
//	public static void main(String[] args) {
//		
//	}

}
