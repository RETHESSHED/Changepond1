package monday;

public class Student {
//	private  int rollNo;
	private static int rollNo=0;
	private String name;
	private static int count = 0, id = 0;
	public Student() {
		
	}
	public Student(String name) {
//		this.rollNo = rollNo;
		this.rollNo++;
		this.name = name;
//		count++;
	}
	
	
	public static void getStudentCount() {
		System.out.println(count);
	}
	public String toString() {
		return "Student [rollNo = " + rollNo+ ", name = "+name+" ]";
	}
	
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Student s1 = new Student("Rahul");
		
		System.out.println(s1.toString());
		
		Student s2 = new Student( "ram");
		System.out.println(s2.toString());
		
		Student s3 = new Student( "Sam");

		Student s4 = new Student("Ram");
		
//		Student.getStudentCount();
//		
//		System.out.println(s1.toString());
//		System.out.println(s3.toString());
//
//		System.out.println(s4.toString());
//		

	}
	static {
		System.out.println("hiii id="+id);
	}

}
