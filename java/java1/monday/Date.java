package monday;

public class Date {
	
	public static void swapDates(Date d1, Date d2) {
		System.out.println("In Swap dates --->");
		Date temp;
		temp = d1;
		d1 = d2; 
		d2 = temp;
	}
	public static void swapDates(Date[] d) {
		Date  temp;
		temp = d[0];
		d[0] = d[1];
		d[1] = temp;
		
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Date d1 = new Date(2,3,2026);
		Date d2 = new Date(3,4, 2027);
		
		Date d[] = new Date[2];
		d[0] = d[1];
		d[1] = d[2];
		System.out.println("d1 = "+ d0);
		System.out.println("d2 = "+d1);
		
		
		System.out.println("Before swapping...");
		System.out.println("d1 = "+ d1);
		System.out.println("d2 = "+d2);
		Date.swapDates(d1, d2);
		System.out.println("d1 = "+ d1);
		System.out.println("d2 = "+d2);
	}

}
