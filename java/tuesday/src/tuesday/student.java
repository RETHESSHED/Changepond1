package tuesday;

public final class student extends object
{
	//final - it is constant or immutable, once initalize can't able to change
	final int rollNo;
	final String name;
	
	public student(int rollNo, String name) {
		this.rollNo = rollNo;
		this.name = name;
	}
	
	public int getRollNo() {
		return rollNo;
	}
	public String getName() {
		return name;
	}
}


