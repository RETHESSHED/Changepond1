package tuesday;

public interface arithcal {
	
	public static final int a=10;
	
	
	
	public int add(int a, int b);
	
	public abstract int sub(int a, int b);
	
	public default void print(String txt) {
		System.out.println(txt);
	}
	
	public static void print(String txt1, String txt2) {
		System.out.println(txt1+" "+txt2);
	}
	


}
