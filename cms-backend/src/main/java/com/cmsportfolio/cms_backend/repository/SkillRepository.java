package com.cmsportfolio.cms_backend.repository;

import com.cmsportfolio.cms_backend.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Long> {
}