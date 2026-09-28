package com.cmsportfolio.cms_backend.controller;

import com.cmsportfolio.cms_backend.service.CloudinaryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class FileUploadController {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping({"/api/upload/image", "/api/upload", "/api/images/upload"})
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Please select a file to upload"));
        }

        try {
            @SuppressWarnings("rawtypes")
            Map uploadResult = cloudinaryService.uploadImage(file);
            String secureUrl = (String) uploadResult.get("secure_url");
            String publicId = (String) uploadResult.get("public_id");

            return ResponseEntity.ok(Map.of(
                    "message", "File uploaded successfully to Cloudinary",
                    "url", secureUrl != null ? secureUrl : (String) uploadResult.get("url"),
                    "public_id", publicId != null ? publicId : ""
            ));
        } catch (Exception ex) {
            logger.error("Cloudinary upload failed: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "error", "Cloudinary upload failed: " + ex.getMessage()
            ));
        }
    }
}