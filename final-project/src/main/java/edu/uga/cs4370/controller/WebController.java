package edu.uga.cs4370.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mysql.cj.x.protobuf.MysqlxPrepare.Prepare;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.naming.spi.DirStateFactory.Result;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
      this.conn =
        DriverManager.getConnection(
          "jdbc:mysql://localhost:33306/itstore?" +
          "user=root&password=Lekhoa699"
        );
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
        prod.product_id = "" + res.getInt("product_id");
        prod.name = res.getString("name_desc");
        prod.image = res.getString("image");
        prod.stars = "" + res.getFloat("stars");
        prod.rating_count = "" + res.getInt("rating_count");
        prod.price = "" + res.getFloat("price");
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

  @PostMapping("register")
  public ResponseEntity<String> createAccount(@RequestBody User user) {
    String password = user.password;
    String salt = BCrypt.gensalt();
    String hashPassword = BCrypt.hashpw(password, salt);
    String username = user.username;
    String name = user.name;
    try {
      String query =
        "INSERT INTO Customer (username, password, name, cart_id) VALUES (\"" +
        username +
        "\",\"" +
        hashPassword +
        "\",\"" +
        name +
        "\", " +
        "NULL);";
      PreparedStatement st = conn.prepareStatement(query);
      st.execute();
      query =
        "SELECT customer_id FROM Customer WHERE username = \"" +
        username +
        "\"";
      st = conn.prepareStatement(query);
      ResultSet res = st.executeQuery();
      if (res.next()) {
        int cust_id = res.getInt("customer_id");
        query = "INSERT INTO Cart(customer_id) VALUES (" + cust_id + ")";
        st = conn.prepareStatement(query);
        st.execute();
        query = "SELECT cart_id FROM Cart WHERE customer_id = " + cust_id;
        st = conn.prepareStatement(query);
        res = st.executeQuery();
        if (res.next()) {
          query =
            "UPDATE Customer SET cart_id = " +
            res.getInt("cart_id") +
            " WHERE customer_id = " +
            cust_id;
          st = conn.prepareStatement(query);
          st.execute();
        }
      }
    } catch (SQLException sqle) {
      // handle any errors
      System.out.println("SQLException: " + sqle.getMessage());
      System.out.println("SQLState: " + sqle.getSQLState());
      System.out.println("VendorError: " + sqle.getErrorCode());
    }
    return ResponseEntity
      .status(HttpStatus.CREATED)
      .header("Location", "/")
      .body("ok"); // Redirect to the main page
  }

  @GetMapping("products/{product_id}")
  public Product getProduct(@PathVariable String product_id) {
    Product prod = new Product();
    try {
      String query = "SELECT * FROM Product WHERE product_id = " + product_id;
      PreparedStatement st = conn.prepareStatement(query);
      ResultSet res = st.executeQuery();
      if (res.next()) {
        prod = new Product();
        prod.product_id = "" + res.getInt("product_id");
        prod.name = res.getString("name_desc");
        prod.image = res.getString("image");
        prod.stars = "" + res.getFloat("stars");
        prod.rating_count = "" + res.getInt("rating_count");
        prod.price = "" + res.getFloat("price");
      }
    } catch (SQLException sqle) {
      // handle any errors
      System.out.println("SQLException: " + sqle.getMessage());
      System.out.println("SQLState: " + sqle.getSQLState());
      System.out.println("VendorError: " + sqle.getErrorCode());
    }
    return prod;
  }

  @PostMapping("login")
  public ResponseEntity<String> login(@RequestBody User user) {
    String password = user.password;
    String user_id = "";
    try {
      String query =
        "SELECT customer_id, password FROM Customer WHERE username = \"" +
        user.username +
        "\"";
      PreparedStatement st = conn.prepareStatement(query);
      ResultSet res = st.executeQuery();
      if (res.next()) {
        String hashPassword = res.getString("password");
        if (BCrypt.checkpw(password, hashPassword)) {
          user_id = "" + res.getInt("customer_id");
          System.out.println("True!!");
        }
      }
    } catch (SQLException sqle) {
      // handle any errors
      System.out.println("SQLException: " + sqle.getMessage());
      System.out.println("SQLState: " + sqle.getSQLState());
      System.out.println("VendorError: " + sqle.getErrorCode());
    }
    return ResponseEntity
      .status(HttpStatus.OK)
      .body("{\"user_id\": " + user_id + "}"); // Redirect to the main page
  }

  @PostMapping("cart")
  public ResponseEntity<String> addCart(@RequestBody CartProduct cartProduct) {
    String query =
      "SELECT Cart.cart_id from Cart JOIN Customer ON Cart.cart_id = Customer.cart_id WHERE Customer.customer_id=" +
      cartProduct.user_id;
    try {
      PreparedStatement st = conn.prepareStatement(query);
      ResultSet res = st.executeQuery();
      if (res.next()) {
        int cart = res.getInt("cart_id");
        query =
          "INSERT INTO CartProduct(cart_id, product_id) VALUES (" +
          cart +
          "," +
          cartProduct.productID +
          ")";
        st = conn.prepareStatement(query);
        st.execute();
      }
    } catch (SQLException sqle) {
      // handle any errors
      System.out.println("SQLException: " + sqle.getMessage());
      System.out.println("SQLState: " + sqle.getSQLState());
      System.out.println("VendorError: " + sqle.getErrorCode());
    }

    return null;
  }

  @GetMapping("cart/{user_id}")
  public List<Product> getCart(@PathVariable String user_id) {
    List<Product> products = new ArrayList<>();
    String query =
      "SELECT * FROM CartProduct JOIN Product ON CartProduct.product_id = Product.product_id " +
      "JOIN Cart ON CartProduct.cart_id = Cart.cart_id WHERE Cart.customer_id =" +
      user_id;
    try {
      PreparedStatement st = conn.prepareStatement(query);
      ResultSet res = st.executeQuery();
      while (res.next()) {
        Product prod = new Product();
        prod.product_id = "" + res.getInt("product_id");
        prod.name = res.getString("name_desc");
        prod.image = res.getString("image");
        prod.stars = "" + res.getFloat("stars");
        prod.rating_count = "" + res.getInt("rating_count");
        prod.price = "" + res.getFloat("price");
        products.add(prod);
      }
    } catch (SQLException sqle) {
      // handle any errors
      System.out.println("SQLException: " + sqle.getMessage());
      System.out.println("SQLState: " + sqle.getSQLState());
      System.out.println("VendorError: " + sqle.getErrorCode());
    }
    return products;
  }

  @DeleteMapping("cart/{product_id}")
  public ResponseEntity<String> deleteProduct(
    @PathVariable("product_id") String product_id,
    @RequestParam("user_id") String user_id
  ) {
    try {
        String query = "DELETE FROM CartProduct WHERE product_id=" + product_id;
        PreparedStatement st = conn.prepareStatement(query);
        st.execute();
    } catch (SQLException sqle) {
        // handle any errors
      System.out.println("SQLException: " + sqle.getMessage());
      System.out.println("SQLState: " + sqle.getSQLState());
      System.out.println("VendorError: " + sqle.getErrorCode());
    }
    return new ResponseEntity<String>(HttpStatus.OK);
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

  @JsonProperty("product_id")
  public String product_id;
}

class User {

  public String username;
  public String password;
  public String name;
}

class CartProduct {

  public String user_id;
  public String productID;
}
