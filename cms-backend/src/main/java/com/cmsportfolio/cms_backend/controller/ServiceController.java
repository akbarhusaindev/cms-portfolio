package com.cmsportfolio.cms_backend.controller;

import com.cmsportfolio.cms_backend.model.ServiceItem;
import com.cmsportfolio.cms_backend.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping
    public List<ServiceItem> getAllServices() {
        return serviceRepository.findAll();
    }

    @PostMapping
    public ServiceItem createService(@RequestBody ServiceItem serviceItem) {
        return serviceRepository.save(serviceItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceItem> updateService(@PathVariable Long id, @RequestBody ServiceItem details) {
        ServiceItem item = serviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Service not found"));
        item.setTitle(details.getTitle());
        item.setDescription(details.getDescription());
        item.setIcon(details.getIcon());
        return ResponseEntity.ok(serviceRepository.save(item));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        serviceRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}