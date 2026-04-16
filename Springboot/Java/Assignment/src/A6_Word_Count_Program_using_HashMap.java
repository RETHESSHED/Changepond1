import java.util.HashMap;
import java.util.Map;

public class A6_Word_Count_Program_using_HashMap {
	public static void main(String args[]) {
		String s= "java is easy and java is powerful";
		
		String[] s1 = s.split(" ");
		
		Map<String, Integer> map1 = new HashMap<>();
		
		for(String word: s1) {
			map1.put(word, map1.getOrDefault(word, 0)+1);
		}
		System.out.println("The count of words in sentence are : "+map1);
	}

}
