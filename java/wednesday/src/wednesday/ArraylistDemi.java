package wednesday;

import java.util.List;
import java.util.ArrayList;


public class ArraylistDemi {
	public static void main(String args[]) {
		//non - generic version
		//ArrayList l = new ArrayList();
		
		//generic version
		List<Integer> l = new ArrayList<Integer>();
		
		l.add(10);
//		l.add("A");
//		l.add(1.2f);
		l.add(2);
		l.add(null);
		
		System.out.println(l);
		
		l.remove(1);
		
		System.out.println(l);
		
		l.add(1,20);
		System.out.println(l);
		
		//System.out.println(l instanceof Serializable);
		System.out.println(l instanceof Cloneable);
		System.out.println(l instanceof RandomAccess);
	}

}
