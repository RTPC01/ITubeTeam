package com.project.itube.utils.properties;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesConfig {
    private static final String FINE_NAME = "enviroment.properties";
    private static final Properties prop = new Properties();

    static {
        try (InputStream in = PropertiesConfig.class.getClassLoader().getResourceAsStream(FINE_NAME)) {
            if (in == null) {
                throw new RuntimeException("Can't find enviroment.properties");
            }
            prop.load(in);
        } catch (IOException e) {
            throw new RuntimeException("File load failed", e);
        }

    }

    public static String getMongoDB() {
        return prop.getProperty("mongodb.key");
    }
}
