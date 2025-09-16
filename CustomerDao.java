package com.kailua.carrental;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;

public class CustomerDao {
    public int createCustomer(String name, String address, String zip,
                              String mobile, String phone, String email,
                              String driverLicenceNo, LocalDate driverSince) throws SQLException {
        String sql = "INSERT INTO Customer (name, address, zip, mobile_phone, phone, email, driver_license_no, driver_since_date) " +
                     "VALUES (?,?,?,?,?,?,?,?)";
        try (Connection conn = Db.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, name);
            ps.setString(2, address);
            ps.setString(3, zip);
            ps.setString(4, mobile);
            ps.setString(5, phone);
            ps.setString(6, email);
            ps.setString(7, driverLicenceNo);
            ps.setDate(8, Date.valueOf(driverSince));
            ps.executeUpdate();
            try (ResultSet keys = ps.getGeneratedKeys()) {
                return keys.next() ? keys.getInt(1) : -1;
            }
        }
    }

    public int updateCustomerEmail(int customerId, String newEmail) throws SQLException {
        String sql = "UPDATE Customer SET email = ? WHERE customer_id = ?";
        try (Connection conn = Db.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, newEmail);
            ps.setInt(2, customerId);
            return ps.executeUpdate();
        }
    }

    public int deleteCustomer(int customerId) throws SQLException {
        String sql = "DELETE FROM Customer WHERE customer_id = ?";
        try (Connection conn = Db.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, customerId);
            return ps.executeUpdate();
        }
    }
}


