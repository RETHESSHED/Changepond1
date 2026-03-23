package monday;

public class Person {
	int age=18;
	String name;
	
	Person(int age, String name){
		this.age = age;
		this.name = name;
	}
	Person(String name){
		this.name = name;
	}
	
	void getDetails(){
		System.out.println("Person details.. name = "+ this.name+" age = "+age);
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Person p = new Person(35, "TOM");
		Person pp = new Person("Jerry");
		p.getDetails();
		pp.getDetails();
	}

}
