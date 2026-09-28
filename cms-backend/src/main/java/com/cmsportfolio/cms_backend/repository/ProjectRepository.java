package com.cmsportfolio.cms_backend.repository;

import com.cmsportfolio.cms_backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}