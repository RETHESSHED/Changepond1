
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class A1_Array {
	public static void main(String args[]) {
		 List<String> list1 = new ArrayList<>();
		 list1.add("Rethu");
		 list1.add("praveen");
		 list1.add("nirmal");
		 list1.add("jaff");
		 list1.add("kaushik");
		Scanner a = new Scanner(System.in);
		System.out.println("Enter a number to add a list");
		int n = a.nextInt();
		a.nextLine();
		for(int i=0;i<n;i++) {
			System.out.println("Add a "+(i+1)+" list :");
			String input = a.nextLine();
			list1.add(input);
		}
		System.out.println(list1);
		System.out.println("Total number of Student : "+list1.size());
	
	}
}
