package com.kailua.carrental;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class CarDao {
    public void listTopCars(int limit) throws SQLException {
        String sql = "SELECT car_id, brand, model, registration_no, odometer_km FROM Car ORDER BY car_id LIMIT ?";
        try (Connection conn = Db.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, limit);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    System.out.println(rs.getInt("car_id") + ": " + rs.getString("brand") + " " + rs.getString("model")
                            + " (" + rs.getString("registration_no") + ") km=" + rs.getInt("odometer_km"));
                }
            }
        }
    }

    public void findByRegistration(String reg) throws SQLException {
        String sql = "SELECT * FROM Car WHERE registration_no = ?";
        try (Connection conn = Db.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, reg);
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next()) {
                    System.out.println("Ingen bil med registreringsnummer: " + reg);
                    return;
                }
                do {
                    System.out.println("#" + rs.getInt("car_id") + " " + rs.getString("brand") + " " + rs.getString("model")
                            + " (" + rs.getString("registration_no") + ")");
                } while (rs.next());
            }
        }
    }

    public int updateOdometerByRegNo(String reg, int newKm) throws SQLException {
        String sql = "UPDATE Car SET odometer_km = ? WHERE registration_no = ?";
        try (Connection conn = Db.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, newKm);
            ps.setString(2, reg);
            return ps.executeUpdate();
        }
    }

    public int createCar(int categoryId,
                         String brand,
                         String model,
                         String fuelType,
                         String registrationNo,
                         int firstRegYear,
                         int firstRegMonth,
                         int odometerKm,
                         String transmission,
                         int seats) throws SQLException {
        String sql = "INSERT INTO Car (category_id, brand, model, fuel_type, registration_no, first_reg_year, first_reg_month, odometer_km, transmission, seats) " +
                     "VALUES (?,?,?,?,?,?,?,?,?,?)";
        try (Connection conn = Db.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, java.sql.Statement.RETURN_GENERATED_KEYS)) {
            ps.setInt(1, categoryId);
            ps.setString(2, brand);
            ps.setString(3, model);
            ps.setString(4, fuelType);
            ps.setString(5, registrationNo);
            ps.setInt(6, firstRegYear);
            ps.setInt(7, firstRegMonth);
            ps.setInt(8, odometerKm);
            ps.setString(9, transmission);
            ps.setInt(10, seats);
            ps.executeUpdate();
            try (ResultSet keys = ps.getGeneratedKeys()) {
                return keys.next() ? keys.getInt(1) : -1;
            }
        }
    }

    public int deleteCarById(int carId) throws SQLException {
        String sql = "DELETE FROM Car WHERE car_id = ?";
        try (Connection conn = Db.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, carId);
            return ps.executeUpdate();
        }
    }

    public void findByBrandOrModel(String term) throws SQLException {
        String like = "%" + term + "%";
        String sql = "SELECT car_id, brand, model, registration_no FROM Car WHERE brand LIKE ? OR model LIKE ? ORDER BY car_id";
        try (Connection conn = Db.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, like);
            ps.setString(2, like);
            try (ResultSet rs = ps.executeQuery()) {
                boolean any = false;
                while (rs.next()) {
                    any = true;
                    System.out.println(rs.getInt("car_id") + ": " + rs.getString("brand") + " " + rs.getString("model") +
                            " (" + rs.getString("registration_no") + ")");
                }
                if (!any) System.out.println("Ingen match.");
            }
        }
    }
}


