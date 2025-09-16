package com.kailua.carrental;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Scanner;

public class ConsoleUI {
    private final Scanner in = new Scanner(System.in);
    private final CarDao carDao = new CarDao();
    private final CustomerDao customerDao = new CustomerDao();
    private final RentalDao rentalDao = new RentalDao();

    public void start() {
        while (true) {
            System.out.println("\n=== Kailua CarRental ===");
            System.out.println("1) List biler");
            System.out.println("2) Find bil (registreringsnummer)");
            System.out.println("3) Opdater odometer (km)");
            System.out.println("4) Opret kunde");
            System.out.println("5) Opret rental");
            System.out.println("6) Aflever bil (luk rental)");
            System.out.println("7) Slet rental");
            System.out.println("8) Søg biler (brand/model)");
            System.out.println("9) Opret bil");
            System.out.println("10) Slet bil");
            System.out.println("11) Opdater kunde-email");
            System.out.println("12) Slet kunde");
            System.out.println("0) Exit");
            System.out.print("Vælg: ");
            String choice = in.nextLine().trim();
            try {
                switch (choice) {
                    case "1": listCars(); break;
                    case "2": findCar(); break;
                    case "3": updateOdometer(); break;
                    case "4": createCustomer(); break;
                    case "5": createRental(); break;
                    case "6": returnCar(); break;
                    case "7": deleteRental(); break;
                    case "8": searchCars(); break;
                    case "9": createCar(); break;
                    case "10": deleteCar(); break;
                    case "11": updateCustomerEmail(); break;
                    case "12": deleteCustomer(); break;
                    case "0": System.out.println("Farvel"); return;
                    default: System.out.println("Ugyldigt valg");
                }
            } catch (Exception e) {
                System.err.println("Fejl: " + e.getMessage());
            }
        }
    }

    private void listCars() throws SQLException { carDao.listTopCars(10); }

    private void findCar() throws SQLException {
        System.out.print("Registreringsnummer: ");
        String reg = in.nextLine().trim();
        carDao.findByRegistration(reg);
    }

    private void updateOdometer() throws SQLException {
        System.out.print("Registreringsnummer: ");
        String reg = in.nextLine().trim();
        System.out.print("Nyt km-tal: ");
        int km = Integer.parseInt(in.nextLine().trim());
        int rows = carDao.updateOdometerByRegNo(reg, km);
        System.out.println(rows == 1 ? "Opdateret." : "Ingen bil opdateret.");
    }

    private void createCustomer() throws SQLException {
        System.out.print("Navn: "); String name = in.nextLine();
        System.out.print("Adresse: "); String addr = in.nextLine();
        System.out.print("Zip: "); String zip = in.nextLine();
        System.out.print("Mobil: "); String mobile = in.nextLine();
        System.out.print("Telefon (valgfri): "); String phone = in.nextLine();
        System.out.print("Email: "); String email = in.nextLine();
        System.out.print("Kørekortnr.: "); String dl = in.nextLine();
        System.out.print("Fører siden (YYYY-MM-DD): "); LocalDate since = LocalDate.parse(in.nextLine().trim());
        int id = customerDao.createCustomer(name, addr, zip, mobile, phone, email, dl, since);
        System.out.println("Kunde oprettet med id=" + id);
    }

    private void createRental() throws SQLException {
        System.out.print("customer_id: "); int customerId = Integer.parseInt(in.nextLine().trim());
        System.out.print("car_id: "); int carId = Integer.parseInt(in.nextLine().trim());
        System.out.print("Fra (YYYY-MM-DDTHH:MM): "); LocalDateTime from = LocalDateTime.parse(in.nextLine().trim());
        System.out.print("Til (YYYY-MM-DDTHH:MM): "); LocalDateTime to = LocalDateTime.parse(in.nextLine().trim());
        System.out.print("Max km: "); int maxKm = Integer.parseInt(in.nextLine().trim());
        System.out.print("Start km: "); int startKm = Integer.parseInt(in.nextLine().trim());
        int id = rentalDao.createRental(customerId, carId, from, to, maxKm, startKm);
        System.out.println("Rental oprettet med id=" + id);
    }

    private void returnCar() throws SQLException {
        System.out.print("rental_id: "); int rentalId = Integer.parseInt(in.nextLine().trim());
        System.out.print("Return km: "); int returnKm = Integer.parseInt(in.nextLine().trim());
        int rows = rentalDao.returnCar(rentalId, returnKm);
        System.out.println(rows == 1 ? "Rental lukket." : "Ingen rental opdateret.");
    }

    private void deleteRental() throws SQLException {
        System.out.print("rental_id: "); int rentalId = Integer.parseInt(in.nextLine().trim());
        int rows = rentalDao.deleteRental(rentalId);
        System.out.println(rows == 1 ? "Rental slettet." : "Ingen rental slettet.");
    }

    private void searchCars() throws SQLException {
        System.out.print("Søg efter (brand/model): ");
        String term = in.nextLine().trim();
        carDao.findByBrandOrModel(term);
    }

    private void createCar() throws SQLException {
        System.out.print("category_id (1=Luxury,2=Family,3=Sport): "); int categoryId = Integer.parseInt(in.nextLine().trim());
        System.out.print("Brand: "); String brand = in.nextLine();
        System.out.print("Model: "); String model = in.nextLine();
        System.out.print("Fuel type: "); String fuel = in.nextLine();
        System.out.print("Registreringsnummer: "); String reg = in.nextLine();
        System.out.print("1. reg. år: "); int year = Integer.parseInt(in.nextLine().trim());
        System.out.print("1. reg. måned (1-12): "); int month = Integer.parseInt(in.nextLine().trim());
        System.out.print("Odometer km: "); int km = Integer.parseInt(in.nextLine().trim());
        System.out.print("Transmission: "); String tr = in.nextLine();
        System.out.print("Sæder: "); int seats = Integer.parseInt(in.nextLine().trim());
        int id = carDao.createCar(categoryId, brand, model, fuel, reg, year, month, km, tr, seats);
        System.out.println("Bil oprettet med id=" + id);
    }

    private void deleteCar() throws SQLException {
        System.out.print("car_id: "); int carId = Integer.parseInt(in.nextLine().trim());
        int rows = carDao.deleteCarById(carId);
        System.out.println(rows == 1 ? "Bil slettet." : "Ingen bil slettet.");
    }

    private void updateCustomerEmail() throws SQLException {
        System.out.print("customer_id: "); int id = Integer.parseInt(in.nextLine().trim());
        System.out.print("Ny email: "); String email = in.nextLine();
        int rows = customerDao.updateCustomerEmail(id, email);
        System.out.println(rows == 1 ? "Email opdateret." : "Ingen kunde opdateret.");
    }

    private void deleteCustomer() throws SQLException {
        System.out.print("customer_id: "); int id = Integer.parseInt(in.nextLine().trim());
        int rows = customerDao.deleteCustomer(id);
        System.out.println(rows == 1 ? "Kunde slettet." : "Ingen kunde slettet.");
    }
}


