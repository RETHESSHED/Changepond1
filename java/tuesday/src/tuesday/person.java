package tuesday;

public class person {
	private String firstName;
	private String lastName;
	private int age;
	
	public person() {
		
	}
	
	public person(String firstname, String lastName,int age ) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
	}
	
	public void display() {
		System.out.println("Fname ="+firstName+" Lname ="+lastName+" "+"Age = "+age);
	}

}
