import java.util.Map;

import static spark.Spark.*;

/**
 * Gradle : compile "com.sparkjava:spark-core:2.8.0" // add to build.gradle (for Java users)
 */
public class Main {

    public static void main(String args[]){
        get("/order", (req, res) -> {
            Map<String,String[]> queries = req.queryMap().toMap();
            double roll = Double.parseDouble(queries.get("roll")[0]);
            double yaw = Double.parseDouble(queries.get("yaw")[0]);
            double pitch = Double.parseDouble(queries.get("pitch")[0]);
            double height = Double.parseDouble(queries.get("height")[0]);

            //do these things here

            System.out.println(roll+" "+yaw+" "+pitch+" "+height);

            return 200;
        });
    }
}
