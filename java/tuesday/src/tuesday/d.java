package tuesday;

public class d extends c{

	@Override
	public d m1() {
		return new d();
	}
	
	public void getMsg() {
		System.out.println("Hello");
	}
	
	public static void main(String[] args) {
		//c bow = new d();
		//bow.m1();
		new d().m1().getMsg();
	}
}
