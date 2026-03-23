package tuesday;

public class teacher extends person {
private String subject;

public teacher() {
	
}

public teacher(String fnm, String lnm, int age, String subject) {
	super(fnm,lnm,age);
	this.subject = subject;
}

public void display() {
	super.display();
	System.out.println("Subject ="+subject);
}

}
