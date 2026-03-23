package sample;

public class Addition {
	
	public void add(int a, int b) {
		int sum = a+b;
		System.out.println("Sum = "+(a+b));
	}
	
	public float add(float a, int b) {
		return (a+b);
	}
	public int add(int b, int... a) {
		int sum = 0;
		int length  = a.length;
		System.out.println("Length = " + length);
		for(int i=0;i<length ; i++) {
			sum += a[i];
		}
		return sum;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Addition a = new Addition();
		float s = a.add(10.0f, 20);
		System.out.println(s);
		System.out.println("sum = "+a.add(1,2,3));
		System.out.println("Total = "+a.add(1,2,3,4,5,6,7));
		
	}
}