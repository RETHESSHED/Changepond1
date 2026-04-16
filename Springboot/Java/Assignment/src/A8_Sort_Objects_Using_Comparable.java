import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class A8_Sort_Objects_Using_Comparable {
	public static void main(String args[]) {
        List<A8_Employee> emp = new ArrayList<>();
        
        emp.add(new A8_Employee(101, "Rethu", 50000));
        emp.add(new A8_Employee(102, "Amit", 75000));
        emp.add(new A8_Employee(103, "Vijay", 60000));

        System.out.println("Before Sorting:");
        //System.out.println(employees);
        emp.forEach(System.out::println);
        
        System.out.println();
        
        Collections.sort(emp);
        System.out.println("After Sorting:");
        emp.forEach(System.out::println);
        
        
       

       
			
	}

}
