package wednesday;

public class student extends Object implements {
	
	private int rn;
	private String nm;
	
	public student() {}
	
	public student(int rn, String nm) {
		super();
		this.rn=rn;
		this.nm=nm;
	}
	
	@Override
	public String toString() {
		return "Student [rn=" +rn + ", nm= "+ nm + "]";
	}
	
	public static void main(String[] args) throws CloneNotSupportedException{
		student s1= new student(1, "Rahul");
		student s2 = (student) s1.clone();
		System.out.println(s2);
		
	}

}
