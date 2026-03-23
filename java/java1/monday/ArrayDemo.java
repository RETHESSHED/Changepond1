package monday;
import java.util.*;
public class ArrayDemo {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
//		int a[] = {1,2,3,4,5,6};
		Scanner s = new Scanner(System.in);
		System.out.println("Enter the size of the array");
		int size = s.nextInt();
		int a[] = new int[size];
		
		System.out.println("Enter the "+size+ " array elements");
		for(int i=0;i<size;i++) {
			a[i] = s.nextInt();
		}
		
		for(int i=0;i<a.length;i++) {
			System.out.println(a[i]);
		}
		
		
		
//		for(dataType varname: arr/collection) {
//			stmts;
//		}
		// for each loop...
		for(int i : a) {
			System.out.println(i);
		}

	}

}
