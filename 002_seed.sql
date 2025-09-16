USE kailua_carrental;

INSERT INTO ZipCode(zip, city) VALUES
 ('2100','København Ø'), ('2300','København S'), ('8000','Aarhus C'), ('9000','Aalborg');

INSERT INTO CarCategory(name, description) VALUES
 ('Luxury','Automatic, leather, cruise'),
 ('Family','7 seats, manual, A/C'),
 ('Sport','Manual, >200 hp');

INSERT INTO Car(category_id, brand, model, fuel_type, registration_no, first_reg_year, first_reg_month, odometer_km, engine_cc, horsepower, transmission, seats, air_condition, cruise_control, leather_seats) VALUES
 (1,'Mercedes','S500','Petrol','AB12345',2022,5,28000,3996,429,'Automatic',5,TRUE,TRUE,TRUE),
 (2,'Volkswagen','Sharan','Diesel','CD67890',2019,3,59000,1968,150,'Manual',7,TRUE,TRUE,FALSE),
 (3,'Ford','Mustang','Petrol','EF24680',2021,8,32000,2261,330,'Manual',4,TRUE,FALSE,FALSE);

INSERT INTO Customer(name, address, zip, mobile_phone, phone, email, driver_license_no, driver_since) VALUES
 ('Anna Jensen','Åboulevard 12','2100','+45 20123456',NULL,'anna@example.com','DK-ANNA-001','2010-06-01'),
 ('Bo Hansen','Vesterbrogade 55','2300','+45 22112211',NULL,'bo@example.com','DK-BO-002','2008-05-15'),
 ('Carla Sørensen','Nørregade 7','8000','+45 30303030',NULL,'carla@example.com','DK-CARLA-003','2012-09-20');

INSERT INTO Rental(customer_id, car_id, from_datetime, to_datetime, max_km, start_odometer_km, return_odometer_km) VALUES
 (1,1,'2025-09-01 09:00:00','2025-09-03 09:00:00',600,28000,28320),
 (2,2,'2025-09-05 12:00:00','2025-09-06 18:00:00',300,59000,59210),
 (3,3,'2025-09-07 08:00:00','2025-09-10 10:00:00',700,32000,32550);


