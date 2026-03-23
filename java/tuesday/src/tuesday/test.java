package tuesday;

public class test {
	public static void main(String args[]) {
		
		student s1 = new student(1,"Rahul");
		System.out.println(s1.getName());
		System.out.println(s1.getRollNo());
		
		//s1.rollNo = 111; we used final in student class so we can't able to update the rollNo
		
		student s2 = s1;
		
		s1 = new student(2,"priyanka");
	}
}
