package thursday;

import java.util.LinkedList;
import java.util.ListIterator;

public class LinkedlistDemo1 {
	public static void main(String[] args) {
		LinkedList<String> l = new LinkedList<String>();
		
		l.add("Rojar");
		l.add("tiru");
		
		System.out.println(l);
		
		ListIterator<String> itr = l.listIterator();
		while(itr.hasNext()) {
			String s = itr.next();
			if(s.equals("Rojar")) {
//				itr.remove();
				itr.set("kausik");
			}
		}
		System.out.println(l);
	}

}
