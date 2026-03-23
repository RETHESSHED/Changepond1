package monday.p2.p3;

import monday.p1.A;
import static monday.p1.A.count;
import static monday.p1.A.getCount;
import static java.lang.System.out;

public class B extends A{ // extends monday.p1.A{

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		B b = new B();
		System.out.println(b.no);
		b.getNo();
		
		out.println("\nCount = "+getCount());
	}

}
