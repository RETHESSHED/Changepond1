package tuesday;

public class parent {
	 int no;
	
	public parent() {
		System.out.println("In default constuctor of parent");
		no = 100;
	}
	public parent(int no) {
		System.out.println("In Param constructor of parent");
		this.no = no;
	}
	
	public int getNo() {
		return no;
	}
	
}
