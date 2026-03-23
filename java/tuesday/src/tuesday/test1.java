package tuesday;

public class test1 {
	
	public static void main(String[] args) {
		//bank b= new bank(); - cannot be instantiated 
		
		bank b1 = new HDFC();
		System.out.println("ROI ="+ b1.getROI());
	}

}
