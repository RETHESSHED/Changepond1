package sample;

import java.util.Scanner;

public class MyDate {
	private int dd , mm , yy;
	public void setDd(int d) {
		dd = d;
	}
	public int getDd(){
		return dd;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner s = new Scanner(System.in);
		MyDate d = new MyDate();
		System.out.println("Enter the day = ");
		int day = s.nextInt();
		d.setDd(day);
		System.out.println("Day = "+d.getDd());
		int dd = d.getDd();
		System.out.println("Day = "+dd);

	}

}
