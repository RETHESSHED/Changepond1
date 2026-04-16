import java.util.HashMap;
import java.util.Map;

public class A5_Student_Marks_using_HashMap {
	public static void main(String args[]) {
		Map<String, Integer> map1 = new HashMap<>();
		map1.put("Rethu",80);
		map1.put("Ret",65);
		map1.put("Re",90);
		map1.put("R",43);
		map1.put("Reth",76);
		
		System.out.println("The student names : "+map1 );
		
		System.out.print("The student above 75 are: ");
		
		for(Map.Entry<String, Integer> m1: map1.entrySet()) {
			if(m1.getValue()>75) {
				System.out.print( m1.getKey()+":"+m1.getValue()+", ");
				
			}
		}
		
	}

}
