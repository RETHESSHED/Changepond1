package monday;
import java.util.*;
public class Employee {
	private int empId;
	private String empName;
	private float empSalary;
	
	public Employee() {
		System.out.println("Default constructor invoked");
		empId = 111;
		empName = "Rahul";
		empSalary = 3243.90f;		
	}
	public Employee(int id, String name, float sal) {
		System.out.println("Parameterized const invoked");
		empId = id;
		empName = name;
		empSalary = sal;
	}
	
	public static void main(String[] args) {
		Employee e = new Employee();
		Scanner s = new Scanner(System.in);
		System.out.println("Enter employe ID:  ");
		int id = s.nextInt();
		System.out.println("Enter employee name: ");
		String name = s.next();
		System.out.println("Enter employee salary");
		float sal = s.nextFloat();
		
		Employee ee = new Employee(id, name, sal);
		System.out.println(ee);		
		
	}
	
	public String toString() {
		return "Employee = [id="+empId+" name = " +empName+" salary = " + empSalary+" ]";
	}

}
