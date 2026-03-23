package thursday;

public class Test {
	//All Wrapper classes and string implements comparable interface (java.lang)
	public static void main(String[] args) {
		System.out.println("a".compareTo("A"));
		
		//Objl.compare(obj2)
		//-ive obj1 come before obj2
		//+ive obj1 come after obj2
		//0 obj1 and obj2 are equal
		
		TreeSet t= new TreeSet();
		t.add(10);
		t.add(0);
		t.add(15);
		
		System.out.println(t);
		
		/*
		 * [10]
		 * 0.compareTo(10) [0,10]
		 * 15.compareTo(0) [0,15,10]
		 */
	}

}
