package thursday;

import java.util.LinkedList;
import java.util.Scanner;

public class LinkedListCrudDemo {
	public static void main(String[] args) {
		LinkedList<String> list = new LinkedList<String>();
		Scanner s = new Scanner(System.in);
		int choice;
		
		
		do {
			System.out.println("CRUD Demo");
			System.out.println("1. Add element(create");
			System.out.println("2. view element(read");
			System.out.println("3. update element");
			System.out.println("4. delete element");
			System.out.println("5. exit");
			System.out.println("Enter your choice: ");
			choice = s.nextInt();
			
			//...
			
			switch(choice) {
			case 1:
				System.out.println("Enter element to add: ");
				String element = s.next();
				list.add(element);
				System.out.println("Element added successfully");
				break;
				
			case 2:
				System.out.println("List elements are as follows: ");
				for(int i=0;i<list.size(); i++) {
					System.out.println(i+ " "+list.get(i));
				}
				break;
				
			case 3:
				System.out.println("Enter index to update: ");
				int index = s.nextInt();
				if(index >=0 && index<list.size()) {
					System.out.println("Enter new value: ");
					String newValue = s.next();
					list.set(index, newValue);
					System.out.println("element updated");
				else {
					System.out.println("Invalid index");
				}
				break;
				}
			
			case 5:
				System.out.println("Exiting...");
				System.exit(0);
				break;
			
			default:
				System.out.println("You have enter wrong choice!!!");
				
			}
			  
		}while(choice!=5);
		s.close();
	}

}
