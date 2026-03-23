# Employee Payroll System (Java)

A console-based Java application designed to manage employee records and automate salary calculations without the need for an external database.

##  Features
* **Add Employee:** Register new employees with a unique ID, Name, and Basic Salary.
* **Automated Payroll:** Calculates HRA (20%) and DA (10%) automatically.
* **Gross Salary Computation:** Instantly generates the total gross pay for each record.
* **Search Functionality:** Quickly find any employee's details using their unique Employee ID.
* **In-Memory Storage:** Utilizes Java `ArrayList` for efficient data handling during execution.

## Technologies Used
* **Language:** Java (JDK 8 or higher)
* **IDE:** Eclipse
* **Version Control:** Git & GitHub
* **Concepts:** Object-Oriented Programming (OOP), Collections Framework (ArrayList), Encapsulation.

## Salary Logic
The system follows these formulas for payroll processing:
- **HRA** = Basic Salary × 0.20
- **DA** = Basic Salary × 0.10
- **Gross Salary** = Basic Salary + HRA + DA

---
Developed by [Kotipatruni Tirumala Rao, Hari Ragavan, Nirmal Kumal, Retheesh]