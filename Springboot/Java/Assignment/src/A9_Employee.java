
public class A9_Employee {

	int id;
    String name;
    double salary;

    public A9_Employee(int id, String name, double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }
    
    @Override
    public String toString() {
    	return "ID: " +id + ", Name: "+name+", salary: "+salary;
    }
    
	
}
