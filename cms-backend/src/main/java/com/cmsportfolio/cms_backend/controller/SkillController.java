package com.cmsportfolio.cms_backend.controller;

import com.cmsportfolio.cms_backend.model.Skill;
import com.cmsportfolio.cms_backend.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillController {

    @Autowired
    private SkillRepository skillRepository;

    @GetMapping
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    @PostMapping
    public Skill createSkill(@RequestBody Skill skill) {
        return skillRepository.save(skill);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable Long id, @RequestBody Skill details) {
        Skill skill = skillRepository.findById(id).orElseThrow(() -> new RuntimeException("Skill not found"));
        skill.setName(details.getName());
        skill.setCategory(details.getCategory());
        skill.setProficiency(details.getProficiency());
        return ResponseEntity.ok(skillRepository.save(skill));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSkill(@PathVariable Long id) {
        skillRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}