package monday.p1;

public class A {
	protected int no ;
	public static int count = 111;
	
	public A() {
		no = 10;
	}
	
	public static int getCount() {
		return count;
	}
	
	protected void getNo() {
		System.out.println("No = "+no);
	}

	

}
