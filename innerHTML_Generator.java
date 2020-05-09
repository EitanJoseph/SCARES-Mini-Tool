import java.io.*;
import java.util.Scanner;

public class innerHTML_Generator{
    public static void main(String[] args) throws FileNotFoundException, IOException{
        Scanner userInput = new Scanner(System.in);
        System.out.print("File path: ");
        File original = new File(userInput.next());
        System.out.print("New file name: ");
        File newFile = new File(userInput.next());
        Scanner sc = new Scanner(original);
        generateFile(sc, newFile);
    }

    public static void generateFile(Scanner sc, File newFile) throws FileNotFoundException, IOException{
        StringBuilder str = new StringBuilder();
        while (sc.hasNext()){
            str.append("\"" + sc.nextLine().replace("\"", "'") + "\" + \n");
        }
        if (newFile.createNewFile()) {
            System.out.println("File created: " + newFile.getName());
        }
        FileWriter myWriter = new FileWriter(newFile.getName());
        myWriter.write(str.delete(str.length() - 3, str.length()).toString());
        myWriter.close();
    }
}