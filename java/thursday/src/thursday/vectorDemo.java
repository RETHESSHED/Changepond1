package thursday;

import java.util.Vector;

public class vectorDemo {
	public static void main(String[] args) {
		Vector<Integer> v = new Vector<Integer>();
		System.out.println(v.capacity());
		
		for(int i=1;i<=10;i++) {
			v.addElement(i);
		}
		
		System.out.println(v);
		
		
		v.addElement(20);
		
		//newCapacity = currentCapacity*2;
		
		System.out.println(v.capacity());//20
		System.out.println(v);
	}

}
