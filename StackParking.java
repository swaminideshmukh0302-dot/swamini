import java.util.Stack;

public class StackParking {

    public static void main(String[] args) {

        // Creating Stack
        Stack<String> parking = new Stack<>();

        System.out.println("=================================");
        System.out.println("   SMART PARKING MANAGEMENT");
        System.out.println("   STACK DATA STRUCTURE");
        System.out.println("=================================");


        // PUSH OPERATION

        parking.push("MH27AB1234");

        System.out.println(
            "PUSH: MH27AB1234"
        );


        parking.push("MH27CD5678");

        System.out.println(
            "PUSH: MH27CD5678"
        );


        parking.push("MH27EF9012");

        System.out.println(
            "PUSH: MH27EF9012"
        );


        System.out.println();

        System.out.println(
            "Current Parking Stack: "
            + parking
        );


        // PEEK OPERATION

        System.out.println();

        System.out.println(
            "PEEK - Top Vehicle: "
            + parking.peek()
        );


        // POP OPERATION

        System.out.println();

        String removedVehicle =
            parking.pop();

        System.out.println(
            "POP - Removed Vehicle: "
            + removedVehicle
        );


        // UPDATED STACK

        System.out.println();

        System.out.println(
            "Updated Parking Stack: "
            + parking
        );


        // STACK SIZE

        System.out.println();

        System.out.println(
            "Current Stack Size: "
            + parking.size()
        );


        System.out.println();

        System.out.println(
            "Principle: LIFO"
        );

        System.out.println(
            "Last In, First Out"
        );

        System.out.println(
            "================================="
        );
    }
}