import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class A9_Sort_Objects_Using_Comparator {
	public static void main(String args[]) {
        List<A9_Employee> emp = new ArrayList<>();
        
        emp.add(new A9_Employee(101, "Rethu1", 50000));
        emp.add(new A9_Employee(102, "Amit", 45000));
        emp.add(new A9_Employee(103, "Vijay", 60000));

        System.out.println("Sorting by name:");
        emp.sort((e1,e2) -> e1.name.compareTo(e2.name));
        //emp.sort(Comparator.comparing(e -> e.name));
        emp.forEach(System.out::println);
        
        System.out.println();
        
        System.out.println("Sorting by salary:");
        emp.sort((e1,e2) -> Double.compare(e2.salary,e1.salary));
        //emp.sort(Comparator.comparingDouble((A9_Employee e) -> e.salary).reversed());
        emp.forEach(System.out::println);
}
}