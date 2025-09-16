# Kailua CarRental (Console, Java 21, Maven, MySQL)

## Krav
- Java 21, Maven
- MySQL lokalt med database `kailua_carrental`

## Opsætning af database (skriv SQL manuelt)
```bash
mysql -u root -e "SOURCE sql/001_schema.sql"
mysql -u root -e "SOURCE sql/002_seed.sql"
```

## Kørsel
```bash
mvn -q package
mvn -q exec:java
```

## Konfiguration uden secrets
`Db.java` læser fra system properties / env variabler. Default er tomt password.
- System properties: `-Ddb.url`, `-Ddb.user`, `-Ddb.pass`
- Environment: `DB_URL`, `DB_USER`, `DB_PASS`

Eksempel (hvis du senere får password):
```bash
mvn -q exec:java -Ddb.user=root -Ddb.pass='HEMMELIG' -Ddb.url='jdbc:mysql://127.0.0.1:3306/kailua_carrental?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC'
```

## Funktionalitet
- Konsol-UI (`ConsoleUI`) med menupunkter: list/find/update car, create customer, create/return/delete rental.
- DAO-klasser: `CarDao`, `CustomerDao`, `RentalDao`.

## Struktur
```
KailuaCarRental/
├── pom.xml
├── src/main/java/com/kailua/carrental/
│   ├── App.java
│   ├── Db.java
│   ├── ConsoleUI.java
│   ├── CarDao.java
│   ├── CustomerDao.java
│   └── RentalDao.java
├── sql/
│   ├── 001_schema.sql
│   └── 002_seed.sql
├── docs/
│   └── er-diagram.mmd (læg dit diagram eller brug Mermaid)
└── .gitignore
```
