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
    public List<List<String>> getProducts() {
        List<List<String>> products = new ArrayList<>();
        try {
            PreparedStatement st = null;
            String query = "SELECT * FROM Product;";
            st = conn.prepareStatement(query);
            ResultSet res = st.executeQuery();
            
            int i = 0;
            while (res.next() && i < 50) {
                List<String> item = new ArrayList<>();
                item.add(""+res.getInt("product_id"));
                item.add(res.getString("name_desc"));
                item.add(res.getString("image"));
                item.add(res.getString("link_amazon"));
                item.add(""+res.getInt("rating_count"));
                item.add(""+res.getFloat("price"));
                item.add(""+res.getFloat("stars"));  
                products.add(item);
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