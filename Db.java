package com.kailua.carrental;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Db {
    private static final String DEFAULT_URL =
        "jdbc:mysql://127.0.0.1:3306/kailua_carrental?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
    private static final String DEFAULT_USER = "root";

    private static String get(String env, String prop, String def) {
        String v = System.getProperty(prop);
        if (v == null || v.isEmpty()) v = System.getenv(env);
        return (v == null || v.isEmpty()) ? def : v;
    }

    public static Connection getConnection() throws SQLException {
        String url  = get("DB_URL",  "db.url",  DEFAULT_URL);
        String user = get("DB_USER", "db.user", DEFAULT_USER);
        String pass = get("DB_PASS", "db.pass", "");
        return DriverManager.getConnection(url, user, pass);
    }
}
