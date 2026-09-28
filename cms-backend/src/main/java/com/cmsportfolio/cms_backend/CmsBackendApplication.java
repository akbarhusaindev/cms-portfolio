package com.cmsportfolio.cms_backend;

import com.cmsportfolio.cms_backend.model.About;
import com.cmsportfolio.cms_backend.model.Project;
import com.cmsportfolio.cms_backend.model.User;
import com.cmsportfolio.cms_backend.repository.AboutRepository;
import com.cmsportfolio.cms_backend.repository.ProjectRepository;
import com.cmsportfolio.cms_backend.repository.UserRepository;
import com.cmsportfolio.cms_backend.util.UrlSanitizer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
public class CmsBackendApplication {

    private static final Logger logger = LoggerFactory.getLogger(CmsBackendApplication.class);

    @Value("${admin.default.username:cms_admin_7Xq9vL2mR8kT5434}")
    private String adminUsername;

    @Value("${admin.default.password:V7!qR2#nL9@xT4$kPmZ6343jwffs45879hsdsd&wC3}")
    private String adminPassword;

    public static void main(String[] args) {
        SpringApplication.run(CmsBackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner initDatabase(
            UserRepository userRepository,
            ProjectRepository projectRepository,
            AboutRepository aboutRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            // 1. Ensure configured admin user exists with requested password
            User admin = userRepository.findByUsername(adminUsername).orElse(null);
            if (admin == null) {
                admin = new User();
                admin.setUsername(adminUsername);
                admin.setPassword(passwordEncoder.encode(adminPassword));
                userRepository.save(admin);
                logger.info(">>> [INIT] Created admin account: Username='{}'", adminUsername);
            } else {
                admin.setPassword(passwordEncoder.encode(adminPassword));
                userRepository.save(admin);
                logger.info(">>> [INIT] Updated admin account '{}' with configured password.", adminUsername);
            }

            // 2. Sanitize any existing corrupted image URLs in Projects
            List<Project> projects = projectRepository.findAll();
            for (Project project : projects) {
                if (project.getImageUrl() != null) {
                    String sanitized = UrlSanitizer.sanitize(project.getImageUrl());
                    if (!sanitized.equals(project.getImageUrl())) {
                        project.setImageUrl(sanitized);
                        projectRepository.save(project);
                        logger.info(">>> [INIT] Fixed corrupted Project image URL for '{}': {}", project.getTitle(), sanitized);
                    }
                }
            }

            // 3. Sanitize any existing corrupted profileImage in About
            List<About> aboutList = aboutRepository.findAll();
            for (About about : aboutList) {
                if (about.getProfileImage() != null) {
                    String sanitized = UrlSanitizer.sanitize(about.getProfileImage());
                    if (!sanitized.equals(about.getProfileImage())) {
                        about.setProfileImage(sanitized);
                        aboutRepository.save(about);
                        logger.info(">>> [INIT] Fixed corrupted About profileImage URL: {}", sanitized);
                    }
                }
            }
        };
    }
}
