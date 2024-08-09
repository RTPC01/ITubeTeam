package com.project.itube.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static com.project.itube.utils.properties.PropertiesConfig.*;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
           "cloud_name", getCloudinaryName(),
                "api_key", getCloudinaryKey(),
                "api_secret", getCloudinarySecret(),
                "secure", true
        ));
    }
}
