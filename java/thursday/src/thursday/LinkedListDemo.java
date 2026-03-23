package thursday;

import java.util.*;
import java.io.Serializable;


public class LinkedListDemo {
	public static void main(String[] args) {
		List l = new LinkedList();
//		System.out.println(l instanceof RandomAccess);
//		System.out.println(l instanceof Serializable);
//		System.out.println(l instanceof Cloneable);
		
		l.add("Rahul");
		l.add(30);
		l.add("Nikita");
		l.add(30);
		
		Iterator<Integer> itr = l.iterator();
		while(itr.hasNext()){
			int i = itr.next();
			if((i%2)==0)
				System.out.println(i);
			else
				itr.remove();
		}
		System.out.println(l);
		
//		//System.out.println(l);
//		for (Object i:l) {
//			System.out.println(i);
//		}
//		
//		l.set(3, 40);
//		System.out.println(l);
//		
//		//l.addFirst();
//		//l.addLast();
//		//l.removeFirst();
//		//l.removeLast();
//		
//		
	}

}
