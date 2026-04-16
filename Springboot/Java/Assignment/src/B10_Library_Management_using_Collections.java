import java.util.ArrayList;
import java.util.List;
import java.util.*;

public class B10_Library_Management_using_Collections {
	public static void main(String args[]) {
		List<B10_Library> list1 = new ArrayList<B10_Library>();
		list1.add(new B10_Library(1,"The well","Retu"));
		list1.add(new B10_Library(2,"The mong","Ajay"));
		list1.add(new B10_Library(3,"The monkey","Jaff \n"));
		
		Scanner a =new Scanner(System.in); 
		boolean sh = true;
		
		while(sh){
		System.out.println("Library Management :\n");
		System.out.println("1. Add new book");
		System.out.println("2. Display all books");
		System.out.println("3. Search book by title");
		System.out.println("4. Remove book by ID");
		System.out.println("5. Sort books by title ");
		System.out.println("6. close \n");
		
		System.out.println("\n Enter the option: ");
		int s = a.nextInt();
		switch(s) {
		case(1):
			System.out.println("\n Enter Id: ");
			int a1=a.nextInt();
			a.nextLine(); 
			System.out.println("\n Enter Title: ");
			String a2=a.nextLine();
			System.out.println("\n Enter Author: ");
			String a3=a.nextLine();
			list1.add(new B10_Library(a1,a2,a3));
			break;
		
		case(2):
			System.out.println("\nList of Books: ");
			list1.forEach(System.out::println);
			break;
		
		case(3):
			a.nextLine(); 
			System.out.println("\n Enter the title: ");
			String search = a.nextLine();
	        for (B10_Library b : list1) {
	            if (b.getTitle().equalsIgnoreCase(search)) {
	                System.out.println("\nFound: " + b);
	            }
	        }
	        break;
	     
		case(4):
			System.out.println("\n Enter the Id: ");
			int remove = a.nextInt();
			list1.removeIf(B10_Library -> B10_Library.getBookId() == remove);
			break;
		
		case(5):
			System.out.println("\n Sorted book by title: ");
			list1.sort(Comparator.comparing(e -> e.getTitle()));
			break;
		
		case(6):
			sh = false;
			break;
			
		}
		
		
		
		
		
		
		}
		
		
		
//		list1.forEach(System.out::println);
//		
//		String search = "The monkey";
//		
//        for (B10_Library b : list1) {
//            if (b.getTitle().equalsIgnoreCase(search)) {
//                System.out.println("\nFound: " + b);
//            }
//        }
//        
//        int Remove = 2;
//        list1.removeIf(B10_Library -> B10_Library.getBookId() == Remove);
//        
//        list1.forEach(System.out::println);
//        
//        //list1.sort((e1,e2) -> e1.getTitle().compareTo(e2.getTitle()));
//        list1.sort(Comparator.comparing(e -> e.getTitle()));
//        
//        list1.forEach(System.out::print);
	}
	


}
