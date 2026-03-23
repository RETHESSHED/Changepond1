import java.util.ArrayList;
import java.util.Scanner;
public class Payroll {
	private static ArrayList<Employee> employeeList = new ArrayList<>();
	private static Scanner sc = new Scanner(System.in);

	public static void main(String[] args) {
		while (true) {
			System.out.println("\n--- Employee Payroll System ---");
			System.out.println("1. Add Employee\n2. Display All\n3. Search by ID\n4. Exit");
			System.out.print("Enter choice: ");
			int choice = sc.nextInt();

			switch (choice) {
			case 1:
				addEmployee();
				break;
			case 2:
				displayEmployees();
				break;
			case 3:
				searchEmployee();
				break;
			case 4:
				System.out.println("End");
				System.exit(0);
			default:
				System.out.println("Invalid choice!");
			}
		}
	}

	private static void addEmployee() {
		System.out.print("Enter ID: ");
		int id = sc.nextInt();
		sc.nextLine(); // Consume newline
		System.out.print("Enter Name: ");
		String name = sc.nextLine();
		System.out.print("Enter Basic Salary: ");
		double salary = sc.nextDouble();

		employeeList.add(new Employee(id, name, salary));
		System.out.println("Employee added successfully!");
	}

	private static void displayEmployees() {
		if (employeeList.isEmpty()) {
			System.out.println("No records found.");
		} else {
			for (Employee e : employeeList) {
				System.out.println(e);
			}
		}
	}

	private static void searchEmployee() {
		System.out.print("Enter ID to search: ");
		int id = sc.nextInt();
		for (Employee e : employeeList) {
			if (e.getEmpId() == id) {
				System.out.println("Result: " + e);
				return;
			}
		}
		System.out.println("Employee not found.");
	}

}
