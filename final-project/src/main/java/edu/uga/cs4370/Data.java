package edu.uga.cs4370;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;


public class Data {
    public Connection conn = null;
    public Data() {
        try {
            conn = DriverManager.getConnection("jdbc:mysql://localhost:33306/itstore?" +
            "user=root&password=Lekhoa699");
            System.out.println("Connection successful");
        } catch (SQLException sqle) {
             // handle any errors
            System.out.println("SQLException: " + sqle.getMessage());
            System.out.println("SQLState: " + sqle.getSQLState());
            System.out.println("VendorError: " + sqle.getErrorCode());
        }
    }
    
    // Initialize Tables
    public void initializeTables() {
        try {
        PreparedStatement st = null;
        String query = "CREATE TABLE Customer (" +
        "customer_id INT UNIQUE NOT NULL AUTO_INCREMENT, " +
        "username VARCHAR(25), " + 
        "password TEXT, " +
        "name VARCHAR(25))";
        st = conn.prepareStatement(query);
        st.execute();

        query = "CREATE TABLE Cart (" +
        "cart_id INT UNIQUE NOT NULL AUTO_INCREMENT, " +
        "customer_id INT UNIQUE NOT NULL, " +
        "FOREIGN KEY(customer_id) REFERENCES Customer(customer_id)" + 
        ")";
        st = conn.prepareStatement(query);
        st.execute();

        query = "ALTER TABLE Customer ADD cart_id INT;";
        st = conn.prepareStatement(query);
        st.execute();
        query = "ALTER TABLE Customer ADD FOREIGN KEY(cart_id) REFERENCES Cart(cart_id);";
        st = conn.prepareStatement(query);
        st.execute();

        query = "CREATE TABLE PurchaseHistory (" +
        "purchase_history_id INT UNIQUE NOT NULL AUTO_INCREMENT, " +
        "date_ordered DATE," +
        "customer_id INT NOT NULL, " +
        "FOREIGN KEY(customer_id) REFERENCES Customer(customer_id)" + 
        ")";
        st = conn.prepareStatement(query);
        st.execute();

        query = "CREATE TABLE Wishlist (" +
        "wishlist_id INT UNIQUE NOT NULL AUTO_INCREMENT, " +
        "wishlist_name TEXT," +
        "customer_id INT NOT NULL, " +
        "FOREIGN KEY(customer_id) REFERENCES Customer(customer_id)" + 
        ")";
        st = conn.prepareStatement(query);
        st.execute();

        query = "CREATE TABLE Discount (" +
        "discount_id INT UNIQUE NOT NULL AUTO_INCREMENT, " +
        "discount_name TEXT," +
        "percentage FLOAT," +
        "expire DATE)";
        st = conn.prepareStatement(query);
        st.execute();

        query = "CREATE TABLE Product (" +
        "product_id INT UNIQUE NOT NULL AUTO_INCREMENT, " +
        "name_desc TEXT," +
        "price FLOAT," +
        "image TEXT," +
        "stars FLOAT," +
        "rating_count INT," + 
        "link_amazon TEXT)";
        st = conn.prepareStatement(query);
        st.execute();

        query = "CREATE TABLE DiscountProduct (" +
        "disc_prod_id INT UNIQUE NOT NULL AUTO_INCREMENT, " +
        "discount_id INT NOT NULL," +
        "product_id INT NOT NULL," +
        "FOREIGN KEY (discount_id) REFERENCES Discount(discount_id)," + 
        "FOREIGN KEY (product_id) REFERENCES Product(product_id))";
        st = conn.prepareStatement(query);
        st.execute();

        query = "CREATE TABLE WishlistProduct (" +
        "wishlist_prod_id INT UNIQUE NOT NULL AUTO_INCREMENT, " +
        "wishlist_id INT NOT NULL," +
        "product_id INT NOT NULL," +
        "FOREIGN KEY (wishlist_id) REFERENCES Wishlist(wishlist_id)," + 
        "FOREIGN KEY (product_id) REFERENCES Product(product_id))";
        st = conn.prepareStatement(query);
        st.execute();

        query = "CREATE TABLE CartProduct (" +
        "cart_prod_id INT UNIQUE NOT NULL AUTO_INCREMENT, " +
        "cart_id INT NOT NULL," +
        "product_id INT NOT NULL," +
        "FOREIGN KEY (cart_id) REFERENCES Cart(cart_id)," + 
        "FOREIGN KEY (product_id) REFERENCES Product(product_id))";
        st = conn.prepareStatement(query);
        st.execute();

        query = "CREATE TABLE Rating (" +
        "rating_id INT UNIQUE NOT NULL AUTO_INCREMENT, " +
        "star_rating FLOAT," +
        "comment TEXT," +
        "customer_id INT NOT NULL,"+
        "FOREIGN KEY (customer_id) REFERENCES Customer(customer_id))";
        st = conn.prepareStatement(query);
        st.execute();

        query = "CREATE TABLE ProductRating (" +
        "prod_rate_id INT UNIQUE NOT NULL AUTO_INCREMENT, " +
        "rating_id INT NOT NULL," +
        "product_id INT NOT NULL," +
        "FOREIGN KEY (rating_id) REFERENCES Rating(rating_id)," + 
        "FOREIGN KEY (product_id) REFERENCES Product(product_id))";
        st = conn.prepareStatement(query);
        st.execute();

        query = "CREATE TABLE Orders (" +
        "order_id INT UNIQUE NOT NULL AUTO_INCREMENT," +
        "purchase_history_id INT NOT NULL," +
        "product_id INT NOT NULL," +
        "discount_id INT NOT NULL," +
        "FOREIGN KEY (purchase_history_id) REFERENCES PurchaseHistory(purchase_history_id)," + 
        "FOREIGN KEY (discount_id) REFERENCES Discount(discount_id)," + 
        "FOREIGN KEY (product_id) REFERENCES Product(product_id))";
        st = conn.prepareStatement(query);
        st.execute();
        
        query = "CREATE TABLE Shipping (" +
        "shipping_id INT UNIQUE NOT NULL AUTO_INCREMENT, " +
        "address TEXT," +
        "country TEXT," +
        "order_id INT NOT NULL," +
        "FOREIGN KEY (order_id) REFERENCES Orders(order_id))";
        st = conn.prepareStatement(query);
        st.execute();

        query = "CREATE TABLE Payment (" +
        "payment_id INT UNIQUE NOT NULL AUTO_INCREMENT, " +
        "name_on_card TEXT," +
        "zipcode INT NOT NULL," +
        "card_number INT NOT NULL," +
        "order_id INT NOT NULL," +
        "FOREIGN KEY (order_id) REFERENCES Orders(order_id))";
        st = conn.prepareStatement(query);
        st.execute();

        query = "CREATE TABLE CustomerShipping (" +
        "cust_ship_id INT UNIQUE NOT NULL AUTO_INCREMENT, " +
        "shipping_id INT NOT NULL," +
        "customer_id INT NOT NULL," +
        "FOREIGN KEY (shipping_id) REFERENCES Shipping(shipping_id),"+
        "FOREIGN KEY (customer_id) REFERENCES Customer(customer_id))";
        st = conn.prepareStatement(query);
        st.execute();

        query = "CREATE TABLE CustomerPayment (" +
        "cust_pay_id INT UNIQUE NOT NULL AUTO_INCREMENT, " +
        "payment_id INT NOT NULL," +
        "customer_id INT NOT NULL," +
        "FOREIGN KEY (payment_id) REFERENCES Payment(payment_id),"+
        "FOREIGN KEY (customer_id) REFERENCES Customer(customer_id))";
        st = conn.prepareStatement(query);
        st.execute();

        query = "ALTER TABLE Orders ADD payment_id INT;";
        st = conn.prepareStatement(query);
        st.execute();
        query = "ALTER TABLE Orders ADD FOREIGN KEY(payment_id) REFERENCES Payment(payment_id);";
        st = conn.prepareStatement(query);
        st.execute();
        query = "ALTER TABLE Orders ADD shipping_id INT;";
        st = conn.prepareStatement(query);
        st.execute();
        query = "ALTER TABLE Orders ADD FOREIGN KEY(shipping_id) REFERENCES Shipping(shipping_id);";
        st = conn.prepareStatement(query);
        st.execute();

        query = "CREATE TABLE OrderProduct (" +
        "order_prod_id INT UNIQUE NOT NULL AUTO_INCREMENT, " +
        "order_id INT NOT NULL," +
        "product_id INT NOT NULL," +
        "FOREIGN KEY (order_id) REFERENCES Orders(order_id),"+
        "FOREIGN KEY (product_id) REFERENCES Product(product_id))";
        st = conn.prepareStatement(query);
        st.execute();

        // Indexing
        query = "CREATE INDEX idx_product_id ON Product(product_id)";
        st = conn.prepareStatement(query);
        st.execute();
        query = "CREATE INDEX idx_order_id ON Orders(order_id)";
        st = conn.prepareStatement(query);
        st.execute();

        } catch (SQLException sqle) {
            // handle any errors
            System.out.println("SQLException: " + sqle.getMessage());
            System.out.println("SQLState: " + sqle.getSQLState());
            System.out.println("VendorError: " + sqle.getErrorCode());
        }
    }

    // Initialize data
    public void initializeData() {
        try {
            PreparedStatement st = null;
            CSVReader csvReader = new CSVReaderBuilder(new FileReader("./csci-4370-final-project/final-project/src/main/dataset/Electronics.csv")).withSkipLines(1).build();
            List<String[]> data = csvReader.readAll();
            // 0 -> name_desc
            // 3 -> image
            // 4 -> link_amazon
            // 5 -> stars
            // 6 -> rating_count
            // 8 -> price
            for (int i = 0; i < 1500; i++) {
                if (!data.get(i)[5].equals("Get") && !data.get(i)[8].isEmpty()
                    && !data.get(i)[5].isEmpty()) {
                    
                    String price = data.get(i)[8].substring(1);
                    price = price.replace(",", "");
                    Float newPrice = Float.parseFloat(price);
                    Float stars = Float.parseFloat(data.get(i)[5]);
                    String rate = data.get(i)[6].replace(",","");
                    Integer ratingCount = Integer.parseInt(rate);
                    String query = "INSERT INTO Product VALUES (" + (i+1) + ",\"" + data.get(i)[0].replace("\""," ") +
                    "\"," + newPrice + ",\"" + data.get(i)[3] +"\"," + stars + "," + ratingCount + ",\"" +
                    data.get(i)[4] + "\");";
                
                    try {
                        st = conn.prepareStatement(query);
                        st.execute();
                    } catch (SQLException sqle) {
                        // handle any errors
                        System.out.println("SQLException: " + sqle.getMessage());
                        System.out.println("SQLState: " + sqle.getSQLState());
                        System.out.println("VendorError: " + sqle.getErrorCode());
                    }
                }
            }
        } catch (IOException ioe) {
            System.out.println(ioe);
        }
    }
    public static void main(String[] args) {
        Data data = new Data();
        data.initializeTables();
        data.initializeData();
    }
}
