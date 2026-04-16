import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class A7_Sort_List_of_Numbers {
	public static void main(String args[]) {
		List<Integer> list1 = new ArrayList<Integer>();
		for(int i=10;i>0;i--) {
			list1.add(i);
		}
		Collections.sort(list1);
		System.out.println("Sorted element : "+list1);
		
		list1.sort(Comparator.reverseOrder());
		System.out.println("Sorted element in descending order by comparator : "+list1);
	}

}
