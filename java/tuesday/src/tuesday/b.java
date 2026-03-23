package tuesday;

public class b extends a {
	@Override
	public void m1() {
		System.out.println("In m1 of B");
	}
	public void m2() {
		System.out.println("in m2 of B");
	}
	
	public static void main(String[] args) {
		//b bow = new b();
		//b.m1();
		//b.m2();
		//polymorphic reference - Dynamic data type
		//Superclass ref = childclassObject;		
		a bow = new b();
		//b bow = new a(); - not allowed
		bow.m1();
		((b)bow).m2(); // downcasting the reference form super to sub - CTE
		// if u want to call subclass specific method(polyMorp ref)
		// u need to downcast the reference from super to sub
		
	}

}
