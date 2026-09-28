package com.cmsportfolio.cms_backend.controller;

import com.cmsportfolio.cms_backend.model.About;
import com.cmsportfolio.cms_backend.repository.AboutRepository;
import com.cmsportfolio.cms_backend.util.UrlSanitizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/api/about", "/about"})
@CrossOrigin(origins = "*")
public class AboutController {

    @Autowired
    private AboutRepository aboutRepository;

    @GetMapping
    public About getAbout() {
        About about = aboutRepository.findAll().stream().findFirst().orElse(new About());
        if (about.getProfileImage() != null) {
            about.setProfileImage(UrlSanitizer.sanitize(about.getProfileImage()));
        }
        return about;
    }

    @PostMapping
    public About createOrUpdateAbout(@RequestBody About aboutDetails) {
        About about = aboutRepository.findAll().stream().findFirst().orElse(new About());
        about.setBio(aboutDetails.getBio());
        about.setResumeUrl(aboutDetails.getResumeUrl());
        about.setProfileImage(UrlSanitizer.sanitize(aboutDetails.getProfileImage()));
        about.setEmail(aboutDetails.getEmail());
        about.setPhone(aboutDetails.getPhone());
        return aboutRepository.save(about);
    }
}