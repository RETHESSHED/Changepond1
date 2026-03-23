package tuesday;

public class factorial {
	
	public int fact(int n) {
		int fact =1;
		for(int i=1; i<n; i++) {
			fact *=i;
		}
		return fact;
	}

}
