package com.cmsportfolio.cms_backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // Enable CORS using the CorsConfigurationSource bean from CorsConfig
                .cors(Customizer.withDefaults())

                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth

                        // Login/Register
                        .requestMatchers("/api/auth/**").permitAll()

                        // Contact form — public
                        .requestMatchers(HttpMethod.POST, "/api/contact").permitAll()

                        // Cloudinary image and file upload — public
                        .requestMatchers(HttpMethod.POST, "/api/upload/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/images/**").permitAll()

                        // Uploaded files can be viewed publicly
                        .requestMatchers(HttpMethod.GET, "/api/upload/**").permitAll()

                        // Other GET APIs are public
                        .requestMatchers(HttpMethod.GET, "/api/**").permitAll()

                        // Everything else requires JWT
                        .anyRequest().authenticated()
                );

        http.addFilterBefore(
                jwtAuthFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig
    ) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}