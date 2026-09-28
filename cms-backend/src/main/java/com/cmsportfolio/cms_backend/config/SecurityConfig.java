package com.cmsportfolio.cms_backend.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // Explicitly inject the CORS configuration source
                .cors(cors -> cors.configurationSource(corsConfigurationSource))

                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setContentType("application/json");
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.getWriter().write("{\"error\": \"Unauthorized: Please sign in\"}");
                        })
                )

                .authorizeHttpRequests(auth -> auth
                        // Permit all OPTIONS requests for CORS preflights
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Login/Register
                        .requestMatchers("/api/auth/**", "/auth/**").permitAll()

                        // Contact form — public
                        .requestMatchers(HttpMethod.POST, "/api/contact", "/contact").permitAll()

                        // Cloudinary image and file upload — public
                        .requestMatchers(HttpMethod.POST, "/api/upload/**", "/upload/**", "/api/images/**", "/images/**").permitAll()

                        // Uploaded files can be viewed publicly
                        .requestMatchers(HttpMethod.GET, "/api/upload/**", "/upload/**").permitAll()

                        // All GET APIs are public for portfolio display
                        .requestMatchers(HttpMethod.GET, "/**").permitAll()

                        // Everything else (POST/PUT/DELETE for content management) requires valid JWT
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