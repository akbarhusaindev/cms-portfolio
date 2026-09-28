package com.cmsportfolio.cms_backend.repository;

import com.cmsportfolio.cms_backend.model.About;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AboutRepository extends JpaRepository<About, Long> {
}