package demo.selenium;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;


public class Openbrowser {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		WebDriver dr = new ChromeDriver();
		dr.get("https://www.google.com");
		dr.manage().window().maximize();
//		dr.close();
		dr.quit();
		
		

	}

}
