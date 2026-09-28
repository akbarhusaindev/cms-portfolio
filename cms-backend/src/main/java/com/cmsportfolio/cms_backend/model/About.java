package com.cmsportfolio.cms_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "about")
@Data
public class About {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String bio;
    private String resumeUrl;
    private String profileImage;
    private String email;
    private String phone;
}