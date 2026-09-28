package com.cmsportfolio.cms_backend.controller;

import com.cmsportfolio.cms_backend.model.Experience;
import com.cmsportfolio.cms_backend.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
@CrossOrigin(origins = "*")
public class ExperienceController {

    @Autowired
    private ExperienceRepository experienceRepository;

    @GetMapping
    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    @PostMapping
    public Experience createExperience(@RequestBody Experience experience) {
        return experienceRepository.save(experience);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Experience> updateExperience(@PathVariable Long id, @RequestBody Experience details) {
        Experience exp = experienceRepository.findById(id).orElseThrow(() -> new RuntimeException("Experience not found"));
        exp.setRole(details.getRole());
        exp.setCompany(details.getCompany());
        exp.setDuration(details.getDuration());
        exp.setDescription(details.getDescription());
        return ResponseEntity.ok(experienceRepository.save(exp));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExperience(@PathVariable Long id) {
        experienceRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}