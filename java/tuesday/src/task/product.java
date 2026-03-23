package task;

public class product {
	int pid, price, quantity;
	
	public product() {
		System.out.println("Default constructor of product");
	}
	public product(int pid, int price, int quantity) {
		System.out.println("param constructor of product");
		System.out.println("pid = "+pid+", price = "+price+", quantity = "+quantity );
	}

}
