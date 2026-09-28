package com.cmsportfolio.cms_backend.controller;

import com.cmsportfolio.cms_backend.model.Blog;
import com.cmsportfolio.cms_backend.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/blogs", "/blogs"})
@CrossOrigin(origins = "*")
public class BlogController {

    @Autowired
    private BlogRepository blogRepository;

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @PostMapping
    public Blog createBlog(@RequestBody Blog blog) {
        return blogRepository.save(blog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @RequestBody Blog details) {
        Blog blog = blogRepository.findById(id).orElseThrow(() -> new RuntimeException("Blog not found"));
        blog.setTitle(details.getTitle());
        blog.setSlug(details.getSlug());
        blog.setContent(details.getContent());
        blog.setPublishedDate(details.getPublishedDate());
        return ResponseEntity.ok(blogRepository.save(blog));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable Long id) {
        blogRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}