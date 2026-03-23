package d2_testNgpack;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

public class DataProvider {
  @Test(dataProvider = "dp")
  public void f(String un, String pwd) {
	  WebDriver d=  new ChromeDriver();
	  d.get("https://practice.expandtesting.com/login");
	  d.findElement(By.name("username")).sendKeys(un);
	  d.findElement(By.name("password")).sendKeys(pwd);
 
  }

  @org.testng.annotations.DataProvider
  public Object[][] dp() {
    return new Object[][] {
      new Object[] { "abcd", "12345" },
      new Object[] { "manager", "1234" },
    };
  }
}
