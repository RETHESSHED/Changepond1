package thursday;
import java.util.Stack;

public class stackdemo {
	public static void main(String[] args) {
		Stack<String> s = new Stack<String>();
		System.out.println(s.empty());//true

		s.push("a");
		s.push("b");
		s.push("d");
		s.push("e");
		
		System.out.println(s);
		System.out.println(s.peek());
		System.out.println(s.pop());
		System.out.println(s);
		System.out.println(s.search("a"));
		System.out.println(s.search("c"));
		System.out.println(s.search("d"));
	}

}
