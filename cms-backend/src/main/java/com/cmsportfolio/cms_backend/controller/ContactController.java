package com.cmsportfolio.cms_backend.controller;

import com.cmsportfolio.cms_backend.model.Message;
import com.cmsportfolio.cms_backend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/api/contact", "/contact"})
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private MessageRepository messageRepository;

    @PostMapping
    public ResponseEntity<?> receiveMessage(@RequestBody Message message) {
        messageRepository.save(message);
        return ResponseEntity.ok(Map.of("success", true, "message", "Message sent successfully!"));
    }

    // Optional: Allow admin to view contact messages
    @GetMapping
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }
}