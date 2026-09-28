package com.cmsportfolio.cms_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Data
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    @Column(columnDefinition = "TEXT")
    private String message;
    private LocalDateTime createdAt = LocalDateTime.now();
}