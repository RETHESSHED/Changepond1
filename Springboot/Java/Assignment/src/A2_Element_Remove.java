import java.util.ArrayList;
import java.util.List;

public class A2_Element_Remove {
	public static void main(String args[]) {
		List<Integer> list1 = new ArrayList<Integer>();
		for(int i=1;i<=10;i++) {
			if(i % 2 != 0) {
				list1.add(i);
			}
			
		}
		System.out.println(list1);
		
	}

}
