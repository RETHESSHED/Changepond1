package payroll;

import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.Scanner;

public class PayrollManager {

    private static ArrayList<Employee> employeeList = new ArrayList<>();
    private static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        while (true) {
            try {
                System.out.println("\n--- Employee Payroll System ---");
                System.out.println("1. Add Employee");
                System.out.println("2. Display All Employees");
                System.out.println("3. Search Employee by ID");
                System.out.println("4. Calculate Salary (Specific ID)");
                System.out.println("5. Exit");
                System.out.print("Enter choice: ");

                int choice = sc.nextInt();

                switch (choice) {
                    case 1: addEmployee(); break;
                    case 2: displayEmployees(); break;
                    case 3: searchEmployee(); break;
                    case 4: calculateSalary(); break;
                    case 5: 
                        System.out.println("Exiting System. Thank You!");
                        System.exit(0);
                    default:
                        System.out.println("Error: Invalid choice! Please select 1-5.");
                }
            } catch (InputMismatchException e) {
                System.out.println("Error: Invalid input type! Please enter a number.");
                sc.nextLine();
            }
        }
    }

    private static void addEmployee() {
        try {
            System.out.print("Enter ID: ");
            int id = sc.nextInt();
            sc.nextLine(); 
            System.out.print("Enter Name: ");
            String name = sc.nextLine();
            System.out.print("Enter Basic Salary: ");
            double salary = sc.nextDouble();

            employeeList.add(new Employee(id, name, salary));
            System.out.println("Employee added successfully!");
        } catch (InputMismatchException e) {
            System.out.println("Error: Failed to add employee. Use numbers for ID and Salary.");
            sc.nextLine(); 
        }
    }

    private static void displayEmployees() {
        if (employeeList.isEmpty()) {
            System.out.println("No records found.");
        } else {
            System.out.println("\n--- All Employee Details ---");
            for (Employee e : employeeList) {
                System.out.println(e);
            }
        }
    }

    private static void searchEmployee() {
        System.out.print("Enter ID to search: ");
        try {
            int id = sc.nextInt();
            for (Employee e : employeeList) {
                if (e.getEmpId() == id) {
                    System.out.println("Result: " + e);
                    return;
                }
            }
            System.out.println("Employee with ID " + id + " not found.");
        } catch (InputMismatchException e) {
            System.out.println("Error: ID must be a number.");
            sc.nextLine();
        }
    }

    private static void calculateSalary() {
        System.out.print("Enter ID to calculate salary: ");
        try {
            int id = sc.nextInt();
            for (Employee e : employeeList) {
                if (e.getEmpId() == id) {
                    System.out.println("\n--- Salary Slip for " + e.getName() + " ---");
                    System.out.println("Basic Salary: " + e.getBasicSalary());
                    System.out.println("HRA (20%):     " + e.calculateHRA());
                    System.out.println("DA (10%):      " + e.calculateDA());
                    System.out.println("----------------------------");
                    System.out.println("Gross Salary:  " + e.calculateGrossSalary());
                    return;
                }
            }
            System.out.println("Employee not found.");
        } catch (InputMismatchException e) {
            System.out.println("Error: ID must be a number.");
            sc.nextLine();
        }
    }
}