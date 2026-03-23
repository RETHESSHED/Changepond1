package sample;
import java.util.*;

public class Employee {
	
	private String empName; 
	
	public void setEmpName(String name) {

		if(name.length()>10) {
			empName = name.substring(0,10);
		}
		else empName = name;
	}
	public String getEmpName(){
		return empName;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner s = new Scanner(System.in);
		Employee e = new Employee();
		System.out.println("Enter name: ");
		String name = s.next();
		e.setEmpName(name);
		System.out.println("Name = " + e.getEmpName());
		s.close();

	}
}
