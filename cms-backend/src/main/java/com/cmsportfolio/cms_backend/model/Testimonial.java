package com.cmsportfolio.cms_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "testimonials")
@Data
public class Testimonial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String clientName;
    @Column(columnDefinition = "TEXT")
    private String feedback;
    private String designation;
}