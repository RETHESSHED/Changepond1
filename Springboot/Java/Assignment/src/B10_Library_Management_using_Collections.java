import java.util.ArrayList;
import java.util.List;
import java.util.*;

public class B10_Library_Management_using_Collections {
	public static void main(String args[]) {
		List<B10_Library> list1 = new ArrayList<B10_Library>();
		list1.add(new B10_Library(1,"The well","Retu"));
		list1.add(new B10_Library(2,"The mong","Ajay"));
		list1.add(new B10_Library(3,"The monkey","Jaff \n"));
		
		list1.forEach(System.out::println);
		
		String search = "The monkey";
		
        for (B10_Library b : list1) {
            if (b.getTitle().equalsIgnoreCase(search)) {
                System.out.println("\nFound: " + b);
            }
        }
        
        int Remove = 2;
        list1.removeIf(B10_Library -> B10_Library.getBookId() == Remove);
        
        list1.forEach(System.out::println);
        
        //list1.sort((e1,e2) -> e1.getTitle().compareTo(e2.getTitle()));
        list1.sort(Comparator.comparing(e -> e.getTitle()));
        
        list1.forEach(System.out::print);
	}
	


}
