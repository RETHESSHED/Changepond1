package demo.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;


public class DropDownList {
	public static void main(String[] args) {
		WebDriver dr = new ChromeDriver();
		dr.get("https://artoftesting.com/samplesiteforselenium");
		WebElement dropdown = dr.findElement(By.id("testingDropdown"));
		Select s = new Select(dropdown);
		s.selectByVisibleText("Database Testing");
		
		
		
	}

}
