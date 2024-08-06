package com.project.itube.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.project.itube.utils.properties.PropertiesConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;


@Configuration
public class MongoConfig {

    @Bean
    public MongoClient mongoClient() {
        String key = PropertiesConfig.getMongoDB();
        return MongoClients.create(key);
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), "itube");
    }
}
