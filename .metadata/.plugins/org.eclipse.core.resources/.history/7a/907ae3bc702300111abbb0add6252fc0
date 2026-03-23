package demo.selenium;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.WindowType;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
public class DragandDrop {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		WebDriver dr = new ChromeDriver();
		dr.get("https://artoftesting.com/samplesiteforselenium");
		WebElement drop = dr.findElement(By.id("myImage"));
		WebElement drop1 = dr.findElement(By.id("targetDiv"));
		Actions act = new Actions(dr);
		act.dragAndDrop(drop, drop1).build().perform();
		


	}

}
