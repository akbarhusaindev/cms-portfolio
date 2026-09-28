package com.cmsportfolio.cms_backend.repository;

import com.cmsportfolio.cms_backend.model.ServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<ServiceItem, Long> {
}