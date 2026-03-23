package tuesday;

public class gomentry {
	
	public static void main(String[] args) {
		shape s1= new circle(5);
		shape s2= new rectangle(5,7);
		System.out.println("Area of circle ="+s1.area());
		System.out.println("Area of rectangle ="+s2.area());
	}

}
