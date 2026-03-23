package d2_testNgpack;

import org.testng.annotations.Test;

public class TestNGGroup {
	@Test(groups = "smoke")
	  public void Login() {
		  System.out.println("Login Test case");
	  }
	  @Test(groups = "smoke")
	  public void Home() {
		  System.out.println("Home Test case");
	  }
	  @Test(groups = "sanity")
	  public void Reg() {
	  System.out.println("Reg Test case");
	  }
	 
	  @Test(groups = "sanity")
	  public void Profile() {
		  System.out.println("Profile Test case");
	  }
	  @Test(groups = "sanity")
	  public void AccoutSetting() {
		  System.out.println("Account setting test case");
	  }
	  @Test(groups="smoke")
	  public void Payment() {
		  System.out.println("Payment test case");
	  }
	  @Test(groups = "smoke")
	  public void Logout() {
		  System.out.println("Log-out test case");
	  }
}
