package demo.selenium;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;



public class AlertDemo {

	public static void main(String[] args) throws InterruptedException {
		// TODO Auto-generated method stub
		
		WebDriver dr = new ChromeDriver();
		dr.get("https://artoftesting.com/samplesiteforselenium");
		WebElement button=dr.findElement(By.xpath("//button[@onclick='generateAlertBox()']"));
		button.click();
		Alert al = dr.switchTo().alert();
		Thread.sleep(4000);
		al.accept();
//		WebElement link = dr.findElement(By.linkText("This is a link"));
//		link.click();
		WebElement link = dr.findElement(By.partialLinkText("This is a link"));
		link.click();
		
		
		
		

	}

}
