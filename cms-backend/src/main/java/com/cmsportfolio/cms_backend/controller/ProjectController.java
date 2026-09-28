package com.cmsportfolio.cms_backend.controller;

import com.cmsportfolio.cms_backend.model.Project;
import com.cmsportfolio.cms_backend.repository.ProjectRepository;
import com.cmsportfolio.cms_backend.util.UrlSanitizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    public List<Project> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        for (Project project : projects) {
            if (project.getImageUrl() != null) {
                project.setImageUrl(UrlSanitizer.sanitize(project.getImageUrl()));
            }
        }
        return projects;
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        if (project.getImageUrl() != null) {
            project.setImageUrl(UrlSanitizer.sanitize(project.getImageUrl()));
        }
        return projectRepository.save(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project projectDetails) {
        Project project = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
        project.setTitle(projectDetails.getTitle());
        project.setDescription(projectDetails.getDescription());
        project.setImageUrl(UrlSanitizer.sanitize(projectDetails.getImageUrl()));
        project.setGithubUrl(projectDetails.getGithubUrl());
        project.setLiveUrl(projectDetails.getLiveUrl());
        project.setTechnologies(projectDetails.getTechnologies());

        Project updatedProject = projectRepository.save(project);
        return ResponseEntity.ok(updatedProject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        projectRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}