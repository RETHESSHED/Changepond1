import java.util.HashSet;
import java.util.Set;

public class A4_Common_Elements_Between_Two_Sets {
	public static void main(String args[]) {
		Set<Integer> set1 = new HashSet<>();
		set1.add(2);
		set1.add(5);
		set1.add(8);
		set1.add(9);
		set1.add(0);
		
		Set<Integer> set2 = new HashSet<>();
		set2.add(5);
		set2.add(44);
		set2.add(3);
		set2.add(7);
		set2.add(0);
		set2.add(1);
		
		Set<Integer> common = new HashSet<>();
		Set<Integer> unique = new HashSet<>();
		for(Integer num:set1) {
			if(set2.contains(num)) {
				common.add(num);
			}
			else {
				unique.add(num);
			}
		}
		System.out.println("Common element are: "+common);
		System.out.println("Unique element are: "+unique);
		}

}
