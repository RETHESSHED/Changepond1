package d2_testNgpack;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

public class PrintDropDownMenu {
  @Test
  public void f() {
	  WebDriver dr = new ChromeDriver();
	  dr.get("https://practice.expandtesting.com/dropdown");
	  WebElement country = dr.findElement(By.id("country"));
	  System.out.println(country.getText());
	  
  }
}
