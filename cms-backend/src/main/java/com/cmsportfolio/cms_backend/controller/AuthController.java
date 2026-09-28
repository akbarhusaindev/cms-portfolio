package com.cmsportfolio.cms_backend.controller;
import com.cmsportfolio.cms_backend.model.User;
import com.cmsportfolio.cms_backend.repository.UserRepository;
import com.cmsportfolio.cms_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );
        userRepository.save(user);
        return ResponseEntity.ok(
                Map.of("message", "Admin user registered successfully")
        );
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User existingUser = userRepository
                .findByUsername(user.getUsername())
                .orElse(null);
        if (existingUser != null &&
                passwordEncoder.matches(
                        user.getPassword(),
                        existingUser.getPassword()
                )) {
            String token = jwtUtil.generateToken(
                    existingUser.getUsername()
            );
            return ResponseEntity.ok(
                    Map.of("token", token)
            );
        }
        return ResponseEntity
                .status(401)
                .body(Map.of("error", "Invalid username or password"));
    }
}