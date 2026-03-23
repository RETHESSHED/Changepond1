package payroll;

public class Employee {
	
	
	private int empId;
    private String name;
    private double basicSalary;

    public Employee(int empId, String name, double basicSalary) {
        this.empId = empId;
        this.name = name;
        this.basicSalary = basicSalary;
    }

    // Getters
    public int getEmpId() { return empId; }
    public String getName() { return name; }
    public double getBasicSalary() { return basicSalary; }

    // Calculation 
    public double calculateHRA() {
        return basicSalary * 0.20;
    }

    public double calculateDA() {
        return basicSalary * 0.10;
    }

    public double calculateGrossSalary() {
        return basicSalary + calculateHRA() + calculateDA();
    }

    @Override
    public String toString() {
        return "ID: " + empId + " | Name: " + name + 
               " | Basic: " + basicSalary + 
               " | HRA: " + calculateHRA() + 
               " | DA: " + calculateDA() + 
               " | Gross: " + calculateGrossSalary();
    }
}

