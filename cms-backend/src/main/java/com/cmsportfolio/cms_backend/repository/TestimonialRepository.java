package com.cmsportfolio.cms_backend.repository;

import com.cmsportfolio.cms_backend.model.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {
}