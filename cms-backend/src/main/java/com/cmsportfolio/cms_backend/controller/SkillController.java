package com.cmsportfolio.cms_backend.controller;

import com.cmsportfolio.cms_backend.model.Skill;
import com.cmsportfolio.cms_backend.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/skills", "/skills"})
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
        if (skill.getName() != null) skill.setName(skill.getName().trim());
        if (skill.getCategory() != null) skill.setCategory(skill.getCategory().trim());
        if (skill.getProficiency() != null) skill.setProficiency(skill.getProficiency().trim());
        return skillRepository.save(skill);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable Long id, @RequestBody Skill details) {
        Skill skill = skillRepository.findById(id).orElseThrow(() -> new RuntimeException("Skill not found"));
        if (details.getName() != null) skill.setName(details.getName().trim());
        if (details.getCategory() != null) skill.setCategory(details.getCategory().trim());
        if (details.getProficiency() != null) skill.setProficiency(details.getProficiency().trim());
        return ResponseEntity.ok(skillRepository.save(skill));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSkill(@PathVariable Long id) {
        skillRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}