package com.cmsportfolio.cms_backend.repository;

import com.cmsportfolio.cms_backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}