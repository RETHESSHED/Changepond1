package tuesday;

public class GcDemo {
	
	@Override
	protected void finalize() throws Throwable {
		super.finalize();
		System.out.println("Object Garbage Collected");
	}
	
	public static void main(String[] args) {
		GcDemo g1 = new GcDemo();
		GcDemo g2 = new GcDemo();
		GcDemo g3 = new GcDemo();
		
		
		g1=null;
//		g2=null;
		g3=null;
		
		System.gc();
	}

}
