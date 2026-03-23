package tuesday;

public class circle extends shape {
	
	private final float PI;
	private int radius;
	
//	public circle() {
//		PI = 3.14f;
//	}
	
	public circle(int radius) {
		this.radius = radius;
		this.PI=3.14f;
	}
	
	@Override
	
	public float area() {
		return PI*radius*radius;
	}
	

}
