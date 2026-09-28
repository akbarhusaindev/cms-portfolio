package com.cmsportfolio.cms_backend.repository;

import com.cmsportfolio.cms_backend.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog, Long> {
}