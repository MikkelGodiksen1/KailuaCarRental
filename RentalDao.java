package com.kailua.carrental;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.time.LocalDateTime;

public class RentalDao {
    public int createRental(int customerId, int carId, LocalDateTime from, LocalDateTime to,
                            int maxKm, int startOdometerKm) throws SQLException {
        try (Connection conn = Db.getConnection()) {
            conn.setAutoCommit(false);

            String registrationNo;
            String driverLicenseNo;
            String renterName;
            String renterAddress;
            String renterZip;
            String renterCity;

            // Fetch car registration
            try (PreparedStatement ps = conn.prepareStatement("SELECT registration_no FROM Car WHERE car_id = ?")) {
                ps.setInt(1, carId);
                try (ResultSet rs = ps.executeQuery()) {
                    if (!rs.next()) throw new SQLException("Ukendt car_id: " + carId);
                    registrationNo = rs.getString(1);
                }
            }

            // Fetch customer snapshots
            try (PreparedStatement ps = conn.prepareStatement(
                "SELECT c.driver_license_no, c.name, c.address, c.zip, z.city " +
                "FROM Customer c JOIN ZipCode z ON z.zip = c.zip WHERE c.customer_id = ?")) {
                ps.setInt(1, customerId);
                try (ResultSet rs = ps.executeQuery()) {
                    if (!rs.next()) throw new SQLException("Ukendt customer_id: " + customerId);
                    driverLicenseNo = rs.getString(1);
                    renterName = rs.getString(2);
                    renterAddress = rs.getString(3);
                    renterZip = rs.getString(4);
                    renterCity = rs.getString(5);
                }
            }

            String sql = "INSERT INTO Rental (customer_id, car_id, from_datetime, to_datetime, max_km, start_odometer_km, " +
                         "registration_no_snapshot, driver_license_snapshot, renter_name_snapshot, renter_address_snapshot, renter_zip_snapshot, renter_city_snapshot) " +
                         "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
            try (PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
                ps.setInt(1, customerId);
                ps.setInt(2, carId);
                ps.setTimestamp(3, Timestamp.valueOf(from));
                ps.setTimestamp(4, Timestamp.valueOf(to));
                ps.setInt(5, maxKm);
                ps.setInt(6, startOdometerKm);
                ps.setString(7, registrationNo);
                ps.setString(8, driverLicenseNo);
                ps.setString(9, renterName);
                ps.setString(10, renterAddress);
                ps.setString(11, renterZip);
                ps.setString(12, renterCity);
                ps.executeUpdate();
                try (ResultSet keys = ps.getGeneratedKeys()) {
                    int id = keys.next() ? keys.getInt(1) : -1;
                    conn.commit();
                    return id;
                }
            } catch (SQLException e) {
                conn.rollback();
                throw e;
            } finally {
                conn.setAutoCommit(true);
            }
        }
    }

    public int returnCar(int rentalId, int returnOdometerKm) throws SQLException {
        String sql = "UPDATE Rental SET return_odometer_km = ? WHERE rental_id = ?";
        try (Connection conn = Db.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, returnOdometerKm);
            ps.setInt(2, rentalId);
            return ps.executeUpdate();
        }
    }

    public int deleteRental(int rentalId) throws SQLException {
        String sql = "DELETE FROM Rental WHERE rental_id = ?";
        try (Connection conn = Db.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, rentalId);
            return ps.executeUpdate();
        }
    }
}


