package com.cmsportfolio.cms_backend.controller;

import com.cmsportfolio.cms_backend.model.Testimonial;
import com.cmsportfolio.cms_backend.repository.TestimonialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/testimonials", "/testimonials"})
@CrossOrigin(origins = "*")
public class TestimonialController {

    @Autowired
    private TestimonialRepository testimonialRepository;

    @GetMapping
    public List<Testimonial> getAllTestimonials() {
        return testimonialRepository.findAll();
    }

    @PostMapping
    public Testimonial createTestimonial(@RequestBody Testimonial testimonial) {
        return testimonialRepository.save(testimonial);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Testimonial> updateTestimonial(@PathVariable Long id, @RequestBody Testimonial details) {
        Testimonial t = testimonialRepository.findById(id).orElseThrow(() -> new RuntimeException("Testimonial not found"));
        t.setClientName(details.getClientName());
        t.setFeedback(details.getFeedback());
        t.setDesignation(details.getDesignation());
        return ResponseEntity.ok(testimonialRepository.save(t));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTestimonial(@PathVariable Long id) {
        testimonialRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}