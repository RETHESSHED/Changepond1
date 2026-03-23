package d2_testNgpack;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class multiple {
	WebDriver dr;
	  @Test
	  @Parameters({"username","password"})
	  public void login(String username,String password) throws InterruptedException {
		  Thread.sleep(5000);
		  dr.findElement(By.name("username")).sendKeys(username);
		  dr.findElement(By.name("password")).sendKeys(password);
	  }
	  @BeforeTest
	  public void beforeTest() {
	  dr= new ChromeDriver();
	  dr.get("https://practice.expandtesting.com/login");
	  }
	  
	 
	  @AfterTest
	  public void afterTest() {
		  dr.close();
	  }

}