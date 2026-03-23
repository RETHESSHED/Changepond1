package monday;

public class EnumDemo {
	enum Seasons { SUMMER, WINTER, RAINY};


	public static void main(String[] args) {
		
	Seasons s = Seasons.WINTER;
	System.out.println(s);
	System.out.println("____");
	for(Seasons s1: Seasons.values()) {
		System.out.println(s1 +" "+s1.ordinal());
	}
	}

}
