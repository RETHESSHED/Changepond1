import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class A3_Set {
	public static void main(String args[]) {
		List<String> list1 = new ArrayList<String>();
		list1.add("Erode");
		list1.add("Coimbatore");
		list1.add("Coimbatore");
		list1.add("Salem");
		list1.add("Erode");
		list1.add("Chennai");
		
		Set<String> set1 = new HashSet<String>(list1);
		
		System.out.println("Unique city name: "+set1);
	}

}
