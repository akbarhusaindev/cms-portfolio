package com.cmsportfolio.cms_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "blogs")
@Data
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String slug;
    @Column(columnDefinition = "TEXT")
    private String content;
    private String publishedDate;
}