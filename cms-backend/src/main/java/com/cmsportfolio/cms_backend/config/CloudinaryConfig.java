package com.cmsportfolio.cms_backend.config;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Value("${cloudinary.cloud-name:wfdb30mr}")
    private String cloudName;

    @Value("${cloudinary.api-key:777298796198481}")
    private String apiKey;

    @Value("${cloudinary.api-secret:GCKmGw8OnA9zDtf0HSDYehHe768}")
    private String apiSecret;

    @Bean
    public Cloudinary cloudinary() {
        Map<String, Object> config = new HashMap<>();
        config.put("cloud_name", cloudName);
        config.put("api_key", apiKey);
        config.put("api_secret", apiSecret);
        config.put("secure", true);
        return new Cloudinary(config);
    }
}
