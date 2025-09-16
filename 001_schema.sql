DROP DATABASE IF EXISTS kailua_carrental;
CREATE DATABASE kailua_carrental CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE kailua_carrental;

CREATE TABLE ZipCode (
  zip VARCHAR(10) PRIMARY KEY,
  city VARCHAR(50) NOT NULL
);

CREATE TABLE CarCategory (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT NULL
);

CREATE TABLE Car (
  car_id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  brand VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  fuel_type VARCHAR(20) NOT NULL,
  registration_no VARCHAR(16) NOT NULL UNIQUE,
  first_reg_year INT NOT NULL,
  first_reg_month TINYINT NOT NULL CHECK (first_reg_month BETWEEN 1 AND 12),
  odometer_km INT NOT NULL,
  engine_cc INT NULL,
  horsepower INT NULL,
  transmission VARCHAR(20) NOT NULL,
  seats TINYINT NOT NULL,
  air_condition BOOLEAN NOT NULL DEFAULT TRUE,
  cruise_control BOOLEAN NOT NULL DEFAULT FALSE,
  leather_seats BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT fk_car_category FOREIGN KEY (category_id) REFERENCES CarCategory(category_id)
    ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE Customer (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(100) NOT NULL,
  zip VARCHAR(10) NOT NULL,
  mobile_phone VARCHAR(20) NOT NULL,
  phone VARCHAR(20) NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  driver_license_no VARCHAR(32) NOT NULL UNIQUE,
  driver_since DATE NOT NULL,
  CONSTRAINT fk_customer_zip FOREIGN KEY (zip) REFERENCES ZipCode(zip)
    ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE Rental (
  rental_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  car_id INT NOT NULL,
  from_datetime DATETIME NOT NULL,
  to_datetime DATETIME NOT NULL,
  max_km INT NOT NULL,
  start_odometer_km INT NOT NULL,
  return_odometer_km INT NULL,
  registration_no_snapshot VARCHAR(16) NULL,
  driver_license_snapshot VARCHAR(32) NULL,
  renter_name_snapshot VARCHAR(100) NULL,
  renter_address_snapshot VARCHAR(100) NULL,
  renter_zip_snapshot VARCHAR(10) NULL,
  renter_city_snapshot VARCHAR(50) NULL,
  CONSTRAINT ck_rental_time CHECK (to_datetime > from_datetime),
  CONSTRAINT fk_rental_customer FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
    ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT fk_rental_car FOREIGN KEY (car_id) REFERENCES Car(car_id)
    ON UPDATE RESTRICT ON DELETE RESTRICT
);


