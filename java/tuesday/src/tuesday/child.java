package tuesday;

public class child extends parent{
	
	//private int no =111;
	
	public child() {
		//super();
		System.out.println("The default constructor of child");
	}
	
	public child(int no) {
		//super();
		//super(100);
		System.out.println("The param constructor of child");
		this.no = no;
	}
	
	public static void main(String[] args) {
		//child c = new child();
		//System.out.println(c.no);
		//System.out.println("no = "+ c.getNo());
		child c = new child(10);
	}

}
