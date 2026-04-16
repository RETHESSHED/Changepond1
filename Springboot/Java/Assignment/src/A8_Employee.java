
public class A8_Employee implements Comparable<A8_Employee> {
	int id;
    String name;
    double salary;

    public A8_Employee(int id, String name, double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    @Override
    public int compareTo(A8_Employee o) {
    	return Double.compare(this.salary, o.salary);
    }
    
    @Override
    public String toString() {
    	return "ID: " +id + ", Name: "+name+", salary: "+salary;
    }
    
    
}
