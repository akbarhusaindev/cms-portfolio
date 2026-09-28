package com.cmsportfolio.cms_backend.repository;

import com.cmsportfolio.cms_backend.model.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
}