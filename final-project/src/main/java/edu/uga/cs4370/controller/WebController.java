package edu.uga.cs4370.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.annotation.JsonProperty;

@RestController
@RequestMapping("")
public class WebController {
    Connection conn = null;
    /**
     * Connecting to the database when the constructor is called.
     */
    public WebController() {
         try {
            this.conn = DriverManager.getConnection("jdbc:mysql://localhost:33306/itstore?" +
            "user=root&password=Lekhoa699");
            System.out.println("Connection successful");
        } catch (SQLException sqle) {
             // handle any errors
            System.out.println("SQLException: " + sqle.getMessage());
            System.out.println("SQLState: " + sqle.getSQLState());
            System.out.println("VendorError: " + sqle.getErrorCode());
        }
    }
    
    @GetMapping("/products")
    public List<Product> getProducts() {
        List<Product> products = new ArrayList<>();
        try {
            PreparedStatement st = null;
            String query = "SELECT * FROM Product;";
            st = conn.prepareStatement(query);
            ResultSet res = st.executeQuery();
            
            int i = 0;
            while (res.next() && i < 50) {
                Product prod = new Product();
                prod.name = res.getString("name_desc");
                prod.image = res.getString("image");
                prod.stars = ""+res.getFloat("stars");
                prod.rating_count = ""+res.getInt("rating_count");
                prod.price = ""+res.getFloat("price");
                //HashMap<String, String> item = new HashMap<>();
                // item.put("name", res.getString("name_desc"));
                // item.put("image", res.getString("image"));
                // item.put("rating_count", ""+res.getInt("rating_count"));
                // item.put("price", ""+res.getFloat("price"));
                products.add(prod);
                i++;
            }

        } catch (SQLException sqle) {
            // handle any errors
            System.out.println("SQLException: " + sqle.getMessage());
            System.out.println("SQLState: " + sqle.getSQLState());
            System.out.println("VendorError: " + sqle.getErrorCode());
        }
        return products;
    } 
    

}

class Product {
    @JsonProperty("name")
    public String name;
    @JsonProperty("stars")
    public String stars;
    @JsonProperty("rating_count")
    public String rating_count;
    @JsonProperty("image")
    public String image;
    @JsonProperty("price")
    public String price;
}