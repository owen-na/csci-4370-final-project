package edu.uga.cs4370;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

public class Data {

  public Connection conn = null;
  //   public Data() {
  //     try {
  //       conn =
  //         DriverManager.getConnection(
  //           "jdbc:mysql://localhost:33306/movie_rating?" +
  //           "user=root&password=Lekhoa699"
  //         );
  //       System.out.println("Connection successful");
  //     } catch (SQLException sqle) {
  //       // handle any errors
  //       System.out.println("SQLException: " + sqle.getMessage());
  //       System.out.println("SQLState: " + sqle.getSQLState());
  //       System.out.println("VendorError: " + sqle.getErrorCode());
  //     }
  //   }

  //   public void initializeTables() {
  //     PreparedStatement st = null;
  //   }
}
