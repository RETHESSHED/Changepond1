package tuesday;

public class allcalculations extends factorial implements comparecal,staticcak {

	@Override
	public int add(int a, int b) {
		// TODO Auto-generated method stub
		return (a+b);
	}

	@Override
	public int sub(int a, int b) {
		int c=0;
		if(a>b) {
			c=a+b;
		}
		else {
			c=b-a;
		}
		return c;
	}

	@Override
	public int avg(int a, int b) {
		// TODO Auto-generated method stub
		return (a+b)/2;
	}

	@Override
	public int min(int a, int b) {
		// TODO Auto-generated method stub
		return (a<b) ? a:b;
	}

	public static void main(String[] args) {
		allcalculations a = new allcalculations();
		System.out.println("Add ="+a.add(10,20));
		System.out.println("sub ="+a.sub(3,5));
		System.out.println("min ="+a.min(7,4));
		System.out.println("fact ="+a.fact(5));
		System.out.println("avg ="+a.avg(8,2));
		
		
		a.print("Hello");
		arithcal.print("Hello", "World");
	}
	
	

}
