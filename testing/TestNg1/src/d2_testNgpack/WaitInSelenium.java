package d2_testNgpack;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

public class WaitInSelenium {
  @Test
  public void f() throws InterruptedException {
	  WebDriver dr = new ChromeDriver();
	  dr.get("https://automationexercise.com/login");
	  Thread.sleep(5000);
	  dr.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
	  dr.findElement(By.name("email")).sendKeys("abcdd");
	  
  }
}

