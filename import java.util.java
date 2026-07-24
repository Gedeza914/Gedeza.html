import java.util.Scanner;
import java.text.DecimalFormat;
public class DataContracts {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
       DecimalFormat df = new DecimalFormat("R####0.00");
        // Initialize month array with values 1 to 6
        int[] month = {1, 2, 3, 4, 5, 6};
        double[] vContract = new double[month.length];
        double[] mContract = {125000, 205000, 180000, 230000, 310000, 65000};
        double[] cContract = {120000, 135000, 200000, 250000, 350000, 85000};
        double[] tContract = {100000, 99000, 165000, 205000, 305000, 55000};
        double[] avgSales = new double[mContract.length];

        // Populate VContract with user input
        populateVContract(vContract);

        int option;
        do {
            option = getUserOption(scanner);

            switch (option) {
                case 1:
                    // Display all details using the method
                    displayContractDetails(vContract, mContract, cContract, tContract, month, avgSales);
                    break;

                case 2:
                    System.out.println("Enter the month number (1-6):");
                    int monthNumb = scanner.nextInt();
                    if (monthNumb >= 0 && monthNumb <= 600000) {
                        String result = determineHighestSales(vContract, mContract, cContract, tContract, monthNumb);
                        System.out.println("Highest Sales: " + result);
                    } else {
                        System.out.println("Invalid month number.");
                    }
                    break;

                case 3:
                    calcAvgSales(vContract, mContract, cContract, tContract, avgSales);
                    for (int i = 0; i < month.length; i++) {
                        System.out.println("Month " + month[i] + " Average: " + df.format( avgSales[i]));
                    }
                    break;

                case 4:
                    System.out.println("End the program");
                    break;

                default:
                    System.out.println("Invalid option !!!");
            }
        } while (option != 4);
    }

    public static void populateVContract(double[] vContract) {
        Scanner scanner = new Scanner(System.in);
        for (int i = 0; i < vContract.length; i++) {
            boolean valid = false;
            while (!valid) {
                System.out.print("Enter sales amount for Month " + (i + 1) + " (0 - 600,000): ");
                double salesAmount = scanner.nextDouble();
                if (validateSales(salesAmount)) {
                    vContract[i] = salesAmount;
                    valid = true;
                } else {
                    System.out.println("Invalid amount. Please re-enter.");
                }
            }
        }
    }

    public static boolean validateSales(double salesAmount) {
        return salesAmount >= 0 && salesAmount <= 600000;
    }

    public static int getUserOption(Scanner scanner) {
        System.out.println("\n1 Display all contract deals.");
        System.out.println("2  Determine highest sales contract.");
        System.out.println("3  Determine average sales.");
        System.out.println("4  Exit.");
        System.out.print("Enter an option: ");
        return scanner.nextInt();
    }

    public static void calcAvgSales(double[] v, double[] m, double[] c, double[] t, double[] avg) {
		
        for (int i = 0; i < v.length; i++) {
            avg[i] = (v[i] + m[i] + c[i] + t[i]) / 4.0;
        }
    }

    public static String determineHighestSales(double[] vContract, double[] mContract, double[] cContract, double[] tContract, int monthNumb) {
        int index = monthNumb - 1;
        double maxSales = vContract[index];
        String contractType = "vContract";

        if (mContract[index] > maxSales) {
            maxSales = mContract[index];
            contractType = "mContract";
        }
        if (cContract[index] > maxSales) {
            maxSales = cContract[index];
            contractType = "cContract";
        }
        if (tContract[index] > maxSales) {
            maxSales = tContract[index];
            contractType = "tContract";
        }

        return monthNumb + " " + contractType + " " + maxSales;
    }

    public static void displayContractDetails(double[] vContract, double[] mContract, double[] cContract, double[] tContract, int[] months, double[] avgSales) {
        System.out.println("\nMonth\tvContract\t\tmMonth\t\tcContract\t\ttContract");
        for (int i = 0; i < months.length; i++) {
            System.out.println(months[i] + "\t" + vContract[i] + "\t" + mContract[i] + "\t" + cContract[i] + "\t" + tContract[i]);
        }
    }
}