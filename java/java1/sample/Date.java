package sample;

public class Date {
	private int dd,mm,yy;
	public void initDate() {
		dd=mm=yy=1;
	}
	public void setDate(int d, int m, int y) {
		dd = d;
		mm = m;
		yy = y;
	}
	public void displayDate() {
		System.out.println("Date = ["+dd+"/"+mm+"/"+yy+"]");
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Date d = new Date();
		d.initDate();
		d.displayDate();
		d.setDate(27,2,2026);
		d.displayDate();

	}

}
