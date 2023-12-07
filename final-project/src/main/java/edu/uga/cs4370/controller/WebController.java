package edu.uga.cs4370.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("dynamic")
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

}