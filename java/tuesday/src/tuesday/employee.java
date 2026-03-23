package tuesday;

public class employee {
	
	private int empId;
	private String empName;
	
	public Employee() {
		
	}
	
	public employee(int empId, String empName) {
		super();
		this.empId = empId;
		this.empName = empName;
	}
	
	@Override
	public String toString() {
		return "Employee [empId = "+empId + ", empName = "+empName + "]";
		
	}
	@Override
	public boolean equals(Object o) {
		employee e = (employee)o;
		if((this.empId == e.empId) && (this.empName.equals(empName)))
			return true;
		else
			return false;
	}
	
	@Override
	public int hashCode() {
		// TODO auto-generated method atub
		return empId + 1;
	}
	
	public static void main(String[] args) {
		employee e1 = new employee(1,"rahul");
		employee e2 = new employee(1,"rahul");
		// here it comes not equal, because of address is different, here compare only address 
		// so it comes not equal check addreess of e1 == add of e2
		
		if(e1 == e2) {
			System.out.println("Equal");
		}
		else
			System.out.println("Not Equal");
		
		// here same action done above == or equals are same
		if(e1.equals(e2)) {
			System.out.println("objects are equal");
		}
		else {
			System.out.println("Objects are not equal");
	}
		System.out.println(e1.hashCode());
		System.out.println(e2.hashCode());
	}

}
