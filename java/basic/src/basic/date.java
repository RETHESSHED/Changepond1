package basic;

public class date {
	
	private int dd,mm,yy;
	
	public void initDate() {
		dd=mm=yy=1;
	}
	
	public void setDate(int d, int m, int y) // here D is a camel case
	{
		dd=d;
		mm=m;
		yy=y;
	}
	
	public void displayDate() {
		System.out.println("Date = ["+dd+"/"+mm+"/"+yy+"]");
	}
	
	public static void main(String[] args) {
		date d = new date();
		d.initDate();
		d.displayDate();
		d.setDate(20,01,2002);
		d.displayDate();
	}

}



