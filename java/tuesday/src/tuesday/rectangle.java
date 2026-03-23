package tuesday;

public class rectangle extends shape {
	
	private int len, br;
	
	public rectangle(int len, int br) {
		this.len = len;
		this.br = br;
	}
	
	@Override
	public float area() {
		// TODO auto - generated method stub
		return len*br;
		
	}

}
