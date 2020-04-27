import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

public class Option_Generator{
    public static void main(String[] args) throws FileNotFoundException{
        File f = new File("./CareerAreas.txt");
        Scanner sc = new Scanner(f);
        System.out.println(printResult(sc));
    }

    public static String printResult(Scanner sc){
        StringBuilder str = new StringBuilder();
        while (sc.hasNextLine()){
            String next = sc.nextLine();
            // next.replaceAll("\\s|,\\s", "-") incase needed
            str.append("<option value='" + next +"'>" + next + "</option>" + "\n");
        }
        return str.toString();
    }
}