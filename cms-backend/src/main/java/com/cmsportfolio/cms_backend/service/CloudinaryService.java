package com.cmsportfolio.cms_backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private static final Logger logger = LoggerFactory.getLogger(CloudinaryService.class);

    @Autowired
    private Cloudinary cloudinary;

    @SuppressWarnings("rawtypes")
    public Map uploadImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Cannot upload empty file");
        }

        logger.info("Uploading image {} (size: {} bytes) to Cloudinary...", file.getOriginalFilename(), file.getSize());

        @SuppressWarnings("unchecked")
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "folder", "cms-portfolio",
                "resource_type", "auto"
        ));

        logger.info("Cloudinary upload successful! Secure URL: {}", uploadResult.get("secure_url"));
        return uploadResult;
    }

    public String uploadFileAndGetUrl(MultipartFile file) throws IOException {
        @SuppressWarnings("rawtypes")
        Map uploadResult = uploadImage(file);
        return (String) uploadResult.get("secure_url");
    }
}
